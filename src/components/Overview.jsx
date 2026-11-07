import React, { useState } from 'react';
import { Layers, Droplets, ArrowDownToLine, Waves, HelpCircle, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function Overview() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [showMisconceptionProof, setShowMisconceptionProof] = useState(false);
  const [showTidalProof, setShowTidalProof] = useState(false);

  const stepsData = [
    {
      id: 1,
      num: "01",
      title: "Natural Hydrostatic Equilibrium",
      status: "Pore Pressure: NORMAL (Equilibrium)",
      summary: "Pore water trapped between microscopic clay platelets exerts outward hydraulic pressure, supporting the weight of overlying sediment and structures.",
      deepDetail: "Under natural pre-development conditions, the deep confined aquifer system is recharged by upland rainfall from the Sierra Madre foothills. Buoyant pore water pressure counteracts the vertical lithostatic overburden pressure (σ' = σ - u).",
      indicatorClass: "text-cyan-800 bg-cyan-50 border-cyan-200"
    },
    {
      id: 2,
      num: "02",
      title: "Over-Extraction & Pore Depressurization",
      status: "Water Table: DRAWDOWN CONES DETECTED",
      summary: "Thousands of uncontrolled deep wells pump groundwater for commercial aquaculture fishponds and households faster than rainfall can recharge the deep confined aquifers.",
      deepDetail: "Pumping rates exceed safe sustainable yield by >300%. As piezometric hydraulic heads fall by up to 25 meters, water drains outward from low-permeability clay aquitards (interbedded Quaternary alluvium) into adjacent sandy aquifers.",
      indicatorClass: "text-amber-800 bg-amber-50 border-amber-200"
    },
    {
      id: 3,
      num: "03",
      title: "Irreversible Clay Matrix Collapse",
      status: "Ground Surface: DROPPING (Subsidence Active)",
      summary: "With water pressure gone, clay particles re-align and pack tightly together under overburden pressure. The land drops up to 5.2 cm annually. This compaction is permanent.",
      deepDetail: "Because clay platelets have a high compression index (Cc > 0.4), volumetric reduction is permanent. Even if deep extraction ceases, plastic interparticle rearrangement cannot be reversed by subsequent rainfall.",
      indicatorClass: "text-red-800 bg-red-50 border-red-200"
    }
  ];

  return (
    <section id="overview" className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
            <Layers className="w-4 h-4 shrink-0" />
            <span>Environmental Science Context</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight leading-snug">
            What is Land Subsidence and Why is Hagonoy Sinking?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Land subsidence is the gradual or sudden downward settling of the Earth's surface. 
            In Hagonoy, Bulacan, this process is predominantly <strong>anthropogenic</strong> (man-made), driven by excessive deep-well extraction that drains ancient aquifers beneath the coastal delta.
          </p>
        </div>

        {/* Geological Mechanics Diagram Box with interactive step selector */}
        <div className="bg-white border border-slate-200 rounded p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-200 mb-4 sm:mb-6 gap-2.5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-start sm:items-center gap-2 leading-snug">
                <Droplets className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5 sm:mt-0" />
                <span>The Aquifer Depletion &amp; Clay Compaction Cycle</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tap any phase below to inspect the subsurface geomechanical dynamics.
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-1.5 text-xs font-mono shrink-0">
              <span className="text-slate-400">Selected Phase:</span>
              <span className="font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                Phase {selectedStep} of 3
              </span>
            </div>
          </div>

          {/* Mobile Quick Phase Switcher Pills */}
          <div className="grid grid-cols-3 gap-1.5 mb-4 md:hidden">
            {stepsData.map((step) => {
              const isSelected = selectedStep === step.id;
              return (
                <button
                  key={`pill-${step.id}`}
                  type="button"
                  onClick={() => setSelectedStep(step.id)}
                  className={`py-1.5 px-2 rounded text-[11px] font-mono font-bold border transition cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-700 text-white border-cyan-700 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Phase {step.num}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
            {stepsData.map((step) => {
              const isSelected = selectedStep === step.id;
              return (
                <div key={step.id} className="flex flex-col">
                  <button
                    onClick={() => setSelectedStep(step.id)}
                    type="button"
                    className={`w-full flex-1 text-left p-4 sm:p-5 rounded border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-50/60 border-cyan-700 shadow-sm ring-1 ring-cyan-700 md:-translate-y-1'
                        : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className={`w-8 h-8 rounded font-mono font-bold flex items-center justify-center text-sm shadow-xs shrink-0 ${
                          step.id === 1 ? 'bg-cyan-700 text-white' :
                          step.id === 2 ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
                        }`}>
                          {step.num}
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-mono font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded shrink-0">
                            Active Inspection
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1.5 leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                    <div className={`mt-4 px-2.5 py-1.5 rounded border font-mono text-[11px] font-semibold leading-snug ${step.indicatorClass}`}>
                      {step.status}
                    </div>
                  </button>

                  {/* Mobile Inline Deep Detail Drawer (renders directly under active phase on <md screens) */}
                  {isSelected && (
                    <div className="md:hidden mt-2.5 p-3.5 rounded bg-slate-50 border border-cyan-200 animate-fade-in text-xs text-slate-700 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-cyan-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 font-mono block mb-1 leading-snug">
                          Hydrogeological Mechanics (Phase {step.id}: {step.title})
                        </span>
                        <p className="leading-relaxed text-slate-600">
                          {step.deepDetail}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Expanded Step Deep Detail Banner */}
          <div className="hidden md:flex mt-6 p-4 rounded bg-slate-50 border border-slate-200 animate-fade-in text-xs text-slate-700 items-start gap-3">
            <AlertCircle className="w-4 h-4 text-cyan-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 font-mono block mb-1">
                Hydrogeological Mechanics (Phase {selectedStep}: {stepsData[selectedStep - 1].title})
              </span>
              <p className="leading-relaxed">
                {stepsData[selectedStep - 1].deepDetail}
              </p>
            </div>
          </div>
        </div>

        {/* Key Realities vs Myths with interactive proof toggles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded p-4 sm:p-6 interactive-card flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-red-700 font-semibold text-xs sm:text-sm">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>Common Misconception</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMisconceptionProof(!showMisconceptionProof)}
                  className="text-[11px] sm:text-xs font-mono text-cyan-800 hover:text-cyan-950 bg-cyan-50/70 hover:bg-cyan-100/80 border border-cyan-200 px-2.5 py-1 rounded font-semibold inline-flex items-center gap-1 cursor-pointer shrink-0 transition"
                >
                  <span>{showMisconceptionProof ? 'Hide Proof' : 'View Proof & Math'}</span>
                  {showMisconceptionProof ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                </button>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug">
                "Is Hagonoy flooding solely because of climate change and sea level rise?"
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Scientific Fact:</strong> Global sea level rises at ~3.4 millimeters per year. Meanwhile, parts of Hagonoy are sinking at <strong>up to 52 millimeters per year</strong>. Sinking land accounts for more than <strong>90% of the relative sea level rise</strong> experienced along Hagonoy's coastline. Treating this solely as ocean warming ignores the root culprit: excessive groundwater pumping.
              </p>

              {showMisconceptionProof && (
                <div className="mt-4 p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded font-mono text-xs space-y-2 animate-fade-in">
                  <div className="text-slate-500 font-bold uppercase text-[10px] leading-snug">
                    Empirical Rate Comparison (UP-NIGS / NOAA)
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 border-b border-slate-200 pb-1.5">
                    <span className="text-slate-600">Global Eustatic Rise:</span>
                    <span className="font-bold text-slate-800 sm:text-right">~3.4 mm / year</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 border-b border-slate-200 pb-1.5">
                    <span className="text-slate-600">Hagonoy Land Subsidence:</span>
                    <span className="font-bold text-red-700 sm:text-right">25.0 – 52.0 mm / year</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 text-cyan-950 font-bold pt-0.5">
                    <span>Subsidence Contribution:</span>
                    <span className="sm:text-right">~93.8% of net relative water rise</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Citation: Siringan &amp; Rodolfo (2003); Eco et al. (2020)
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded p-4 sm:p-6 interactive-card flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-cyan-800 font-semibold text-xs sm:text-sm">
                  <Waves className="w-4 h-4 shrink-0" />
                  <span>The "Sunny Day Flooding" Phenomenon</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTidalProof(!showTidalProof)}
                  className="text-[11px] sm:text-xs font-mono text-cyan-800 hover:text-cyan-950 bg-cyan-50/70 hover:bg-cyan-100/80 border border-cyan-200 px-2.5 py-1 rounded font-semibold inline-flex items-center gap-1 cursor-pointer shrink-0 transition"
                >
                  <span>{showTidalProof ? 'Hide Mechanics' : 'View Tidal Dynamics'}</span>
                  {showTidalProof ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                </button>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug">
                Why do roads submerge under clear skies?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Because coastal barangays (such as Pugad, Tibaguin, and San Pascual) have sunk below the mean high-water spring (MHWS) tide level of Manila Bay, seawater naturally pushes backwards through river estuaries, storm drains, and permeable soil during daily tidal peaks—flooding communities even in peak dry season.
              </p>

              {showTidalProof && (
                <div className="mt-4 p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded font-mono text-xs space-y-2 animate-fade-in">
                  <div className="text-slate-500 font-bold uppercase text-[10px] leading-snug">
                    Tidal Hydraulics (DOST-PAGASA Astronomical Table)
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 border-b border-slate-200 pb-1.5">
                    <span className="text-slate-600">Mean High Water Spring (MHWS):</span>
                    <span className="font-bold text-slate-800 sm:text-right">+1.25m above MSL</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 border-b border-slate-200 pb-1.5">
                    <span className="text-slate-600">Brgy. Pugad Road Surface:</span>
                    <span className="font-bold text-red-700 sm:text-right">-0.40m below MSL</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 text-red-700 font-bold pt-0.5">
                    <span>Hydraulic Head Difference:</span>
                    <span className="sm:text-right">1.65 meters inward water pressure</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Citation: DOST-PAGASA Astronomical Tide Tables (2024)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}