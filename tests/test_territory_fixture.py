import copy
import json
import unittest
from pathlib import Path

from tools.validate_territory_fixture import validate

FIXTURE = Path(__file__).parents[1] / "fixtures" / "territory-routing" / "territories.synthetic.json"


class TerritoryFixtureTests(unittest.TestCase):
    def load(self):
        return json.loads(FIXTURE.read_text(encoding="utf-8"))

    def test_baseline_fixture_passes(self):
        result = validate(self.load())
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["overlap_count"], 0)

    def test_missing_evidence_context_fails_closed(self):
        for field in ("evidence_source", "evidence_timestamp", "tenancy_context"):
            payload = self.load(); payload[field] = ""
            with self.assertRaisesRegex(ValueError, "fixture evidence context is incomplete"): validate(payload)

    def test_non_synthetic_evidence_context_fails_closed(self):
        for field, value in (("evidence_source", "PRODUCTION_DB"), ("tenancy_context", "LIVE_TENANCY")):
            payload = self.load(); payload[field] = value
            with self.assertRaisesRegex(ValueError, "synthetic-only"): validate(payload)

    def test_duplicate_franchise_id_fails_closed(self):
        payload = self.load(); payload["franchises"].append(copy.deepcopy(payload["franchises"][0]))
        with self.assertRaisesRegex(ValueError, "duplicate or missing franchise_id"): validate(payload)

    def test_duplicate_routing_case_id_fails_closed(self):
        payload = self.load(); payload["routing_cases"].append(copy.deepcopy(payload["routing_cases"][0]))
        with self.assertRaisesRegex(ValueError, "duplicate or missing routing case_id"): validate(payload)

    def test_active_overlap_fails_closed(self):
        payload = self.load()
        payload["delivery_areas"].append({"area_id":"AREA-B-OVERLAP","franchise_id":"FR-B","version":1,"status":"ACTIVE","postcode_tokens":["TEST-1000"]})
        with self.assertRaisesRegex(ValueError, "ambiguous active delivery-area overlap"): validate(payload)

    def test_duplicate_active_area_id_fails_closed(self):
        payload = self.load(); duplicate = copy.deepcopy(payload["delivery_areas"][0]); duplicate["postcode_tokens"] = ["TEST-1010"]; payload["delivery_areas"].append(duplicate)
        with self.assertRaisesRegex(ValueError, "duplicate or missing area_id"): validate(payload)

    def test_duplicate_inactive_area_id_fails_closed(self):
        payload = self.load()
        duplicate = copy.deepcopy(payload["delivery_areas"][0])
        payload["delivery_areas"][0]["status"] = "SUSPENDED"
        duplicate["status"] = "RETIRED"
        duplicate["postcode_tokens"] = ["TEST-1010"]
        payload["delivery_areas"].append(duplicate)
        with self.assertRaisesRegex(ValueError, "duplicate or missing area_id"): validate(payload)

    def test_invalid_franchise_status_fails_closed(self):
        payload = self.load(); payload["franchises"][0]["status"] = "PAUSED"
        with self.assertRaisesRegex(ValueError, "invalid franchise status"): validate(payload)

    def test_invalid_delivery_area_status_fails_closed(self):
        payload = self.load(); payload["delivery_areas"][0]["status"] = "PAUSED"
        with self.assertRaisesRegex(ValueError, "invalid delivery-area status"): validate(payload)

    def test_missing_or_empty_postcode_tokens_fail_closed(self):
        for bad in ([], [""], ["   "]):
            payload = self.load(); payload["delivery_areas"][0]["postcode_tokens"] = bad
            with self.assertRaisesRegex(ValueError, "missing or empty postcode token"): validate(payload)
        payload = self.load(); payload["routing_cases"][0]["postcode_token"] = ""
        with self.assertRaisesRegex(ValueError, "missing postcode_token"): validate(payload)

    def test_duplicate_postcode_within_same_area_is_deduplicated(self):
        payload = self.load(); payload["delivery_areas"][0]["postcode_tokens"].append("TEST-1000")
        result = validate(payload); case = next(item for item in result["cases"] if item["case_id"] == "route-a")
        self.assertEqual(case["matched_area_ids"], ["AREA-A-1"])
        self.assertEqual(case["candidate_franchise_ids"], ["FR-A"])

    def test_invalid_area_version_fails_closed(self):
        payload = self.load(); payload["delivery_areas"][0]["version"] = 0
        with self.assertRaisesRegex(ValueError, "invalid area version"): validate(payload)

    def test_unknown_franchise_fails_closed(self):
        payload = self.load(); payload["delivery_areas"][0]["franchise_id"] = "FR-MISSING"
        with self.assertRaisesRegex(ValueError, "unknown franchise"): validate(payload)

    def test_inactive_franchise_never_routes_as_active(self):
        case = next(item for item in validate(self.load())["cases"] if item["case_id"] == "inactive-franchise")
        self.assertEqual(case["actual"], "DENY_INACTIVE_FRANCHISE")
        self.assertEqual(case["reason"], "MATCHED_FRANCHISE_INACTIVE")
        self.assertIsNone(case["selected_franchise_id"])

    def test_successful_route_has_auditable_decision_record(self):
        case = next(item for item in validate(self.load())["cases"] if item["case_id"] == "route-a")
        self.assertEqual(case["selected_franchise_id"], "FR-A")
        self.assertEqual(case["matched_area_ids"], ["AREA-A-1"])
        self.assertEqual(case["matched_area_versions"], {"AREA-A-1": 1})
        self.assertEqual(case["evidence_source"], "SYNTHETIC_FIXTURE")
        self.assertEqual(case["tenancy_context"], "SYNTHETIC_FRANCHISE_ROUTING")
        self.assertEqual(len(case["correlation_id"]), 16)

    def test_correlation_is_order_stable_and_materially_bound(self):
        original = validate(self.load())
        reordered = self.load(); reordered["delivery_areas"] = list(reversed(reordered["delivery_areas"])); reordered["franchises"] = list(reversed(reordered["franchises"]))
        reordered_result = validate(reordered)
        orig = {c["case_id"]: c["correlation_id"] for c in original["cases"]}
        again = {c["case_id"]: c["correlation_id"] for c in reordered_result["cases"]}
        self.assertEqual(orig, again)
        changed = self.load(); changed["delivery_areas"][0]["version"] = 2
        changed_result = validate(changed)
        original_case = next(item for item in original["cases"] if item["case_id"] == "route-a")
        changed_case = next(item for item in changed_result["cases"] if item["case_id"] == "route-a")
        self.assertNotEqual(original_case["correlation_id"], changed_case["correlation_id"])

    def test_routing_case_output_order_is_deterministic(self):
        baseline = validate(self.load())
        reordered = self.load(); reordered["routing_cases"] = list(reversed(reordered["routing_cases"]))
        again = validate(reordered)
        baseline_ids = [case["case_id"] for case in baseline["cases"]]
        again_ids = [case["case_id"] for case in again["cases"]]
        self.assertEqual(baseline_ids, sorted(baseline_ids))
        self.assertEqual(baseline_ids, again_ids)

    def test_unserviceable_case_has_explicit_denial_reason(self):
        case = next(item for item in validate(self.load())["cases"] if item["case_id"] == "unserviceable")
        self.assertEqual(case["actual"], "NO_SERVICE")
        self.assertEqual(case["reason"], "NO_ACTIVE_DELIVERY_AREA")
        self.assertEqual(case["matched_area_ids"], [])


if __name__ == "__main__":
    unittest.main()
