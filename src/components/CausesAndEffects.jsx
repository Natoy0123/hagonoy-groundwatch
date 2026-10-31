import React, { useState } from 'react';
import { AlertTriangle, Droplets, Building, Anchor, ShieldAlert, CheckCircle2, ChevronRight, Info, ExternalLink } from 'lucide-react';
import { CAUSES_DATA, EFFECTS_DATA } from '../data/subsidenceData';

export default function CausesAndEffects() {
  const [activeTab, setActiveTab] = useState('causes');
  const [selectedCauseId, setSelectedCauseId] = useState(CAUSES_DATA[0].id);
  const [selectedEffectModal, setSelectedEffectModal] = useState(null);

  const selectedCause = CAUSES_DATA.find((c) => c.id === selectedCauseId) || CAUSES_DATA[0];

  const effectDetails = {
    "chronic-flooding": {
      hotspots: "Pugad, Tibaguin, San Pascual, Santa Elena",
      economicToll: "180+ school and market days interrupted annually",
      fieldReality: "Spring tides push up to 1.5m of saline water into homes twice daily. Residents walk on wooden catwalks (tulay-tulay) erected above submerged living rooms.",
      recommendedSolution: "Installation of automated flap gates on Hagonoy River tributaries and strict well moratoria."
    },
    "structural-damage": {
      hotspots: "Mercado Poblacion, San Agustin, Santa Cruz",
      economicToll: "₱150,000 – ₱350,000 per residential structure for hydraulic house jacking",
      fieldReality: "Differential ground settlement tilts concrete perimeter fences by up to 20 degrees, shears water mainlines, and creates step-cracks across school and church walls.",
      recommendedSolution: "Mandate deep pile foundations for all new civil infrastructure in municipal building codes."
    },
    "saline-intrusion": {
      hotspots: "All coastal and deltaic barangays within 8 km of Manila Bay",
      economicToll: "100% dependency on expensive commercial 5-gallon bottled water for drinking",
      fieldReality: "Chloride concentrations in shallow aquifers exceed 1,200 mg/L (potable limit is 250 mg/L). Corrosive saltwater destroys metallic plumbing and ruins home appliances.",
      recommendedSolution: "Connect all municipal water district lines to the Bulacan Bulk Water Supply Project."
    },
    "economic-loss": {
      hotspots: "Prawn and bangus aquaculture estates in western Hagonoy",
      economicToll: "Tens of millions of pesos in fingerling washouts during tidal surges",
      fieldReality: "Sunken pond dikes are breached during high-tide syzygy. Fish harvest delivery trucks are stranded for hours by submerged national roads.",
      recommendedSolution: "Transition fishponds from deep freshwater well extraction to recirculating aquaculture systems (RAS)."
    }
  };

  return (
    <section id="causes-effects" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
            <AlertTriangle className="w-4 h-4 text-cyan-700" />
            <span>Root Analysis & Field Impact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Causes, Dynamics & Community Impact
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            The catastrophic sinking of Hagonoy is an intersection of anthropogenic exploitation and fragile deltaic geography. Explore the key drivers and how they manifest across daily community life.
          </p>

          {/* Tab Switcher with smooth transition */}
          <div className="mt-6 inline-flex p-1 bg-slate-100 rounded border border-slate-200">
            <button
              onClick={() => setActiveTab('causes')}
              className={`px-4 py-1.5 text-xs font-semibold rounded transition-all duration-200 cursor-pointer ${
                activeTab === 'causes'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Primary Causes (Why It Happens)
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`px-4 py-1.5 text-xs font-semibold rounded transition-all duration-200 cursor-pointer ${
                activeTab === 'effects'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
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
            <div className="lg:col-span-5 space-y-3">
              {CAUSES_DATA.map((cause) => {
                const isSelected = cause.id === selectedCauseId;
                return (
                  <button
                    key={cause.id}
                    onClick={() => setSelectedCauseId(cause.id)}
                    className={`w-full text-left p-4 rounded border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-50/80 border-cyan-700 text-cyan-950 shadow-xs translate-x-1'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-medium text-slate-500 uppercase">
                        {cause.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-transform duration-200 ${
                        cause.severity === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {cause.severity}
                      </span>
                    </div>
                    <div className="font-bold text-sm sm:text-base mt-1.5 flex items-center justify-between">
                      <span>{cause.title}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'text-cyan-700 translate-x-0.5' : 'text-slate-400'}`} />
                    </div>
                    <div className="mt-2 text-xs font-mono text-cyan-800 font-medium">
                      Metric: {cause.metric}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Cause Dossier with Key for re-animating on change */}
            <div
              key={selectedCause.id}
              className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded p-6 sm:p-8 animate-fade-in shadow-xs"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500">{selectedCause.category}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedCause.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-500 block">Relative Impact</span>
                  <span className="font-mono font-extrabold text-cyan-800 text-sm">
                    {selectedCause.metric}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                {selectedCause.summary}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-3">
                  Key Contributing Factors & Field Realities
                </h4>
                <ul className="space-y-2.5">
                  {selectedCause.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>Verified in: UP-NIGS & MGB Region III Technical Papers</span>
                <a href="#references" className="text-cyan-800 font-semibold hover:underline transition-colors">
                  View APA Citations →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Effects & Community Impact with interactive detail triggers */}
        {activeTab === 'effects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {EFFECTS_DATA.map((effect) => (
              <div
                key={effect.id}
                className="bg-slate-50 border border-slate-200 rounded p-6 flex flex-col justify-between interactive-card group hover:border-cyan-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                      {effect.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-red-600">
                      ACTIVE IMPACT
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {effect.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {effect.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-xs text-slate-500">{effect.statLabel}:</span>
                    <span className="text-lg font-extrabold text-slate-900">{effect.stat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedEffectModal(effect)}
                    className="w-full py-2 px-3 text-xs font-semibold rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-cyan-700" />
                    Inspect Localized Field Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Community Impact Detail Modal */}
        {selectedEffectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-lg max-w-lg w-full p-6 shadow-2xl animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <h3 className="font-bold text-slate-900 text-base">
                    Impact Analysis: {selectedEffectModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEffectModal(null)}
                  className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase">Impact Metric Baseline</div>
                  <div className="text-base font-bold text-red-700">{selectedEffectModal.stat} ({selectedEffectModal.statLabel})</div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 font-mono uppercase text-[11px] mb-1">
                    Primary Municipal Hotspots:
                  </h4>
                  <p className="text-slate-600 font-mono">
                    {effectDetails[selectedEffectModal.id]?.hotspots || 'Across all 26 coastal barangays'}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 font-mono uppercase text-[11px] mb-1">
                    Community Economic & Health Toll:
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {effectDetails[selectedEffectModal.id]?.economicToll}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 font-mono uppercase text-[11px] mb-1">
                    Lived Field Realities:
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {effectDetails[selectedEffectModal.id]?.fieldReality}
                  </p>
                </div>

                <div className="p-3 bg-cyan-50 border border-cyan-200 rounded text-cyan-950">
                  <strong className="block mb-0.5">Recommended Policy Remedy:</strong>
                  <span>{effectDetails[selectedEffectModal.id]?.recommendedSolution}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
                <a
                  href="#mitigation"
                  onClick={() => setSelectedEffectModal(null)}
                  className="text-cyan-800 font-semibold hover:underline flex items-center gap-1 text-xs"
                >
                  View Full Mitigation Framework →
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedEffectModal(null)}
                  className="px-4 py-2 text-xs font-semibold rounded bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}