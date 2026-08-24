/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NextStepPanel, SettingsDisclosure } from "../client/src/components/PlainLanguageGuide";
import { SaveMonthlyRecordButton } from "../client/src/components/SaveMonthlyRecordButton";

afterEach(cleanup);

describe("plain-language franchisee guidance", () => {
  it("shows one clear first action when a record has not been saved", () => {
    render(<NextStepPanel />);
    expect(screen.getByText("What to do next")).toBeTruthy();
    expect(screen.getByText(/Save and see my results/)).toBeTruthy();
  });

  it("uses understandable words for review state", () => {
    render(<NextStepPanel reviewStatus="approved" />);
    expect(screen.getByText("Checked and ready")).toBeTruthy();
  });

  it("keeps cost settings out of the way until the user asks for them", async () => {
    const user = userEvent.setup();
    render(<SettingsDisclosure><p>Extra settings</p></SettingsDisclosure>);
    expect(screen.queryByText("Extra settings")).toBeNull();
    await user.click(screen.getByRole("button", { name: /Change cost and pay settings/ }));
    expect(screen.getByText("Extra settings")).toBeTruthy();
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toBe("true");
  });

  it("requires the quick check before allowing the monthly record to be saved", async () => {
    const user = userEvent.setup();
    const save = vi.fn();
    const view = render(<SaveMonthlyRecordButton confirmed={false} pending={false} onSave={save} />);
    const button = screen.getByRole("button", { name: /Save and see my results/ });
    expect(button.hasAttribute("disabled")).toBe(true);
    await user.click(button);
    expect(save).not.toHaveBeenCalled();

    view.rerender(<SaveMonthlyRecordButton confirmed pending={false} onSave={save} />);
    expect(button.hasAttribute("disabled")).toBe(false);
    await user.click(button);
    expect(save).toHaveBeenCalledTimes(1);
  });
});
