import React, { useState } from 'react';
import { Calculator, HelpCircle, CheckCircle, XCircle, RefreshCw, AlertCircle, Sparkles, RotateCcw } from 'lucide-react';

export default function ImpactEstimator() {
  const [activeTab, setActiveTab] = useState('calculator');

  // Calculator State
  const [wellCount, setWellCount] = useState(15);
  const [dailyPumpingLiters, setDailyPumpingLiters] = useState(25000); // 25,000L
  const [soilType, setSoilType] = useState('clay'); // 'clay' or 'sand'

  // Presets
  const applyPreset = (preset) => {
    if (preset === 'fishpond') {
      setWellCount(35);
      setDailyPumpingLiters(75000);
      setSoilType('clay');
    } else if (preset === 'baseline') {
      setWellCount(15);
      setDailyPumpingLiters(25000);
      setSoilType('clay');
    } else if (preset === 'mitigated') {
      setWellCount(2);
      setDailyPumpingLiters(5000);
      setSoilType('clay');
    }
  };

  // Computation logic grounded in hydrogeological principles
  const clayMultiplier = soilType === 'clay' ? 1.6 : 0.7;
  const extractionIndex = (dailyPumpingLiters / 10000) * (wellCount / 10) * clayMultiplier;
  const estimatedSubsidenceCm = Math.min(6.5, Math.max(1.2, (extractionIndex * 1.8).toFixed(1)));
  const yearsUntil1MeterDrop = (100 / estimatedSubsidenceCm).toFixed(0);

  // Quiz State
  const quizQuestions = [
    {
      q: "What is the primary scientific driver of land subsidence in Hagonoy, Bulacan?",
      options: [
        { text: "Tectonic plate subduction along the Manila Trench", correct: false },
        { text: "Excessive deep-well groundwater pumping for aquaculture and domestic use", correct: true },
        { text: "Surface soil erosion caused solely by river currents", correct: false },
        { text: "Thermal expansion of seawater in Manila Bay", correct: false }
      ],
      explanation: "Over 85% of coastal Bulacan's subsidence is caused by over-extracting water from deep confined aquifers, which collapses the pore spaces between compressible clay particles."
    },
    {
      q: "Why does Hagonoy experience severe flooding even on sunny, cloudless days?",
      options: [
        { text: "Dams in northern Luzon are forced to release water during dry season", correct: false },
        { text: "The land has sunk below the high-tide level of Manila Bay, allowing tides to push inland", correct: true },
        { text: "Underground pipes burst simultaneously across the municipality", correct: false },
        { text: "Evaporation rates create localized tidal anomalies", correct: false }
      ],
      explanation: "Because the ground surface has sunk below mean high-tide levels, astronomical tides push backwards through rivers and storm drainage systems twice daily."
    },
    {
      q: "Which long-term solution directly addresses the root cause of land subsidence?",
      options: [
        { text: "Raising road pavements by another 1 meter", correct: false },
        { text: "Building more concrete flood walls without changing water sources", correct: false },
        { text: "Transitioning completely to treated surface bulk water and closing deep wells", correct: true },
        { text: "Pumping river water into septic tanks", correct: false }
      ],
      explanation: "Only stopping groundwater overdrafting by supplying treated surface water from Angat/Bulacan Bulk Water can restore aquifer pore pressure and arrest subsidence."
    }
  ];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectOption = (optIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQIndex]: optIndex
    });
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected !== undefined && q.options[selected].correct) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setCurrentQIndex(0);
  };

  return (
    <section id="estimator" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
            <Calculator className="w-4 h-4 text-cyan-700" />
            <span>Interactive Educational Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Aquifer Stress Calculator & Literacy Quiz
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Understand how localized water withdrawals translate directly into land deformation, or test your environmental science literacy on coastal delta dynamics.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:inline-flex p-1 bg-slate-100 rounded border border-slate-200 gap-1 sm:gap-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold rounded transition cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Extraction Impact Simulator
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold rounded transition cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Subsidence Literacy Quiz ({quizQuestions.length} Qs)
            </button>
          </div>
        </div>

        {/* Simulator Tab */}
        {activeTab === 'calculator' && (
          <div>
            {/* Quick Scenario Presets */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-slate-500 font-semibold uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
                Scenario Presets:
              </span>
              <button
                type="button"
                onClick={() => applyPreset('fishpond')}
                className="px-3 py-1.5 rounded border border-red-200 bg-red-50 text-red-800 hover:bg-red-100 transition font-medium cursor-pointer"
              >
                Commercial Fishpond Cluster (High Stress)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('baseline')}
                className="px-3 py-1.5 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition font-medium cursor-pointer"
              >
                Hagonoy Average Baseline (Moderate)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('mitigated')}
                className="px-3 py-1.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition font-medium cursor-pointer"
              >
                Bulk Surface Water Transition (Low Subsidence)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('baseline')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition ml-auto"
                title="Reset Parameters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Input Controls */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded p-6 sm:p-7">
                <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-cyan-700" />
                  Simulate Barangay Extraction Parameters
                </h3>

                {/* Slider 1: Well Count */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-xs font-medium text-slate-700">
                      Active Deep Wells per km²:
                    </label>
                    <span className="font-mono text-sm font-bold text-slate-900">{wellCount} wells</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={wellCount}
                    onChange={(e) => setWellCount(Number(e.target.value))}
                    className="w-full accent-cyan-700 h-1.5 bg-slate-200 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>Low density (2)</span>
                    <span>Intensive cluster (50)</span>
                  </div>
                </div>

                {/* Slider 2: Daily Pumping */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-xs font-medium text-slate-700">
                      Estimated Daily Pumping Rate:
                    </label>
                    <span className="font-mono text-sm font-bold text-slate-900">
                      {dailyPumpingLiters.toLocaleString()} Liters / day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={dailyPumpingLiters}
                    onChange={(e) => setDailyPumpingLiters(Number(e.target.value))}
                    className="w-full accent-cyan-700 h-1.5 bg-slate-200 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>Household (5,000L)</span>
                    <span>Commercial Aquaculture (100,000L)</span>
                  </div>
                </div>

                {/* Soil Matrix Selector */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-slate-700 block mb-2">
                    Geological Subsurface Lithology:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSoilType('clay')}
                      className={`p-3 text-left rounded border text-xs font-medium transition cursor-pointer ${
                        soilType === 'clay'
                          ? 'bg-cyan-50 border-cyan-700 text-cyan-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="font-bold">Soft Deltaic Clay (Hagonoy)</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">High compressibility (Cc &gt; 0.4)</div>
                    </button>
                    <button
                      onClick={() => setSoilType('sand')}
                      className={`p-3 text-left rounded border text-xs font-medium transition cursor-pointer ${
                        soilType === 'sand'
                          ? 'bg-cyan-50 border-cyan-700 text-cyan-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="font-bold">Consolidated Sandy Silt</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Moderate compaction resistance</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulated Output Card */}
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-6 sm:p-7 shadow-xs">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500">
                  Simulated Environmental Consequence
                </span>
                <div className="mt-4 p-4 rounded bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-600">Calculated Annual Subsidence Rate:</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-red-600 font-mono">
                      {estimatedSubsidenceCm}
                    </span>
                    <span className="text-sm font-semibold text-slate-700 font-mono">cm / year</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    {estimatedSubsidenceCm > 4.5
                      ? "🔴 Critical Hazard Level: Severe pore compaction leading to immediate chronic tidal flooding."
                      : estimatedSubsidenceCm > 2.5
                      ? "🟠 Accelerated Sinking: Road pavement fracturing and drainage backflow active."
                      : "🟡 Elevated Sinking: Progressive elevation loss over 10-year horizon."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-xs">
                  <div className="p-3 border border-slate-200 rounded bg-white">
                    <span className="text-[10px] text-slate-500 block uppercase">1-Meter Drop Timeline</span>
                    <span className="text-xl font-bold text-slate-900 mt-1 block">~{yearsUntil1MeterDrop} Years</span>
                    <span className="text-[10px] text-slate-500">at current rate</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded bg-white">
                    <span className="text-[10px] text-slate-500 block uppercase">Aquifer Recharge Deficit</span>
                    <span className="text-xl font-bold text-red-700 mt-1 block">
                      -{(dailyPumpingLiters * wellCount * 0.75 / 1000).toFixed(0)} m³/day
                    </span>
                    <span className="text-[10px] text-slate-500">net groundwater loss</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-cyan-50 border border-cyan-200 rounded text-xs text-cyan-950 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-cyan-800 shrink-0 mt-0.5" />
                  <span>
                    <strong>Key Takeaway:</strong> Transitioning from 35 deep wells to zero by connecting to surface bulk water halts {estimatedSubsidenceCm} cm of land loss every single year.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="bg-slate-50 border border-slate-200 rounded p-6 sm:p-8 max-w-3xl mx-auto">
            {!quizSubmitted ? (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                  <span className="text-xs font-mono font-semibold uppercase text-slate-500">
                    Question {currentQIndex + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-mono text-cyan-800 font-semibold">
                    Knowledge Check
                  </span>
                </div>

                {/* Step Progress Bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-cyan-700 h-full transition-all duration-300"
                    style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-5">
                  {quizQuestions[currentQIndex].q}
                </h3>

                <div className="space-y-3 mb-8">
                  {quizQuestions[currentQIndex].options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded border text-sm transition cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-50 border-cyan-700 text-cyan-950 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="inline-block w-5 font-mono text-slate-400">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {option.text}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(currentQIndex - 1)}
                    className="px-4 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    Previous
                  </button>

                  {currentQIndex < quizQuestions.length - 1 ? (
                    <button
                      disabled={selectedAnswers[currentQIndex] === undefined}
                      onClick={() => setCurrentQIndex(currentQIndex + 1)}
                      className="px-5 py-2 text-xs font-semibold rounded bg-cyan-700 text-white disabled:opacity-40 hover:bg-cyan-800 cursor-pointer"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      disabled={selectedAnswers[currentQIndex] === undefined}
                      onClick={() => setQuizSubmitted(true)}
                      className="px-5 py-2 text-xs font-semibold rounded bg-emerald-700 text-white disabled:opacity-40 hover:bg-emerald-800 cursor-pointer"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Results */
              <div>
                <div className="text-center pb-6 border-b border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono text-xl flex items-center justify-center mx-auto mb-3">
                    {calculateScore()}/{quizQuestions.length}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Quiz Completed</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {calculateScore() === quizQuestions.length
                      ? "Outstanding comprehension of Hagonoy's environmental dynamics."
                      : "Good effort. Review the verified scientific explanations below."}
                  </p>
                </div>

                <div className="space-y-6 my-6">
                  {quizQuestions.map((q, idx) => {
                    const chosen = selectedAnswers[idx];
                    const isCorrect = chosen !== undefined && q.options[chosen].correct;
                    return (
                      <div key={idx} className="p-4 bg-white border border-slate-200 rounded text-xs">
                        <div className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          )}
                          <span>{q.q}</span>
                        </div>
                        <div className="text-slate-600 pl-6 mb-2">
                          Your answer: <strong className={isCorrect ? 'text-emerald-700' : 'text-red-700'}>
                            {chosen !== undefined ? q.options[chosen].text : 'Unanswered'}
                          </strong>
                        </div>
                        <div className="pl-6 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                          <strong>Scientific Rationale:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}