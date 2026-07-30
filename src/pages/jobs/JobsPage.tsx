import { BriefcaseBusiness } from 'lucide-react'

function JobsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">Internship jobs</h2>
      <p className="mt-2 text-slate-600">Create and manage internship vacancies on behalf of QSTP startups.</p>
      <div className="mt-7 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <BriefcaseBusiness className="size-7 text-teal-700" strokeWidth={1.8} />
        <h3 className="mt-5 text-lg font-semibold text-slate-900">Jobs module coming next</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Vacancy creation, publishing controls, and job management tools will be built here in the next phase.</p>
      </div>
    </section>
  )
}

export default JobsPage
