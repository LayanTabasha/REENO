import { BriefcaseBusiness, Clock3, UserCheck, UsersRound, type LucideIcon } from 'lucide-react'

interface Kpi {
  label: string
  value: number
  supportingText: string
  icon: LucideIcon
}

const kpis: Kpi[] = [
  { label: 'Active jobs', value: 8, supportingText: 'Across 6 QSTP startups', icon: BriefcaseBusiness },
  { label: 'Total applicants', value: 126, supportingText: '12% more than last month', icon: UsersRound },
  { label: 'Shortlisted', value: 24, supportingText: '19% of all applicants', icon: UserCheck },
  { label: 'New this week', value: 18, supportingText: '5 awaiting first review', icon: Clock3 },
]

function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map(({ label, value, supportingText, icon: Icon }) => (
        <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
            </div>
            <span className="grid size-10 place-items-center rounded-lg bg-teal-50 text-teal-700">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </span>
          </div>
          <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">{supportingText}</p>
        </article>
      ))}
    </div>
  )
}

export default KpiCards
