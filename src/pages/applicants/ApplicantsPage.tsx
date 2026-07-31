import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import ApplicantBulkActions from '../../components/applicants/ApplicantBulkActions'
import ApplicantsFilters, { type DateFilter, type SortOption } from '../../components/applicants/ApplicantsFilters'
import ApplicantsSummary from '../../components/applicants/ApplicantsSummary'
import ApplicantsTable from '../../components/applicants/ApplicantsTable'
import ApplicantsTabs from '../../components/applicants/ApplicantsTabs'
import { applicants as initialApplicants, type ApplicantStatus, type ApplicantStatusFilter } from '../../data/applicants'

const today = new Date('2026-07-31T00:00:00Z')

function ApplicantsPage() {
  const [applicants, setApplicants] = useState(initialApplicants)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ApplicantStatusFilter>('All')
  const [startup, setStartup] = useState('All startups')
  const [job, setJob] = useState('All jobs')
  const [date, setDate] = useState<DateFilter>('All dates')
  const [sort, setSort] = useState<SortOption>('newest')
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const visibleApplicants = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    const maxAge = date === 'Today' ? 0 : date === 'Last 7 days' ? 7 : date === 'Last 30 days' ? 30 : null
    return applicants.filter((item) => {
      const searchable = [item.name, item.email, item.jobTitle, item.startup].join(' ').toLocaleLowerCase()
      const age = Math.floor((today.getTime() - new Date(`${item.appliedDate}T00:00:00Z`).getTime()) / 86_400_000)
      return (!query || searchable.includes(query)) && (status === 'All' || item.status === status) && (startup === 'All startups' || item.startup === startup) && (job === 'All jobs' || item.jobTitle === job) && (maxAge === null || age <= maxAge)
    }).sort((a, b) => {
      if (sort === 'oldest') return a.appliedDate.localeCompare(b.appliedDate)
      if (sort === 'highest-match') return b.match - a.match
      if (sort === 'lowest-match') return a.match - b.match
      if (sort === 'name') return a.name.localeCompare(b.name)
      return b.appliedDate.localeCompare(a.appliedDate)
    })
  }, [applicants, date, job, search, sort, startup, status])

  const clearFilters = () => { setSearch(''); setStatus('All'); setStartup('All startups'); setJob('All jobs'); setDate('All dates'); setSort('newest') }
  const changeStatus = (id: string, nextStatus: ApplicantStatus) => setApplicants((items) => items.map((item) => item.id === id ? { ...item, status: nextStatus } : item))
  const toggleSelection = (id: string) => setSelected((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const toggleAll = () => setSelected((current) => visibleApplicants.every((item) => current.has(item.id)) ? new Set() : new Set(visibleApplicants.map((item) => item.id)))
  const bulkChangeStatus = (nextStatus: ApplicantStatus) => { setApplicants((items) => items.map((item) => selected.has(item.id) ? { ...item, status: nextStatus } : item)); setSelected(new Set()) }

  return <section className="space-y-6">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-wider text-teal-700">QSTP Talent</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Applicants</h2><p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">Review and manage internship applications submitted across QSTP startups.</p></div><button type="button" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"><Download aria-hidden="true" className="size-4" />Export applicants</button></div>
    <ApplicantsSummary />
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <ApplicantsTabs value={status} onChange={setStatus} />
      <ApplicantsFilters search={search} status={status} startup={startup} job={job} date={date} sort={sort} expanded={filtersExpanded} onSearch={setSearch} onStatus={setStatus} onStartup={setStartup} onJob={setJob} onDate={setDate} onSort={setSort} onToggle={() => setFiltersExpanded((value) => !value)} />
      {selected.size > 0 && <ApplicantBulkActions count={selected.size} onChangeStatus={bulkChangeStatus} onClear={() => setSelected(new Set())} />}
      <ApplicantsTable applicants={visibleApplicants} selected={selected} onToggle={toggleSelection} onToggleAll={toggleAll} onStatusChange={changeStatus} onClearFilters={clearFilters} />
    </div>
  </section>
}

export default ApplicantsPage
