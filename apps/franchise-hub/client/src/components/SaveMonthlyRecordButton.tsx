import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import React from "react";

export function SaveMonthlyRecordButton({ confirmed, pending, onSave }: { confirmed: boolean; pending: boolean; onSave: () => void }) {
  return <div className="flex flex-col items-start gap-1.5 sm:items-end"><Button type="button" onClick={onSave} disabled={!confirmed || pending} className="bg-[#1b493b] hover:bg-[#143c30] disabled:cursor-not-allowed disabled:opacity-50">{pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving your numbers</> : <><Save className="mr-2 h-4 w-4" />Save and see my results</>}</Button><p className="text-xs text-[#66776e]" aria-live="polite">{confirmed ? "Ready to save." : "Tick the quick check below to save."}</p></div>;
}
