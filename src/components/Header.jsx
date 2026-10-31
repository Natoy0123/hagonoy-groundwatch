import React, { useState } from 'react';
import { AlertTriangle, MapPin, Activity, FileText, Menu, X, PlusCircle } from 'lucide-react';

export default function Header({ onOpenReport }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Causes & Effects", href: "#causes-effects" },
    { label: "Hazard Map", href: "#hazard-map" },
    { label: "Impact Estimator", href: "#estimator" },
    { label: "Mitigation", href: "#mitigation" },
    { label: "References", href: "#references" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      {/* Telemetry Status Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 radar-dot"></span>
              TELEMETRY ACTIVE
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Hagonoy, Bulacan (14.8344° N, 120.7329° E)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">Basin: Pampanga Delta Lowlands</span>
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              Hazard: Critical Land Subsidence
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="./logo.svg"
              alt="Hagonoy GroundWatch Logo"
              className="w-10 h-10 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-cyan-700 transition-colors">
                  HAGONOY GROUNDWATCH
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase bg-cyan-50 text-cyan-800 border border-cyan-200 rounded">
                  Civic Obs v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Environmental Awareness & Land Subsidence Telemetry
              </p>
            </div>
          </div>

          {/* Desktop Nav (lg and above to prevent tablet overflow) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-sm font-medium text-slate-600 hover:text-cyan-700 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-700 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Report Sinking Issue
            </button>
          </div>

          {/* Mobile/Tablet hamburger (< lg) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="p-1.5 text-cyan-700 hover:bg-slate-100 rounded active:scale-90 transition-transform"
              title="Report Issue"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 animate-scale-in" /> : <Menu className="w-6 h-6 animate-scale-in" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown with slide/fade */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 animate-fade-in-up">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport();
              }}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-98 transition-all"
            >
              Report Sinking Issue
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
