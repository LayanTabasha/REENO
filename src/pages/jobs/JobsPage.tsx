import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import JobsFilters from '../../components/jobs/JobsFilters'
import JobsSummary from '../../components/jobs/JobsSummary'
import JobsTable from '../../components/jobs/JobsTable'
import JobsTabs from '../../components/jobs/JobsTabs'
import { jobs, type JobStatus, type StatusFilter } from '../../components/jobs/jobsData'

function JobsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [startup, setStartup] = useState('All startups')

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()

    return jobs.filter((job) => {
      const matchesSearch = !query || job.title.toLocaleLowerCase().includes(query) || job.startup.toLocaleLowerCase().includes(query)
      const matchesStatus = status === 'All' || job.status === status
      const matchesStartup = startup === 'All startups' || job.startup === startup
      return matchesSearch && matchesStatus && matchesStartup
    })
  }, [search, startup, status])

  const clearFilters = () => {
    setSearch('')
    setStatus('All')
    setStartup('All startups')
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">QSTP Talent</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Jobs</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">Manage internship opportunities published on behalf of QSTP startups.</p>
        </div>
        <Link to="/jobs/new" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
          <Plus aria-hidden="true" className="size-4" />
          Create job
        </Link>
      </div>

      <JobsSummary />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <JobsTabs value={status} onChange={(value: JobStatus | 'All') => setStatus(value)} />
        <JobsFilters search={search} status={status} startup={startup} onSearchChange={setSearch} onStatusChange={setStatus} onStartupChange={setStartup} />
        <JobsTable jobs={filteredJobs} onClearFilters={clearFilters} />
      </div>
    </section>
  )
}

export default JobsPage
