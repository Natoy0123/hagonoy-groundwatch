import React, { useState } from 'react';
import { AlertTriangle, MapPin, Activity, FileText, Menu, X, PlusCircle, Info } from 'lucide-react';

export default function Header({ onOpenReport }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Causes & Effects", href: "#causes-effects" },
    { label: "Hazard Map", href: "#hazard-map" },
    { label: "Impact Estimator", href: "#estimator" },
    { label: "Mitigation", href: "#mitigation" },
    { label: "Citizen Reports", href: "#community-report" },
    { label: "References", href: "#references" },
  ];

  const handleScrollToMap = () => {
    setIsTelemetryModalOpen(false);
    const mapEl = document.getElementById('hazard-map');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      {/* Telemetry Status Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTelemetryModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-emerald-400 font-medium hover:text-emerald-300 transition cursor-pointer whitespace-nowrap"
              title="Click to view sensor telemetry diagnostics"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 radar-dot"></span>
              TELEMETRY ACTIVE
              <Info className="w-3 h-3 text-emerald-400/80" />
            </button>
            <span className="hidden sm:inline text-slate-600">|</span>
            <button
              onClick={handleScrollToMap}
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition whitespace-nowrap cursor-pointer"
              title="Click to locate on interactive map"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Hagonoy, Bulacan (14.8344° N, 120.7329° E)
            </button>
          </div>
          <div className="flex items-center gap-4 text-slate-400 whitespace-nowrap">
            <span className="hidden md:inline">Basin: Pampanga Delta Lowlands</span>
            <a
              href="#hazard-map"
              className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1 font-semibold"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Hazard: Critical Land Subsidence
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
        <div className="flex items-center justify-between h-16 gap-2 xl:gap-3">
          {/* Brand/Logo block - strictly nowrap and shrink-0 */}
          <div
            className="flex items-center gap-2 group cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="./logo.svg"
              alt="Hagonoy GroundWatch Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0"
            />
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-cyan-700 transition-colors whitespace-nowrap">
                  HAGONOY GROUNDWATCH
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase bg-cyan-50 text-cyan-800 border border-cyan-200 rounded whitespace-nowrap shrink-0">
                  Civic Obs v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden xl:block whitespace-nowrap">
                Environmental Awareness & Land Subsidence Telemetry
              </p>
            </div>
          </div>

          {/* Desktop Nav: tight compact spacing, strict nowrap, visible on lg and above */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-5 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap py-1 text-xs xl:text-sm font-medium text-slate-600 hover:text-cyan-700 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-700 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button on Desktop */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-xs font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-sm whitespace-nowrap cursor-pointer shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report <span className="hidden xl:inline">Sinking </span>Issue</span>
            </button>
          </div>

          {/* Mobile / Tablet (< lg) hamburger and quick report button */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all whitespace-nowrap shadow-xs"
              title="Report Sinking Issue"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report Issue</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 animate-scale-in" /> : <Menu className="w-5 h-5 animate-scale-in" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 animate-fade-in-up">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-sm font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 transition-colors"
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
              className="w-full text-center px-4 py-2.5 text-xs font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-98 transition-all"
            >
              Report Sinking Issue
            </button>
          </div>
        </div>
      )}

      {/* Telemetry Diagnostics Modal */}
      {isTelemetryModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-5 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 radar-dot"></span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Telemetry Diagnostics & Sensor Spec
                </h3>
              </div>
              <button
                onClick={() => setIsTelemetryModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Telemetry Node:</span>
                  <span className="font-bold text-slate-900">HGW-MUNICIPAL-OBS-01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Centroid:</span>
                  <span className="font-bold text-slate-900">14.8344° N, 120.7329° E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Geodetic Datum:</span>
                  <span className="font-semibold text-slate-700">WGS84 / PRS92</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">InSAR Dataset:</span>
                  <span className="font-semibold text-cyan-800">UP-NIGS Sentinel-1 2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tidal Datum:</span>
                  <span className="font-semibold text-slate-700">DOST-PAGASA MHWS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-700">ONLINE (Continuous)</span>
                </div>
              </div>

              <p className="font-sans text-slate-600 text-[11px] leading-relaxed">
                GroundWatch correlates satellite radar surface displacement telemetry with localized citizen ground-truth reports across Hagonoy, Bulacan.
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={handleScrollToMap}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 transition cursor-pointer"
              >
                Locate on GIS Map
              </button>
              <button
                onClick={() => setIsTelemetryModalOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}