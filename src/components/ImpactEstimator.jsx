import React, { useState } from 'react';
import { Calculator, HelpCircle, CheckCircle, XCircle, RefreshCw, AlertCircle } from 'lucide-react';

export default function ImpactEstimator() {
  const [activeTab, setActiveTab] = useState('calculator');

  // Calculator State
  const [wellCount, setWellCount] = useState(15);
  const [dailyPumpingLiters, setDailyPumpingLiters] = useState(25000);
  const [soilType, setSoilType] = useState('clay');

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
    <section id="estimator" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-800">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700" />
            <span>Interactive Educational Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            Aquifer Stress Calculator & Literacy Quiz
          </h2>
          <p className="mt-3.5 sm:mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            Understand how localized water withdrawals translate directly into land deformation, or test your environmental science literacy on coastal delta dynamics.
          </p>

          <div className="mt-7 inline-flex p-1.5 bg-slate-100 rounded-md border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-xs sm:text-sm font-bold rounded transition ${
                activeTab === 'calculator'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Extraction Impact Simulator
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-xs sm:text-sm font-bold rounded transition ${
                activeTab === 'quiz'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Subsidence Literacy Quiz ({quizQuestions.length} Qs)
            </button>
          </div>
        </div>

        {/* Simulator Tab */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-md p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-cyan-700" />
                Simulate Barangay Extraction Parameters
              </h3>

              {/* Slider 1: Well Count */}
              <div className="mb-7">
                <div className="flex justify-between items-baseline mb-2.5">
                  <label className="text-sm sm:text-base font-semibold text-slate-800">
                    Active Deep Wells per km²:
                  </label>
                  <span className="font-mono text-base font-bold text-cyan-900">{wellCount} wells</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={wellCount}
                  onChange={(e) => setWellCount(Number(e.target.value))}
                  className="w-full accent-cyan-700 h-2 bg-slate-200 rounded cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono mt-1.5 font-medium">
                  <span>Low density (2)</span>
                  <span>Intensive cluster (50)</span>
                </div>
              </div>

              {/* Slider 2: Daily Pumping */}
              <div className="mb-7">
                <div className="flex justify-between items-baseline mb-2.5">
                  <label className="text-sm sm:text-base font-semibold text-slate-800">
                    Estimated Daily Pumping Rate:
                  </label>
                  <span className="font-mono text-base font-bold text-cyan-900">
                    {dailyPumpingLiters.toLocaleString()} L / day
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={dailyPumpingLiters}
                  onChange={(e) => setDailyPumpingLiters(Number(e.target.value))}
                  className="w-full accent-cyan-700 h-2 bg-slate-200 rounded cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono mt-1.5 font-medium">
                  <span>Household (5,000L)</span>
                  <span>Aquaculture / Industrial (100,000L)</span>
                </div>
              </div>

              {/* Soil Matrix Selector */}
              <div className="mb-4">
                <label className="text-sm sm:text-base font-semibold text-slate-800 block mb-2.5">
                  Geological Subsurface Lithology:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={() => setSoilType('clay')}
                    className={`p-3.5 text-left rounded-md border text-sm transition ${
                      soilType === 'clay'
                        ? 'bg-cyan-50 border-cyan-700 text-cyan-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">Soft Deltaic Clay (Hagonoy)</div>
                    <div className="text-xs text-slate-500 mt-1">High compressibility (Cc &gt; 0.4)</div>
                  </button>
                  <button
                    onClick={() => setSoilType('sand')}
                    className={`p-3.5 text-left rounded-md border text-sm transition ${
                      soilType === 'sand'
                        ? 'bg-cyan-50 border-cyan-700 text-cyan-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">Consolidated Sandy Silt</div>
                    <div className="text-xs text-slate-500 mt-1">Moderate compaction resistance</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Output Card */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-md p-6 sm:p-8 shadow-xs">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-500 tracking-wide">
                Simulated Environmental Consequence
              </span>
              <div className="mt-4 p-5 rounded-md bg-slate-50 border border-slate-200">
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Calculated Annual Subsidence Rate:</div>
                <div className="flex items-baseline gap-2.5 mt-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-red-600 font-mono">
                    {estimatedSubsidenceCm}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-700 font-mono">cm / year</span>
                </div>
                <div className="mt-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {estimatedSubsidenceCm > 4.5
                    ? "🔴 Critical Hazard Level: Severe pore compaction leading to immediate chronic tidal flooding."
                    : estimatedSubsidenceCm > 2.5
                    ? "🟠 Accelerated Sinking: Road pavement fracturing and drainage backflow active."
                    : "🟡 Elevated Sinking: Progressive elevation loss over 10-year horizon."}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 font-mono text-sm">
                <div className="p-4 border border-slate-200 rounded-md bg-white">
                  <span className="text-xs text-slate-500 block uppercase font-medium">1-Meter Drop Timeline</span>
                  <span className="text-2xl font-bold text-slate-900 mt-1 block">~{yearsUntil1MeterDrop} Years</span>
                  <span className="text-xs text-slate-500">at current rate</span>
                </div>
                <div className="p-4 border border-slate-200 rounded-md bg-white">
                  <span className="text-xs text-slate-500 block uppercase font-medium">Aquifer Deficit</span>
                  <span className="text-2xl font-bold text-red-700 mt-1 block">
                    -{(dailyPumpingLiters * wellCount * 0.75 / 1000).toFixed(0)} m³/day
                  </span>
                  <span className="text-xs text-slate-500">net groundwater loss</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-cyan-50 border border-cyan-200 rounded-md text-xs sm:text-sm text-cyan-950 flex items-start gap-3 leading-relaxed">
                <AlertCircle className="w-5 h-5 text-cyan-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Key Takeaway:</strong> Transitioning from 15 deep wells to zero by connecting to surface bulk water halts {estimatedSubsidenceCm} cm of land loss every single year.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="bg-slate-50 border border-slate-200 rounded-md p-6 sm:p-9 max-w-3xl mx-auto shadow-xs animate-fade-in">
            {!quizSubmitted ? (
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-3">
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-600">
                    Question {currentQIndex + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-cyan-800 font-bold">
                    Knowledge Check
                  </span>
                </div>

                {/* Step Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6 sm:mb-8">
                  <div
                    className="bg-cyan-700 h-full transition-all duration-300"
                    style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
                  {quizQuestions[currentQIndex].q}
                </h3>

                <div className="space-y-3.5 mb-8">
                  {quizQuestions[currentQIndex].options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 sm:p-5 rounded-md border text-sm sm:text-base transition ${
                          isSelected
                            ? 'bg-cyan-50 border-cyan-700 text-cyan-950 font-bold shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="inline-block w-6 font-mono font-bold text-slate-400">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {option.text}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-slate-200">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(currentQIndex - 1)}
                    className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
                  >
                    Previous
                  </button>

                  {currentQIndex < quizQuestions.length - 1 ? (
                    <button
                      disabled={selectedAnswers[currentQIndex] === undefined}
                      onClick={() => setCurrentQIndex(currentQIndex + 1)}
                      className="px-6 py-2.5 text-xs sm:text-sm font-bold rounded bg-cyan-700 text-white disabled:opacity-40 hover:bg-cyan-800 transition active:scale-95"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      disabled={selectedAnswers[currentQIndex] === undefined}
                      onClick={() => setQuizSubmitted(true)}
                      className="px-6 py-2.5 text-xs sm:text-sm font-bold rounded bg-emerald-700 text-white disabled:opacity-40 hover:bg-emerald-800 transition active:scale-95"
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
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono text-2xl flex items-center justify-center mx-auto mb-3">
                    {calculateScore()}/{quizQuestions.length}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Quiz Completed</h3>
                  <p className="text-sm text-slate-600 mt-1.5">
                    {calculateScore() === quizQuestions.length
                      ? "Outstanding comprehension of Hagonoy's environmental dynamics."
                      : "Good effort. Review the verified scientific explanations below."}
                  </p>
                </div>

                <div className="space-y-6 my-7">
                  {quizQuestions.map((q, idx) => {
                    const chosen = selectedAnswers[idx];
                    const isCorrect = chosen !== undefined && q.options[chosen].correct;
                    return (
                      <div key={idx} className="p-5 bg-white border border-slate-200 rounded-md text-sm">
                        <div className="font-bold text-slate-900 mb-2.5 flex items-start gap-2.5">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          )}
                          <span className="text-sm sm:text-base">{q.q}</span>
                        </div>
                        <div className="text-slate-700 pl-7 mb-2.5">
                          Your answer: <strong className={isCorrect ? 'text-emerald-700' : 'text-red-700'}>
                            {chosen !== undefined ? q.options[chosen].text : 'Unanswered'}
                          </strong>
                        </div>
                        <div className="pl-7 pt-2.5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <strong>Scientific Rationale:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded bg-slate-900 text-white hover:bg-slate-800 transition active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4" />
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
