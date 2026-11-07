import React, { useState, useEffect, useMemo } from 'react';
import {
  Send,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  ListFilter,
  RotateCcw,
  Download,
  Search,
  Info,
  MapPin,
  Copy,
  Check,
  PhoneCall,
  FileSpreadsheet,
  Sparkles
} from 'lucide-react';
import { HAGONOY_BARANGAYS, ALL_HAGONOY_BARANGAY_NAMES } from '../data/subsidenceData';

const QUICK_OBSERVATION_TEMPLATES = [
  {
    label: 'High-Tide Road Submersion',
    issueType: 'Sunny-Day Tidal Flooding',
    waterDepth: '12 - 24 inches (Knee level)',
    text: 'High tide flooded main barangay road and residential alleys despite clear skies. Tricycles and light vehicles unable to pass for 3 hours.'
  },
  {
    label: 'Foundation & Wall Cracking',
    issueType: 'Structural Foundation Cracking',
    waterDepth: 'None / Structural Only',
    text: 'Observed diagonal settlement cracks along perimeter wall and ground floor slab sinking ~4 inches below street drainage level.'
  },
  {
    label: 'Brackish / Salty Well Water',
    issueType: 'Shallow Well Salinization',
    waterDepth: 'None / Structural Only',
    text: 'Household shallow pitcher pump discharging saline, brackish water with rust odor during peak high-tide cycles.'
  }
];

function computeReportSeverity(issueType, waterDepth) {
  if (
    waterDepth.includes('24 inches') ||
    waterDepth.includes('12 - 24') ||
    waterDepth.includes('12 - 18')
  ) {
    return 'Critical';
  }
  if (
    issueType === 'Structural Foundation Cracking' ||
    issueType === 'Sunny-Day Tidal Flooding' ||
    waterDepth.includes('6 - 12')
  ) {
    return 'Severe';
  }
  return 'Moderate';
}

export default function CommunityReporting({
  isOpenModal = false,
  onCloseModal,
  reportsList = [],
  onAddReport,
  onResetReports,
  onLocateOnMap,
  preselectedBarangayRequest = null
}) {
  const [activeFormMode, setActiveFormMode] = useState('direct');
  const [filterBarangay, setFilterBarangay] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchLogQuery, setSearchLogQuery] = useState('');
  const [validationError, setValidationError] = useState('');
  const [copiedRefCode, setCopiedRefCode] = useState(false);

  // Confirmation & Receipt Dialog States
  const [pendingReport, setPendingReport] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [selectedReportDetail, setSelectedReportDetail] = useState(null);

  // Form Fields (Fixed default value to match exact <option> value)
  const [barangay, setBarangay] = useState('Pugad');
  const [streetLandmark, setStreetLandmark] = useState('');
  const [issueType, setIssueType] = useState('Sunny-Day Tidal Flooding');
  const [waterDepth, setWaterDepth] = useState('6 - 12 inches (Shin level)');
  const [description, setDescription] = useState('');
  const [reporterType, setReporterType] = useState('Resident');

  // Sync preselected barangay when triggered from HazardMap
  useEffect(() => {
    if (preselectedBarangayRequest && preselectedBarangayRequest.name) {
      setBarangay(preselectedBarangayRequest.name);
      setActiveFormMode('direct');
    }
  }, [preselectedBarangayRequest]);

  // Compute live summary metrics from reportsList
  const telemetrySummary = useMemo(() => {
    const total = reportsList.length;
    const tidalCount = reportsList.filter(
      (r) => r.issueType === 'Sunny-Day Tidal Flooding' || r.issueType === 'Drainage Backflow'
    ).length;
    const structuralCount = reportsList.filter(
      (r) =>
        r.issueType === 'Structural Foundation Cracking' ||
        r.issueType === 'House Jacking / Raising Work'
    ).length;

    const countsByBrgy = {};
    reportsList.forEach((r) => {
      countsByBrgy[r.barangay] = (countsByBrgy[r.barangay] || 0) + 1;
    });
    let topHotspot = 'Pugad';
    let maxCount = 0;
    Object.entries(countsByBrgy).forEach(([bName, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topHotspot = bName;
      }
    });

    return { total, tidalCount, structuralCount, topHotspot, maxCount };
  }, [reportsList]);

  const applyTemplate = (tpl) => {
    setIssueType(tpl.issueType);
    setWaterDepth(tpl.waterDepth);
    setDescription(tpl.text);
    setValidationError('');
  };

  const handleInitiateSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setValidationError('Please enter a description of the observed sinking or flood incident.');
      return;
    }
    setValidationError('');

    const fullDescription = streetLandmark.trim()
      ? `[${streetLandmark.trim()}] ${description.trim()}`
      : description.trim();

    const newPending = {
      id: Date.now(),
      refCode: `HGW-${Math.floor(1000 + Math.random() * 9000)}`,
      barangay,
      issueType,
      waterDepth,
      severity: computeReportSeverity(issueType, waterDepth),
      description: fullDescription,
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
    setStreetLandmark('');
    setValidationError('');
    setCopiedRefCode(false);
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
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(reportsList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `hagonoy-groundwatch-reports-${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const headers = [
      'Reference_ID',
      'Date',
      'Barangay',
      'Issue_Category',
      'Water_Depth',
      'Severity',
      'Reporter_Role',
      'Description'
    ];
    const escapeCsv = (val) => {
      const s = String(val ?? '').replace(/"/g, '""');
      return `"${s}"`;
    };
    const rows = reportsList.map((r) =>
      [
        r.refCode || `HGW-${r.id}`,
        r.date,
        r.barangay,
        r.issueType,
        r.waterDepth,
        r.severity || computeReportSeverity(r.issueType || '', r.waterDepth || ''),
        r.reporterType,
        r.description
      ]
        .map(escapeCsv)
        .join(',')
    );
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent([headers.join(','), ...rows].join('\n'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute(
      'download',
      `hagonoy-groundwatch-reports-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyReceiptCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedRefCode(true);
      setTimeout(() => setCopiedRefCode(false), 2000);
    } catch {
      setCopiedRefCode(false);
    }
  };

  const handleDownloadReceiptTxt = (rep) => {
    const lines = [
      '============================================================',
      'HAGONOY GROUNDWATCH — CITIZEN TELEMETRY OBSERVATION RECEIPT',
      '============================================================',
      `Reference ID:     ${rep.refCode}`,
      `Date Logged:      ${rep.date}`,
      `Barangay Sector:  Brgy. ${rep.barangay}, Hagonoy, Bulacan`,
      `Hazard Category:  ${rep.issueType}`,
      `Estimated Depth:  ${rep.waterDepth}`,
      `Computed Risk:    ${rep.severity || computeReportSeverity(rep.issueType, rep.waterDepth)}`,
      `Observer Role:    ${rep.reporterType}`,
      '------------------------------------------------------------',
      'FIELD OBSERVATION NOTES:',
      rep.description,
      '============================================================',
      'Status: PUBLIC_OPEN_ACCESS | Node: HGW-MUNICIPAL-OBS-01'
    ].join('\n');

    const blobUrl =
      'data:text/plain;charset=utf-8,' + encodeURIComponent(lines);
    const a = document.createElement('a');
    a.setAttribute('href', blobUrl);
    a.setAttribute('download', `${rep.refCode}-telemetry-receipt.txt`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const canLocateOnMap = (bName) =>
    HAGONOY_BARANGAYS.some((b) => b.name.toLowerCase() === bName.toLowerCase());

  const instrumentedNames = HAGONOY_BARANGAYS.map((b) => b.name);
  const additionalBarangays = ALL_HAGONOY_BARANGAY_NAMES.filter(
    (name) => !instrumentedNames.includes(name)
  );

  // Shared Form Content
  const formContent = (
    <div>
      {/* Form Mode Toggle */}
      <div className="flex items-center gap-2 mb-5 p-1 bg-slate-100 rounded border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveFormMode('direct')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all duration-200 cursor-pointer ${
            activeFormMode === 'direct'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          GroundWatch Direct Intake
        </button>
        <button
          type="button"
          onClick={() => setActiveFormMode('directory')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all duration-200 cursor-pointer ${
            activeFormMode === 'directory'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          LGU &amp; MDRRMO Dispatch Directory
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

          {/* Quick Observation Presets */}
          <div className="p-2.5 bg-white border border-slate-200 rounded">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
              <span>Quick Field Templates (Click to pre-fill):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_OBSERVATION_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.label}
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-900 border border-slate-200 hover:border-cyan-300 transition cursor-pointer"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Barangay Location (All 26 Sectors):
              </label>
              <select
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
              >
                <optgroup label="Primary InSAR Telemetry Sectors (GIS Mapped)">
                  {HAGONOY_BARANGAYS.map((b) => (
                    <option key={b.name} value={b.name}>
                      Brgy. {b.name} ({b.risk} — {b.rateCmYear} cm/yr)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Additional Hagonoy Municipal Barangays">
                  {additionalBarangays.map((name) => (
                    <option key={name} value={name}>
                      Brgy. {name}
                    </option>
                  ))}
                </optgroup>
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
                <option value="> 24 inches (Waist level+)">Over 24 inches (Waist level+)</option>
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
              Street / Sitio / Landmark <span className="text-slate-400 font-normal">(Optional)</span>:
            </label>
            <input
              type="text"
              value={streetLandmark}
              onChange={(e) => setStreetLandmark(e.target.value)}
              placeholder="e.g., Near Brgy. Hall, Purok 3 Fishport Road, Elementary School Gate..."
              className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white text-slate-800 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-700">
                Field Description &amp; Observation Notes:
              </label>
              <span className="text-[10px] font-mono text-slate-400">
                Computed Risk:{' '}
                <strong
                  className={
                    computeReportSeverity(issueType, waterDepth) === 'Critical'
                      ? 'text-red-600'
                      : computeReportSeverity(issueType, waterDepth) === 'Severe'
                      ? 'text-orange-600'
                      : 'text-amber-700'
                  }
                >
                  {computeReportSeverity(issueType, waterDepth)}
                </strong>
              </span>
            </div>
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

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <span className="text-[11px] text-slate-500 font-mono">
              Data logged locally &amp; exportable as CSV/JSON for civic research.
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
        /* LGU & MDRRMO Dispatch Directory Mode */
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-white border border-slate-200 rounded text-xs text-slate-700 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <PhoneCall className="w-4 h-4 text-cyan-700" />
                <span>Hagonoy LGU &amp; Provincial Hazard Agencies</span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                24/7 Dispatch Channels
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              For urgent structural collapse, deep coastal inundation, or municipal water conduit ruptures, coordinate directly with local disaster and geological authorities alongside logging your telemetry report:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[11px]">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 font-sans text-xs">Hagonoy MDRRMO Rescue</div>
                <div className="text-slate-500 mt-0.5">Municipal Disaster Risk Reduction</div>
                <div className="text-cyan-800 font-bold mt-1.5">(044) 793-5811 / 0917-582-0911</div>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 font-sans text-xs">Bulacan PDRRMO Operations</div>
                <div className="text-slate-500 mt-0.5">Provincial Flood &amp; Tide Monitoring</div>
                <div className="text-cyan-800 font-bold mt-1.5">(044) 791-0566 / Emergency 911</div>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 font-sans text-xs">DENR-MGB Region III</div>
                <div className="text-slate-500 mt-0.5">Mines &amp; Geosciences Subsidence Desk</div>
                <div className="text-cyan-800 font-bold mt-1.5">region3@mgb.gov.ph</div>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 font-sans text-xs">NWRB Groundwater Regulation</div>
                <div className="text-slate-500 mt-0.5">Unpermitted Deep-Well Reporting</div>
                <div className="text-cyan-800 font-bold mt-1.5">nwrb.gov.ph / (02) 8920-2775</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-700" />
                Export All Citizen Logs (CSV Spreadsheet)
              </button>
              <button
                type="button"
                onClick={() => setActiveFormMode('direct')}
                className="px-3.5 py-1.5 text-xs font-bold rounded bg-cyan-700 text-white hover:bg-cyan-800 transition cursor-pointer"
              >
                Return to Direct Intake Form →
              </button>
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
            <span className="text-slate-500">Computed Severity:</span>
            <span
              className={`font-bold ${
                pendingReport.severity === 'Critical'
                  ? 'text-red-600'
                  : pendingReport.severity === 'Severe'
                  ? 'text-orange-600'
                  : 'text-amber-700'
              }`}
            >
              {pendingReport.severity}
            </span>
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
            Confirm &amp; Log Report
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

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded font-mono text-xs mb-4 space-y-1.5">
          <div className="text-slate-500 text-[10px] uppercase">Telemetry Reference ID</div>
          <div className="text-xl font-extrabold text-cyan-900 tracking-wider">{receiptData.refCode}</div>
          <div className="text-[10px] text-slate-400">
            Timestamp: {receiptData.date} | Severity: {receiptData.severity || 'Verified'}
          </div>
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyReceiptCode(receiptData.refCode)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              {copiedRefCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiedRefCode ? 'Copied ID!' : 'Copy ID'}
            </button>
            <button
              type="button"
              onClick={() => handleDownloadReceiptTxt(receiptData)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <Download className="w-3 h-3 text-cyan-700" />
              Save Receipt (.txt)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCloseReceipt}
          className="w-full py-2.5 text-xs font-bold rounded bg-slate-900 text-white hover:bg-slate-800 transition active:scale-98 shadow-sm cursor-pointer"
        >
          Close &amp; View in Live Register
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
                  Community Sinking &amp; Tidal Inundation Report
                </h3>
                <p className="text-xs text-slate-500">
                  Submit localized observations across all 26 barangays in Hagonoy, Bulacan.
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
    const matchesCategory = filterCategory === 'All' || r.issueType === filterCategory;
    const query = searchLogQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      r.barangay.toLowerCase().includes(query) ||
      r.issueType.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      (r.refCode && r.refCode.toLowerCase().includes(query));
    return matchesBarangay && matchesCategory && matchesQuery;
  });

  // Collect unique barangays present in either instrumented list or reportsList for filter dropdown
  const filterableBarangays = Array.from(
    new Set([...HAGONOY_BARANGAYS.map((b) => b.name), ...reportsList.map((r) => r.barangay)])
  );

  return (
    <section id="community-report" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Telemetry Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Total Logged Observations
            </span>
            <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">
              {telemetrySummary.total} Records
            </span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Tidal &amp; Backflow Reports
            </span>
            <span className="text-xl font-extrabold text-cyan-800 font-mono mt-0.5 block">
              {telemetrySummary.tidalCount} Incidents
            </span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Structural &amp; Floor Settlement
            </span>
            <span className="text-xl font-extrabold text-amber-700 font-mono mt-0.5 block">
              {telemetrySummary.structuralCount} Incidents
            </span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Most Active Reporting Sector
            </span>
            <span className="text-base font-extrabold text-red-700 font-mono mt-1 block truncate">
              Brgy. {telemetrySummary.topHotspot} ({telemetrySummary.maxCount})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Box */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded p-6 sm:p-8 shadow-xs">
            <div className="max-w-xl mb-5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
                <MessageSquare className="w-4 h-4 text-cyan-700" />
                <span>Citizen Telemetry &amp; Incident Ingestion</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
                Report Sinking, Cracking, or Tidal Flooding
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Ground-truth observations bridge scientific modeling with community realities. Log incidents to support municipal hazard mapping across all 26 Hagonoy barangays.
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
                <span className="text-[11px] font-mono text-cyan-800 font-semibold px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200">
                  {displayedReports.length} / {reportsList.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-slate-600 hover:text-cyan-800 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
                  title="Export telemetry logs as CSV spreadsheet"
                >
                  <FileSpreadsheet className="w-3 h-3 text-cyan-700" />
                  CSV
                </button>
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
              </div>
            </div>

            {/* Filter Selects & Keyword Search Input */}
            <div className="grid grid-cols-2 gap-2 mb-2.5">
              <select
                value={filterBarangay}
                onChange={(e) => setFilterBarangay(e.target.value)}
                className="text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 text-slate-700 font-medium outline-none focus:border-cyan-700"
              >
                <option value="All">All Barangays ({reportsList.length})</option>
                {filterableBarangays.map((bName) => (
                  <option key={bName} value={bName}>
                    Brgy. {bName}
                  </option>
                ))}
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 text-slate-700 font-medium outline-none focus:border-cyan-700"
              >
                <option value="All">All Hazard Categories</option>
                <option value="Sunny-Day Tidal Flooding">Sunny-Day Tidal Flooding</option>
                <option value="Structural Foundation Cracking">Foundation Cracking</option>
                <option value="House Jacking / Raising Work">House Jacking / Raising</option>
                <option value="Shallow Well Salinization">Well Salinization</option>
                <option value="Drainage Backflow">Drainage Backflow</option>
              </select>
            </div>

            <div className="relative mb-3">
              <input
                type="text"
                value={searchLogQuery}
                onChange={(e) => setSearchLogQuery(e.target.value)}
                placeholder="Search logs by keyword, street, or HGW code..."
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

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {displayedReports.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded border border-slate-100 font-mono">
                  No incident logs found matching criteria.
                </div>
              ) : (
                displayedReports.map((rep) => {
                  const sev =
                    rep.severity || computeReportSeverity(rep.issueType || '', rep.waterDepth || '');
                  return (
                    <div
                      key={rep.id}
                      onClick={() => setSelectedReportDetail(rep)}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5 interactive-card hover:border-cyan-400 transition cursor-pointer"
                      title="Click to view full observation record"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900">
                          Brgy. {rep.barangay}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              sev === 'Critical'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : sev === 'Severe'
                                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {sev}
                          </span>
                          {rep.refCode && (
                            <span className="text-[10px] font-mono text-cyan-800 bg-cyan-100/60 px-1.5 py-0.5 rounded">
                              {rep.refCode}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-400">
                            {rep.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-100 text-cyan-900">
                          {rep.issueType}
                        </span>
                        {rep.waterDepth &&
                          rep.waterDepth !== 'None' &&
                          rep.waterDepth !== 'None / Structural Only' && (
                            <span className="text-[10px] font-mono text-red-700 font-semibold">
                              Depth: {rep.waterDepth}
                            </span>
                          )}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px] pt-1">
                        "{rep.description}"
                      </p>
                      <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-200/60 font-mono flex items-center justify-between">
                        <span>Logged by: {rep.reporterType}</span>
                        <div className="flex items-center gap-2.5">
                          {onLocateOnMap && canLocateOnMap(rep.barangay) && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onLocateOnMap(rep.barangay);
                              }}
                              className="inline-flex items-center gap-0.5 text-slate-600 hover:text-cyan-800 font-semibold cursor-pointer"
                              title={`Fly to Brgy. ${rep.barangay} on GIS Hazard Map`}
                            >
                              <MapPin className="w-3 h-3 text-cyan-700" />
                              Map
                            </button>
                          )}
                          <span className="text-cyan-700 font-semibold hover:underline">
                            Inspect →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
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
                  <span className="text-slate-500">Computed Severity:</span>
                  <span className="font-bold text-red-700">
                    {selectedReportDetail.severity ||
                      computeReportSeverity(
                        selectedReportDetail.issueType || '',
                        selectedReportDetail.waterDepth || ''
                      )}
                  </span>
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

            <div className="mt-5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              {onLocateOnMap && canLocateOnMap(selectedReportDetail.barangay) ? (
                <button
                  type="button"
                  onClick={() => {
                    const target = selectedReportDetail.barangay;
                    setSelectedReportDetail(null);
                    onLocateOnMap(target);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded border border-cyan-700 text-cyan-800 bg-cyan-50 hover:bg-cyan-100 transition cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-cyan-700" />
                  Locate on GIS Map
                </button>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadReceiptTxt(selectedReportDetail)}
                  className="px-3 py-2 text-xs font-semibold rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Download .TXT
                </button>
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
        </div>
      )}

      {/* In-page dialog overlays */}
      {confirmationDialog}
      {receiptDialog}
      {resetConfirmDialog}
    </section>
  );
}
