import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function CreateJobPage() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Create a new internship</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">The job creation wizard will be built in the next milestone.</p>
      <Link to="/jobs" className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to jobs
      </Link>
    </section>
  )
}

export default CreateJobPage
