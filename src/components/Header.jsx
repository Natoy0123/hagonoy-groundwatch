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
      {/* Telemetry Status Strip - Scaled up and fluid */}
      <div className="bg-slate-900 text-slate-200 text-xs sm:text-sm py-2 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 radar-dot"></span>
              TELEMETRY ACTIVE
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              Hagonoy, Bulacan (14.8344° N, 120.7329° E)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden lg:inline text-slate-400">Basin: Pampanga Delta Lowlands</span>
            <span className="text-amber-300 flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              Critical Subsidence Hazard
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Platform Name */}
          <div 
            className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="./logo.svg"
              alt="Hagonoy GroundWatch Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-xl lg:text-2xl tracking-tight group-hover:text-cyan-700 transition-colors">
                  HAGONOY GROUNDWATCH
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono font-bold uppercase bg-cyan-50 text-cyan-800 border border-cyan-200 rounded">
                  Civic Obs v1.0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 hidden sm:block font-medium">
                Environmental Awareness & Land Subsidence Telemetry
              </p>
            </div>
          </div>

          {/* Desktop Nav (lg and above) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1.5 text-sm xl:text-base font-semibold text-slate-700 hover:text-cyan-700 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-700 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Report Sinking Issue
            </button>
          </div>

          {/* Mobile/Tablet Controls (< lg) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="p-2 text-cyan-700 hover:bg-slate-100 rounded active:scale-90 transition-transform"
              title="Report Issue"
              aria-label="Report Sinking Issue"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7 animate-scale-in" /> : <Menu className="w-7 h-7 animate-scale-in" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-fade-in-up shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded text-base font-semibold text-slate-800 hover:bg-cyan-50 hover:text-cyan-800 transition-colors"
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
              className="w-full text-center px-4 py-3 text-base font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-98 transition-all shadow-xs"
            >
              Report Sinking Issue
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
