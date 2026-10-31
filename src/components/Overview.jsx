import React from 'react';
import { Layers, Droplets, ArrowDownToLine, Waves, HelpCircle } from 'lucide-react';

export default function Overview() {
  return (
    <section id="overview" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-800">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700" />
            <span>Environmental Science Context</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            What is Land Subsidence and Why is Hagonoy Sinking?
          </h2>
          <p className="mt-3.5 sm:mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            Land subsidence is the gradual or sudden downward settling of the Earth's surface. 
            In Hagonoy, Bulacan, this process is predominantly <strong>anthropogenic</strong> (man-made), driven by excessive deep-well extraction that drains ancient aquifers beneath the coastal delta.
          </p>
        </div>

        {/* Geological Mechanics Diagram Box */}
        <div className="bg-white border border-slate-200 rounded p-6 sm:p-9 mb-10 sm:mb-14 shadow-xs">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 flex items-center gap-2.5">
            <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-700 shrink-0" />
            The Aquifer Depletion & Clay Compaction Cycle
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-4xl leading-relaxed">
            Beneath Hagonoy lies the coastal plain of the Pampanga River Delta—composed of water-saturated clay, silt, and sand. Here is how deep groundwater pumping permanently collapses the ground:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="border border-slate-200 rounded p-5 sm:p-6 bg-slate-50/50 interactive-card">
              <div className="w-9 h-9 rounded bg-cyan-700 text-white font-mono font-bold flex items-center justify-center text-base mb-3.5 shadow-xs">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Natural Hydrostatic Equilibrium
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Pore water trapped between microscopic clay platelets exerts outward hydraulic pressure, supporting the weight of overlying sediment and structures.
              </p>
              <div className="mt-4 pt-3.5 border-t border-slate-200 font-mono text-xs sm:text-sm text-cyan-800 font-bold">
                Pore Pressure: NORMAL (Equilibrium)
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-amber-200 rounded p-5 sm:p-6 bg-amber-50/40 interactive-card">
              <div className="w-9 h-9 rounded bg-amber-600 text-white font-mono font-bold flex items-center justify-center text-base mb-3.5 shadow-xs">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Over-Extraction & Depressurization
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Thousands of uncontrolled deep wells pump groundwater for commercial aquaculture fishponds and households faster than rainfall can recharge the deep confined aquifers.
              </p>
              <div className="mt-4 pt-3.5 border-t border-amber-200 font-mono text-xs sm:text-sm text-amber-900 font-bold">
                Water Table: DRAWDOWN CONES DETECTED
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-red-200 rounded p-5 sm:p-6 bg-red-50/40 interactive-card">
              <div className="w-9 h-9 rounded bg-red-600 text-white font-mono font-bold flex items-center justify-center text-base mb-3.5 shadow-xs">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Irreversible Clay Matrix Collapse
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                With water pressure gone, clay particles re-align and pack tightly together under overburden pressure. The land drops up to 5.2 cm annually. This compaction is permanent.
              </p>
              <div className="mt-4 pt-3.5 border-t border-red-200 font-mono text-xs sm:text-sm text-red-900 font-bold">
                Ground Surface: DROPPING (Active Sinking)
              </div>
            </div>
          </div>
        </div>

        {/* Key Realities vs Myths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 interactive-card">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm sm:text-base mb-3">
              <HelpCircle className="w-5 h-5 shrink-0" />
              Common Misconception
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
              "Is Hagonoy flooding solely because of climate change and sea level rise?"
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong>Scientific Fact:</strong> Global sea level rises at ~3.4 millimeters per year. Meanwhile, parts of Hagonoy are sinking at <strong>up to 52 millimeters per year</strong>. Sinking land accounts for more than <strong>90% of the relative sea level rise</strong> experienced along Hagonoy's coastline. Treating this solely as ocean warming ignores the root culprit: excessive groundwater pumping.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 interactive-card">
            <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm sm:text-base mb-3">
              <Waves className="w-5 h-5 shrink-0" />
              The "Sunny Day Flooding" Phenomenon
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
              Why do roads submerge under clear skies?
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Because coastal barangays (such as Pugad, Tibaguin, and San Pascual) have sunk below the mean high-water spring (MHWS) tide level of Manila Bay, seawater naturally pushes backwards through river estuaries, storm drains, and permeable soil during daily tidal peaks—flooding communities even in peak dry season.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
