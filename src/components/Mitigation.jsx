import React from 'react';
import { ShieldCheck, Users, Landmark, Globe, CheckCircle2 } from 'lucide-react';
import { MITIGATION_STRATEGIES } from '../data/subsidenceData';

export default function Mitigation() {
  const getIcon = (level) => {
    if (level.includes('Community')) return <Users className="w-6 h-6 text-cyan-700" />;
    if (level.includes('Local Government')) return <Landmark className="w-6 h-6 text-indigo-700" />;
    return <Globe className="w-6 h-6 text-emerald-700" />;
  };

  return (
    <section id="mitigation" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-800">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700" />
            <span>Multi-Tier Action Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            Mitigation Strategies & Sustainable Solutions
          </h2>
          <p className="mt-3.5 sm:mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            Arresting land subsidence and adapting to permanent sea level change requires synchronized action: grassroots community defenses, municipal extraction moratoriums, and national surface water infrastructure.
          </p>
        </div>

        {/* 3-Tier Action Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {MITIGATION_STRATEGIES.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded p-6 sm:p-8 flex flex-col justify-between interactive-card shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-3.5 pb-5 border-b border-slate-200">
                  <div className="p-3 rounded bg-slate-50 border border-slate-200 shadow-2xs">
                    {getIcon(tier.level)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">{tier.level}</h3>
                    <span className="text-xs sm:text-sm font-mono text-slate-500 block font-medium mt-0.5">{tier.lead}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {tier.actions.map((act, actIdx) => (
                    <div key={actIdx} className="space-y-1.5">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                          {act.title}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-700 pl-7 leading-relaxed">
                        {act.desc}
                      </p>
                      <div className="pl-7 pt-1">
                        <span className="inline-block text-xs font-mono font-bold text-cyan-950 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200">
                          Target Impact: {act.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400 font-medium">
                Action Protocol: Priority Level {idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Callout Box */}
        <div className="mt-10 sm:mt-14 bg-white border border-cyan-300 rounded p-6 sm:p-9 relative overflow-hidden interactive-card shadow-xs">
          <div className="max-w-4xl">
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-900">
              The Critical Engineering Paradigm Shift
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5 leading-snug">
              "Raising roads only buys temporary time; closing deep wells stops the sinking."
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              For decades, local response has centered on road elevation and dikes. While vital for emergency transit, asphalt elevation without groundwater extraction limits leaves surrounding homes lower than the roadway—transforming residential yards into drainage catchments. Sustainable mitigation mandates complete connection to the <strong>Bulacan Bulk Water Supply Project</strong> to transition all 26 barangays from groundwater to treated surface water.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
