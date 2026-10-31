import React from 'react';
import { ArrowUp, Shield, Globe2, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-sm py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Platform Overview */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3 text-white font-extrabold text-lg tracking-tight">
              <img
                src="./logo.svg"
                alt="Hagonoy GroundWatch Logo"
                className="w-9 h-9 object-contain"
              />
              <span>HAGONOY GROUNDWATCH</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An educational civic telemetry and environmental awareness platform dedicated to tracking anthropogenic land subsidence and coastal inundation dynamics in Hagonoy, Bulacan.
            </p>
            <div className="text-xs font-mono text-slate-400 font-medium">
              Developed as the Final Course Output for Environmental Science (1st Semester, A.Y. 2026–2027).
            </div>
          </div>

          {/* Col 2: Course & Group Deliverable Info */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-mono">
              Academic Project Details
            </h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div><strong className="text-white">Course:</strong> Environmental Science</div>
              <div><strong className="text-white">Term:</strong> 1st Semester, 2026–2027</div>
              <div><strong className="text-white">Municipality:</strong> Hagonoy, Bulacan, Philippines</div>
              <div><strong className="text-white">Deliverable:</strong> Community Website (70%) & Report (30%)</div>
            </div>
          </div>

          {/* Col 3: Navigation & Action */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider font-mono mb-3">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#overview" className="hover:text-cyan-400 transition font-medium">Geological Overview</a></li>
                <li><a href="#causes-effects" className="hover:text-cyan-400 transition font-medium">Causes & Community Impact</a></li>
                <li><a href="#hazard-map" className="hover:text-cyan-400 transition font-medium">Interactive Hazard Map</a></li>
                <li><a href="#estimator" className="hover:text-cyan-400 transition font-medium">Aquifer Stress Simulator</a></li>
                <li><a href="#mitigation" className="hover:text-cyan-400 transition font-medium">Mitigation Strategies</a></li>
                <li><a href="#references" className="hover:text-cyan-400 transition font-medium">APA 7th References</a></li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition font-mono text-xs sm:text-sm font-semibold active:scale-95"
              >
                <ArrowUp className="w-4 h-4" />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <div>
            &copy; 2026 Hagonoy GroundWatch Project Group. Published under CC BY 4.0 for Environmental Education.
          </div>
          <div className="font-mono text-slate-400 flex items-center gap-1.5 font-medium">
            <span>Powered by Leaflet GIS & Scientific Open Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
