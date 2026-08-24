import { describe, expect, it } from "vitest";
import { encodeOAuthState, hasMatchingOAuthNonce, inspectOAuthNonceState } from "../shared/const";

describe("OAuth callback state validation", () => {
  it("accepts only a state nonce that matches the browser nonce", () => {
    const nonce = "browser-bound-nonce";
    const state = encodeOAuthState({
      redirectUri: "https://franchisehub.example/api/oauth/callback",
      nonce,
    });

    expect(hasMatchingOAuthNonce(state, nonce)).toBe(true);
    expect(hasMatchingOAuthNonce(state, "different-browser-nonce")).toBe(false);
    expect(hasMatchingOAuthNonce(state, undefined)).toBe(false);
    expect(inspectOAuthNonceState(state, nonce)).toBe("valid");
    expect(inspectOAuthNonceState(state, "different-browser-nonce")).toBe("mismatched-nonce");
  });

  it("fails closed for malformed or nonce-free state", () => {
    expect(hasMatchingOAuthNonce("not-valid-base64", "browser-bound-nonce")).toBe(false);
    expect(
      hasMatchingOAuthNonce(
        encodeOAuthState({ redirectUri: "https://franchisehub.example/api/oauth/callback" }),
        "browser-bound-nonce"
      )
    ).toBe(false);
    expect(inspectOAuthNonceState("not-valid-base64", "browser-bound-nonce")).toBe("missing-state-nonce");
    expect(inspectOAuthNonceState(encodeOAuthState({ redirectUri: "https://franchisehub.example/api/oauth/callback", nonce: "x" }), undefined)).toBe("missing-browser-cookie");
  });
});
