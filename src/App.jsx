import React, { useState } from 'react';
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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <CommunityReporting />
        <References />
      </main>

      {/* Footer */}
      <Footer />

      {/* Community Report Modal */}
      {isModalOpen && (
        <CommunityReporting
          isOpenModal={true}
          onCloseModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
