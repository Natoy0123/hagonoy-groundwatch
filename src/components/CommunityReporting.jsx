import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle, Camera, ExternalLink, ListFilter } from 'lucide-react';
import { HAGONOY_BARANGAYS } from '../data/subsidenceData';

export default function CommunityReporting({ isOpenModal, onCloseModal }) {
  const [activeFormMode, setActiveFormMode] = useState('direct');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [filterBarangay, setFilterBarangay] = useState('All');

  // Confirmation & Receipt Dialog States
  const [pendingReport, setPendingReport] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  // Form Fields
  const [barangay, setBarangay] = useState('Pugad');
  const [issueType, setIssueType] = useState('Sunny-Day Tidal Flooding');
  const [waterDepth, setWaterDepth] = useState('6 - 12 inches');
  const [description, setDescription] = useState('');
  const [reporterType, setReporterType] = useState('Resident');

  // Stored Reports in LocalStorage
  const [reportsList, setReportsList] = useState([
    {
      id: 1,
      barangay: "Tibaguin",
      issueType: "Sunny-Day Tidal Flooding",
      waterDepth: "12 - 18 inches",
      description: "Spring tide entered school premises at 11:30 AM. Classes shifted to makeshift stilt catwalks.",
      reporterType: "Teacher / Resident",
      date: "2026-10-28"
    },
    {
      id: 2,
      barangay: "San Pascual",
      issueType: "Structural Foundation Cracking",
      waterDepth: "None",
      description: "Concrete fence tilted by ~15 degrees due to differential settlement near old aquaculture well.",
      reporterType: "Homeowner",
      date: "2026-10-25"
    },
    {
      id: 3,
      barangay: "Mercado",
      issueType: "Drainage Backflow",
      waterDepth: "4 - 8 inches",
      description: "High tide backflow through drainage culvert near public market during full moon tide.",
      reporterType: "Merchant",
      date: "2026-10-22"
    }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hagonoy_groundwatch_reports');
      if (saved) {
        setReportsList(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleInitiateSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setPendingReport({
      id: Date.now(),
      refCode: `HGW-${Math.floor(1000 + Math.random() * 9000)}`,
      barangay,
      issueType,
      waterDepth,
      description,
      reporterType,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleConfirmSubmit = () => {
    if (!pendingReport) return;
    const updated = [pendingReport, ...reportsList];
    setReportsList(updated);
    try {
      localStorage.setItem('hagonoy_groundwatch_reports', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setReceiptData(pendingReport);
    setPendingReport(null);
    setDescription('');
  };

  const formContent = (
    <div>
      {/* Form Mode Toggle */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8 p-1.5 bg-slate-100 rounded-md border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveFormMode('direct')}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded transition-all duration-200 ${
            activeFormMode === 'direct'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          GroundWatch Direct Portal
        </button>
        <button
          type="button"
          onClick={() => setActiveFormMode('google')}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded transition-all duration-200 ${
            activeFormMode === 'google'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Google Form Integration
        </button>
      </div>

      {activeFormMode === 'direct' ? (
        <form onSubmit={handleInitiateSubmit} className="space-y-5">
          {submittedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-sm flex items-center gap-2.5 animate-fade-in font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Observation recorded successfully and added to the community telemetry log.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Barangay Location:
              </label>
              <select
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full text-sm sm:text-base p-3 rounded-md border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                {HAGONOY_BARANGAYS.map((b) => (
                  <option key={b.name} value={b.name}>
                    Brgy. {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Incident / Issue Category:
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full text-sm sm:text-base p-3 rounded-md border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                <option value="Sunny-Day Tidal Flooding">Sunny-Day Tidal Flooding</option>
                <option value="Structural Foundation Cracking">Structural Foundation Cracking</option>
                <option value="House Jacking / Raising Work">House Jacking / Floor Raising Work</option>
                <option value="Shallow Well Salinization">Shallow Well Salinization / Drying</option>
                <option value="Drainage Backflow">Drainage Culvert Backflow</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Estimated Water Depth:
              </label>
              <select
                value={waterDepth}
                onChange={(e) => setWaterDepth(e.target.value)}
                className="w-full text-sm sm:text-base p-3 rounded-md border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                <option value="None / Structural Only">None / Structural Issue Only</option>
                <option value="1 - 6 inches (Ankle level)">1 - 6 inches (Ankle level)</option>
                <option value="6 - 12 inches (Shin level)">6 - 12 inches (Shin level)</option>
                <option value="12 - 24 inches (Knee level)">12 - 24 inches (Knee level)</option>
                <option value="&gt; 24 inches (Waist level+)">Over 24 inches (Waist level+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Your Role / Affiliation:
              </label>
              <select
                value={reporterType}
                onChange={(e) => setReporterType(e.target.value)}
                className="w-full text-sm sm:text-base p-3 rounded-md border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                <option value="Resident">Barangay Resident</option>
                <option value="LGU / Barangay Official">LGU / Barangay Official</option>
                <option value="Student / Researcher">Student / Researcher</option>
                <option value="Fisherfolk / Business Owner">Fisherfolk / Business Owner</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Field Description & Observation Notes:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe street name, time of high tide inundation, foundation cracks observed, or house floor lifting..."
              className="w-full text-sm sm:text-base p-3 rounded-md border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs sm:text-sm text-slate-500 font-mono">
              Data logged anonymously for environmental education.
            </span>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-sm"
            >
              <Send className="w-4 h-4" />
              Submit Field Report
            </button>
          </div>
        </form>
      ) : (
        /* Google Form Integration Mode */
        <div className="space-y-5 animate-fade-in">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700">
            <div className="font-bold text-slate-900 mb-1.5 flex items-center justify-between text-base">
              <span>Google Form Prototype Integration</span>
              <a
                href="https://docs.google.com/forms"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-800 hover:underline text-xs sm:text-sm font-mono font-bold"
              >
                Open in New Tab <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-slate-600 mb-4 leading-relaxed">
              This module embeds an official community intake form for synchronization with municipal disaster risk reduction (MDRRMO) spreadsheets.
            </p>

            <div className="border border-slate-300 rounded overflow-hidden bg-white shadow-xs interactive-card">
              <div className="p-3.5 bg-slate-100 border-b border-slate-200 text-xs sm:text-sm font-mono flex items-center justify-between">
                <span>Google Form: Hagonoy Land Subsidence Citizen Intake</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 radar-dot"></span>
                  Form Active
                </span>
              </div>
              <div className="p-8 text-center space-y-4">
                <MessageSquare className="w-10 h-10 text-cyan-700 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                  LGU Hagonoy Environmental Incident Reporting Form
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Municipal Environmental and Natural Resources Office (MENRO) & UP-NIGS Research Partnership Form.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveFormMode('direct')}
                    className="px-5 py-2.5 text-sm font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all shadow-xs"
                  >
                    Use Built-in Interactive Form Instead
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // If used as modal
  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
        <div className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-xl animate-scale-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                Community Sinking & Tidal Inundation Report
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Submit localized observations in Hagonoy, Bulacan.
              </p>
            </div>
            <button
              onClick={onCloseModal}
              className="text-slate-400 hover:text-slate-700 active:scale-90 transition-transform text-xl font-bold p-1 rounded"
            >
              ✕
            </button>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  // Regular In-page Section
  return (
    <section id="community-report" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Form Box */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-md p-6 sm:p-9 shadow-xs">
            <div className="max-w-xl mb-7 sm:mb-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-800">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700" />
                <span>Citizen Telemetry & Incident Ingestion</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
                Report Sinking, Cracking, or Tidal Flooding
              </h2>
              <p className="text-sm sm:text-base text-slate-700 mt-1.5 leading-relaxed">
                Ground-truth observations bridge scientific modeling with community realities. Log incidents to support municipal hazard mapping.
              </p>
            </div>
            {formContent}
          </div>

          {/* Right: Live Community Log Feed */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-md p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 mb-5 gap-2.5">
              <div className="flex items-center gap-2">
                <ListFilter className="w-5 h-5 text-slate-700" />
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Recent Ground-Truth Logs
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={filterBarangay}
                  onChange={(e) => setFilterBarangay(e.target.value)}
                  className="text-xs sm:text-sm p-1.5 border border-slate-300 rounded-md bg-slate-50 text-slate-800 font-semibold"
                >
                  <option value="All">All Barangays</option>
                  {HAGONOY_BARANGAYS.map((b) => (
                    <option key={b.name} value={b.name}>
                      Brgy. {b.name}
                    </option>
                  ))}
                </select>
                <span className="text-xs font-mono text-cyan-800 font-bold px-2.5 py-1 rounded bg-cyan-50 border border-cyan-200">
                  {reportsList.length}
                </span>
              </div>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {(filterBarangay === 'All' ? reportsList : reportsList.filter(r => r.barangay === filterBarangay)).map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-md text-sm space-y-2 interactive-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">
                      Brgy. {rep.barangay}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {rep.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-100 text-cyan-900">
                      {rep.issueType}
                    </span>
                    {rep.waterDepth !== 'None' && rep.waterDepth !== 'None / Structural Only' && (
                      <span className="text-xs font-mono text-red-700 font-bold">
                        Depth: {rep.waterDepth}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm pt-1">
                    "{rep.description}"
                  </p>
                  <div className="text-xs text-slate-500 pt-1.5 border-t border-slate-200 font-mono">
                    Logged by: {rep.reporterType}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {pendingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 sm:p-7 shadow-xl animate-scale-in">
            <div className="flex items-center gap-2.5 text-cyan-800 font-bold text-lg mb-2">
              <AlertCircle className="w-5 h-5 text-cyan-700" />
              <span>Confirm Observation Submission</span>
            </div>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              Please verify your report details. Once confirmed, this field observation will be indexed into the open-access telemetry log for Hagonoy.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-sm space-y-2.5 mb-6 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Sector:</span>
                <span className="font-bold text-slate-900">Brgy. {pendingReport.barangay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-bold text-cyan-800">{pendingReport.issueType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Water Depth:</span>
                <span className="font-bold text-slate-900">{pendingReport.waterDepth}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-slate-800 font-sans text-sm">
                "{pendingReport.description}"
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPendingReport(null)}
                className="px-4 py-2.5 text-sm font-semibold rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition active:scale-95"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-5 py-2.5 text-sm font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 transition shadow-xs active:scale-95"
              >
                Confirm & Log Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Receipt Dialog */}
      {receiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 sm:p-8 shadow-xl animate-scale-in text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3.5">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-1.5">
              Field Telemetry Successfully Logged
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              Your observation for <strong>Brgy. {receiptData.barangay}</strong> is now live in the community register.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded font-mono text-sm mb-6 space-y-1.5">
              <div className="text-slate-500 text-xs uppercase font-medium">Telemetry Tracking ID</div>
              <div className="text-xl font-extrabold text-cyan-900">{receiptData.refCode}</div>
              <div className="text-xs text-slate-500">Timestamp: {receiptData.date} | Status: PUBLIC_OPEN_ACCESS</div>
            </div>

            <button
              type="button"
              onClick={() => {
                setReceiptData(null);
                if (onCloseModal) onCloseModal();
              }}
              className="w-full py-3 text-sm font-bold rounded bg-slate-900 text-white hover:bg-slate-800 transition active:scale-98 shadow-xs"
            >
              Close & View in Live Register
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
