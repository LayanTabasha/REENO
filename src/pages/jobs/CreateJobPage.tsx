import { ArrowLeft, CheckCircle2, Copy, ExternalLink } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AiDescriptionModal from '../../components/jobs/create/AiDescriptionModal'
import ApplicationFormStep from '../../components/jobs/create/ApplicationFormStep'
import JobDetailsStep from '../../components/jobs/create/JobDetailsStep'
import QuestionSuggestions, { type SuggestedQuestion } from '../../components/jobs/create/QuestionSuggestions'
import ReviewStep from '../../components/jobs/create/ReviewStep'
import StepIndicator from '../../components/jobs/create/StepIndicator'
import type { ApplicantField, JobDetails, ScreeningQuestion } from '../../components/jobs/create/types'
import { createJob, getJobById, getStartups, updateJob } from '../../services/jobsService'
import type { JobStatus, Startup } from '../../types/database'

const initialDetails: JobDetails = { startup: '', title: '', department: '', location: '', employmentType: 'Internship', workArrangement: 'On-site', deadline: '', openings: 1, description: '', qualifications: '', requirements: '' }
const labels = ['Full name', 'Email address', 'Phone number', 'Nationality', 'Country of residence', 'University', 'Degree or major', 'Graduation year', 'GPA', 'LinkedIn profile', 'Portfolio or GitHub', 'Resume', 'Cover letter']
const initialFields: ApplicantField[] = labels.map((label) => { const locked = ['Full name', 'Email address', 'Resume'].includes(label); return { id: label.toLowerCase().replaceAll(' ', '-'), label, enabled: locked || label !== 'Cover letter', required: locked, locked } })

function CreateJobPage() {
  const navigate = useNavigate()
  const { jobId } = useParams()
  const editing = Boolean(jobId)
  const [step, setStep] = useState(1), [details, setDetails] = useState(initialDetails), [fields, setFields] = useState(initialFields), [questions, setQuestions] = useState<ScreeningQuestion[]>([])
  const [errors, setErrors] = useState<Partial<Record<keyof JobDetails, string>>>({}), [aiOpen, setAiOpen] = useState(false), [aiVersion, setAiVersion] = useState(0), [suggestionsOpen, setSuggestionsOpen] = useState(false), [suggestionVersion, setSuggestionVersion] = useState(0), [published, setPublished] = useState(false), [notice, setNotice] = useState(''), [linkCopied, setLinkCopied] = useState(false)
  const [startups, setStartups] = useState<Startup[]>([]), [startupsLoading, setStartupsLoading] = useState(true), [submitting, setSubmitting] = useState(false)
  const [jobLoading, setJobLoading] = useState(editing), [jobNotFound, setJobNotFound] = useState(false), [jobLoadError, setJobLoadError] = useState(''), [currentStatus, setCurrentStatus] = useState<JobStatus>('draft')
  const publicUrl = 'https://careers.reeno.qa/jobs/' + (details.title || 'internship').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-qstp'
  const suggestions = useMemo<SuggestedQuestion[]>(() => {
    const role = details.title || 'this internship'; const variants = suggestionVersion % 2
    return [
      { category: 'Role-specific', text: variants ? `Which project best demonstrates your readiness for ${role}?` : `What relevant skills would you bring to the ${role} position?`, type: 'Long text', required: true, options: [] },
      { category: 'Role-specific', text: `Which tools or technologies relevant to ${role} have you used?`, type: 'Long text', required: false, options: [] },
      { category: 'Role-specific', text: 'How many months are you available for this internship?', type: 'Number', required: true, options: [] },
      { category: 'Behavioral', text: 'Tell us about a time you solved a difficult problem with a team.', type: 'Long text', required: true, options: [] },
      { category: 'Behavioral', text: 'How do you respond when priorities change quickly?', type: 'Long text', required: false, options: [] },
      { category: 'Motivation', text: `Why do you want to join ${details.startup || 'this startup'} as a ${role}?`, type: 'Long text', required: true, options: [] },
    ]
  }, [details.startup, details.title, suggestionVersion])
  const validate = () => { const required: (keyof JobDetails)[] = ['startup', 'title', 'department', 'location', 'employmentType', 'workArrangement', 'deadline', 'description', 'qualifications', 'requirements']; const next: Partial<Record<keyof JobDetails, string>> = {}; required.forEach((key) => { if (!String(details[key]).trim()) next[key] = 'This field is required.' }); if (details.openings < 1) next.openings = 'Enter at least one opening.'; setErrors(next); return Object.keys(next).length === 0 }
  const next = () => { if (step === 1 && !validate()) return; setStep((s) => Math.min(3, s + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  useEffect(() => { let current = true; getStartups().then((items) => { if (current) setStartups(items) }).catch((reason: unknown) => { if (current) setNotice(reason instanceof Error ? reason.message : 'Unable to load startups.') }).finally(() => { if (current) setStartupsLoading(false) }); return () => { current = false } }, [])
  useEffect(() => {
    if (!jobId) return
    let current = true
    getJobById(jobId).then((job) => {
      if (!current) return
      if (!job) { setJobNotFound(true); return }
      setDetails({ startup: job.startup.name, title: job.title, department: job.department ?? '', location: job.location, employmentType: job.employment_type, workArrangement: job.work_arrangement ?? '', deadline: job.deadline ?? '', openings: job.openings, description: job.description, qualifications: job.qualifications ?? '', requirements: job.requirements ?? '' })
      setQuestions(job.screening_questions ?? [])
      setCurrentStatus(job.status)
    }).catch((reason: unknown) => { if (current) setJobLoadError(reason instanceof Error ? reason.message : 'Unable to load this job.') }).finally(() => { if (current) setJobLoading(false) })
    return () => { current = false }
  }, [jobId])
  const submit = async (status: JobStatus) => {
    if (submitting || !validate()) return
    const startup = startups.find((item) => item.name === details.startup)
    if (!startup) { setNotice('Select a valid startup before saving.'); return }
    setSubmitting(true); setNotice('')
    const slug = `${details.title}-${startup.slug}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    try {
      const payload = { startup_id: startup.id, title: details.title, slug, department: details.department, location: details.location, employment_type: details.employmentType, work_arrangement: details.workArrangement, deadline: details.deadline || null, openings: details.openings, description: details.description, qualifications: details.qualifications || null, requirements: details.requirements || null, screening_questions: questions, status }
      if (jobId) { await updateJob(jobId, payload); navigate(`/jobs/${jobId}`) }
      else { await createJob(payload); if (status === 'active') { setPublished(true); window.setTimeout(() => navigate('/jobs'), 1500) } else navigate('/jobs') }
    } catch (reason) { setNotice(reason instanceof Error ? reason.message : 'Unable to save the job.') } finally { setSubmitting(false) }
  }
  const addSuggested = (q: SuggestedQuestion) => setQuestions((items) => [...items, { ...q, id: crypto.randomUUID() }])
  if (jobLoading) return <div className="rounded-xl border border-slate-200 bg-white px-6 py-20 text-center text-sm font-semibold text-slate-500" role="status">Loading job…</div>
  if (jobLoadError) return <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center"><h2 className="text-xl font-bold text-slate-900">Job could not be loaded</h2><p className="mt-2 text-sm text-rose-700">{jobLoadError}</p><button type="button" onClick={() => window.location.reload()} className="mt-5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">Retry</button></div>
  if (jobNotFound) return <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center"><h2 className="text-xl font-bold text-slate-900">Job not found</h2><p className="mt-2 text-sm text-slate-600">This job may have been removed or the link is incorrect.</p><Link to="/jobs" className="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Back to jobs</Link></div>
  if (published) return <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10"><CheckCircle2 className="mx-auto size-14 text-teal-700" /><h1 className="mt-5 text-2xl font-bold text-slate-900">Internship published</h1><p className="mt-2 text-sm text-slate-600">Your opportunity is now live on the REENO careers page.</p><div className="mt-6 break-all rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700">{publicUrl}</div><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={async () => { await navigator.clipboard.writeText(publicUrl); setLinkCopied(true) }} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"><Copy className="size-4" />{linkCopied ? 'Link copied' : 'Copy public link'}</button><a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"><ExternalLink className="size-4" />View job</a><Link to="/jobs" className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Back to jobs</Link></div></section>
  return <section className="space-y-6"><div><Link to={jobId ? `/jobs/${jobId}` : '/jobs'} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-700"><ArrowLeft className="size-4" />{editing ? 'Back to job' : 'Back to jobs'}</Link><p className="mt-6 text-sm font-bold uppercase tracking-wider text-teal-700">QSTP Talent</p><h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{editing ? 'Edit internship' : 'Create internship'}</h1><p className="mt-2 text-sm text-slate-600 sm:text-base">{editing ? `Update this opportunity. Current status: ${currentStatus}.` : 'Create and publish an opportunity on behalf of a QSTP startup.'}</p></div><StepIndicator current={step} />
    {step === 1 && <JobDetailsStep value={details} errors={errors} onChange={setDetails} onGenerate={() => setAiOpen(true)} startups={startups.map((startup) => startup.name)} startupsLoading={startupsLoading} />}{step === 2 && <ApplicationFormStep fields={fields} questions={questions} onFieldsChange={setFields} onQuestionsChange={setQuestions} onRecommend={() => setSuggestionsOpen(true)} />}{step === 3 && <ReviewStep draft={{ details, fields, questions }} onEdit={setStep} />}
    <div className="sticky bottom-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur"><button type="button" disabled={submitting} onClick={() => void submit('draft')} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Saving…' : step === 3 ? 'Save as draft' : 'Save draft'}</button><div className="flex gap-3">{step > 1 && <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Previous</button>}{step < 3 ? <button type="button" onClick={next} className="rounded-lg bg-teal-700 px-5 py-2 text-sm font-semibold text-white">Next</button> : <button type="button" disabled={submitting} onClick={() => void submit('active')} className="rounded-lg bg-teal-700 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Publishing…' : 'Publish job'}</button>}</div>{notice && <p role="alert" className="w-full text-right text-xs font-semibold text-rose-700">{notice}</p>}</div>
    {aiOpen && <AiDescriptionModal startup={details.startup} title={details.title} version={aiVersion} onRegenerate={() => setAiVersion((v) => v + 1)} onClose={() => setAiOpen(false)} onApply={(text) => { setDetails({ ...details, description: text }); setAiOpen(false) }} />}
    {suggestionsOpen && <QuestionSuggestions suggestions={suggestions} onAdd={addSuggested} onAddAll={() => { suggestions.forEach(addSuggested); setSuggestionsOpen(false) }} onRegenerate={() => setSuggestionVersion((v) => v + 1)} onClose={() => setSuggestionsOpen(false)} />}
  </section>
}
export default CreateJobPage
