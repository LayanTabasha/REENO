import { Sparkles, X } from 'lucide-react'

type Props = { startup: string; title: string; version: number; onRegenerate: () => void; onApply: (text: string) => void; onClose: () => void }

export default function AiDescriptionModal({ startup, title, version, onRegenerate, onApply, onClose }: Props) {
  const role = title.trim() || 'Intern'
  const company = startup || 'our QSTP startup'
  const variants = [
    `${company} is looking for a curious and driven ${role} to join its growing team. You will work alongside experienced colleagues on meaningful projects, contribute fresh ideas, and gain hands-on exposure to a fast-moving startup environment. This internship is ideal for someone who enjoys learning quickly, collaborating across teams, and turning ideas into practical outcomes.`,
    `Join ${company} as a ${role} and help build solutions with real impact. In this internship, you will support day-to-day projects, research opportunities, and collaborate with a multidisciplinary startup team. You will receive practical mentorship while developing the professional and technical skills needed to thrive in Qatar's innovation ecosystem.`,
  ]
  const suggestion = variants[version % variants.length]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="ai-description-title">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div><div className="flex items-center gap-2 text-purple-700"><Sparkles className="size-4" /><span className="text-xs font-bold uppercase tracking-wider">AI-assisted</span></div><h3 id="ai-description-title" className="mt-2 text-xl font-bold text-slate-900">Suggested job description</h3></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close suggestion"><X className="size-5" /></button>
        </div>
        <p className="mt-2 text-sm text-slate-500">This is an AI-assisted draft. Review and edit it before publishing.</p>
        <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50/50 p-4 text-sm leading-7 text-slate-700">{suggestion}</div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
          <button type="button" onClick={onRegenerate} className="rounded-lg border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700">Regenerate</button>
          <button type="button" onClick={() => onApply(suggestion)} className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white">Apply suggestion</button>
        </div>
      </div>
    </div>
  )
}

