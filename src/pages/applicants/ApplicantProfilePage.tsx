import { ArrowLeft, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ApplicantProfileHeader from '../../components/applicants/ApplicantProfileHeader'
import ApplicantReviewTabs from '../../components/applicants/ApplicantReviewTabs'
import { AIWritingIndicatorCard, ApplicantEvaluationCard, ApplicantQuickActions, CandidateInsightsCard, RecruiterNotesCard } from '../../components/applicants/ApplicantReviewSidebar'
import ApplicantSummaryCard, { SkillsCard } from '../../components/applicants/ApplicantSummaryCard'
import { applicants, type Applicant, type ApplicantStatus } from '../../data/applicants'

function ReviewWorkspace({ applicant }: { applicant: Applicant }) {
  const [status, setStatus] = useState<ApplicantStatus>(applicant.status)
  return <section className="space-y-6">
    <ApplicantProfileHeader applicant={applicant} status={status} onStatusChange={setStatus} />
    <ApplicantSummaryCard applicant={applicant} />
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <main className="min-w-0 space-y-6"><SkillsCard skills={applicant.skills} /><ApplicantReviewTabs applicant={applicant} /></main>
      <aside aria-label="Recruiter decision tools" className="min-w-0 space-y-6"><CandidateInsightsCard insights={applicant.aiInsights} /><AIWritingIndicatorCard indicator={applicant.aiWritingIndicator} /><ApplicantQuickActions status={status} onStatusChange={setStatus} /><ApplicantEvaluationCard initialEvaluation={applicant.evaluation} /><RecruiterNotesCard initialNotes={applicant.recruiterNotes} /></aside>
    </div>
  </section>
}

function ApplicantProfilePage() {
  const { applicantId } = useParams()
  const applicant = applicants.find((item) => item.id === applicantId)
  if (!applicant) return <section className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"><span className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-slate-500"><UserRound aria-hidden="true" className="size-6" /></span><h1 className="mt-4 text-xl font-bold text-slate-900">Applicant not found</h1><p className="mt-2 text-sm text-slate-500">This applicant record does not exist or is no longer available.</p><Link to="/applicants" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"><ArrowLeft aria-hidden="true" className="size-4" />Back to applicants</Link></section>
  return <ReviewWorkspace key={applicant.id} applicant={applicant} />
}

export default ApplicantProfilePage
