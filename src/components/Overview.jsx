import React from 'react';
import { Layers, Droplets, ArrowDownToLine, Waves, HelpCircle } from 'lucide-react';

export default function Overview() {
  return (
    <section id="overview" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
            <Layers className="w-4 h-4" />
            <span>Environmental Science Context</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            What is Land Subsidence and Why is Hagonoy Sinking?
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Land subsidence is the gradual or sudden downward settling of the Earth's surface. 
            In Hagonoy, Bulacan, this process is predominantly <strong>anthropogenic</strong> (man-made), driven by excessive deep-well extraction that drains ancient aquifers beneath the coastal delta.
          </p>
        </div>

        {/* Geological Mechanics Diagram Box */}
        <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-cyan-700" />
            The Aquifer Depletion & Clay Compaction Cycle
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Beneath Hagonoy lies the coastal plain of the Pampanga River Delta—composed of water-saturated clay, silt, and sand. Here is how deep groundwater pumping permanently collapses the ground:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="border border-slate-200 rounded p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded bg-cyan-700 text-white font-mono font-bold flex items-center justify-center text-sm mb-3">
                01
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-1.5">
                Natural Hydrostatic Equilibrium
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pore water trapped between microscopic clay platelets exerts outward hydraulic pressure, supporting the weight of overlying sediment and structures.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 font-mono text-[11px] text-cyan-800">
                Pore Pressure: NORMAL (Equilibrium)
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-amber-200 rounded p-5 bg-amber-50/30">
              <div className="w-8 h-8 rounded bg-amber-600 text-white font-mono font-bold flex items-center justify-center text-sm mb-3">
                02
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-1.5">
                Over-Extraction & Pore Depressurization
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thousands of uncontrolled deep wells pump groundwater for commercial aquaculture fishponds and households faster than rainfall can recharge the deep confined aquifers.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-200 font-mono text-[11px] text-amber-800">
                Water Table: DRAWDOWN CONES DETECTED
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-red-200 rounded p-5 bg-red-50/30">
              <div className="w-8 h-8 rounded bg-red-600 text-white font-mono font-bold flex items-center justify-center text-sm mb-3">
                03
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-1.5">
                Irreversible Clay Matrix Collapse
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                With water pressure gone, clay particles re-align and pack tightly together under overburden pressure. The land drops up to 5.2 cm annually. This compaction is permanent.
              </p>
              <div className="mt-4 pt-3 border-t border-red-200 font-mono text-[11px] text-red-800">
                Ground Surface: DROPPING (Subsidence Active)
              </div>
            </div>
          </div>
        </div>

        {/* Key Realities vs Myths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded p-6">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-sm mb-3">
              <HelpCircle className="w-4 h-4" />
              Common Misconception
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">
              "Is Hagonoy flooding solely because of climate change and sea level rise?"
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Scientific Fact:</strong> Global sea level rises at ~3.4 millimeters per year. Meanwhile, parts of Hagonoy are sinking at <strong>up to 52 millimeters per year</strong>. Sinking land accounts for more than <strong>90% of the relative sea level rise</strong> experienced along Hagonoy's coastline. Treating this solely as ocean warming ignores the root culprit: excessive groundwater pumping.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded p-6">
            <div className="flex items-center gap-2 text-cyan-800 font-semibold text-sm mb-3">
              <Waves className="w-4 h-4" />
              The "Sunny Day Flooding" Phenomenon
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">
              Why do roads submerge under clear skies?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Because coastal barangays (such as Pugad, Tibaguin, and San Pascual) have sunk below the mean high-water spring (MHWS) tide level of Manila Bay, seawater naturally pushes backwards through river estuaries, storm drains, and permeable soil during daily tidal peaks—flooding communities even in peak dry season.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
