import React from 'react';
import { ArrowDown, AlertCircle, Compass, ShieldAlert, ArrowUpRight, ExternalLink } from 'lucide-react';
import { TELEMETRY_STATS } from '../data/subsidenceData';

export default function Hero({ onOpenReport }) {
  const getKpiDestination = (id) => {
    switch (id) {
      case 'subsidence-rate':
        return { href: '#hazard-map', targetLabel: 'Explore Hazard Map →' };
      case 'cumulative-drop':
        return { href: '#causes-effects', targetLabel: 'Inspect Causes →' };
      case 'high-tide-flooding':
        return { href: '#overview', targetLabel: 'Sinking Physics →' };
      case 'population-exposed':
        return { href: '#community-report', targetLabel: 'View Citizen Logs →' };
      default:
        return { href: '#hazard-map', targetLabel: 'Explore Data →' };
    }
  };

  return (
    <section className="relative bg-white border-b border-slate-200 pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Background subtle telemetry grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Urgent Alert Banner */}
        <a
          href="#overview"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium mb-6 animate-fade-in transition-all duration-200 hover:bg-amber-100 hover:border-amber-300 hover:scale-[1.01] cursor-pointer"
          title="Click to learn about relative sea level rise vs land subsidence"
        >
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Scientific Assessment:</strong> Coastal Bulacan is subsiding up to <strong>15× faster</strong> than global sea level rise. <span className="underline ml-1">Learn mechanics →</span>
          </span>
        </a>

        {/* Hero Headings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 animate-fade-in-up">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Community-Based Environmental Telemetry for Land Subsidence in Hagonoy, Bulacan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Unregulated groundwater overdrafting combined with soft deltaic sediments is pulling Hagonoy beneath sea level. 
              GroundWatch synthesizes geological survey data, satellite InSAR measurements, and citizen incident reports to drive urgent environmental advocacy and municipal action.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#hazard-map"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-cyan-700 text-white font-semibold text-sm hover:bg-cyan-800 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-md"
              >
                <Compass className="w-4 h-4" />
                Explore Hazard Map
              </a>
              <button
                onClick={onOpenReport}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white text-slate-800 font-semibold text-sm border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-sm"
              >
                Log Sinking / Flood Incident
              </button>
              <a
                href="#causes-effects"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-150 group"
              >
                Learn Causes
                <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
              </a>
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded p-5 interactive-card">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                Ground Zero Summary
              </span>
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded transition-transform duration-200 hover:scale-105">
                HIGH VULNERABILITY
              </span>
            </div>
            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <a
                href="#hazard-map"
                className="flex justify-between py-1 border-b border-slate-100 hover:bg-slate-100/60 px-1 rounded transition-colors group"
                title="Locate on Hazard Map"
              >
                <span className="text-slate-500 group-hover:text-cyan-800">Location:</span>
                <span className="font-semibold text-slate-800 group-hover:text-cyan-800 flex items-center gap-1">
                  Hagonoy River & Manila Bay Delta <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-700" />
                </span>
              </a>
              <div className="flex justify-between py-1 border-b border-slate-100 hover:bg-slate-100/50 px-1 rounded transition-colors">
                <span className="text-slate-500">Subsurface Matrix:</span>
                <span className="font-semibold text-slate-800">Unconsolidated Silt & Clay Alluvium</span>
              </div>
              <a
                href="#causes-effects"
                className="flex justify-between py-1 border-b border-slate-100 hover:bg-slate-100/60 px-1 rounded transition-colors group"
                title="Learn about commercial deep wells"
              >
                <span className="text-slate-500 group-hover:text-cyan-800">Primary Stressor:</span>
                <span className="font-semibold text-slate-800 group-hover:text-cyan-800 flex items-center gap-1">
                  Commercial Aquaculture Wells <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-700" />
                </span>
              </a>
              <a
                href="#overview"
                className="flex justify-between py-1 hover:bg-slate-100/60 px-1 rounded transition-colors group"
                title="Read about sunny-day tidal floods"
              >
                <span className="text-slate-500 group-hover:text-red-700">Primary Manifestation:</span>
                <span className="font-semibold text-red-700 flex items-center gap-1">
                  Permanent 'Sunny Day' Tidal Floods <ArrowUpRight className="w-3 h-3 text-red-400" />
                </span>
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              <a href="#references" className="hover:text-cyan-800 hover:underline transition">
                Source: Geological Society London / UP-NIGS (Eco et al., 2020) →
              </a>
            </div>
          </div>
        </div>

        {/* Telemetry KPI Grid - All Cards Interactive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TELEMETRY_STATS.map((stat, idx) => {
            const dest = getKpiDestination(stat.id);
            return (
              <a
                key={stat.id}
                href={dest.href}
                className="block bg-white border border-slate-200 rounded p-4 interactive-card group hover:border-cyan-300 transition-all duration-200 cursor-pointer"
                style={{ animationDelay: `${idx * 80}ms` }}
                title={`Click to ${dest.targetLabel}`}
              >
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wide text-slate-500 mb-1">
                  <span>{stat.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-cyan-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono transition-colors duration-150 group-hover:text-cyan-800">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-600">{stat.unit}</span>
                </div>
                <div className="mt-2 text-xs font-medium text-slate-600 flex items-center gap-1">
                  <span className={stat.status === 'critical' ? 'text-red-600' : 'text-amber-700'}>
                    ● {stat.change}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="truncate">{stat.source}</span>
                  <span className="text-cyan-700 font-semibold text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {dest.targetLabel}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}