import React from 'react';
import { ArrowUp, Shield, Globe2, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Platform Overview */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base tracking-tight">
              <img
                src="./logo.svg"
                alt="Hagonoy GroundWatch Logo"
                className="w-8 h-8 object-contain"
              />
              <span>HAGONOY GROUNDWATCH</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An educational civic telemetry and environmental awareness platform dedicated to tracking anthropogenic land subsidence and coastal inundation dynamics in Hagonoy, Bulacan.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              Developed as the Final Course Output for Environmental Science (1st Semester, A.Y. 2026–2027).
            </div>
          </div>

          {/* Col 2: Course & Group Deliverable Info */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">
              Academic Project Details
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div><strong>Course:</strong> Environmental Science</div>
              <div><strong>Term:</strong> 1st Semester, 2026–2027</div>
              <div><strong>Target Municipality:</strong> Hagonoy, Bulacan, Philippines</div>
              <div><strong>Project Type:</strong> Community Awareness Website (70%) & Technical Report (30%)</div>
            </div>
          </div>

          {/* Col 3: Navigation & Action */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono mb-2">
                Quick Navigation
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#overview" className="hover:text-cyan-400 transition">Geological Overview</a></li>
                <li><a href="#causes-effects" className="hover:text-cyan-400 transition">Causes & Community Impact</a></li>
                <li><a href="#hazard-map" className="hover:text-cyan-400 transition">Interactive Hazard Map</a></li>
                <li><a href="#estimator" className="hover:text-cyan-400 transition">Aquifer Stress Simulator</a></li>
                <li><a href="#mitigation" className="hover:text-cyan-400 transition">Mitigation Strategies</a></li>
                <li><a href="#references" className="hover:text-cyan-400 transition">APA 7th References</a></li>
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition font-mono text-xs"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; 2026 Hagonoy GroundWatch Project Group. Published under CC BY 4.0 for Environmental Education.
          </div>
          <div className="font-mono text-slate-400 flex items-center gap-1">
            <span>Powered by Leaflet GIS & Scientific Open Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
