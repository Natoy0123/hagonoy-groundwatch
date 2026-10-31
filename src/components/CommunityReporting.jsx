import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle, ExternalLink, ListFilter, RotateCcw, Download, Search, Info } from 'lucide-react';
import { HAGONOY_BARANGAYS } from '../data/subsidenceData';

export default function CommunityReporting({
  isOpenModal = false,
  onCloseModal,
  reportsList = [],
  onAddReport,
  onResetReports
}) {
  const [activeFormMode, setActiveFormMode] = useState('direct');
  const [filterBarangay, setFilterBarangay] = useState('All');
  const [searchLogQuery, setSearchLogQuery] = useState('');
  const [validationError, setValidationError] = useState('');

  // Confirmation & Receipt Dialog States
  const [pendingReport, setPendingReport] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [selectedReportDetail, setSelectedReportDetail] = useState(null);

  // Form Fields
  const [barangay, setBarangay] = useState('Pugad');
  const [issueType, setIssueType] = useState('Sunny-Day Tidal Flooding');
  const [waterDepth, setWaterDepth] = useState('6 - 12 inches');
  const [description, setDescription] = useState('');
  const [reporterType, setReporterType] = useState('Resident');

  const handleInitiateSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setValidationError('Please enter a description of the observed sinking or flood incident.');
      return;
    }
    setValidationError('');

    const newPending = {
      id: Date.now(),
      refCode: `HGW-${Math.floor(1000 + Math.random() * 9000)}`,
      barangay,
      issueType,
      waterDepth,
      description: description.trim(),
      reporterType,
      date: new Date().toISOString().split('T')[0]
    };

    setPendingReport(newPending);
  };

  const handleConfirmSubmit = () => {
    if (!pendingReport) return;
    if (onAddReport) {
      onAddReport(pendingReport);
    }
    setReceiptData(pendingReport);
    setPendingReport(null);
    setDescription('');
    setValidationError('');
  };

  const handleCloseReceipt = () => {
    setReceiptData(null);
    if (onCloseModal) {
      onCloseModal();
    }
    setTimeout(() => {
      const section = document.getElementById('community-report');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleExecuteReset = () => {
    if (onResetReports) {
      onResetReports();
    }
    setIsResetConfirmOpen(false);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportsList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `hagonoy-groundwatch-reports-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Shared Form Content
  const formContent = (
    <div>
      {/* Form Mode Toggle */}
      <div className="flex items-center gap-2 mb-6 p-1 bg-slate-100 rounded border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveFormMode('direct')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all duration-200 cursor-pointer ${
            activeFormMode === 'direct'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          GroundWatch Direct Portal
        </button>
        <button
          type="button"
          onClick={() => setActiveFormMode('google')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all duration-200 cursor-pointer ${
            activeFormMode === 'google'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Google Form Integration
        </button>
      </div>

      {activeFormMode === 'direct' ? (
        <form onSubmit={handleInitiateSubmit} className="space-y-4">
          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Barangay Location:
              </label>
              <select
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                {HAGONOY_BARANGAYS.map((b) => (
                  <option key={b.name} value={b.name}>
                    Brgy. {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Incident / Issue Category:
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                <option value="Sunny-Day Tidal Flooding">Sunny-Day Tidal Flooding</option>
                <option value="Structural Foundation Cracking">Structural Foundation Cracking</option>
                <option value="House Jacking / Raising Work">House Jacking / Floor Raising Work</option>
                <option value="Shallow Well Salinization">Shallow Well Salinization / Drying</option>
                <option value="Drainage Backflow">Drainage Culvert Backflow</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Estimated Water Depth:
              </label>
              <select
                value={waterDepth}
                onChange={(e) => setWaterDepth(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                <option value="None / Structural Only">None / Structural Issue Only</option>
                <option value="1 - 6 inches (Ankle level)">1 - 6 inches (Ankle level)</option>
                <option value="6 - 12 inches (Shin level)">6 - 12 inches (Shin level)</option>
                <option value="12 - 24 inches (Knee level)">12 - 24 inches (Knee level)</option>
                <option value="&gt; 24 inches (Waist level+)">Over 24 inches (Waist level+)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Your Role / Affiliation:
              </label>
              <select
                value={reporterType}
                onChange={(e) => setReporterType(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                <option value="Resident">Barangay Resident</option>
                <option value="LGU / Barangay Official">LGU / Barangay Official</option>
                <option value="Student / Researcher">Student / Researcher</option>
                <option value="Fisherfolk / Business Owner">Fisherfolk / Business Owner</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Field Description & Observation Notes:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="Describe street name, time of high tide inundation, foundation cracks observed, or house floor lifting..."
              className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 font-mono">
              Data logged anonymously for environmental education.
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all duration-150 shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Field Report
            </button>
          </div>
        </form>
      ) : (
        /* Google Form Integration Mode */
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700">
            <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
              <span>Google Form Prototype Integration</span>
              <a
                href="https://docs.google.com/forms"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-cyan-800 hover:underline text-[11px] font-mono cursor-pointer"
              >
                Open in New Tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-600 mb-3">
              This module embeds an official community intake form for synchronization with municipal disaster risk reduction (MDRRMO) spreadsheets.
            </p>

            <div className="border border-slate-300 rounded overflow-hidden bg-white shadow-xs interactive-card">
              <div className="p-3 bg-slate-100 border-b border-slate-200 text-[11px] font-mono flex items-center justify-between">
                <span>Google Form: Hagonoy Land Subsidence Citizen Intake</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 radar-dot"></span>
                  Form Active
                </span>
              </div>
              <div className="p-6 text-center space-y-3">
                <MessageSquare className="w-8 h-8 text-cyan-700 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">
                  LGU Hagonoy Environmental Incident Reporting Form
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Municipal Environmental and Natural Resources Office (MENRO) & UP-NIGS Research Partnership Form.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveFormMode('direct')}
                    className="px-4 py-2 text-xs font-semibold rounded bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 transition-all shadow-xs cursor-pointer"
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

  // Reusable Dialogs
  const confirmationDialog = pendingReport && (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-cyan-800 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-cyan-700" />
            <span>Confirm Observation Submission</span>
          </div>
          <button
            type="button"
            onClick={() => setPendingReport(null)}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Please verify your field report details before committing. Once logged, this observation will be indexed into the public telemetry registry for Hagonoy.
        </p>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-2 mb-5 font-mono">
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
          <div className="flex justify-between">
            <span className="text-slate-500">Reporter:</span>
            <span className="font-semibold text-slate-700">{pendingReport.reporterType}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 text-slate-700 font-sans text-xs">
            "{pendingReport.description}"
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => setPendingReport(null)}
            className="px-4 py-2 text-xs font-semibold rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
          >
            Back to Edit
          </button>
          <button
            type="button"
            onClick={handleConfirmSubmit}
            className="px-4 py-2 text-xs font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 transition shadow-xs active:scale-95 cursor-pointer"
          >
            Confirm & Log Report
          </button>
        </div>
      </div>
    </div>
  );

  const receiptDialog = receiptData && (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 shadow-2xl animate-scale-in text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base mb-1">
          Field Telemetry Successfully Logged
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Your observation for <strong>Brgy. {receiptData.barangay}</strong> is now recorded in the civic register.
        </p>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded font-mono text-xs mb-5 space-y-1">
          <div className="text-slate-500 text-[10px] uppercase">Telemetry Reference ID</div>
          <div className="text-xl font-extrabold text-cyan-900 tracking-wider">{receiptData.refCode}</div>
          <div className="text-[10px] text-slate-400">Timestamp: {receiptData.date} | Status: PUBLIC_OPEN_ACCESS</div>
        </div>

        <button
          type="button"
          onClick={handleCloseReceipt}
          className="w-full py-2.5 text-xs font-bold rounded bg-slate-900 text-white hover:bg-slate-800 transition active:scale-98 shadow-sm cursor-pointer"
        >
          Close & View in Live Register
        </button>
      </div>
    </div>
  );

  const resetConfirmDialog = isResetConfirmOpen && (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-lg max-w-sm w-full p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-2">
          <RotateCcw className="w-5 h-5 text-amber-600" />
          <span>Reset Telemetry Records?</span>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          This will restore the community telemetry feed to the default baseline records. Any locally submitted observations will be cleared.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(false)}
            className="px-3 py-1.5 text-xs font-semibold rounded border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExecuteReset}
            className="px-3.5 py-1.5 text-xs font-bold rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );

  // If component is mounted as a Modal
  if (isOpenModal) {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-xl animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Community Sinking & Tidal Inundation Report
                </h3>
                <p className="text-xs text-slate-500">
                  Submit localized observations in Hagonoy, Bulacan.
                </p>
              </div>
              <button
                onClick={onCloseModal}
                className="text-slate-400 hover:text-slate-700 active:scale-90 transition-transform text-lg font-bold p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>
            {formContent}
          </div>
        </div>

        {/* Modal dialog overlays */}
        {confirmationDialog}
        {receiptDialog}
      </>
    );
  }

  // Regular In-page Section
  const displayedReports = reportsList.filter((r) => {
    const matchesBarangay = filterBarangay === 'All' || r.barangay === filterBarangay;
    const query = searchLogQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      r.barangay.toLowerCase().includes(query) ||
      r.issueType.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      (r.refCode && r.refCode.toLowerCase().includes(query));
    return matchesBarangay && matchesQuery;
  });

  return (
    <section id="community-report" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Box */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded p-6 sm:p-8 shadow-xs">
            <div className="max-w-xl mb-6">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
                <MessageSquare className="w-4 h-4 text-cyan-700" />
                <span>Citizen Telemetry & Incident Ingestion</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
                Report Sinking, Cracking, or Tidal Flooding
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Ground-truth observations bridge scientific modeling with community realities. Log incidents to support municipal hazard mapping.
              </p>
            </div>
            {formContent}
          </div>

          {/* Right: Live Community Log Feed */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 mb-3 gap-2">
              <div className="flex items-center gap-2">
                <ListFilter className="w-4 h-4 text-slate-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Recent Ground-Truth Logs
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-slate-600 hover:text-cyan-800 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
                  title="Export telemetry logs as JSON dataset"
                >
                  <Download className="w-3 h-3 text-cyan-700" />
                  JSON
                </button>
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="text-[11px] font-mono text-slate-500 hover:text-slate-800 p-1 rounded hover:bg-slate-100 transition cursor-pointer"
                  title="Reset to default baseline records"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <select
                  value={filterBarangay}
                  onChange={(e) => setFilterBarangay(e.target.value)}
                  className="text-[11px] p-1 border border-slate-200 rounded bg-slate-50 text-slate-700 font-medium"
                >
                  <option value="All">All Barangays</option>
                  {HAGONOY_BARANGAYS.map((b) => (
                    <option key={b.name} value={b.name}>
                      Brgy. {b.name}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] font-mono text-cyan-800 font-semibold px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200">
                  {reportsList.length}
                </span>
              </div>
            </div>

            {/* Keyword Search Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={searchLogQuery}
                onChange={(e) => setSearchLogQuery(e.target.value)}
                placeholder="Search logs by keyword, street, or code..."
                className="w-full text-xs p-1.5 pl-7 rounded border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-cyan-700"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              {searchLogQuery && (
                <button
                  onClick={() => setSearchLogQuery('')}
                  className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
              {displayedReports.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded border border-slate-100 font-mono">
                  No incident logs found matching criteria.
                </div>
              ) : (
                displayedReports.map((rep) => (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReportDetail(rep)}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5 interactive-card hover:border-cyan-400 transition cursor-pointer"
                    title="Click to view full observation record"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        Brgy. {rep.barangay}
                      </span>
                      <div className="flex items-center gap-2">
                        {rep.refCode && (
                          <span className="text-[10px] font-mono text-cyan-800 bg-cyan-100/60 px-1 rounded">
                            {rep.refCode}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-400">
                          {rep.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-100 text-cyan-900">
                        {rep.issueType}
                      </span>
                      {rep.waterDepth && rep.waterDepth !== 'None' && rep.waterDepth !== 'None / Structural Only' && (
                        <span className="text-[10px] font-mono text-red-700 font-semibold">
                          Depth: {rep.waterDepth}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px] pt-1">
                      "{rep.description}"
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 font-mono flex justify-between">
                      <span>Logged by: {rep.reporterType}</span>
                      <span className="text-cyan-700 font-semibold hover:underline">Inspect →</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReportDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-700" />
                <h3 className="font-bold text-slate-900 text-base">
                  Telemetry Record: {selectedReportDetail.refCode || 'HGW-LOG'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReportDetail(null)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Barangay Sector:</span>
                  <span className="font-bold text-slate-900">Brgy. {selectedReportDetail.barangay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hazard Category:</span>
                  <span className="font-bold text-cyan-800">{selectedReportDetail.issueType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Depth:</span>
                  <span className="font-semibold text-slate-800">{selectedReportDetail.waterDepth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Observer Role:</span>
                  <span className="font-semibold text-slate-700">{selectedReportDetail.reporterType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Log Timestamp:</span>
                  <span className="font-semibold text-slate-700">{selectedReportDetail.date}</span>
                </div>
              </div>

              <div className="font-sans text-slate-700 text-xs p-3 bg-white border border-slate-200 rounded leading-relaxed">
                "{selectedReportDetail.description}"
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReportDetail(null)}
                className="px-4 py-2 text-xs font-semibold rounded bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-page dialog overlays */}
      {confirmationDialog}
      {receiptDialog}
      {resetConfirmDialog}
    </section>
  );
}