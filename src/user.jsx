import { useState, useEffect } from "react";

const SUMMARY_POINTS = [
  "Photosynthesis is the process by which plants convert light energy into chemical energy stored as glucose.",
  "The process occurs in two main stages: the light-dependent reactions (in the thylakoid membranes) and the Calvin cycle (in the stroma).",
  "Chlorophyll, found in chloroplasts, absorbs sunlight — primarily in the red and blue wavelengths — and reflects green light.",
  "Water molecules are split during the light reactions, releasing oxygen as a byproduct (photolysis).",
  "Carbon dioxide from the atmosphere is fixed into organic molecules during the Calvin cycle using ATP and NADPH produced in the light reactions.",
  "The overall equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
  "Factors like light intensity, CO₂ concentration, and temperature directly affect the rate of photosynthesis.",
];

const QUIZ_DATA = [
  {
    id: 1,
    question: "Where do the light-dependent reactions of photosynthesis occur?",
    options: ["Stroma", "Thylakoid membranes", "Cell wall", "Mitochondria"],
    answer: 1,
  },
  {
    id: 2,
    question: "Which pigment is primarily responsible for capturing light energy in plants?",
    options: ["Carotene", "Xanthophyll", "Chlorophyll", "Anthocyanin"],
    answer: 2,
  },
  {
    id: 3,
    question: "What is the primary product of the Calvin cycle?",
    options: ["ATP", "Oxygen", "Glucose (G3P)", "NADPH"],
    answer: 2,
  },
  {
    id: 4,
    question: "Which of the following is a by-product of the light-dependent reactions?",
    options: ["Carbon dioxide", "Water", "Glucose", "Oxygen"],
    answer: 3,
  },
  {
    id: 5,
    question: "What does the term 'photolysis' refer to?",
    options: [
      "Synthesis of glucose using light",
      "Splitting of water molecules by light",
      "Breakdown of chlorophyll",
      "Conversion of CO₂ to oxygen",
    ],
    answer: 1,
  },
];

const FLASHCARD_DATA = [
  { id: 1, front: "What is the primary function of chlorophyll?", back: "To absorb light energy (mainly red and blue wavelengths) and use it to power the photosynthesis process." },
  { id: 2, front: "What are the two main stages of photosynthesis?", back: "1. Light-dependent reactions (in the thylakoids)\n2. Calvin cycle / light-independent reactions (in the stroma)" },
  { id: 3, front: "What is produced during photolysis?", back: "Oxygen (O₂) is released as a by-product when water molecules are split by light energy during the light-dependent reactions." },
  { id: 4, front: "Define the Calvin Cycle.", back: "A series of biochemical reactions in the stroma that fix CO₂ into organic molecules (G3P), powered by ATP and NADPH from the light reactions." },
  { id: 5, front: "What three factors affect the rate of photosynthesis?", back: "1. Light intensity\n2. Carbon dioxide concentration\n3. Temperature" },
  { id: 6, front: "Write the overall equation for photosynthesis.", back: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂" },
];

/* ─── Skeleton loader ─── */
function SkeletonCard({ lines = 3 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse">
      <div className="h-4 bg-gray-100 rounded-lg w-1/3 mb-5" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-gray-100 rounded-lg mb-3"
          style={{ width: `${75 + Math.random() * 25}%` }}
        />
      ))}
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar({ onUpload }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10L5 4L8 8L10 5.5L12 10H2Z" fill="white" />
              <circle cx="10.5" cy="3.5" r="1.5" fill="white" opacity="0.8" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 tracking-tight text-[15px]">SmartLearn AI</span>
        </div>
        <button
          onClick={onUpload}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-lg transition-all duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 9.5V2.5M4 5L7 2L10 5" />
            <path d="M2 11.5h10" />
          </svg>
          Upload New Notes
        </button>
      </div>
    </nav>
  );
}

/* ─── Summary Tab ─── */
function SummaryTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="1.5" rx="0.75" fill="#2563EB" />
              <rect x="2" y="7" width="9" height="1.5" rx="0.75" fill="#2563EB" opacity="0.6" />
              <rect x="2" y="11" width="10.5" height="1.5" rx="0.75" fill="#2563EB" opacity="0.4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-[15px]">AI-Generated Summary</h3>
            <p className="text-xs text-gray-400 mt-0.5">Key concepts extracted from your notes</p>
          </div>
        </div>
        <ul className="space-y-3.5">
          {SUMMARY_POINTS.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 items-start group"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-gray-700 text-[14.5px] leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Key Concepts", value: "7", icon: "🧠" },
          { label: "Reading Time", value: "~3 min", icon: "⏱" },
          { label: "Complexity", value: "Medium", icon: "📊" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center">
            <div className="text-xl mb-1">{icon}</div>
            <div className="font-semibold text-gray-900 text-sm">{value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Quiz Tab ─── */
function QuizTab() {
  const [selected, setSelected] = useState({});
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(null);

  function handleSelect(qId, optIdx) {
    if (revealed[qId]) return;
    setSelected((s) => ({ ...s, [qId]: optIdx }));
    setScore(null);
  }

  function toggleReveal(qId) {
    if (selected[qId] === undefined) return;
    setRevealed((r) => ({ ...r, [qId]: !r[qId] }));
  }

  function calcScore() {
    let correct = 0;
    QUIZ_DATA.forEach((q) => {
      if (selected[q.id] === q.answer) correct++;
    });
    setScore(correct);
    const newRevealed = {};
    QUIZ_DATA.forEach((q) => { newRevealed[q.id] = true; });
    setRevealed(newRevealed);
  }

  const allAnswered = QUIZ_DATA.every((q) => selected[q.id] !== undefined);

  return (
    <div className="space-y-4">
      {QUIZ_DATA.map((q, qi) => {
        const isRevealed = revealed[q.id];
        const sel = selected[q.id];

        return (
          <div key={q.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 transition-all duration-200">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center mt-0.5">
                {qi + 1}
              </span>
              <p className="font-medium text-gray-900 text-[15px] leading-snug">{q.question}</p>
            </div>

            <div className="space-y-2 pl-9">
              {q.options.map((opt, oi) => {
                const isSelected = sel === oi;
                const isCorrect = q.answer === oi;

                let stateClass = "border-gray-100 hover:border-blue-200 hover:bg-blue-50/40";
                let labelClass = "text-gray-700";

                if (isRevealed) {
                  if (isCorrect) {
                    stateClass = "border-emerald-200 bg-emerald-50/60";
                    labelClass = "text-emerald-700 font-medium";
                  } else if (isSelected && !isCorrect) {
                    stateClass = "border-red-200 bg-red-50/60";
                    labelClass = "text-red-600";
                  } else {
                    stateClass = "border-gray-100 opacity-50";
                  }
                } else if (isSelected) {
                  stateClass = "border-blue-300 bg-blue-50";
                  labelClass = "text-blue-700 font-medium";
                }

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(q.id, oi)}
                    className={`w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-150 ${stateClass}`}
                  >
                    <span className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected && !isRevealed ? "border-blue-500 bg-blue-500" :
                      isRevealed && isCorrect ? "border-emerald-500 bg-emerald-500" :
                      isRevealed && isSelected && !isCorrect ? "border-red-400 bg-red-400" :
                      "border-gray-300"
                    }`}>
                      {(isSelected || (isRevealed && isCorrect)) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                      )}
                    </span>
                    <span className={`text-sm ${labelClass}`}>{opt}</span>
                    {isRevealed && isCorrect && (
                      <span className="ml-auto text-emerald-600 text-xs font-medium">✓ Correct</span>
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <span className="ml-auto text-red-500 text-xs font-medium">✗ Wrong</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pl-9 mt-3 flex justify-end">
              <button
                onClick={() => toggleReveal(q.id)}
                disabled={sel === undefined}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                  sel !== undefined
                    ? "text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              >
                {isRevealed ? "Hide Answer" : "Show Answer"}
              </button>
            </div>
          </div>
        );
      })}

      <div className="sticky bottom-4">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-4 flex items-center gap-4">
          {score !== null ? (
            <>
              <div className={`text-2xl font-bold ${score >= 4 ? "text-emerald-500" : score >= 2 ? "text-amber-500" : "text-red-500"}`}>
                {score}/{QUIZ_DATA.length}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {score === QUIZ_DATA.length ? "Perfect score! 🎉" : score >= 3 ? "Great job! 👍" : "Keep practicing! 📚"}
                </div>
                <div className="text-xs text-gray-400">{Math.round((score / QUIZ_DATA.length) * 100)}% correct</div>
              </div>
              <button
                onClick={() => { setSelected({}); setRevealed({}); setScore(null); }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:bg-blue-50 px-4 py-1.5 rounded-lg transition-all"
              >
                Retry Quiz
              </button>
            </>
          ) : (
            <>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {allAnswered ? "Ready to check your answers?" : `${Object.keys(selected).length}/${QUIZ_DATA.length} answered`}
                </div>
                {!allAnswered && (
                  <div className="flex gap-1 mt-2">
                    {QUIZ_DATA.map((q) => (
                      <div key={q.id} className={`h-1 flex-1 rounded-full transition-all ${selected[q.id] !== undefined ? "bg-blue-500" : "bg-gray-100"}`} />
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={calcScore}
                disabled={!allAnswered}
                className={`text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-150 ${
                  allAnswered
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Quiz
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Flashcard ─── */
function Flashcard({ card, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-44 cursor-pointer select-none"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Question {index + 1}</span>
            <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-md">Click to flip</span>
          </div>
          <p className="text-gray-900 font-medium text-[15px] leading-snug">{card.front}</p>
          <div className="flex justify-center">
            <div className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <div key={d} className="w-1 h-1 rounded-full bg-gray-200" />
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-blue-600 rounded-2xl shadow-sm p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">Answer</span>
            <span className="text-xs text-blue-200 font-medium bg-blue-500/40 px-2 py-0.5 rounded-md">Click to flip back</span>
          </div>
          <p className="text-white font-medium text-[14px] leading-relaxed whitespace-pre-line">{card.back}</p>
          <div className="flex justify-center">
            <div className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <div key={d} className="w-1 h-1 rounded-full bg-blue-400/60" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlashcardsTab() {
  const [allFlipped, setAllFlipped] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
        <div>
          <span className="text-sm font-medium text-gray-800">{FLASHCARD_DATA.length} Flashcards</span>
          <span className="text-xs text-gray-400 ml-2">· Click any card to flip it</span>
        </div>
        <button
          onClick={() => setAllFlipped((f) => !f)}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg transition-all"
        >
          {allFlipped ? "Show Questions" : "Reveal All Answers"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FLASHCARD_DATA.map((card, i) => (
          <FlashcardControlled key={card.id} card={card} index={i} forceFlip={allFlipped} />
        ))}
      </div>
    </div>
  );
}

function FlashcardControlled({ card, index, forceFlip }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(forceFlip);
  }, [forceFlip]);

  return (
    <div
      className="relative h-44 cursor-pointer select-none"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Card {index + 1}</span>
            <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-md">Flip</span>
          </div>
          <p className="text-gray-900 font-medium text-[14.5px] leading-snug">{card.front}</p>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((d) => <div key={d} className="w-1 h-1 rounded-full bg-gray-200" />)}
          </div>
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-sm p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">Answer</span>
            <span className="text-xs text-blue-200 bg-blue-500/40 px-2 py-0.5 rounded-md">Flip back</span>
          </div>
          <p className="text-white text-[13.5px] leading-relaxed whitespace-pre-line">{card.back}</p>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((d) => <div key={d} className="w-1 h-1 rounded-full bg-blue-400/60" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Loading State ─── */
function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center py-10 gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        </div>
        <div className="text-center">
          <p className="font-medium text-gray-800 text-sm">Generating your learning content...</p>
          <p className="text-xs text-gray-400 mt-1">Summarizing · Building quiz · Creating flashcards</p>
        </div>
      </div>
      <SkeletonCard lines={5} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SkeletonCard lines={3} />
        <SkeletonCard lines={3} />
      </div>
    </div>
  );
}

/* ─── Tabs ─── */
const TABS = [
  {
    id: "summary",
    label: "Summary",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 3.5h10M2 7h7M2 10.5h8.5" />
      </svg>
    ),
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="5" />
        <path d="M7 4.5v.5M5.5 6C5.5 5.17 6.17 4.5 7 4.5s1.5.67 1.5 1.5C8.5 7.5 7 8 7 8.5" />
        <circle cx="7" cy="10" r=".4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "flashcards",
    label: "Flashcards",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="10" height="7" rx="1.5" />
        <path d="M3 11h9a1 1 0 001-1V5" />
      </svg>
    ),
  },
];

/* ─── Main Page ─── */
export default function SmartLearnResults() {
  const [activeTab, setActiveTab] = useState("summary");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Serif+Display&display=swap');
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'DM Serif Display', serif; }
      `}</style>

      <Navbar onUpload={() => alert("Navigate to upload page")} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Content Ready
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-gray-900 leading-tight mb-2">
            Your Learning Dashboard
          </h1>
          <p className="text-gray-500 text-[15px]">Generated from your notes using AI · Photosynthesis &amp; Plant Biology</p>
        </div>

        {/* Tab Nav */}
        <div className="mb-6 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm w-fit min-w-full sm:min-w-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className={activeTab === tab.id ? "opacity-90" : "opacity-60"}>{tab.icon}</span>
                {tab.label}
                {tab.id === "quiz" && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    activeTab === "quiz" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {QUIZ_DATA.length}
                  </span>
                )}
                {tab.id === "flashcards" && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    activeTab === "flashcards" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {FLASHCARD_DATA.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-200">
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {activeTab === "summary" && <SummaryTab />}
              {activeTab === "quiz" && <QuizTab />}
              {activeTab === "flashcards" && <FlashcardsTab />}
            </>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">SmartLearn AI · Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            <div className="flex gap-2">
              <button className="text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all">
                Export PDF
              </button>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg transition-all">
                Share Results
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}