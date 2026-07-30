import { BriefcaseBusiness, LayoutDashboard, Settings, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Jobs', to: '/jobs', icon: BriefcaseBusiness },
  { label: 'Applicants', to: '/applicants', icon: Users },
  { label: 'Settings', to: '/settings', icon: Settings },
]

function Sidebar() {
  return (
    <aside className="bg-[#0c2f32] text-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex h-20 items-center justify-between px-5 lg:h-auto lg:block lg:px-7 lg:py-8">
        <div>
          <p className="text-2xl font-bold tracking-[0.16em]">REENO</p>
          <p className="mt-0.5 text-xs font-medium tracking-wide text-teal-200">QSTP Talent</p>
        </div>
        <div className="hidden text-right sm:block lg:hidden">
          <p className="text-sm font-medium">QSTP Hiring Team</p>
          <p className="text-xs text-teal-200">Recruiter</p>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-white/10 px-3 py-3 lg:flex-1 lg:flex-col lg:gap-2 lg:border-0 lg:px-4 lg:py-4">
        {navigation.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-teal-500/20 text-white ring-1 ring-inset ring-teal-300/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
            }
          >
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="hidden border-t border-white/10 px-7 py-6 lg:block">
        <p className="text-sm font-semibold">QSTP Hiring Team</p>
        <p className="mt-1 text-xs text-teal-200">Recruiter</p>
      </div>
    </aside>
  )
}

export default Sidebar
