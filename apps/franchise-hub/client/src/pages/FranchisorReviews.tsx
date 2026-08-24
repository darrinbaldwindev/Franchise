import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, ClipboardCheck, Loader2, RotateCcw, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const money = (value: string | number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(Number(value));
const hours = (value: string | number) => new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 }).format(Number(value));

function FranchisorReviewsContent() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Record<number, string>>({});
  const queueQuery = trpc.franchisorReviews.queue.useQuery(undefined, { enabled: user?.role === "admin" });
  const utils = trpc.useUtils();
  const decisionMutation = trpc.franchisorReviews.decide.useMutation({
    onSuccess: async (_, input) => {
      await utils.franchisorReviews.queue.invalidate();
      setNotes(current => ({ ...current, [input.monthlyRecordId]: "" }));
      toast.success(input.decision === "approved" ? "Record approved" : "Record returned for correction");
    },
    onError: error => toast.error("Review action unavailable", { description: error.message }),
  });

  if (user?.role !== "admin") {
    return <div className="mx-auto max-w-xl rounded-[24px] border border-[#eadfc6] bg-[#fffaf1] p-7 text-[#6b5a3c]"><div className="flex gap-3"><ShieldAlert className="h-5 w-5 shrink-0 text-[#a66b21]" /><div><h1 className="text-lg font-semibold text-[#5a421c]">Franchisor access required</h1><p className="mt-2 text-sm leading-6">Monthly record review is restricted to authorised franchisor administrators. Franchisees can see only the review status on their own saved records.</p></div></div></div>;
  }

  return <div className="min-h-full bg-[#f5f4ef] text-[#15372e]"><div className="mx-auto max-w-6xl space-y-6 p-1 md:p-5">
    <section className="rounded-[28px] border border-[#e2e4dc] bg-[#fffefa] px-6 py-7 shadow-[0_16px_45px_rgba(20,53,43,0.07)] md:px-9">
      <Badge className="border-0 bg-[#e4f4eb] px-3 py-1 text-xs font-semibold text-[#176246] hover:bg-[#e4f4eb]">FRANCHISOR CONTROL</Badge>
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-4xl font-semibold tracking-[-0.06em]">Monthly record review</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#5d6e66]">Review franchisee-attested records without changing the recorded calculation inputs. Decisions and reviewer notes are retained as auditable events.</p></div><Badge variant="outline" className="h-fit border-[#b9d7c4] bg-[#f4fbf6] text-[#1d654a]">{queueQuery.data?.length ?? 0} awaiting review</Badge></div>
    </section>
    {queueQuery.isLoading ? <div className="flex h-64 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-[#207d5c]" /></div> : queueQuery.error ? <div className="rounded-2xl bg-red-50 p-5 text-sm text-red-700">Unable to load the review queue: {queueQuery.error.message}</div> : queueQuery.data?.length === 0 ? <div className="rounded-[24px] border border-dashed border-[#b8cfc0] bg-[#fbfefc] p-8 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-[#207d5c]" /><h2 className="mt-3 text-lg font-semibold">No records awaiting review</h2><p className="mt-2 text-sm text-[#607069]">New or revised franchisee-attested monthly records will appear here.</p></div> : <div className="grid gap-5">{queueQuery.data?.map(record => <section key={record.monthlyRecordId} className="rounded-[24px] border border-[#e2e4dc] bg-white p-5 shadow-[0_10px_32px_rgba(20,53,43,0.05)] md:p-6"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-start"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold tracking-[-0.04em]">{record.franchiseeName || record.franchiseeEmail || `Franchisee ${record.franchiseeUserId}`}</h2><Badge variant="outline" className="border-[#cfe0d5] bg-[#f7fbf8] text-[#35654f]">{record.monthKey}</Badge></div><p className="mt-1 text-sm text-[#66776e]">Attested {record.attestedAt ? new Date(record.attestedAt).toLocaleString() : "on save"} · Last changed {new Date(record.updatedAt).toLocaleString()}</p></div><Badge className="h-fit bg-[#fff3db] text-[#80551a] hover:bg-[#fff3db]">Awaiting review</Badge></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-[#f5f8f5] p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#64736c]">Customer sales</p><p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{money(record.customerSales)}</p></div><div className="rounded-xl bg-[#f5f8f5] p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#64736c]">Actual work</p><p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{hours(record.actualWorkHours)} hrs</p></div></div><Textarea value={notes[record.monthlyRecordId] ?? ""} onChange={event => setNotes(current => ({ ...current, [record.monthlyRecordId]: event.target.value }))} placeholder="Optional approval note, or required explanation when returning for correction" className="mt-5 min-h-24 border-[#dce6df] bg-[#fbfcfa] focus-visible:ring-[#20815f]" /><div className="mt-4 flex flex-wrap gap-3"><Button disabled={decisionMutation.isPending} onClick={() => decisionMutation.mutate({ monthlyRecordId: record.monthlyRecordId, decision: "approved", reviewerNote: notes[record.monthlyRecordId] ?? "" })} className="bg-[#1b493b] hover:bg-[#143c30]"><CheckCircle2 className="mr-2 h-4 w-4" />Approve record</Button><Button disabled={decisionMutation.isPending || !(notes[record.monthlyRecordId] ?? "").trim()} onClick={() => decisionMutation.mutate({ monthlyRecordId: record.monthlyRecordId, decision: "needs-correction", reviewerNote: notes[record.monthlyRecordId] ?? "" })} variant="outline" className="border-[#d9bb86] text-[#80551a] hover:bg-[#fff8ea]"><RotateCcw className="mr-2 h-4 w-4" />Return for correction</Button></div></section>)}</div>}
  </div></div>;
}

export default function FranchisorReviews() {
  return <DashboardLayout><FranchisorReviewsContent /></DashboardLayout>;
}
