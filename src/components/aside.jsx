import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const RECENT_NOTES = [
  { id: 1, title: "Physics Chapter 1 – Newton's Laws",  subject: "Physics",   time: "2h ago",  color: "#3b82f6" },
  { id: 2, title: "Math Derivatives & Integrals",        subject: "Math",      time: "Yesterday", color: "#8b5cf6" },
  { id: 3, title: "Chemistry Basics – Periodic Table",   subject: "Chemistry", time: "2d ago",  color: "#10b981" },
  { id: 4, title: "Biology: Cell Division Phases",       subject: "Biology",   time: "3d ago",  color: "#f59e0b" },
  { id: 5, title: "History of the Roman Empire",         subject: "History",   time: "4d ago",  color: "#ef4444" },
  { id: 6, title: "Trigonometry – Unit Circle",          subject: "Math",      time: "5d ago",  color: "#8b5cf6" },
  { id: 7, title: "Organic Chemistry Reactions",         subject: "Chemistry", time: "1w ago",  color: "#10b981" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  icon: IconDashboard },
  { id: "notes",     label: "My Notes",   icon: IconNotes },
  { id: "quizzes",   label: "Quizzes",    icon: IconQuiz },
  { id: "progress",  label: "Progress",   icon: IconProgress },
];

// ─── SVG ICONS ─────────────────────────────────────────────────────────────────

function IconDashboard({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}
function IconNotes({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}
function IconQuiz({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}
function IconProgress({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
}
function IconUpload({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}
function IconSearch({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function IconBrain({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.61 3 3 0 0 1 .65-5.87A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.61 3 3 0 0 0-.65-5.87A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  );
}
function IconSettings({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}
function IconChevronLeft({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}
function IconClose({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function IconMenu({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────

function Tooltip({ label, children, disabled }) {
  const [visible, setVisible] = useState(false);
  if (disabled) return children;
  return (
    <div style={{ position: "relative", display: "flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div style={{
          position: "absolute", left: "calc(100% + 12px)", top: "50%",
          transform: "translateY(-50%)",
          background: "#1e293b", color: "#f1f5f9",
          fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
          padding: "5px 10px", borderRadius: 8,
          pointerEvents: "none", zIndex: 200,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}>
          {label}
          <div style={{
            position: "absolute", right: "100%", top: "50%",
            transform: "translateY(-50%)",
            borderWidth: "5px", borderStyle: "solid",
            borderColor: "transparent #1e293b transparent transparent",
          }} />
        </div>
      )}
    </div>
  );
}

// ─── SIDEBAR INNER CONTENT ────────────────────────────────────────────────────

function SidebarContent({ collapsed, activeNote, setActiveNote, activeNav, setActiveNav, onClose, isMobile }) {
  const EXPANDED_W = 260;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* ── Header ── */}
      <div style={{
        padding: collapsed ? "20px 0" : "20px 20px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconBrain size={16} style={collapsed ? { display: "none !important" } : {}} />
          </div>
          {!collapsed && (
            <span style={{
              fontSize: 16, fontWeight: 800, color: "#f8fafc",
              letterSpacing: "-0.03em", whiteSpace: "nowrap",
              overflow: "hidden",
              fontFamily: "inherit",
            }}>
              SmartLearn <span style={{ color: "#60a5fa" }}>AI</span>
            </span>
          )}
        </div>

        {/* Mobile close / Desktop collapse handled outside */}
        {isMobile && !collapsed && (
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.07)", border: "none",
            color: "#94a3b8", borderRadius: 8,
            width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#f1f5f9"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#94a3b8"; }}
          >
            <IconClose size={16} />
          </button>
        )}
      </div>

      {/* ── Primary actions ── */}
      <div style={{
        padding: collapsed ? "16px 12px" : "16px 14px",
        display: "flex", flexDirection: "column", gap: 6, flexShrink: 0,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <Tooltip label="Upload New Note" disabled={!collapsed}>
          <button style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 9,
            padding: collapsed ? "10px" : "10px 14px",
            borderRadius: 10, border: "none", cursor: "pointer",
            background: "#2563eb", color: "#ffffff",
            fontSize: 13, fontWeight: 700,
            width: "100%",
            transition: "all 0.18s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
          onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
          >
            <IconUpload size={15} />
            {!collapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>Upload New Note</span>}
          </button>
        </Tooltip>

        <Tooltip label="Find Your Notes" disabled={!collapsed}>
          <button style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 9,
            padding: collapsed ? "10px" : "10px 14px",
            borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            background: "rgba(255,255,255,0.05)", color: "#cbd5e1",
            fontSize: 13, fontWeight: 600,
            width: "100%",
            transition: "all 0.18s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#f1f5f9"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#cbd5e1"; }}
          >
            <IconSearch size={15} />
            {!collapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>Find Your Notes</span>}
          </button>
        </Tooltip>
      </div>

      {/* ── Navigation ── */}
      <div style={{
        padding: collapsed ? "12px 12px 0" : "12px 14px 0",
        flexShrink: 0,
      }}>
        {!collapsed && (
          <div style={{
            fontSize: 10, fontWeight: 700, color: "#475569",
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0 2px", marginBottom: 6,
          }}>Navigate</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map(item => {
            const isActive = activeNav === item.id;
            return (
              <Tooltip key={item.id} label={item.label} disabled={!collapsed}>
                <button
                  onClick={() => setActiveNav(item.id)}
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: 10,
                    padding: collapsed ? "9px" : "9px 12px",
                    borderRadius: 9, border: "none", cursor: "pointer",
                    background: isActive ? "rgba(37,99,235,0.22)" : "transparent",
                    color: isActive ? "#93c5fd" : "#94a3b8",
                    fontSize: 13, fontWeight: isActive ? 600 : 500,
                    width: "100%", transition: "all 0.16s ease",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#e2e8f0"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; } }}
                >
                  <item.icon size={17} />
                  {!collapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{item.label}</span>}
                  {!collapsed && isActive && (
                    <span style={{
                      marginLeft: "auto", width: 6, height: 6,
                      borderRadius: "50%", background: "#60a5fa", flexShrink: 0,
                    }} />
                  )}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* ── Recent Notes ── */}
      {!collapsed && (
        <div style={{
          display: "flex", flexDirection: "column",
          flex: 1, overflow: "hidden",
          padding: "16px 14px 0",
          minHeight: 0,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: "#475569",
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0 2px", marginBottom: 6, flexShrink: 0,
          }}>Recent Notes</div>

          <div style={{
            overflowY: "auto", flex: 1,
            marginRight: -6, paddingRight: 6,
            display: "flex", flexDirection: "column", gap: 1,
          }}>
            {RECENT_NOTES.map(note => {
              const isActive = activeNote === note.id;
              return (
                <button
                  key={note.id}
                  onClick={() => setActiveNote(note.id)}
                  title={note.title}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 10px",
                    borderRadius: 9, border: "none", cursor: "pointer",
                    background: isActive ? "rgba(37,99,235,0.18)" : "transparent",
                    width: "100%", textAlign: "left",
                    transition: "all 0.16s ease",
                    flexShrink: 0,
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Color dot */}
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: note.color, flexShrink: 0,
                    boxShadow: isActive ? `0 0 0 2px ${note.color}40` : "none",
                  }} />
                  {/* Text */}
                  <span style={{ flex: 1, overflow: "hidden" }}>
                    <span style={{
                      display: "block",
                      fontSize: 12.5, fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#e2e8f0" : "#94a3b8",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      lineHeight: 1.4,
                    }}>{note.title}</span>
                    <span style={{
                      display: "block", fontSize: 11, color: "#475569", marginTop: 1,
                    }}>{note.time}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapsed: recent dots only (scroll) */}
      {collapsed && (
        <div style={{
          flex: 1, overflow: "hidden",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 4,
          padding: "12px 0",
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#334155", letterSpacing: "0.08em", marginBottom: 4 }}>•••</div>
          <div style={{ overflowY: "auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            {RECENT_NOTES.map(note => (
              <Tooltip key={note.id} label={note.title} disabled={false}>
                <button
                  onClick={() => setActiveNote(note.id)}
                  style={{
                    width: 34, height: 34,
                    borderRadius: 9, border: "none", cursor: "pointer",
                    background: activeNote === note.id ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.16s ease",
                  }}
                  onMouseEnter={e => { if (activeNote !== note.id) e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
                  onMouseLeave={e => { if (activeNote !== note.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: note.color }} />
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: collapsed ? "12px 12px" : "12px 14px",
        display: "flex", alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        gap: 10, flexShrink: 0,
      }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#ffffff",
            }}>AJ</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Alex Johnson
              </div>
              <div style={{ fontSize: 11, color: "#475569" }}>Pro plan</div>
            </div>
          </div>
        )}

        <Tooltip label="Settings" disabled={!collapsed}>
          <button style={{
            width: 32, height: 32, borderRadius: 8, border: "none",
            background: "transparent", cursor: "pointer",
            color: "#475569", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.16s ease", flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#94a3b8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}
          >
            <IconSettings size={16} />
          </button>
        </Tooltip>

        {collapsed && (
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#ffffff", flexShrink: 0,
          }}>AJ</div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN SIDEBAR COMPONENT ───────────────────────────────────────────────────

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(1);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (isMobile && mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, mobileOpen]);

  const EXPANDED_W = 260;
  const COLLAPSED_W = 64;

  return (
    <>
      {/* ── Mobile hamburger ── */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            position: "fixed", top: 16, left: 16, zIndex: 300,
            width: 40, height: 40, borderRadius: 10,
            background: "#0f172a", border: "none", cursor: "pointer",
            color: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          <IconMenu size={20} />
        </button>
      )}

      {/* ── Mobile overlay ── */}
      {isMobile && mobileOpen && (
        <div
          ref={overlayRef}
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 199,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(3px)",
            animation: "fadeIn 0.2s ease both",
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          position: isMobile ? "fixed" : "sticky",
          top: 0, left: 0,
          height: "100vh",
          zIndex: isMobile ? 200 : 10,
          width: isMobile
            ? (mobileOpen ? EXPANDED_W + "px" : "0px")
            : (collapsed ? COLLAPSED_W + "px" : EXPANDED_W + "px"),
          minWidth: isMobile ? undefined : (collapsed ? COLLAPSED_W + "px" : EXPANDED_W + "px"),
          background: "#0f172a",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.28s cubic-bezier(.4,0,.2,1), min-width 0.28s cubic-bezier(.4,0,.2,1)",
          boxShadow: isMobile && mobileOpen
            ? "8px 0 40px rgba(0,0,0,0.4)"
            : (!isMobile ? "2px 0 12px rgba(0,0,0,0.15)" : "none"),
          flexShrink: 0,
        }}
      >
        {/* Collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              position: "absolute", right: 8, top: 24, zIndex: 10,
              width: 24, height: 24, borderRadius: "50%",
              background: "#1e293b", border: "1.5px solid rgba(255,255,255,0.12)",
              color: "#94a3b8", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#334155"; e.currentTarget.style.color = "#f1f5f9"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span style={{
              display: "block",
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}>
              <IconChevronLeft size={12} />
            </span>
          </button>
        )}

        <SidebarContent
          collapsed={!isMobile && collapsed}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onClose={() => setMobileOpen(false)}
          isMobile={isMobile}
        />
      </aside>
    </>
  );
}

// ─── DEMO WRAPPER (remove in production) ─────────────────────────────────────

export function SidebarDemoLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <Sidebar />
      {/* Main content placeholder */}
      <main style={{
        flex: 1, background: "#f8fafc",
        padding: "48px", minHeight: "100vh",
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em", marginBottom: 8 }}>
          Dashboard
        </h1>
        <p style={{ color: "#64748b", fontSize: 15 }}>
          Your SmartLearn AI workspace. Upload notes to get started.
        </p>
      </main>
    </div>
  );
}