import { BriefcaseBusiness, CircleCheck, CircleStop, FilePenLine, type LucideIcon } from 'lucide-react'

interface SummaryItem {
  label: string
  value: number
  icon: LucideIcon
  iconClassName: string
}

const summaryItems: SummaryItem[] = [
  { label: 'All jobs', value: 12, icon: BriefcaseBusiness, iconClassName: 'bg-teal-50 text-teal-700' },
  { label: 'Active', value: 8, icon: CircleCheck, iconClassName: 'bg-emerald-50 text-emerald-700' },
  { label: 'Drafts', value: 3, icon: FilePenLine, iconClassName: 'bg-amber-50 text-amber-700' },
  { label: 'Closed', value: 1, icon: CircleStop, iconClassName: 'bg-slate-100 text-slate-600' },
]

function JobsSummary() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map(({ label, value, icon: Icon, iconClassName }) => (
        <article key={label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          </div>
          <span className={`grid size-10 place-items-center rounded-lg ${iconClassName}`}><Icon aria-hidden="true" className="size-5" strokeWidth={1.8} /></span>
        </article>
      ))}
    </div>
  )
}

export default JobsSummary
