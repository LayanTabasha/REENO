import { ArrowLeft, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ApplicantStatusBadge from '../../components/applicants/ApplicantStatusBadge'
import { applicants } from '../../data/applicants'

function ApplicantProfilePage() {
  const { applicantId } = useParams()
  const applicant = applicants.find((item) => item.id === applicantId)
  if (!applicant) return <section className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"><span className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-slate-500"><UserRound aria-hidden="true" className="size-6" /></span><h2 className="mt-4 text-xl font-bold text-slate-900">Applicant not found</h2><p className="mt-2 text-sm text-slate-500">This applicant record does not exist or is no longer available.</p><Link to="/applicants" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"><ArrowLeft aria-hidden="true" className="size-4" />Back to applicants</Link></section>
  return <section className="space-y-6"><Link to="/applicants" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"><ArrowLeft aria-hidden="true" className="size-4" />Back to applicants</Link><div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Applicant profile</p><h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{applicant.name}</h2><p className="mt-2 text-slate-600">{applicant.jobTitle} · {applicant.startup}</p></div><ApplicantStatusBadge status={applicant.status} /></div><div className="py-10 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-teal-50 text-teal-700"><UserRound aria-hidden="true" className="size-7" /></span><h3 className="mt-4 text-lg font-semibold text-slate-900">Applicant profile</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">The full applicant review workspace will be built in the next milestone.</p></div></div></section>
}

export default ApplicantProfilePage

