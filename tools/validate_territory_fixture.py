#!/usr/bin/env python3
import hashlib
import json
import sys
from collections import defaultdict


def decision_correlation(case_id, token, matched_areas, owners):
    material = "|".join([case_id, token, ",".join(matched_areas), ",".join(owners)])
    return hashlib.sha256(material.encode("utf-8")).hexdigest()[:16]


def validate(payload):
    evidence_source = payload.get("evidence_source")
    evidence_timestamp = payload.get("evidence_timestamp")
    tenancy_context = payload.get("tenancy_context")
    if not evidence_source or not evidence_timestamp or not tenancy_context:
        raise ValueError("fixture evidence context is incomplete")

    franchises = {f["franchise_id"]: f for f in payload.get("franchises", [])}
    token_map = defaultdict(list)
    area_map = defaultdict(list)
    area_versions = {}

    for area in payload.get("delivery_areas", []):
        if area.get("status") != "ACTIVE":
            continue
        fid = area.get("franchise_id")
        if fid not in franchises:
            raise ValueError(f"unknown franchise for area {area.get('area_id')}: {fid}")
        area_id = area.get("area_id")
        version = area.get("version")
        if not isinstance(version, int) or version < 1:
            raise ValueError(f"invalid area version for {area_id}")
        area_versions[area_id] = version
        for token in area.get("postcode_tokens", []):
            token_map[token].append(fid)
            area_map[token].append(area_id)

    overlap = {token: owners for token, owners in token_map.items() if len(set(owners)) > 1}
    if overlap:
        raise ValueError(f"ambiguous active delivery-area overlap: {overlap}")

    results = []
    for case in payload.get("routing_cases", []):
        token = case["postcode_token"]
        owners = list(dict.fromkeys(token_map.get(token, [])))
        matched_areas = list(dict.fromkeys(area_map.get(token, [])))
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
            "correlation_id": decision_correlation(case["case_id"], token, matched_areas, owners),
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
