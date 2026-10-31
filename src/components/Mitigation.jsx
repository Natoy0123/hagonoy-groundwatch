import React, { useState } from 'react';
import { ShieldCheck, Users, Landmark, Globe, CheckCircle2, Info, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { MITIGATION_STRATEGIES } from '../data/subsidenceData';

export default function Mitigation() {
  const [selectedActionModal, setSelectedActionModal] = useState(null);
  const [pledges, setPledges] = useState({
    rainwater: false,
    mangrove: false,
    waterWise: false,
    advocacy: false
  });

  const togglePledge = (key) => {
    setPledges((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const completedPledgesCount = Object.values(pledges).filter(Boolean).length;

  const getIcon = (level) => {
    if (level.includes('Community')) return <Users className="w-5 h-5 text-cyan-700" />;
    if (level.includes('Local Government')) return <Landmark className="w-5 h-5 text-indigo-700" />;
    return <Globe className="w-5 h-5 text-emerald-700" />;
  };

  const actionSpecs = {
    "Mangrove Bioshield Reforestation": {
      agency: "DENR CENRO Paombong & Barangay Coastal Councils",
      timeline: "2 to 4 years for dense root network maturation",
      feasibility: "High (Native Avicennia marina and Rhizophora saplings widely available)",
      rationale: "Mangrove prop roots attenuate up to 66% of tidal wave energy and capture alluvial sediment to raise coastal bed elevations naturally."
    },
    "Rooftop Rainwater Harvesting": {
      agency: "Homeowners & Barangay Disaster Councils",
      timeline: "Immediate (1–2 weeks per household)",
      feasibility: "High (PVC gutters and 500L–1000L polyethylene tanks)",
      rationale: "Replaces shallow groundwater withdrawals for toilet flushing, cleaning, and gardening during the 6-month rainy season."
    },
    "Community Sinking Gauges & Early Warning": {
      agency: "MDRRMO Hagonoy & Barangay Volunteers",
      timeline: "3 to 6 months across 26 barangays",
      feasibility: "Very High (Low-cost graduated staff gauges mounted to bridge piers)",
      rationale: "Provides hyper-local tidal inundation metrics before high-tide peaks to safeguard school transit routes."
    },
    "Moratorium & Regulation on Unpermitted Deep Wells": {
      agency: "National Water Resources Board (NWRB) & LGU Business Permits",
      timeline: "Immediate enforcement with 6-month transition window",
      feasibility: "Medium (Requires joint NWRB-LGU field inspection teams)",
      rationale: "Directly caps the highest-volume extraction cone responsible for regional pore depressurization."
    },
    "Zoning & Elevated Building Standards": {
      agency: "Municipal Planning & Development Office (MPDO) / Engineering",
      timeline: "1 year for Comprehensive Land Use Plan (CLUP) codification",
      feasibility: "High",
      rationale: "Prevents high-load structural construction on unconsolidated clays without pile foundations."
    },
    "Pumping Stations & Automated Tide Gates": {
      agency: "DPWH Region III & Bulacan 1st District Engineering",
      timeline: "2 to 3 years construction",
      feasibility: "High",
      rationale: "Prevents Manila Bay high-tide backflow during sunny days while maintaining outward storm drainage capacity."
    },
    "Surface Water Bulk Supply Integration": {
      agency: "Bulacan Bulk Water Supply Project (BBWSP) & Hagonoy Water District",
      timeline: "1 to 2 years full pipe distribution network link",
      feasibility: "High (Angat-fed Stage 3 pipeline expanding in Bulacan)",
      rationale: "The only definitive permanent solution to halt land sinking: completely eliminates the need for groundwater pumping."
    },
    "Integrated Manila Bay Coastal Defense Masterplan": {
      agency: "NEDA, DPWH, Climate Change Commission (CCC)",
      timeline: "5 to 10 years multi-phase regional implementation",
      feasibility: "Medium-Long term",
      rationale: "Coordinates ring dikes, wetland retention basins, and offshore breakwaters across Bulacan, Pampanga, and Bataan."
    }
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
              className="bg-white border border-slate-200 rounded p-6 sm:p-7 flex flex-col justify-between interactive-card"
            >
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 shadow-2xs">
                    {getIcon(tier.level)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{tier.level}</h3>
                    <span className="text-xs font-mono text-slate-500 block">{tier.lead}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {tier.actions.map((act, actIdx) => (
                    <div
                      key={actIdx}
                      className="p-3 rounded border border-slate-100 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300 transition cursor-pointer group"
                      onClick={() => setSelectedActionModal({ ...act, tierLevel: tier.level, lead: tier.lead })}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                          <h4 className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-cyan-800">
                            {act.title}
                          </h4>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-700 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-slate-600 pl-6 leading-relaxed mt-1">
                        {act.desc}
                      </p>
                      <div className="pl-6 pt-2">
                        <span className="inline-block text-[10px] font-mono font-semibold text-cyan-900 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          Target Impact: {act.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Action Protocol: Priority Tier {idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Callout Box & Citizen Action Pledge Box */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Engineering Paradigm Shift */}
          <div className="lg:col-span-7 bg-white border border-cyan-300 rounded p-6 sm:p-8 relative overflow-hidden interactive-card flex flex-col justify-between">
            <div>
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
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 font-mono">
              Policy Synthesis: UP-NIGS & DENR-MGB Region III Consensus
            </div>
          </div>

          {/* Interactive Citizen Action Pledge */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                  Citizen Action Commitment
                </span>
                <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  {completedPledgesCount}/4 Pledged
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Every citizen contributes to groundwater conservation. Check off the proactive actions you commit to:
              </p>

              <div className="space-y-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => togglePledge('rainwater')}
                  className="w-full text-left p-2.5 rounded border border-slate-200 hover:border-slate-300 flex items-center gap-2.5 transition cursor-pointer"
                >
                  {pledges.rainwater ? <CheckSquare className="w-4 h-4 text-cyan-700 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                  <span className={pledges.rainwater ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                    Install rooftop drum or barrel for rainwater harvesting
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => togglePledge('mangrove')}
                  className="w-full text-left p-2.5 rounded border border-slate-200 hover:border-slate-300 flex items-center gap-2.5 transition cursor-pointer"
                >
                  {pledges.mangrove ? <CheckSquare className="w-4 h-4 text-cyan-700 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                  <span className={pledges.mangrove ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                    Volunteer for coastal mangrove planting drives in Hagonoy Delta
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => togglePledge('waterWise')}
                  className="w-full text-left p-2.5 rounded border border-slate-200 hover:border-slate-300 flex items-center gap-2.5 transition cursor-pointer"
                >
                  {pledges.waterWise ? <CheckSquare className="w-4 h-4 text-cyan-700 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                  <span className={pledges.waterWise ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                    Inspect household plumbing to eliminate deep-well water waste
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => togglePledge('advocacy')}
                  className="w-full text-left p-2.5 rounded border border-slate-200 hover:border-slate-300 flex items-center gap-2.5 transition cursor-pointer"
                >
                  {pledges.advocacy ? <CheckSquare className="w-4 h-4 text-cyan-700 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                  <span className={pledges.advocacy ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                    Log field observations on GroundWatch to support hazard mapping
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
              {completedPledgesCount === 4
                ? "🌟 Outstanding! You have pledged complete grassroots advocacy for Hagonoy."
                : "Select commitments above to empower community resilience."}
            </div>
          </div>
        </div>
      </div>

      {/* Action Implementation Spec Modal */}
      {selectedActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-lg w-full p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-800 uppercase font-bold">
                  {selectedActionModal.tierLevel} Implementation Guide
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">
                  {selectedActionModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedActionModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead Agency:</span>
                  <span className="font-bold text-slate-900">{actionSpecs[selectedActionModal.title]?.agency || selectedActionModal.lead}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timeline:</span>
                  <span className="font-semibold text-cyan-800">{actionSpecs[selectedActionModal.title]?.timeline || '1–2 years'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Feasibility:</span>
                  <span className="font-semibold text-slate-800">{actionSpecs[selectedActionModal.title]?.feasibility || 'High'}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 font-mono uppercase text-[11px] mb-1">
                  Scientific Rationale & Mechanics:
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {actionSpecs[selectedActionModal.title]?.rationale || selectedActionModal.desc}
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                <strong className="block mb-0.5">Targeted Ecological Outcome:</strong>
                <span>{selectedActionModal.impact}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedActionModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                Close Implementation Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}