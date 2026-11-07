import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import CausesAndEffects from './components/CausesAndEffects';
import HazardMap from './components/HazardMap';
import ImpactEstimator from './components/ImpactEstimator';
import Mitigation from './components/Mitigation';
import CommunityReporting from './components/CommunityReporting';
import References from './components/References';
import Footer from './components/Footer';

const BASELINE_REPORTS = [
  {
    id: 1,
    refCode: "HGW-1028",
    barangay: "Tibaguin",
    issueType: "Sunny-Day Tidal Flooding",
    waterDepth: "12 - 24 inches (Knee level)",
    severity: "Critical",
    description: "Spring tide entered school premises at 11:30 AM. Classes shifted to makeshift stilt catwalks.",
    reporterType: "Student / Researcher",
    date: "2026-10-28"
  },
  {
    id: 2,
    refCode: "HGW-1025",
    barangay: "San Pascual",
    issueType: "Structural Foundation Cracking",
    waterDepth: "None / Structural Only",
    severity: "Severe",
    description: "Concrete fence tilted by ~15 degrees due to differential settlement near old aquaculture well.",
    reporterType: "Resident",
    date: "2026-10-25"
  },
  {
    id: 3,
    refCode: "HGW-1022",
    barangay: "Mercado (Poblacion)",
    issueType: "Drainage Backflow",
    waterDepth: "6 - 12 inches (Shin level)",
    severity: "Severe",
    description: "High tide backflow through drainage culvert near public market during full moon tide.",
    reporterType: "Fisherfolk / Business Owner",
    date: "2026-10-22"
  },
  {
    id: 4,
    refCode: "HGW-1019",
    barangay: "Pugad",
    issueType: "Sunny-Day Tidal Flooding",
    waterDepth: "> 24 inches (Waist level+)",
    severity: "Critical",
    description: "Coastal footbridge and elementary school courtyard submerged for 5 hours during syzygy high tide despite zero rainfall.",
    reporterType: "LGU / Barangay Official",
    date: "2026-10-19"
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportsList, setReportsList] = useState(BASELINE_REPORTS);
  const [focusedMapBarangay, setFocusedMapBarangay] = useState(null);
  const [preselectedReportBarangay, setPreselectedReportBarangay] = useState(null);

  // Load persisted reports from localStorage on mount (normalizing legacy "Mercado" -> "Mercado (Poblacion)")
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hagonoy_groundwatch_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((r) => ({
            ...r,
            barangay: r.barangay === "Mercado" ? "Mercado (Poblacion)" : r.barangay
          }));
          setReportsList(normalized);
        }
      }
    } catch (e) {
      console.error("Error reading reports from localStorage:", e);
    }
  }, []);

  // Smooth scroll to target section when landing directly on a hash URL (e.g., #hazard-map)
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAddReport = (newReport) => {
    setReportsList((prev) => {
      const updated = [newReport, ...prev];
      try {
        localStorage.setItem('hagonoy_groundwatch_reports', JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving reports to localStorage:", e);
      }
      return updated;
    });
  };

  const handleResetReports = () => {
    setReportsList(BASELINE_REPORTS);
    try {
      localStorage.setItem('hagonoy_groundwatch_reports', JSON.stringify(BASELINE_REPORTS));
    } catch (e) {
      console.error("Error resetting reports in localStorage:", e);
    }
  };

  const handleLocateBarangayOnMap = (barangayName) => {
    setFocusedMapBarangay({ name: barangayName, ts: Date.now() });
    const mapSection = document.getElementById('hazard-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReportForBarangay = (barangayName) => {
    setPreselectedReportBarangay({ name: barangayName, ts: Date.now() });
    const reportSection = document.getElementById('community-report');
    if (reportSection) {
      reportSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-clip">
      {/* Sticky Header */}
      <Header onOpenReport={() => setIsModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 overflow-x-clip">
        <Hero onOpenReport={() => setIsModalOpen(true)} />
        <Overview />
        <CausesAndEffects />
        <HazardMap
          reportsList={reportsList}
          focusedBarangayRequest={focusedMapBarangay}
          onReportForBarangay={handleReportForBarangay}
        />
        <ImpactEstimator />
        <Mitigation />
        <CommunityReporting
          reportsList={reportsList}
          onAddReport={handleAddReport}
          onResetReports={handleResetReports}
          onLocateOnMap={handleLocateBarangayOnMap}
          preselectedBarangayRequest={preselectedReportBarangay}
        />
        <References />
      </main>

      {/* Footer */}
      <Footer />

      {/* Community Report Modal */}
      {isModalOpen && (
        <CommunityReporting
          isOpenModal={true}
          onCloseModal={() => setIsModalOpen(false)}
          reportsList={reportsList}
          onAddReport={handleAddReport}
          onResetReports={handleResetReports}
          onLocateOnMap={handleLocateBarangayOnMap}
          preselectedBarangayRequest={preselectedReportBarangay}
        />
      )}
    </div>
  );
}