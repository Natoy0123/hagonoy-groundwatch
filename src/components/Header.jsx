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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      {/* Telemetry Status Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              TELEMETRY ACTIVE
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Hagonoy, Bulacan (14.8344° N, 120.7329° E)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">Basin: Pampanga Delta Lowlands</span>
            <span className="text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Hazard: Critical Land Subsidence
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-cyan-700 flex items-center justify-center text-white font-bold tracking-tight">
              GW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">HAGONOY GROUNDWATCH</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase bg-cyan-50 text-cyan-800 border border-cyan-200 rounded">
                  Civic Obs v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Environmental Awareness & Land Subsidence Telemetry
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-cyan-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 transition-colors shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Report Sinking Issue
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="p-1.5 text-cyan-700 hover:bg-slate-100 rounded"
              title="Report Issue"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-cyan-700"
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
              className="w-full text-center px-4 py-2.5 text-sm font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800"
            >
              Report Sinking Issue
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
