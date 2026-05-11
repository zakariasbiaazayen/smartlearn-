import { useState, useRef, useCallback } from "react";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  body {
    font-family: 'DM Sans', sans-serif;
    background: #f8fafc;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
  }
 
  .font-display { font-family: 'Syne', sans-serif; }
 
  @keyframes orb-drift {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(40px, -30px) scale(1.05); }
    66%  { transform: translate(-20px, 20px) scale(0.97); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes orb-drift-2 {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(-30px, 20px) scale(1.04); }
    66%  { transform: translate(25px, -15px) scale(0.98); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    70%  { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
 
  .orb-1 {
    position: absolute;
    width: 520px; height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(147,197,253,0.45) 0%, rgba(99,102,241,0.18) 60%, transparent 100%);
    filter: blur(40px);
    top: -120px; left: -80px;
    animation: orb-drift 14s ease-in-out infinite;
    pointer-events: none;
  }
  .orb-2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,181,253,0.35) 0%, rgba(59,130,246,0.15) 60%, transparent 100%);
    filter: blur(50px);
    top: 80px; right: -60px;
    animation: orb-drift-2 18s ease-in-out infinite;
    pointer-events: none;
  }
 
  .hero-anim-1 { animation: fade-up 0.6s ease both; animation-delay: 0.05s; }
  .hero-anim-2 { animation: fade-up 0.6s ease both; animation-delay: 0.18s; }
  .hero-anim-3 { animation: fade-up 0.6s ease both; animation-delay: 0.30s; }
  .hero-anim-4 { animation: fade-up 0.6s ease both; animation-delay: 0.42s; }
 
  .upload-drop-zone {
    border: 1.5px dashed #cbd5e1;
    border-radius: 14px;
    background: #f8fafc;
    transition: all 0.22s ease;
    cursor: pointer;
  }
  .upload-drop-zone:hover, .upload-drop-zone.drag-over {
    border-color: #2563eb;
    background: #eff6ff;
  }
  .upload-drop-zone.has-file {
    border-color: #16a34a;
    background: #f0fdf4;
  }
 
  .generate-btn {
    width: 100%;
    padding: 15px 24px;
    border-radius: 14px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.01em;
    transition: all 0.2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .generate-btn.disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    box-shadow: none;
  }
  .generate-btn.active {
    background: #2563eb;
    color: #ffffff;
    box-shadow: 0 4px 20px rgba(37,99,235,0.3);
  }
  .generate-btn.active:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 24px rgba(37,99,235,0.38);
    transform: scale(1.012);
  }
  .generate-btn.active:active {
    transform: scale(0.995);
  }
  .generate-btn.loading {
    background: #1d4ed8;
    color: #bfdbfe;
    cursor: not-allowed;
    animation: pulse-ring 1.5s ease-in-out infinite;
  }
 
  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
 
  .navbar-link {
    font-size: 14px;
    font-weight: 400;
    color: #475569;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 8px;
    transition: all 0.15s ease;
  }
  .navbar-link:hover {
    color: #0f172a;
    background: #f1f5f9;
  }
 
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 500;
    padding: 4px 12px;
    letter-spacing: 0.01em;
  }
  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #2563eb;
    animation: pulse-ring 2s ease-in-out infinite;
  }
 
  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04), 0 12px 40px -8px rgba(0,0,0,0.08);
  }
 
  .textarea-input {
    width: 100%;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #0f172a;
    background: #ffffff;
    resize: vertical;
    min-height: 120px;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    outline: none;
    line-height: 1.6;
  }
  .textarea-input::placeholder { color: #94a3b8; }
  .textarea-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
  }
 
  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #94a3b8;
    font-size: 13px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }
 
  .result-card {
    background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%);
    border: 1px solid #bfdbfe;
    border-radius: 16px;
    padding: 24px;
    animation: fade-up 0.5s ease both;
  }
 
  .stat-chip {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 10px 16px;
    font-size: 13px;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 8px;
  }
 
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
`;
 
// ─── Icons ────────────────────────────────────────────────────────────────────
 
function IconUpload() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}
 
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
 
function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
 
function IconBrain() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.61 3 3 0 0 1 .65-5.87A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.61 3 3 0 0 0-.65-5.87A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  );
}
 
function IconStar() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
 

 
// ─── Hero ─────────────────────────────────────────────────────────────────────
 
function Hero() {
  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      paddingTop: 80, paddingBottom: 60,
      textAlign: "center",
    }}>
      <div className="orb-1" />
      <div className="orb-2" />
 
      <div style={{ position: "relative", maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
        <div className="hero-anim-1" style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
          <span className="badge">
            <span className="badge-dot" />
            Powered by AI · Built for STEM learners
          </span>
        </div>
 
        <h1 className="font-display hero-anim-2" style={{
          fontSize: "clamp(34px, 5.5vw, 58px)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          color: "#0f172a",
          marginBottom: 22,
        }}>
          Turn Your Notes Into a{" "}
          <span style={{
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Personal STEM Tutor
          </span>{" "}
          with AI
        </h1>
 
        <p className="hero-anim-3" style={{
          fontSize: 18, fontWeight: 300,
          color: "#64748b", lineHeight: 1.7,
          maxWidth: 580, margin: "0 auto 32px",
        }}>
          Upload a photo of your handwritten notes or paste text — and instantly receive
          flashcards, summaries, quizzes, and concept breakdowns tailored to your material.
        </p>
 
        <div className="hero-anim-4" style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {["Flashcards", "Concept Maps", "Practice Quizzes", "Plain-English Summaries"].map(f => (
            <span key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#475569" }}>
              <IconStar />
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
 
// ─── Upload Card ──────────────────────────────────────────────────────────────
 
function UploadCard({ onResultReady }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
 
  const hasInput = text.trim().length > 0 || file !== null;
  const btnState = loading ? "loading" : hasInput ? "active" : "disabled";
 
  const handleFile = useCallback((f) => {
    if (!f) return;
    const allowed = ["image/png", "image/jpeg", "image/webp", "image/gif", "text/plain", "application/pdf"];
    if (!allowed.includes(f.type)) return alert("Please upload an image, PDF, or text file.");
    setFile(f);
  }, []);
 
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, [handleFile]);
 
  const handleGenerate = async () => {
    if (!hasInput || loading) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2200));
    setLoading(false);
    onResultReady({ text, file });
  };
 
  return (
    <div className="card hero-anim-4" style={{
      maxWidth: 640, margin: "0 auto 80px",
      padding: "32px 32px 28px",
    }}>
      <h2 className="font-display" style={{
        fontSize: 20, fontWeight: 700,
        letterSpacing: "-0.03em", color: "#0f172a",
        marginBottom: 4,
      }}>Upload your notes</h2>
      <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 24 }}>
        Image, PDF, or plain text — any format works
      </p>
 
      {/* Drop zone */}
      <div
        className={`upload-drop-zone${dragOver ? " drag-over" : ""}${file ? " has-file" : ""}`}
        style={{ padding: "28px 20px", textAlign: "center", marginBottom: 20 }}
        onClick={() => !file && fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {file ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#16a34a", flexShrink: 0,
            }}>
              <IconCheck />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#166534" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#86efac" }}>{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); setFile(null); }}
              style={{
                marginLeft: 8, width: 26, height: 26,
                border: "1px solid #bbf7d0", borderRadius: 8,
                background: "#f0fdf4", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#16a34a",
              }}
            >
              <IconX />
            </button>
          </div>
        ) : (
          <>
            <div style={{ color: "#94a3b8", marginBottom: 10 }}><IconUpload /></div>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#475569", marginBottom: 4 }}>
              Drop your notes here
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8" }}>
              PNG, JPG, PDF, TXT · or{" "}
              <span style={{ color: "#2563eb", fontWeight: 500, cursor: "pointer" }}
                onClick={() => fileInputRef.current?.click()}>
                browse files
              </span>
            </p>
          </>
        )}
        <input ref={fileInputRef} type="file" accept="image/*,.pdf,.txt" style={{ display: "none" }}
          onChange={e => handleFile(e.target.files?.[0])} />
      </div>
 
      <div className="divider" style={{ marginBottom: 20 }}>or paste text below</div>
 
      {/* Textarea */}
      <textarea
        className="textarea-input"
        placeholder="e.g. Newton's second law states that F = ma, where F is the net force applied to an object, m is its mass..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ marginBottom: 24 }}
      />
 
      {/* Generate button */}
      <button
        className={`generate-btn ${btnState}`}
        onClick={handleGenerate}
        disabled={btnState === "disabled" || btnState === "loading"}
      >
        {btnState === "loading" ? (
          <>
            <div className="spinner" />
            Analyzing your notes…
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>
            </svg>
            Generate Learning
          </>
        )}
      </button>
 
      {!hasInput && (
        <p style={{ textAlign: "center", fontSize: 12.5, color: "#cbd5e1", marginTop: 12 }}>
          Upload a file or type your notes to get started
        </p>
      )}
    </div>
  );
}
 
// ─── Result Panel ─────────────────────────────────────────────────────────────
 
const MOCK_RESULTS = {
  summary: "Newton's laws of motion describe the relationship between a body and the forces acting upon it, as well as its motion in response to those forces. The second law (F = ma) is the quantitative basis of classical mechanics.",
  concepts: ["Force (F) — measured in Newtons (N)", "Mass (m) — measured in kilograms (kg)", "Acceleration (a) — measured in m/s²", "Net force causes acceleration proportional to mass"],
  flashcards: [
    { q: "What does F = ma represent?", a: "Force equals mass times acceleration — Newton's Second Law." },
    { q: "What unit is force measured in?", a: "Newtons (N), where 1 N = 1 kg·m/s²." },
    { q: "If mass doubles, what happens to acceleration (same force)?", a: "Acceleration halves — they are inversely proportional." },
  ],
};
 
function ResultPanel({ result }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [flipped, setFlipped] = useState(null);
 
  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "concepts", label: "Key Concepts" },
    { id: "flashcards", label: "Flashcards" },
  ];
 
  return (
    <div style={{ maxWidth: 640, margin: "0 auto 80px", animation: "fade-up 0.5s ease both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          </svg>
        </div>
        <div>
          <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: "#0f172a" }}>
            Learning content ready
          </h3>
          <p style={{ fontSize: 12.5, color: "#94a3b8" }}>3 formats generated · tap any flashcard to flip it</p>
        </div>
      </div>
 
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 20,
        background: "#f1f5f9", borderRadius: 12, padding: 4,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: "8px 12px",
            borderRadius: 9, border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 500,
            transition: "all 0.18s ease",
            background: activeTab === t.id ? "#ffffff" : "transparent",
            color: activeTab === t.id ? "#0f172a" : "#64748b",
            boxShadow: activeTab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
          }}>
            {t.label}
          </button>
        ))}
      </div>
 
      {/* Tab content */}
      {activeTab === "summary" && (
        <div className="result-card">
          <p style={{ fontSize: 15, color: "#1e40af", lineHeight: 1.75, fontWeight: 400 }}>
            {MOCK_RESULTS.summary}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            {["Physics", "Mechanics", "STEM"].map(tag => (
              <span key={tag} style={{
                background: "rgba(37,99,235,0.1)", color: "#1d4ed8",
                fontSize: 12, fontWeight: 500,
                padding: "3px 10px", borderRadius: 999,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
 
      {activeTab === "concepts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MOCK_RESULTS.concepts.map((c, i) => (
            <div key={i} className="stat-chip" style={{ fontSize: 14, padding: "13px 18px" }}>
              <span style={{
                width: 24, height: 24, borderRadius: 8,
                background: "#eff6ff", color: "#2563eb",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>{i + 1}</span>
              {c}
            </div>
          ))}
        </div>
      )}
 
      {activeTab === "flashcards" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MOCK_RESULTS.flashcards.map((card, i) => (
            <div key={i}
              onClick={() => setFlipped(flipped === i ? null : i)}
              style={{
                background: flipped === i ? "linear-gradient(135deg, #1d4ed8, #4f46e5)" : "#ffffff",
                border: "1px solid",
                borderColor: flipped === i ? "transparent" : "#e2e8f0",
                borderRadius: 16,
                padding: "18px 20px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: flipped === i ? "0 8px 24px rgba(37,99,235,0.25)" : "none",
              }}
            >
              <p style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 8,
                color: flipped === i ? "rgba(191,219,254,0.8)" : "#94a3b8",
              }}>
                {flipped === i ? "Answer" : `Q${i + 1}`}
              </p>
              <p style={{
                fontSize: 15, lineHeight: 1.6,
                color: flipped === i ? "#ffffff" : "#0f172a",
                fontWeight: flipped === i ? 400 : 500,
              }}>
                {flipped === i ? card.a : card.q}
              </p>
              <p style={{ fontSize: 11.5, color: flipped === i ? "rgba(191,219,254,0.6)" : "#cbd5e1", marginTop: 10 }}>
                {flipped === i ? "Click to see question" : "Click to reveal answer"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
// ─── How It Works ──────────────────────────────────────────────────────────────
 
function HowItWorks() {
  const steps = [
    { icon: "📝", title: "Upload or paste", desc: "Drop a photo of handwritten notes, a PDF, or just type your material." },
    { icon: "⚡", title: "AI analyzes", desc: "Our model identifies key concepts, relationships, and gaps in your notes." },
    { icon: "🎯", title: "Learn faster", desc: "Study with flashcards, summaries, and concept maps crafted for you." },
  ];
 
  return (
    <section id="how" style={{ background: "#ffffff", borderTop: "1px solid #f1f5f9", padding: "72px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p className="font-display" style={{
          textAlign: "center", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.1em", color: "#94a3b8",
          textTransform: "uppercase", marginBottom: 12,
        }}>How it works</p>
        <h2 className="font-display" style={{
          textAlign: "center", fontSize: 30, fontWeight: 800,
          letterSpacing: "-0.04em", color: "#0f172a", marginBottom: 48,
        }}>
          Three steps to deeper understanding
        </h2>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background: "#f8fafc",
              border: "1px solid #f1f5f9",
              borderRadius: 20, padding: "28px 24px",
            }}>
              <div style={{ fontSize: 30, marginBottom: 16 }}>{s.icon}</div>
              <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "#0f172a", marginBottom: 8 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
// ─── Footer ───────────────────────────────────────────────────────────────────
 
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #e2e8f0",
      padding: "24px",
      textAlign: "center",
    }}>
      <p style={{ fontSize: 13, color: "#94a3b8" }}>
        © 2025 <strong style={{ color: "#475569" }}>SmartLearn AI</strong> · Built for curious minds
      </p>
    </footer>
  );
}
 
// ─── App ──────────────────────────────────────────────────────────────────────
 
export default function App() {
  const [result, setResult] = useState(null);
 
  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <main style={{ flex: 1 }}>
          <Hero />
          <div style={{ padding: "0 24px" }}>
            <UploadCard onResultReady={setResult} />
            {result && <ResultPanel result={result} />}
          </div>
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </>
  );
}