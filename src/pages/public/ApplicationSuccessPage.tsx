import { CheckCircle2 } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { findPublicJob } from '../../data/publicJobs'

type SuccessState = { applicantName?: string; reference?: string }
export default function ApplicationSuccessPage() {
  const { jobSlug } = useParams(), job = findPublicJob(jobSlug), state = useLocation().state as SuccessState | null
  if (!job) return <div className="p-12 text-center"><h1 className="text-2xl font-bold">Opportunity not found</h1><Link to="/careers" className="mt-5 inline-block text-sm font-bold text-teal-700">View opportunities</Link></div>
  return <div className="mx-auto max-w-2xl px-5 py-16"><section className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10"><CheckCircle2 className="mx-auto size-14 text-teal-700" /><h1 className="mt-5 text-2xl font-bold">Application submitted successfully</h1><p className="mt-3 text-slate-600">Thank you, <strong>{state?.applicantName || 'applicant'}</strong>. The QSTP Hiring Team will review your application and contact you if your profile is shortlisted.</p><dl className="mt-7 grid gap-4 rounded-xl bg-slate-50 p-5 text-left sm:grid-cols-2"><div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Opportunity</dt><dd className="mt-1 text-sm font-bold">{job.title}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Startup</dt><dd className="mt-1 text-sm font-bold">{job.startup}</dd></div><div className="sm:col-span-2"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Application reference</dt><dd className="mt-1 text-sm font-bold">{state?.reference || 'QSTP-DEMO-2026'}</dd></div></dl><div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/careers" className="rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white">View more opportunities</Link><Link to={`/careers/${job.slug}`} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700">Return to job</Link></div></section></div>
}

