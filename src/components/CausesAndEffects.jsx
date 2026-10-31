import React, { useState } from 'react';
import { AlertTriangle, Droplets, Building, Anchor, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { CAUSES_DATA, EFFECTS_DATA } from '../data/subsidenceData';

export default function CausesAndEffects() {
  const [activeTab, setActiveTab] = useState('causes');
  const [selectedCauseId, setSelectedCauseId] = useState(CAUSES_DATA[0].id);

  const selectedCause = CAUSES_DATA.find((c) => c.id === selectedCauseId) || CAUSES_DATA[0];

  return (
    <section id="causes-effects" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-800">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700" />
            <span>Root Analysis & Field Impact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            Causes, Dynamics & Community Impact
          </h2>
          <p className="mt-3.5 sm:mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            The catastrophic sinking of Hagonoy is an intersection of anthropogenic exploitation and fragile deltaic geography. Explore the key drivers and how they manifest across daily community life.
          </p>

          {/* Tab Switcher */}
          <div className="mt-7 inline-flex p-1.5 bg-slate-100 rounded-md border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('causes')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-xs sm:text-sm font-bold rounded transition-all duration-200 ${
                activeTab === 'causes'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Primary Causes (Why It Happens)
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-xs sm:text-sm font-bold rounded transition-all duration-200 ${
                activeTab === 'effects'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Community Impact (How It Affects People)
            </button>
          </div>
        </div>

        {/* Tab 1: Causes */}
        {activeTab === 'causes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Cause Selection Rail */}
            <div className="lg:col-span-5 space-y-3.5">
              {CAUSES_DATA.map((cause) => {
                const isSelected = cause.id === selectedCauseId;
                return (
                  <button
                    key={cause.id}
                    onClick={() => setSelectedCauseId(cause.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-md border transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-50/80 border-cyan-700 text-cyan-950 shadow-xs translate-x-1'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wide">
                        {cause.category}
                      </span>
                      <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                        cause.severity === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {cause.severity}
                      </span>
                    </div>
                    <div className="font-bold text-base sm:text-lg mt-2 flex items-center justify-between">
                      <span>{cause.title}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isSelected ? 'text-cyan-700 translate-x-1' : 'text-slate-400'}`} />
                    </div>
                    <div className="mt-2.5 text-xs sm:text-sm font-mono text-cyan-900 font-bold">
                      Metric: {cause.metric}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Cause Dossier */}
            <div
              key={selectedCause.id}
              className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-md p-6 sm:p-9 animate-fade-in shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-slate-200 gap-2">
                <div>
                  <span className="text-xs sm:text-sm font-mono uppercase font-bold text-slate-500">{selectedCause.category}</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{selectedCause.title}</h3>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs font-mono text-slate-500 block uppercase">Relative Impact</span>
                  <span className="font-mono font-extrabold text-cyan-800 text-base sm:text-lg">
                    {selectedCause.metric}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed">
                {selectedCause.summary}
              </p>

              <div className="mt-7">
                <h4 className="text-xs sm:text-sm font-mono uppercase font-bold text-slate-700 tracking-wider mb-4">
                  Key Contributing Factors & Field Realities
                </h4>
                <ul className="space-y-3.5">
                  {selectedCause.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200 text-xs sm:text-sm text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>Verified in: UP-NIGS & MGB Region III Technical Papers</span>
                <a href="#references" className="text-cyan-800 font-bold hover:underline transition-colors">
                  View APA Citations →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Effects & Community Impact */}
        {activeTab === 'effects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 animate-fade-in">
            {EFFECTS_DATA.map((effect) => (
              <div
                key={effect.id}
                className="bg-slate-50 border border-slate-200 rounded p-6 sm:p-7 flex flex-col justify-between interactive-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-bold">
                      {effect.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-red-600">
                      ACTIVE IMPACT
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                    {effect.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {effect.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-baseline justify-between font-mono flex-wrap gap-2">
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">{effect.statLabel}:</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{effect.stat}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
