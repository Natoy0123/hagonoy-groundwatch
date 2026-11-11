import React, { useState } from 'react';
import { Layers, Droplets, ArrowDownToLine, Waves, HelpCircle, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Gauge, Activity } from 'lucide-react';

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
      porePressurePercent: 100,
      subsidenceRate: "0.2 mm / yr (Stable)",
      piezometricHead: "+5.0m vs MSL (Recharged)",
      matrixState: "Elastic Platelet Expansion",
      summary: "Pore water trapped between microscopic clay platelets exerts outward hydraulic pressure, supporting the weight of overlying sediment and structures.",
      deepDetail: "Under natural pre-development conditions, the deep confined aquifer system is recharged by upland rainfall from the Sierra Madre foothills. Buoyant pore water pressure counteracts the vertical lithostatic overburden pressure (σ' = σ - u).",
      indicatorClass: "text-cyan-800 bg-cyan-50 border-cyan-200"
    },
    {
      id: 2,
      num: "02",
      title: "Over-Extraction & Pore Depressurization",
      status: "Water Table: DRAWDOWN CONES DETECTED",
      porePressurePercent: 42,
      subsidenceRate: "18.5 mm / yr (Active)",
      piezometricHead: "-15.0m Drawdown Cones",
      matrixState: "Aquitard Pore Drainage",
      summary: "Thousands of uncontrolled deep wells pump groundwater for commercial aquaculture fishponds and households faster than rainfall can recharge the deep confined aquifers.",
      deepDetail: "Pumping rates exceed safe sustainable yield by >300%. As piezometric hydraulic heads fall by up to 25 meters, water drains outward from low-permeability clay aquitards (interbedded Quaternary alluvium) into adjacent sandy aquifers.",
      indicatorClass: "text-amber-800 bg-amber-50 border-amber-200"
    },
    {
      id: 3,
      num: "03",
      title: "Irreversible Clay Matrix Collapse",
      status: "Ground Surface: DROPPING (Subsidence Active)",
      porePressurePercent: 12,
      subsidenceRate: "25.0 – 52.0 mm / yr (Critical)",
      piezometricHead: "-25.0m Regional Aquifer Deficit",
      matrixState: "Permanent Plastic Compaction",
      summary: "With water pressure gone, clay particles re-align and pack tightly together under overburden pressure. The land drops up to 5.2 cm annually. This compaction is permanent.",
      deepDetail: "Because clay platelets have a high compression index (Cc > 0.4), volumetric reduction is permanent. Even if deep extraction ceases, plastic interparticle rearrangement cannot be reversed by subsequent rainfall.",
      indicatorClass: "text-red-800 bg-red-50 border-red-200"
    }
  ];

  const currentStep = stepsData[selectedStep - 1];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedStep((prev) => (prev === 3 ? 1 : prev + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedStep((prev) => (prev === 1 ? 3 : prev - 1));
    }
  };

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
        <div 
          className="bg-white border border-slate-200 rounded p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 shadow-xs outline-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Aquifer Depletion and Clay Compaction Cycle interactive viewer. Use left and right arrow keys to navigate phases."
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-200 mb-4 sm:mb-6 gap-2.5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-start sm:items-center gap-2 leading-snug">
                <Droplets className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5 sm:mt-0" />
                <span>The Aquifer Depletion &amp; Clay Compaction Cycle</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tap any phase or use <kbd className="font-mono bg-slate-100 border border-slate-300 rounded px-1 text-[10px]">←</kbd> <kbd className="font-mono bg-slate-100 border border-slate-300 rounded px-1 text-[10px]">→</kbd> keys to inspect subsurface mechanics.
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

          {/* 3 Step Cards */}
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

                  {/* Mobile Inline Deep Detail Drawer */}
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

          {/* Interactive Subsurface Geological Cross-Section Visualizer */}
          <div className="mt-6 border border-slate-200 rounded overflow-hidden bg-slate-900 text-slate-100">
            <div className="px-3.5 py-2.5 bg-slate-800/80 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-200">Subsurface Geomechanical Model</span>
                <span className="text-slate-400 hidden sm:inline">• Hagonoy Coastal Alluvial Delta</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Pore Pressure:</span>
                <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                  selectedStep === 1 ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' :
                  selectedStep === 2 ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                  'bg-red-950 text-red-300 border border-red-700'
                }`}>
                  {currentStep.porePressurePercent}%
                </span>
              </div>
            </div>

            {/* Dynamic SVG Soil Cross-Section */}
            <div className="p-3 sm:p-5 relative bg-gradient-to-b from-slate-950 to-slate-900">
              <svg 
                viewBox="0 0 760 210" 
                className="w-full h-auto max-h-[220px]" 
                aria-label={`Subsurface strata cross-section for Phase ${selectedStep}: ${currentStep.title}`}
              >
                {/* Defs for textures & gradients */}
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="tideGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#78350f" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.35" />
                  </linearGradient>
                  <linearGradient id="clayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="aquiferGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

                {/* Sky / Atmospheric Zone */}
                <rect x="0" y="0" width="760" height="210" fill="url(#skyGrad)" />

                {/* Layer Boundaries Calculations based on selectedStep */}
                {/* Ground surface drops in phase 3 from y=48 to y=68 */}
                {(() => {
                  const groundY = selectedStep === 3 ? 68 : 48;
                  const clayTopY = groundY + 45;
                  const clayThickness = selectedStep === 3 ? 35 : (selectedStep === 2 ? 55 : 62);
                  const clayBottomY = clayTopY + clayThickness;
                  const waterTableY = selectedStep === 1 ? groundY + 12 : (selectedStep === 2 ? groundY + 36 : groundY + 44);

                  return (
                    <g>
                      {/* Saturated Upper Sand & Silt Layer */}
                      <rect x="0" y={groundY} width="760" height={clayTopY - groundY} fill="url(#sandGrad)" />
                      <line x1="0" y1={groundY} x2="760" y2={groundY} stroke={selectedStep === 3 ? "#ef4444" : "#94a3b8"} strokeWidth="2.5" />

                      {/* Water Table Indicator Line */}
                      <path 
                        d={selectedStep === 2 
                          ? `M 0 ${groundY + 15} Q 320 ${groundY + 18} 380 ${clayTopY - 4} Q 440 ${groundY + 18} 760 ${groundY + 15}`
                          : `M 0 ${waterTableY} L 760 ${waterTableY}`
                        } 
                        fill="none" 
                        stroke="#38bdf8" 
                        strokeWidth="1.8" 
                        strokeDasharray={selectedStep === 1 ? "none" : "5,4"} 
                      />

                      {/* Compressible Quaternary Clay Aquitard */}
                      <rect x="0" y={clayTopY} width="760" height={clayThickness} fill="url(#clayGrad)" stroke="#475569" strokeWidth="1" />

                      {/* Microscopic Clay Platelet Representations */}
                      {Array.from({ length: 9 }).map((_, i) => {
                        const rowY = clayTopY + 8 + (i * (clayThickness / 10));
                        return (
                          <g key={`platelet-row-${i}`} opacity={selectedStep === 3 ? "0.9" : "0.55"}>
                            <line x1="30" y1={rowY} x2="730" y2={rowY} stroke="#94a3b8" strokeWidth={selectedStep === 3 ? "2" : "1.2"} strokeDasharray={selectedStep === 3 ? "12,2" : "18,8"} />
                          </g>
                        );
                      })}

                      {/* Pore Water Droplets Inside Clay Matrix (Disappears in Phase 3) */}
                      {selectedStep !== 3 && (
                        <g opacity={selectedStep === 1 ? "0.9" : "0.45"}>
                          <circle cx="120" cy={clayTopY + (clayThickness * 0.4)} r="3" fill="#38bdf8" />
                          <circle cx="210" cy={clayTopY + (clayThickness * 0.7)} r="3" fill="#38bdf8" />
                          <circle cx="310" cy={clayTopY + (clayThickness * 0.3)} r="2.5" fill="#38bdf8" />
                          <circle cx="480" cy={clayTopY + (clayThickness * 0.6)} r="3" fill="#38bdf8" />
                          <circle cx="580" cy={clayTopY + (clayThickness * 0.35)} r="2.5" fill="#38bdf8" />
                          <circle cx="670" cy={clayTopY + (clayThickness * 0.7)} r="3" fill="#38bdf8" />
                        </g>
                      )}

                      {/* Outward Hydraulic Pressure Arrows (Phase 1) vs Downward Overburden Compaction (Phase 3) */}
                      {selectedStep === 1 && (
                        <g stroke="#38bdf8" strokeWidth="1.2" opacity="0.8">
                          <path d="M 240 120 L 240 108 M 237 112 L 240 108 L 243 112" />
                          <path d="M 520 120 L 520 108 M 517 112 L 520 108 L 523 112" />
                        </g>
                      )}

                      {selectedStep === 3 && (
                        <g stroke="#ef4444" strokeWidth="1.6" opacity="0.85">
                          <path d="M 180 52 L 180 66 M 176 62 L 180 66 L 184 62" />
                          <path d="M 380 52 L 380 66 M 376 62 L 380 66 L 384 62" />
                          <path d="M 580 52 L 580 66 M 576 62 L 580 66 L 584 62" />
                        </g>
                      )}

                      {/* Deep Confined Aquifer Layer */}
                      <rect x="0" y={clayBottomY} width="760" height={210 - clayBottomY} fill="url(#aquiferGrad)" />

                      {/* Deep Industrial / Fishpond Pumping Well (Active in Phase 2 & 3) */}
                      {selectedStep !== 1 && (
                        <g>
                          {/* Well Pipe Casing */}
                          <rect x="376" y={groundY - 14} width="8" height={clayBottomY - groundY + 24} fill="#64748b" stroke="#334155" strokeWidth="1" />
                          {/* Wellhead Engine / Pump */}
                          <rect x="370" y={groundY - 22} width="20" height="9" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1" />
                          {/* Pumping Suction Arrows */}
                          <path d="M 380 185 L 380 155 M 377 160 L 380 155 L 383 160" stroke="#f59e0b" strokeWidth="1.8" />
                          <text x="395" y={groundY - 15} fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">
                            {selectedStep === 2 ? 'Deep Well Over-Pumping' : 'Exhausted Deep Well'}
                          </text>
                        </g>
                      )}

                      {/* Surface Features: Coastal Houses & Roads */}
                      <g>
                        {/* House 1 */}
                        <polygon points={`90,${groundY - 14} 108,${groundY - 26} 126,${groundY - 14}`} fill="#cbd5e1" />
                        <rect x="94" y={groundY - 14} width="28" height="14" fill="#64748b" />
                        
                        {/* House 2 on Stilts */}
                        <polygon points={`610,${groundY - 16} 628,${groundY - 28} 646,${groundY - 16}`} fill="#cbd5e1" />
                        <rect x="614" y={groundY - 16} width="28" height="16" fill="#475569" />
                        <line x1="616" y1={groundY} x2="616" y2={groundY - 6} stroke="#e2e8f0" strokeWidth="2" />
                        <line x1="640" y1={groundY} x2="640" y2={groundY - 6} stroke="#e2e8f0" strokeWidth="2" />

                        {/* Road Line */}
                        <line x1="160" y1={groundY - 1} x2="350" y2={groundY - 1} stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <line x1="420" y1={groundY - 1} x2="580" y2={groundY - 1} stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                      </g>

                      {/* Tidal Water Level on Coast (In Phase 3, high tide submerges ground) */}
                      {selectedStep === 3 ? (
                        <g>
                          {/* Submerging Sea Water Backflow */}
                          <path d={`M 0 44 C 60 42 120 46 180 44 L 180 ${groundY + 6} L 0 ${groundY + 6} Z`} fill="url(#tideGrad)" />
                          <text x="14" y="38" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                            ▲ High Spring Tide Inundation (MHWS)
                          </text>
                          <line x1="0" y1="44" x2="760" y2="44" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="4,4" />
                        </g>
                      ) : (
                        <g>
                          {/* Normal Tide Baseline */}
                          <line x1="0" y1="44" x2="140" y2="44" stroke="#0284c7" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
                          <text x="10" y="38" fill="#38bdf8" fontSize="8" fontFamily="monospace" opacity="0.75">
                            Mean Sea Level Baseline (MSL)
                          </text>
                        </g>
                      )}

                      {/* Strata Labels */}
                      <text x="12" y={groundY + 22} fill="#e2e8f0" fontSize="9" fontFamily="monospace" opacity="0.75">
                        Sandy Silt Overburden
                      </text>
                      <text x="12" y={clayTopY + 16} fill="#f1f5f9" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        Quaternary Compressible Clay Aquitard {selectedStep === 3 && "(COMPACTED -42%)"}
                      </text>
                      <text x="12" y={clayBottomY + 16} fill="#7dd3fc" fontSize="9" fontFamily="monospace" opacity="0.85">
                        Deep Confined Aquifer (Sierra Madre Recharge)
                      </text>

                      {/* Delta Surface Marker */}
                      <text x="635" y={groundY - 5} fill={selectedStep === 3 ? "#ef4444" : "#94a3b8"} fontSize="9" fontFamily="monospace" fontWeight="bold">
                        {selectedStep === 3 ? "Surface: -5.2cm/yr" : "Surface: 0.0m MSL"}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Live Telemetry Status Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 sm:p-4 bg-slate-900 border-t border-slate-800 text-[11px] font-mono">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Pore Water Pressure</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        selectedStep === 1 ? 'bg-cyan-500' : selectedStep === 2 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${currentStep.porePressurePercent}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-200">{currentStep.porePressurePercent}%</span>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Subsidence Velocity</span>
                <span className={`font-bold block mt-1 ${
                  selectedStep === 1 ? 'text-cyan-400' : selectedStep === 2 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {currentStep.subsidenceRate}
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Piezometric Head</span>
                <span className="font-bold text-slate-200 block mt-1 truncate">
                  {currentStep.piezometricHead}
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Matrix Geomechanics</span>
                <span className="font-bold text-slate-300 block mt-1 truncate">
                  {currentStep.matrixState}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Expanded Step Deep Detail Banner */}
          <div className="hidden md:flex mt-6 p-4 rounded bg-slate-50 border border-slate-200 animate-fade-in text-xs text-slate-700 items-start gap-3">
            <AlertCircle className="w-4 h-4 text-cyan-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 font-mono block mb-1">
                Hydrogeological Mechanics (Phase {selectedStep}: {currentStep.title})
              </span>
              <p className="leading-relaxed">
                {currentStep.deepDetail}
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