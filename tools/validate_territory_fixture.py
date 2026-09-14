#!/usr/bin/env python3
import hashlib
import json
import sys
from collections import defaultdict

SYNTHETIC_EVIDENCE_SOURCE = "SYNTHETIC_FIXTURE"
SYNTHETIC_TENANCY_CONTEXT = "SYNTHETIC_FRANCHISE_ROUTING"


def decision_correlation(case_id, token, matched_areas, owners, area_versions):
    matched_areas = sorted(matched_areas)
    owners = sorted(owners)
    version_material = ",".join(f"{area_id}:{area_versions[area_id]}" for area_id in matched_areas)
    material = "|".join([case_id, token, ",".join(matched_areas), version_material, ",".join(owners)])
    return hashlib.sha256(material.encode("utf-8")).hexdigest()[:16]


def validate(payload):
    evidence_source = payload.get("evidence_source")
    evidence_timestamp = payload.get("evidence_timestamp")
    tenancy_context = payload.get("tenancy_context")
    if not evidence_source or not evidence_timestamp or not tenancy_context:
        raise ValueError("fixture evidence context is incomplete")
    if evidence_source != SYNTHETIC_EVIDENCE_SOURCE or tenancy_context != SYNTHETIC_TENANCY_CONTEXT:
        raise ValueError("fixture evidence context must remain synthetic-only")

    franchise_rows = payload.get("franchises", [])
    franchise_ids = [f.get("franchise_id") for f in franchise_rows]
    if any(not fid for fid in franchise_ids) or len(franchise_ids) != len(set(franchise_ids)):
        raise ValueError("duplicate or missing franchise_id")
    franchises = {f["franchise_id"]: f for f in franchise_rows}

    token_map = defaultdict(list)
    area_map = defaultdict(list)
    area_versions = {}
    seen_area_ids = set()

    for area in payload.get("delivery_areas", []):
        if area.get("status") != "ACTIVE":
            continue
        fid = area.get("franchise_id")
        if fid not in franchises:
            raise ValueError(f"unknown franchise for area {area.get('area_id')}: {fid}")
        area_id = area.get("area_id")
        if not area_id or area_id in seen_area_ids:
            raise ValueError(f"duplicate or missing active area_id: {area_id}")
        seen_area_ids.add(area_id)
        version = area.get("version")
        if not isinstance(version, int) or version < 1:
            raise ValueError(f"invalid area version for {area_id}")
        tokens = area.get("postcode_tokens", [])
        if not isinstance(tokens, list) or not tokens or any(not isinstance(token, str) or not token.strip() for token in tokens):
            raise ValueError(f"missing or empty postcode token for {area_id}")
        area_versions[area_id] = version
        for token in dict.fromkeys(tokens):
            token_map[token].append(fid)
            area_map[token].append(area_id)

    overlap = {token: owners for token, owners in token_map.items() if len(set(owners)) > 1}
    if overlap:
        raise ValueError(f"ambiguous active delivery-area overlap: {overlap}")

    routing_cases = payload.get("routing_cases", [])
    case_ids = [case.get("case_id") for case in routing_cases]
    if any(not cid for cid in case_ids) or len(case_ids) != len(set(case_ids)):
        raise ValueError("duplicate or missing routing case_id")

    results = []
    for case in routing_cases:
        token = case.get("postcode_token")
        if not isinstance(token, str) or not token.strip():
            raise ValueError(f"case {case['case_id']} missing postcode_token")
        owners = sorted(set(token_map.get(token, [])))
        matched_areas = sorted(set(area_map.get(token, [])))
        if not owners:
            actual = "NO_SERVICE"
            reason = "NO_ACTIVE_DELIVERY_AREA"
            selected_franchise = None
        elif len(owners) != 1:
            actual = "AMBIGUOUS_DENY"
            reason = "MULTIPLE_ACTIVE_FRANCHISE_OWNERS"
            selected_franchise = None
        else:
            fid = owners[0]
            if franchises[fid].get("status") != "ACTIVE":
                actual = "DENY_INACTIVE_FRANCHISE"
                reason = "MATCHED_FRANCHISE_INACTIVE"
                selected_franchise = None
            else:
                actual = fid
                reason = "SINGLE_ACTIVE_AREA_MATCH"
                selected_franchise = fid
        expected = case["expected"]
        if actual != expected:
            raise ValueError(f"case {case['case_id']} expected {expected} got {actual}")
        results.append({
            "case_id": case["case_id"],
            "postcode_token": token,
            "matched_area_ids": matched_areas,
            "matched_area_versions": {area_id: area_versions[area_id] for area_id in matched_areas},
            "candidate_franchise_ids": owners,
            "selected_franchise_id": selected_franchise,
            "actual": actual,
            "reason": reason,
            "correlation_id": decision_correlation(case["case_id"], token, matched_areas, owners, area_versions),
            "evidence_source": evidence_source,
            "evidence_timestamp": evidence_timestamp,
            "tenancy_context": tenancy_context,
        })

    return {"status": "PASS", "cases": results, "overlap_count": 0}


def main(path):
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)
    print(json.dumps(validate(payload), indent=2))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: validate_territory_fixture.py <fixture.json>")
    main(sys.argv[1])
