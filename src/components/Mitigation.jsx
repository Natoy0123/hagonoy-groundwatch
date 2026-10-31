import React from 'react';
import { ShieldCheck, Users, Landmark, Globe, CheckCircle2 } from 'lucide-react';
import { MITIGATION_STRATEGIES } from '../data/subsidenceData';

export default function Mitigation() {
  const getIcon = (level) => {
    if (level.includes('Community')) return <Users className="w-5 h-5 text-cyan-700" />;
    if (level.includes('Local Government')) return <Landmark className="w-5 h-5 text-indigo-700" />;
    return <Globe className="w-5 h-5 text-emerald-700" />;
  };

  return (
    <section id="mitigation" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
            <ShieldCheck className="w-4 h-4 text-cyan-700" />
            <span>Multi-Tier Action Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Mitigation Strategies & Sustainable Solutions
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Arresting land subsidence and adapting to permanent sea level change requires synchronized action: grassroots community defenses, municipal extraction moratoriums, and national surface water infrastructure.
          </p>
        </div>

        {/* 3-Tier Action Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MITIGATION_STRATEGIES.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition shadow-xs"
            >
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                    {getIcon(tier.level)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{tier.level}</h3>
                    <span className="text-xs font-mono text-slate-500 block">{tier.lead}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {tier.actions.map((act, actIdx) => (
                    <div key={actIdx} className="space-y-1">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <h4 className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug">
                          {act.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                        {act.desc}
                      </p>
                      <div className="pl-6 pt-1">
                        <span className="inline-block text-[10px] font-mono font-semibold text-cyan-900 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
                          Target Impact: {act.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Action Protocol: Priority Level {idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Callout Box: The Critical Paradigm Shift */}
        <div className="mt-12 bg-white border border-cyan-300 rounded p-6 sm:p-8 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-900">
              The Critical Engineering Paradigm Shift
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              "Raising roads only buys temporary time; closing deep wells stops the sinking."
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              For decades, local response has centered on road elevation and dikes. While vital for emergency transit, asphalt elevation without groundwater extraction limits leaves surrounding homes lower than the roadway—transforming residential yards into drainage catchments. Sustainable mitigation mandates complete connection to the <strong>Bulacan Bulk Water Supply Project</strong> to transition all 26 barangays from groundwater to treated surface water.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
