import { Users } from 'lucide-react'

function ApplicantsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">Applicants</h2>
      <p className="mt-2 text-slate-600">Review candidates and follow their progress through the hiring process.</p>
      <div className="mt-7 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Users className="size-7 text-teal-700" strokeWidth={1.8} />
        <h3 className="mt-5 text-lg font-semibold text-slate-900">Applicants module coming next</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Candidate profiles, application stages, and evaluation workflows will be added here in a future milestone.</p>
      </div>
    </section>
  )
}

export default ApplicantsPage
