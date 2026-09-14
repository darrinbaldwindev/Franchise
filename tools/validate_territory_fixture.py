#!/usr/bin/env python3
import json
import sys
from collections import defaultdict


def validate(payload):
    franchises = {f["franchise_id"]: f for f in payload.get("franchises", [])}
    token_map = defaultdict(list)

    for area in payload.get("delivery_areas", []):
        if area.get("status") != "ACTIVE":
            continue
        fid = area.get("franchise_id")
        if fid not in franchises:
            raise ValueError(f"unknown franchise for area {area.get('area_id')}: {fid}")
        for token in area.get("postcode_tokens", []):
            token_map[token].append(fid)

    overlap = {token: owners for token, owners in token_map.items() if len(set(owners)) > 1}
    if overlap:
        raise ValueError(f"ambiguous active delivery-area overlap: {overlap}")

    results = []
    for case in payload.get("routing_cases", []):
        token = case["postcode_token"]
        owners = list(dict.fromkeys(token_map.get(token, [])))
        if not owners:
            actual = "NO_SERVICE"
        elif len(owners) != 1:
            actual = "AMBIGUOUS_DENY"
        else:
            fid = owners[0]
            if franchises[fid].get("status") != "ACTIVE":
                actual = "DENY_INACTIVE_FRANCHISE"
            else:
                actual = fid
        expected = case["expected"]
        if actual != expected:
            raise ValueError(f"case {case['case_id']} expected {expected} got {actual}")
        results.append({"case_id": case["case_id"], "actual": actual})

    return {"status": "PASS", "cases": results, "overlap_count": 0}


def main(path):
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)
    print(json.dumps(validate(payload), indent=2))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: validate_territory_fixture.py <fixture.json>")
    main(sys.argv[1])
