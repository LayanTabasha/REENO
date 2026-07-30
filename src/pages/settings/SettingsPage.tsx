import { Settings } from 'lucide-react'

function SettingsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">Workspace settings</h2>
      <p className="mt-2 text-slate-600">Configure the QSTP hiring workspace and recruiter preferences.</p>
      <div className="mt-7 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Settings className="size-7 text-teal-700" strokeWidth={1.8} />
        <h3 className="mt-5 text-lg font-semibold text-slate-900">Settings module coming next</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Team management, workspace preferences, and account settings will be built here in a later phase.</p>
      </div>
    </section>
  )
}

export default SettingsPage
