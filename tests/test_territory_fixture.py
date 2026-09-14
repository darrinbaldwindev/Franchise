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

    def test_active_overlap_fails_closed(self):
        payload = self.load()
        payload["delivery_areas"].append({
            "area_id": "AREA-B-OVERLAP",
            "franchise_id": "FR-B",
            "version": 1,
            "status": "ACTIVE",
            "postcode_tokens": ["TEST-1000"],
        })
        with self.assertRaisesRegex(ValueError, "ambiguous active delivery-area overlap"):
            validate(payload)

    def test_unknown_franchise_fails_closed(self):
        payload = self.load()
        payload["delivery_areas"][0]["franchise_id"] = "FR-MISSING"
        with self.assertRaisesRegex(ValueError, "unknown franchise"):
            validate(payload)

    def test_inactive_franchise_never_routes_as_active(self):
        payload = self.load()
        result = validate(payload)
        case = next(item for item in result["cases"] if item["case_id"] == "inactive-franchise")
        self.assertEqual(case["actual"], "DENY_INACTIVE_FRANCHISE")


if __name__ == "__main__":
    unittest.main()
