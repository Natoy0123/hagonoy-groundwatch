import React from 'react';
import { BookOpen, ExternalLink, FileCheck } from 'lucide-react';
import { REFERENCES_DATA } from '../data/subsidenceData';

export default function References() {
  return (
    <section id="references" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-800">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700" />
            <span>Academic Integrity & Scientific Evidence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            Scientific References (APA 7th Edition)
          </h2>
          <p className="mt-3.5 sm:mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            All geological metrics, subsidence rates, aquifer dynamics, and tidal observations on this platform are grounded in peer-reviewed scientific literature and official agency hazard reports.
          </p>
        </div>

        {/* References List */}
        <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-9 space-y-7 shadow-xs">
          {REFERENCES_DATA.map((ref, idx) => (
            <div
              key={ref.id}
              className="pb-7 border-b border-slate-100 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="text-sm sm:text-base text-slate-800 font-serif leading-relaxed pl-6 -indent-6">
                    <span className="font-mono text-slate-400 font-sans text-xs sm:text-sm mr-2 indent-0 font-bold">
                      [{idx + 1}]
                    </span>
                    {ref.citation}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 pl-6 flex flex-wrap items-center gap-2 leading-relaxed">
                    <span className="font-bold text-slate-800">Relevance:</span>
                    <span>{ref.relevance}</span>
                  </div>
                </div>

                <a
                  href={ref.doi}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-mono font-bold rounded border border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 transition shadow-2xs self-start"
                  title="Open source document / DOI"
                >
                  <span>Link</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Standard Badge */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white border border-slate-200 rounded text-xs sm:text-sm text-slate-700 gap-2">
          <div className="flex items-center gap-2.5 font-medium">
            <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              All citations conform to the American Psychological Association (APA) 7th Edition style guide.
            </span>
          </div>
          <span className="text-slate-500 font-mono text-xs hidden md:inline">
            Environmental Science Final Course Output
          </span>
        </div>
      </div>
    </section>
  );
}
