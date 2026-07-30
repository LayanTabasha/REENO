interface ActiveJob {
  title: string
  startup: string
  applicants: number
  deadline: string
}

const activeJobs: ActiveJob[] = [
  { title: 'Software Engineering Intern', startup: 'Sadeem Technology', applicants: 31, deadline: '14 Aug 2026' },
  { title: 'Product Design Intern', startup: 'AeroQ', applicants: 27, deadline: '18 Aug 2026' },
  { title: 'Data Analytics Intern', startup: 'GreenRoute', applicants: 24, deadline: '21 Aug 2026' },
  { title: 'Operations Intern', startup: 'MedLoop', applicants: 19, deadline: '25 Aug 2026' },
]

function ActiveJobs() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {['Job title', 'Startup', 'Applicants', 'Deadline', 'Status'].map((heading) => <th key={heading} className="px-5 py-3 sm:px-6">{heading}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {activeJobs.map((job) => (
            <tr key={job.title} className="hover:bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900 sm:px-6">{job.title}</td>
              <td className="whitespace-nowrap px-5 py-4 text-slate-600 sm:px-6">{job.startup}</td>
              <td className="px-5 py-4 font-semibold tabular-nums text-slate-700 sm:px-6">{job.applicants}</td>
              <td className="whitespace-nowrap px-5 py-4 text-slate-500 sm:px-6">{job.deadline}</td>
              <td className="px-5 py-4 sm:px-6"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><span className="size-1.5 rounded-full bg-emerald-500" />Active</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ActiveJobs
