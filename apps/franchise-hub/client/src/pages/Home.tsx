import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { getPlainReviewStatus } from "@shared/franchiseExperience";
import { NextStepPanel, SettingsDisclosure } from "@/components/PlainLanguageGuide";
import { SaveMonthlyRecordButton } from "@/components/SaveMonthlyRecordButton";
import { toast } from "sonner";
import {
  ArrowUpRight,
  BrainCircuit,
  Calculator,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Loader2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

type MonthlyForm = {
  monthKey: string;
  operatingTarget: number;
  wageBenchmark: number;
  availabilityHours: number;
  actualWorkHours: number;
  completedBaskets: number;
  customerSales: number;
  productCostPct: number;
  deliveryCostPerBasket: number;
  paymentCostPct: number;
  royaltyPct: number;
  attestationConfirmed: boolean;
};

const targets = [20, 40, 60, 80, 100, 150, 165];
const currentMonthKey = new Date().toISOString().slice(0, 7);
const defaultForm = (monthKey: string): MonthlyForm => ({
  monthKey,
  operatingTarget: 80,
  wageBenchmark: 25,
  availabilityHours: 0,
  actualWorkHours: 0,
  completedBaskets: 0,
  customerSales: 0,
  productCostPct: 60,
  deliveryCostPerBasket: 4,
  paymentCostPct: 2,
  royaltyPct: 3,
  attestationConfirmed: false,
});
const money = (value: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(value);
const number = (value: number, digits = 1) => new Intl.NumberFormat("en-AU", { maximumFractionDigits: digits }).format(value);

function MetricCard({ label, value, note, accent = false }: { label: string; value: string; note: string; accent?: boolean }) {
  return <div className={`rounded-2xl border p-4 shadow-sm ${accent ? "border-[#9ed8bd] bg-[#e7f6ed]" : "border-[#e5e3dc] bg-[#fbfbf9]"}`}>
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#607069]">{label}</p>
    <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#15372e]">{value}</p>
    <p className="mt-1 text-xs text-[#6c7973]">{note}</p>
  </div>;
}

function NumberField({ label, value, onChange, step = "0.5", min = 0, max, suffix }: { label: string; value: number; onChange: (value: number) => void; step?: string; min?: number; max?: number; suffix?: string }) {
  return <label className="grid gap-1.5 text-sm font-medium text-[#34463e]">
    <span>{label}{suffix ? <span className="ml-1 text-xs font-normal text-muted-foreground">({suffix})</span> : null}</span>
    <Input type="number" value={value} min={min} max={max} step={step} onChange={event => {
      const parsed = Number(event.target.value);
      const safe = Number.isFinite(parsed) ? Math.max(min, max === undefined ? parsed : Math.min(max, parsed)) : 0;
      onChange(safe);
    }} className="h-10 border-[#dfe6df] bg-white shadow-none focus-visible:ring-[#20815f]" />
  </label>;
}

function HomeContent() {
  const [monthKey, setMonthKey] = useState(currentMonthKey);
  const [form, setForm] = useState<MonthlyForm>(() => defaultForm(currentMonthKey));
  const utils = trpc.useUtils();
  const snapshotQuery = trpc.franchiseHub.snapshot.useQuery(monthKey);
  const revisionQuery = trpc.franchiseHub.revisionHistory.useQuery(monthKey, { enabled: Boolean(snapshotQuery.data) });
  const saveMutation = trpc.franchiseHub.saveMonthlyRecord.useMutation({
    onSuccess: async () => {
      await utils.franchiseHub.snapshot.invalidate(monthKey);
      toast.success("Monthly figures saved", { description: "KPIs, projections, and deterministic coaching were recalculated on the server." });
    },
    onError: error => toast.error("Unable to save monthly figures", { description: error.message }),
  });
  const coachingMutation = trpc.franchiseHub.generateCoaching.useMutation({
    onError: error => toast.error("Unable to generate coaching", { description: error.message }),
  });
  const snapshot = snapshotQuery.data;

  useEffect(() => {
    if (snapshot) {
      setForm({
        monthKey: snapshot.monthKey,
        operatingTarget: snapshot.profile.operatingTarget,
        wageBenchmark: snapshot.profile.wageBenchmark,
        availabilityHours: snapshot.record.availabilityHours,
        actualWorkHours: snapshot.record.actualWorkHours,
        completedBaskets: snapshot.record.completedBaskets,
        customerSales: snapshot.record.customerSales,
        productCostPct: snapshot.record.productCostPct,
        deliveryCostPerBasket: snapshot.record.deliveryCostPerBasket,
        paymentCostPct: snapshot.record.paymentCostPct,
        royaltyPct: snapshot.record.royaltyPct,
        attestationConfirmed: snapshot.record.attestationConfirmed,
      });
    } else if (!snapshotQuery.isLoading) {
      setForm(defaultForm(monthKey));
    }
  }, [monthKey, snapshot, snapshotQuery.isLoading]);

  const update = <K extends keyof MonthlyForm>(key: K, value: MonthlyForm[K]) => setForm(current => ({
    ...current,
    [key]: value,
    ...(key === "attestationConfirmed" ? {} : { attestationConfirmed: false }),
  }));
  const performance = snapshot?.performance;
  const deterministic = snapshot?.deterministicCoaching;
  const generatedCoaching = coachingMutation.data;
  const reviewCopy = snapshot ? getPlainReviewStatus(snapshot.record.reviewStatus) : null;

  return <div className="min-h-full bg-[#f5f4ef] text-[#15372e]">
    <div className="mx-auto max-w-7xl space-y-6 p-1 md:p-5">
      <section className="overflow-hidden rounded-[28px] border border-[#e2e4dc] bg-[#fffefa] shadow-[0_16px_45px_rgba(20,53,43,0.07)]">
        <div className="grid gap-6 px-6 py-7 md:grid-cols-[1.35fr_.65fr] md:px-9 md:py-9">
          <div>
            <Badge className="border-0 bg-[#e4f4eb] px-3 py-1 text-xs font-semibold text-[#176246] hover:bg-[#e4f4eb]">YOUR MONTH AT A GLANCE</Badge>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-[#15372e] md:text-5xl">Make each hour count.</h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#5d6e66]">Three simple steps: add this month&apos;s numbers, see how you&apos;re tracking, then use a few practical ideas to make the next month easier.</p>
          </div>
          <div className="self-end rounded-2xl border border-[#d7e8dc] bg-[#f2f9f4] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#176246]"><ShieldCheck className="h-4 w-4" /> Your numbers stay safe</div>
            <p className="mt-2 text-sm leading-6 text-[#52685d]">Once you save, we do the maths for you. Your results are based on the numbers you entered, and tips never change them.</p>
          </div>
        </div>
      </section>

      <NextStepPanel reviewStatus={snapshot?.record.reviewStatus} />

      <section className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="space-y-6">
          <div className="rounded-[24px] border border-[#e2e4dc] bg-white p-5 shadow-[0_10px_32px_rgba(20,53,43,0.05)] md:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-[#207d5c]" /><h2 className="text-xl font-semibold tracking-[-0.04em]">This month: your results</h2></div>
                <p className="mt-1 text-sm text-muted-foreground">Your results appear here after you save your numbers.</p>
              </div>
              <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#63716a]">Reporting month<Input type="month" value={monthKey} onChange={event => setMonthKey(event.target.value)} className="h-9 w-[150px] border-[#dfe6df] bg-white text-sm font-normal tracking-normal text-[#15372e]" /></label>
            </div>
            {snapshotQuery.isLoading ? <div className="flex h-56 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-[#207d5c]" /></div> : snapshotQuery.error ? <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">We could not load this month yet. Please try again.</div> : !performance ? <div className="mt-6 rounded-2xl border border-dashed border-[#b8cfc0] bg-[#f8fbf8] p-6 text-sm leading-6 text-[#51665b]"><strong className="block text-[#15372e]">Start with this month&apos;s numbers.</strong> Use the short form below, then choose <strong>Save and see my results</strong>.</div> : <>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard label="Money taken from customers" value={money(performance.sales)} note="Sales you recorded this month" />
                <MetricCard label="Money left after costs" value={money(performance.operatingContribution)} note="After the listed costs and royalty" />
                <MetricCard label="Your Earned Hours" value={`${number(performance.earnedHours)} hrs`} note={`Using your ${money(performance.wageBenchmark)}/hr guide`} accent />
                <MetricCard label="How efficiently time was used" value={`${performance.productivity.toFixed(2)}×`} note="Earned Hours compared with time worked" />
              </div>
              <div className="mt-6 rounded-2xl bg-[#f5f8f5] p-5">
                <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold">Progress towards your hours goal</p><p className="mt-1 text-sm text-[#63716a]"><span className="font-semibold text-[#15372e]">{number(performance.actualWorkHours)} of {number(performance.operatingTarget)} hours</span> recorded this month</p></div><Badge variant="outline" className="border-[#a6cfb6] bg-white text-[#176246]">{Math.round(performance.targetProgressPct)}% of goal</Badge></div>
                <Progress value={performance.targetProgressBarPct} className="mt-4 h-2.5 bg-[#dce8df] [&>div]:bg-[#207d5c]" />
                <p className="mt-3 text-xs text-[#68776f]">{performance.remainingTargetHours > 0 ? `${number(performance.remainingTargetHours)} hours remain to reach the goal you chose.` : "You have reached the hours goal you chose."}</p>
              </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d9e8df] bg-[#fbfefc] px-4 py-3 text-xs text-[#5b6f64]">
                  <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#207d5c]" /><span><strong className="text-[#1b4637]">Your monthly check</strong> · {reviewCopy?.message}</span></div>
                  <div className="flex items-center gap-3"><span>{snapshot.audit.revisionCount} {snapshot.audit.revisionCount === 1 ? "saved change" : "saved changes"}</span><Badge className={snapshot.record.reviewStatus === "approved" ? "bg-[#e4f4eb] text-[#176246] hover:bg-[#e4f4eb]" : snapshot.record.reviewStatus === "needs-correction" ? "bg-[#fff3db] text-[#80551a] hover:bg-[#fff3db]" : "bg-[#edf1ee] text-[#566860] hover:bg-[#edf1ee]"}>{reviewCopy?.label}</Badge></div>
                </div>
                {snapshot.record.reviewerNote ? <p className="mt-3 rounded-xl border border-[#eadfc6] bg-[#fffaf1] px-4 py-3 text-xs leading-5 text-[#6b5a3c]"><strong className="text-[#5a421c]">Franchisor note:</strong> {snapshot.record.reviewerNote}</p> : null}
            </>}
          </div>

          <div className="rounded-[24px] border border-[#e2e4dc] bg-white p-5 shadow-[0_10px_32px_rgba(20,53,43,0.05)] md:p-6">
            <div className="flex items-center gap-2"><Calculator className="h-5 w-5 text-[#207d5c]" /><h2 className="text-xl font-semibold tracking-[-0.04em]">Where the money went</h2></div>
            <p className="mt-1 text-sm text-muted-foreground">A simple breakdown of sales, the costs you listed, and what remained.</p>
            {performance ? <div className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {[['Average basket', money(performance.averageBasket)], ['Baskets per actual work hour', number(performance.basketsPerHour)], ['Product cost', `− ${money(performance.productCost)}`], ['Delivery cost', `− ${money(performance.deliveryCost)}`], ['Payment costs', `− ${money(performance.paymentCost)}`], ['Franchisor royalty', `− ${money(performance.royalty)}`]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-[#edf0ec] py-2"><span className="text-[#66766e]">{label}</span><span className="font-semibold text-[#1d3c32]">{value}</span></div>)}
              <div className="sm:col-span-2 mt-1 flex items-center justify-between rounded-xl bg-[#e8f5ed] px-4 py-3"><span className="font-semibold text-[#1b513c]">Operating contribution</span><span className="text-lg font-semibold tracking-[-0.04em] text-[#176246]">{money(performance.operatingContribution)}</span></div>
            </div> : <p className="mt-5 text-sm text-muted-foreground">Save a monthly record to show the contribution breakdown.</p>}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[24px] border border-[#d9e5db] bg-[#1b493b] p-5 text-white shadow-[0_14px_36px_rgba(20,53,43,0.16)] md:p-6">
            <div className="flex items-center gap-2 text-[#c7ead5]"><Sparkles className="h-5 w-5" /><h2 className="font-semibold">Helpful ideas</h2></div>
            <p className="mt-3 text-sm leading-6 text-[#e5f4e9]">{generatedCoaching?.headline ?? deterministic?.headline ?? "Save current-month results to unlock guidance grounded in the operating record."}</p>
            <div className="mt-4 space-y-3">{(generatedCoaching?.recommendations ?? deterministic?.actions ?? []).slice(0, 3).map(action => <div className="flex gap-2 text-sm leading-5 text-[#e9f5ec]" key={action}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9bdbb7]" />{action}</div>)}</div>
            <Button onClick={() => coachingMutation.mutate(monthKey)} disabled={!snapshot || coachingMutation.isPending} className="mt-6 w-full bg-[#e8f5ed] text-[#174737] hover:bg-white">{coachingMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Getting ideas</> : <><BrainCircuit className="mr-2 h-4 w-4" />Show me helpful ideas</>}</Button>
            <p className="mt-3 text-xs leading-5 text-[#c7dfcf]">{generatedCoaching?.disclaimer ?? "Recommendations are operational planning guidance only. They are not financial, tax, legal, pension, government-payment, or eligibility advice."}</p>
          </section>
          <section className="rounded-[24px] border border-[#e2e4dc] bg-white p-5 shadow-[0_10px_32px_rgba(20,53,43,0.05)] md:p-6">
            <div className="flex items-center gap-2"><ArrowUpRight className="h-5 w-5 text-[#bb7a33]" /><h2 className="text-xl font-semibold tracking-[-0.04em]">If you work your chosen hours</h2></div>
            {performance ? <div className="mt-5 grid gap-3"><MetricCard label="Projected baskets" value={number(performance.projectedBaskets, 0)} note={`At ${number(performance.operatingTarget)} planned work hours`} /><MetricCard label="Projected sales" value={money(performance.projectedSales)} note="Current basket rate applied to target" /><MetricCard label="Projected Earned Hours" value={`${number(performance.projectedEarnedHours)} hrs`} note="Current contribution rate applied to target" accent /></div> : <p className="mt-4 text-sm leading-6 text-muted-foreground">This scenario will appear after a verified monthly record is saved.</p>}
            <p className="mt-4 text-xs leading-5 text-[#7b6e59]">Planning scenario only. It extends the saved month’s current operating rates and is not a forecast, income promise, or financial recommendation.</p>
          </section>
        </aside>
      </section>

      <section className="rounded-[24px] border border-[#e2e4dc] bg-white p-5 shadow-[0_10px_32px_rgba(20,53,43,0.05)] md:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-[#207d5c]" /><h2 className="text-xl font-semibold tracking-[-0.04em]">Step 1: add this month&apos;s numbers</h2></div><p className="mt-1 text-sm text-muted-foreground">Start with the four numbers you know. The extra settings are there only if they need changing.</p></div><SaveMonthlyRecordButton confirmed={form.attestationConfirmed} pending={saveMutation.isPending} onSave={() => saveMutation.mutate({ ...form, monthKey, attestationConfirmed: true })} /></div>
        <div className="mt-6 rounded-2xl bg-[#f5f8f5] p-4"><p className="text-sm font-semibold">How many hours would you like to work this month?</p><p className="mt-1 text-xs text-[#66776e]">Pick the option that feels right. You can change it later.</p><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">{targets.map(target => <button type="button" key={target} onClick={() => update("operatingTarget", target)} className={`rounded-xl border px-3 py-3 text-left transition-colors ${form.operatingTarget === target ? "border-[#20815f] bg-[#e4f4eb] text-[#15553d]" : "border-[#dce6df] bg-white text-[#506159] hover:border-[#a5c8b3]"}`} aria-pressed={form.operatingTarget === target}><span className="block text-sm font-semibold">{target === 165 ? "Full-time" : `${target} hrs`}</span><span className="mt-0.5 block text-xs opacity-75">{Math.round(target / 4.33)} hrs/week</span></button>)}</div></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumberField label="Hours you were available" suffix="hours" value={form.availabilityHours} onChange={value => update("availabilityHours", value)} />
          <NumberField label="Hours you actually worked" suffix="hours" value={form.actualWorkHours} onChange={value => update("actualWorkHours", value)} />
          <NumberField label="Orders completed" value={form.completedBaskets} step="1" onChange={value => update("completedBaskets", Math.round(value))} />
          <NumberField label="Money customers paid" suffix="AUD" value={form.customerSales} onChange={value => update("customerSales", value)} />
        </div>
        <SettingsDisclosure><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><NumberField label="Product cost" suffix="%" value={form.productCostPct} max={100} onChange={value => update("productCostPct", value)} /><NumberField label="Delivery cost per order" suffix="AUD" value={form.deliveryCostPerBasket} onChange={value => update("deliveryCostPerBasket", value)} /><NumberField label="Payment cost" suffix="%" value={form.paymentCostPct} max={100} onChange={value => update("paymentCostPct", value)} /><NumberField label="Franchisor royalty" suffix="%" value={form.royaltyPct} max={100} onChange={value => update("royaltyPct", value)} /><NumberField label="Your hourly guide" suffix="AUD / hr" min={0.01} value={form.wageBenchmark} onChange={value => update("wageBenchmark", value)} /></div></SettingsDisclosure>
        <label className="mt-6 flex cursor-pointer gap-3 rounded-2xl border border-[#d9e5db] bg-[#f7fbf8] p-4 text-sm leading-6 text-[#43584e]">
          <input type="checkbox" checked={form.attestationConfirmed} onChange={event => update("attestationConfirmed", event.target.checked)} className="mt-1 h-4 w-4 rounded border-[#9bb5a6] text-[#1b6e51] focus:ring-[#20815f]" />
          <span><strong className="text-[#1b4637]">One quick check before saving.</strong> I have looked over these numbers and they are right to the best of my knowledge.</span>
        </label>
        {snapshot ? <div className="mt-4 rounded-2xl border border-[#e3e8e3] bg-[#fbfcfa] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-sm font-semibold text-[#1b4637]">Previous saves</p><p className="mt-1 text-xs text-[#66776e]">We keep a short list so you can see when this month&apos;s numbers were last changed.</p></div><Badge variant="outline" className="border-[#cfe0d5] bg-white text-[#35654f]">{snapshot.audit.revisionCount} saved</Badge></div>
          {revisionQuery.isLoading ? <div className="mt-3 flex items-center gap-2 text-xs text-[#66776e]"><Loader2 className="h-3.5 w-3.5 animate-spin" />Loading revisions</div> : <div className="mt-3 grid gap-2">{(revisionQuery.data ?? []).map(revision => <div key={revision.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs"><span className="font-medium capitalize text-[#315743]">{revision.action}</span><span className="text-[#738179]">{new Date(revision.createdAt).toLocaleString()}</span></div>)}</div>}
        </div> : null}
      </section>

      <section className="grid gap-4 rounded-[24px] border border-[#eadfc6] bg-[#fffaf1] p-5 text-sm leading-6 text-[#6b5a3c] md:grid-cols-3 md:p-6">
        <div className="flex gap-3"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#a66b21]" /><p><strong className="text-[#5a421c]">Government payments.</strong> This dashboard does not determine Centrelink, pension, benefit, tax, or other eligibility. Check your individual circumstances and current official guidance.</p></div>
        <div className="flex gap-3"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#a66b21]" /><p><strong className="text-[#5a421c]">Financial projections.</strong> Scenarios extend current saved rates only. They are not financial forecasts, income promises, or recommendations to act.</p></div>
        <div className="flex gap-3"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#a66b21]" /><p><strong className="text-[#5a421c]">Business planning.</strong> Earned Hours are an internal operating measure based on selected assumptions, not a statement of wages, profitability, or entitlement.</p></div>
      </section>
    </div>
  </div>;
}

export default function Home() {
  return <DashboardLayout><HomeContent /></DashboardLayout>;
}
