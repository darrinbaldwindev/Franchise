import { getPlainReviewStatus, type ReviewStatus } from "@shared/franchiseExperience";
import { CheckCircle2, ChevronDown, ChevronUp, CircleAlert, ClipboardCheck } from "lucide-react";
import React, { useState, type ReactNode } from "react";

export function NextStepPanel({ reviewStatus }: { reviewStatus?: ReviewStatus }) {
  if (!reviewStatus) {
    return <section className="rounded-2xl border border-[#cfe2d6] bg-[#edf8f0] p-4 shadow-sm"><div className="flex gap-3"><ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#207d5c]" /><div><p className="font-semibold text-[#1b4637]">What to do next</p><p className="mt-1 text-sm leading-6 text-[#496358]">Start with the four numbers you know below, tick the quick check box, then choose <strong>Save and see my results</strong>.</p></div></div></section>;
  }

  const copy = getPlainReviewStatus(reviewStatus);
  const isCorrection = reviewStatus === "needs-correction";
  return <section className={`rounded-2xl border p-4 shadow-sm ${isCorrection ? "border-[#ead7b0] bg-[#fff9ed]" : "border-[#cfe2d6] bg-[#edf8f0]"}`}><div className="flex gap-3">{isCorrection ? <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#a66b21]" /> : <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#207d5c]" />}<div><p className="font-semibold text-[#1b4637]">{copy.label}</p><p className="mt-1 text-sm leading-6 text-[#496358]">{copy.message}</p></div></div></section>;
}

export function SettingsDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="mt-5 rounded-2xl border border-[#e0e8e1] bg-[#fbfcfa] p-4"><button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-[#1b4637]"><span>Change cost and pay settings</span><span className="inline-flex items-center gap-1 text-xs font-normal text-[#66776e]">{open ? "Hide details" : "Only open if something changed"}{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span></button>{open ? <div className="mt-4 border-t border-[#e7ece7] pt-4">{children}</div> : null}</div>;
}
