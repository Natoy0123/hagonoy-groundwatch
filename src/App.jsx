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
    waterDepth: "12 - 18 inches",
    description: "Spring tide entered school premises at 11:30 AM. Classes shifted to makeshift stilt catwalks.",
    reporterType: "Teacher / Resident",
    date: "2026-10-28"
  },
  {
    id: 2,
    refCode: "HGW-1025",
    barangay: "San Pascual",
    issueType: "Structural Foundation Cracking",
    waterDepth: "None",
    description: "Concrete fence tilted by ~15 degrees due to differential settlement near old aquaculture well.",
    reporterType: "Homeowner",
    date: "2026-10-25"
  },
  {
    id: 3,
    refCode: "HGW-1022",
    barangay: "Mercado",
    issueType: "Drainage Backflow",
    waterDepth: "4 - 8 inches",
    description: "High tide backflow through drainage culvert near public market during full moon tide.",
    reporterType: "Merchant",
    date: "2026-10-22"
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportsList, setReportsList] = useState(BASELINE_REPORTS);

  // Load persisted reports from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hagonoy_groundwatch_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReportsList(parsed);
        }
      }
    } catch (e) {
      console.error("Error reading reports from localStorage:", e);
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Sticky Header */}
      <Header onOpenReport={() => setIsModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenReport={() => setIsModalOpen(true)} />
        <Overview />
        <CausesAndEffects />
        <HazardMap />
        <ImpactEstimator />
        <Mitigation />
        <CommunityReporting
          reportsList={reportsList}
          onAddReport={handleAddReport}
          onResetReports={handleResetReports}
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
        />
      )}
    </div>
  );
}