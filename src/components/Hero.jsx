import React from 'react';
import { ArrowDown, AlertCircle, Compass, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { TELEMETRY_STATS } from '../data/subsidenceData';

export default function Hero({ onOpenReport }) {
  return (
    <section className="relative bg-white border-b border-slate-200 pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Background telemetry pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Urgent Alert Banner */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-fade-in transition-transform duration-200 hover:scale-[1.01] shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>Scientific Assessment:</strong> Coastal Bulacan is subsiding up to <strong>15× faster</strong> than global sea level rise.
          </span>
        </div>

        {/* Hero Headings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 sm:mb-14 animate-fade-in-up">
          <div className="lg:col-span-8">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              Community-Based Environmental Telemetry for Land Subsidence in Hagonoy, Bulacan
            </h1>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-slate-700 max-w-3xl leading-relaxed">
              Unregulated groundwater overdrafting combined with soft deltaic sediments is pulling Hagonoy beneath sea level. 
              GroundWatch synthesizes geological survey data, satellite InSAR measurements, and citizen incident reports to drive urgent environmental advocacy and municipal action.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              <a
                href="#hazard-map"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-cyan-700 text-white font-bold text-sm sm:text-base hover:bg-cyan-800 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-md text-center"
              >
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Hazard Map
              </a>
              <button
                onClick={onOpenReport}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-white text-slate-800 font-bold text-sm sm:text-base border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-sm text-center"
              >
                Log Sinking / Flood Incident
              </button>
              <a
                href="#causes-effects"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-slate-700 hover:text-slate-950 text-sm sm:text-base font-semibold transition-colors duration-150 group text-center"
              >
                Learn Causes
                <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
              </a>
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded p-5 sm:p-6 interactive-card shadow-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-600">
                Ground Zero Summary
              </span>
              <span className="text-xs font-mono font-bold text-red-700 bg-red-100 border border-red-300 px-2.5 py-1 rounded">
                HIGH VULNERABILITY
              </span>
            </div>
            <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-slate-800">
              <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-slate-200/70 gap-1">
                <span className="text-slate-500 font-medium">Location:</span>
                <span className="font-bold text-slate-900 sm:text-right">Hagonoy River & Manila Bay Delta</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-slate-200/70 gap-1">
                <span className="text-slate-500 font-medium">Subsurface Matrix:</span>
                <span className="font-bold text-slate-900 sm:text-right">Unconsolidated Silt & Clay</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-slate-200/70 gap-1">
                <span className="text-slate-500 font-medium">Primary Stressor:</span>
                <span className="font-bold text-slate-900 sm:text-right">Aquaculture Deep Wells</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 gap-1">
                <span className="text-slate-500 font-medium">Manifestation:</span>
                <span className="font-bold text-red-700 sm:text-right">Sunny-Day Tidal Floods</span>
              </div>
            </div>
            <div className="mt-4 pt-3.5 border-t border-slate-200 text-xs text-slate-500 font-medium">
              Source: Geological Society London / UP-NIGS (Eco et al., 2020)
            </div>
          </div>
        </div>

        {/* Telemetry KPI Grid - High contrast & large fonts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TELEMETRY_STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className="bg-white border border-slate-200 rounded p-5 sm:p-6 interactive-card shadow-2xs"
            >
              <div className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wide text-slate-600 mb-2">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-600 font-mono">
                  {stat.unit}
                </span>
              </div>
              <div className="mt-3 text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <span className={stat.status === 'critical' ? 'text-red-700' : 'text-amber-800'}>
                  ● {stat.change}
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-500 font-mono truncate">
                {stat.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
