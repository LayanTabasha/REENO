import { LayoutDashboard } from 'lucide-react'

function DashboardPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">Hiring overview</h2>
      <p className="mt-2 text-slate-600">Track the progress of QSTP internship hiring from one central workspace.</p>
      <div className="mt-7 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <LayoutDashboard className="size-7 text-teal-700" strokeWidth={1.8} />
        <h3 className="mt-5 text-lg font-semibold text-slate-900">Dashboard module coming next</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Hiring metrics, vacancy updates, and recent recruiting activity will be added here in the next phase.</p>
      </div>
    </section>
  )
}

export default DashboardPage
