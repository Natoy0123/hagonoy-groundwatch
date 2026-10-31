import React from 'react';
import { BookOpen, ExternalLink, FileCheck } from 'lucide-react';
import { REFERENCES_DATA } from '../data/subsidenceData';

export default function References() {
  return (
    <section id="references" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
            <BookOpen className="w-4 h-4 text-cyan-700" />
            <span>Academic Integrity & Scientific Evidence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Scientific References (APA 7th Edition)
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            All geological metrics, subsidence rates, aquifer dynamics, and tidal observations on this platform are grounded in peer-reviewed scientific literature and official agency hazard reports.
          </p>
        </div>

        {/* References List */}
        <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 space-y-6">
          {REFERENCES_DATA.map((ref, idx) => (
            <div
              key={ref.id}
              className="pb-6 border-b border-slate-100 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed pl-6 -indent-6">
                    <span className="font-mono text-slate-400 font-sans text-xs mr-2 indent-0">
                      [{idx + 1}]
                    </span>
                    {ref.citation}
                  </div>
                  <div className="text-xs text-slate-500 pl-6 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-700">Relevance:</span>
                    <span>{ref.relevance}</span>
                  </div>
                </div>

                <a
                  href={ref.doi}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium rounded border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
                  title="Open source document / DOI"
                >
                  <span>Link</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Standard Badge */}
        <div className="mt-8 flex items-center justify-between p-4 bg-white border border-slate-200 rounded text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>
              All citations conform to the American Psychological Association (APA) 7th Edition style guide.
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
            Environmental Science Final Course Output
          </span>
        </div>
      </div>
    </section>
  );
}
