import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Radio,
  BarChart3,
  AlertTriangle,
  GitBranch,
  Users,
  Shield,
  Activity,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Clock,
  BookOpen,
  Database,
  Lock,
  Eye,
  X,
  Info,
  MessageSquare,
  Zap,
  RefreshCw,
  ArrowRight,
  Star,
  ChevronDown,
  UserCircle,
  LogIn,
  Building2,
  Link2,
  UserCheck,
  Settings,
  Loader2,
  Mail,
  Home,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

// ── Flow & navigation types ───────────────────────────────────────────────────

type FlowStep =
  | "landing"
  | "login"
  | "create-account"
  | "workspace"
  | "connect-sources"
  | "privacy-review"
  | "processing"
  | "app"
  | "emp-data"
  | "emp-home";

type Role = "manager" | "contributor";

type JobRole =
  | "Project Manager"
  | "Engineering Manager"
  | "Team Lead"
  | "Developer / Contributor"
  | "Other";

type Page =
  | "dashboard"
  | "signals"
  | "workload"
  | "risks"
  | "contributions"
  | "profiles"
  | "pulse"
  | "governance";

type ContribPage = "my-overview" | "my-contributions" | "my-pulse" | "my-data" | "team-context" | "my-profile";

const MANAGER_NAV: { id: Page; label: string; icon: React.ReactNode; tabs: string[] }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={15} />, tabs: ["Overview", "Active Risks", "Capacity Snapshot", "Sprint Summary"] },
  { id: "signals", label: "Team Signals", icon: <Radio size={15} />, tabs: ["Collaboration", "Delivery"] },
  { id: "workload", label: "Workload & Capacity", icon: <BarChart3 size={15} />, tabs: ["Current Capacity", "Trends", "Pressure Forecast", "Recommendations"] },
  { id: "risks", label: "Risks & Insights", icon: <AlertTriangle size={15} />, tabs: ["All Risks", "High Priority", "Resolved"] },
  { id: "contributions", label: "Contributions", icon: <GitBranch size={15} />, tabs: ["Timeline"] },
  { id: "profiles", label: "Evidence Profiles", icon: <Users size={15} />, tabs: ["Team Members"] },
  { id: "pulse", label: "Weekly Pulse", icon: <Activity size={15} />, tabs: ["Manager View"] },
  { id: "governance", label: "Data & Governance", icon: <Shield size={15} />, tabs: ["Connected Sources", "Controls"] },
];

const CONTRIB_NAV: { id: ContribPage; label: string; icon: React.ReactNode }[] = [
  { id: "my-overview", label: "My Overview", icon: <Home size={15} /> },
  { id: "my-contributions", label: "Contributions", icon: <GitBranch size={15} /> },
  { id: "my-pulse", label: "Weekly Pulse", icon: <Activity size={15} /> },
  { id: "my-data", label: "My Data", icon: <Shield size={15} /> },
  { id: "my-profile", label: "Individual Profile", icon: <UserCircle size={15} /> },
  { id: "team-context", label: "Team Context", icon: <Users size={15} /> },
];

const PROJECTS = ["Payments Platform", "Customer Portal", "Internal Tools"];

// ── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [flow, setFlow] = useState<FlowStep>("landing");
  const [selectedJobRole, setSelectedJobRole] = useState<JobRole>("Project Manager");
  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [role, setRole] = useState<Role>("manager");
  const [page, setPage] = useState<Page>("dashboard");
  const [tab, setTab] = useState("Overview");
  const [contribPage, setContribPage] = useState<ContribPage>("my-overview");
  const [project, setProject] = useState("Payments Platform");
  const [projectOpen, setProjectOpen] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  // Onboarding screens
  if (flow !== "app" && flow !== "emp-data" && flow !== "emp-home") {
    return <OnboardingFlow step={flow} selectedJobRole={selectedJobRole} connectedSources={connectedSources} onStep={setFlow} onBack={setFlow} onSelectJobRole={setSelectedJobRole} setConnectedSources={setConnectedSources} />;
  }

  // Employee invitation flow
  if (flow === "emp-data" || flow === "emp-home") {
    return <EmployeeFlow step={flow} onStep={setFlow} />;
  }

  const current = MANAGER_NAV.find((n) => n.id === page)!;

  const gotoPage = (id: Page) => {
    setPage(id);
    setTab(MANAGER_NAV.find((n) => n.id === id)!.tabs[0]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: "'Inter', sans-serif", background: "#0d1117" }}>
      {/* ── Sidebar ── */}
      <aside className="flex flex-col w-56 shrink-0 border-r" style={{ background: "#080c13", borderColor: "rgba(255,255,255,0.06)" }}>
        {/* Logo */}
        <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
              <Activity size={13} color="#fff" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">TeamPulse</div>
              <div className="text-[9px] uppercase tracking-widest mt-0.5" style={{ fontFamily: "'DM Mono', monospace", color: "#6366f1" }}>Collaboration Intelligence</div>
            </div>
          </div>
        </div>

        {/* Project switcher */}
        <div className="relative border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => setProjectOpen(!projectOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-white/[0.03]"
          >
            <div>
              <div className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: "#374151" }}>Project</div>
              <div className="text-xs font-medium" style={{ color: "#94a3b8" }}>{project}</div>
            </div>
            <ChevronDown size={12} color="#374151" className={`transition-transform ${projectOpen ? "rotate-180" : ""}`} />
          </button>
          {projectOpen && (
            <div className="absolute left-0 right-0 top-full z-50 border-b shadow-xl" style={{ background: "#0d1117", borderColor: "rgba(255,255,255,0.08)" }}>
              {PROJECTS.map((p) => (
                <button
                  key={p}
                  onClick={() => { setProject(p); setProjectOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2 text-left text-xs hover:bg-white/[0.04]"
                  style={{ color: p === project ? "#e2e8f0" : "#4a5568" }}
                >
                  {p}
                  {p === project && <CheckCircle2 size={11} color="#6366f1" />}
                </button>
              ))}
              <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left" style={{ color: "#4a5568" }}>
                  <Plus size={11} /> Connect another project
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left" style={{ color: "#4a5568" }}>
                  <Settings size={11} /> Workspace Settings
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sprint context */}
        <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#374151" }}>Current Sprint</div>
          <div className="text-xs font-medium" style={{ color: "#718096" }}>Sprint 23 · Jul 14 – Jul 28</div>
          <div className="mt-2 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full" style={{ width: "64%", background: "#6366f1" }} />
          </div>
          <div className="text-[9px] mt-1" style={{ fontFamily: "'DM Mono', monospace", color: "#374151" }}>9 days remaining · 64%</div>
        </div>

        {/* Role toggle */}
        <div className="px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: "#374151" }}>View as</div>
          <div className="flex rounded-md overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {(["manager", "contributor"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); if (r === "contributor") setContribPage("my-overview"); }}
                className="flex-1 text-[10px] py-1 capitalize transition-colors"
                style={{
                  background: role === r ? "#6366f1" : "transparent",
                  color: role === r ? "#fff" : "#374151",
                }}
              >
                {r === "manager" ? "Manager" : "Contributor"}
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {role === "manager"
            ? MANAGER_NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => gotoPage(n.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    fontSize: 12.5,
                    color: page === n.id ? "#e2e8f0" : "#4a5568",
                    background: page === n.id ? "rgba(99,102,241,0.1)" : "transparent",
                    borderLeft: `2px solid ${page === n.id ? "#6366f1" : "transparent"}`,
                  }}
                >
                  <span style={{ color: page === n.id ? "#6366f1" : "#2d3748" }}>{n.icon}</span>
                  {n.label}
                </button>
              ))
            : CONTRIB_NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setContribPage(n.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    fontSize: 12.5,
                    color: contribPage === n.id ? "#e2e8f0" : "#4a5568",
                    background: contribPage === n.id ? "rgba(99,102,241,0.1)" : "transparent",
                    borderLeft: `2px solid ${contribPage === n.id ? "#6366f1" : "transparent"}`,
                  }}
                >
                  <span style={{ color: contribPage === n.id ? "#6366f1" : "#2d3748" }}>{n.icon}</span>
                  {n.label}
                </button>
              ))}
        </nav>

        {/* Demo: preview employee flow */}
        {role === "manager" && (
          <div className="px-4 pb-2">
            <button
              onClick={() => setShowInviteDialog(true)}
              className="w-full text-[10px] px-2 py-1.5 rounded border text-left transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.06)", color: "#374151" }}
            >
              <Mail size={9} className="inline mr-1.5 mb-0.5" />
              Preview employee invitation flow
            </button>
          </div>
        )}

        {/* User */}
        <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              {role === "manager" ? "SC" : "PS"}
            </div>
            <div>
              <div className="text-xs font-medium" style={{ color: "#e2e8f0" }}>{role === "manager" ? "Sarah Chen" : "Priya Sharma"}</div>
              <div className="text-[10px]" style={{ color: "#374151" }}>{role === "manager" ? "Project Manager" : "Frontend Engineer"}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Tab bar */}
        <header className="flex items-center gap-1 px-6 border-b shrink-0" style={{ height: 46, borderColor: "rgba(255,255,255,0.06)", background: "#0d1117" }}>
          {role === "manager"
            ? current.tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                  style={{ color: tab === t ? "#e2e8f0" : "#4a5568", background: tab === t ? "rgba(255,255,255,0.06)" : "transparent" }}
                >
                  {t}
                </button>
              ))
            : null}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {role === "manager" ? (
            <>
              {page === "dashboard" && <DashboardPage tab={tab} onNav={gotoPage} />}
              {page === "signals" && <SignalsPage tab={tab} />}
              {page === "workload" && <WorkloadPage tab={tab} />}
              {page === "risks" && <RisksPage tab={tab} />}
              {page === "contributions" && <ContributionsPage tab={tab} />}
              {page === "profiles" && <ProfilesPage tab={tab} />}
              {page === "pulse" && <PulsePage tab="Manager View" />}
              {page === "governance" && <GovernancePage tab={tab} />}
            </>
          ) : (
            <ContributorView page={contribPage} />
          )}
        </main>
      </div>

      <InvitationDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        onAccept={() => { setShowInviteDialog(false); setFlow("emp-data"); }}
      />
    </div>
  );
}

// ── Invitation accept/reject popup (contributor role) ─────────────────────────

function InvitationDialog({ open, onOpenChange, onAccept }: { open: boolean; onOpenChange: (open: boolean) => void; onAccept: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" style={{ background: "#131929", borderColor: "rgba(255,255,255,0.07)" }}>
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-indigo-800 flex items-center justify-center mx-auto mb-1">
            <Mail size={20} color="#a5b4fc" />
          </div>
          <DialogTitle className="text-center" style={{ color: "#e2e8f0" }}>You've been invited to TeamPulse</DialogTitle>
          <DialogDescription className="text-center" style={{ color: "#4a5568" }}>Sarah Chen invited you to join as a contributor:</DialogDescription>
        </DialogHeader>
        <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Payments Platform</div>
          <div className="text-xs mt-0.5" style={{ color: "#374151" }}>Acme Engineering</div>
        </div>
        <DialogFooter className="sm:flex-col gap-2">
          <button onClick={onAccept} className="w-full py-2.5 rounded-lg text-sm font-medium" style={{ background: "#6366f1", color: "#fff" }}>
            Accept Invitation
          </button>
          <DialogClose asChild>
            <button className="w-full py-2 text-xs" style={{ color: "#374151" }}>Reject</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ONBOARDING FLOW
// ═══════════════════════════════════════════════════════════════════════════════

function getPreviousStep(step: FlowStep, selectedJobRole: JobRole): FlowStep | null {
  switch (step) {
    case "login":
      return "landing";
    case "create-account":
      return "landing";
    case "workspace":
      return "create-account";
    case "connect-sources":
      return selectedJobRole === "Project Manager" ? "workspace" : "create-account";
    case "privacy-review":
      return "connect-sources";
    case "processing":
      return "privacy-review";
    default:
      return null;
  }
}

function OnboardingFlow({
  step,
  selectedJobRole,
  connectedSources,
  onStep,
  onBack,
  onSelectJobRole,
  setConnectedSources,
}: {
  step: FlowStep;
  selectedJobRole: JobRole;
  connectedSources: string[];
  onStep: (s: FlowStep) => void;
  onBack: (s: FlowStep) => void;
  onSelectJobRole: (role: JobRole) => void;
  setConnectedSources: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const prevStep = getPreviousStep(step, selectedJobRole);
  const handleBack = prevStep ? () => onBack(prevStep) : undefined;

  if (step === "landing") return <OnboardLanding onStep={onStep} />;
  if (step === "login") return <OnboardLogin onStep={onStep} onBack={handleBack} />;
  if (step === "create-account") return <OnboardCreateAccount onNext={() => onStep(selectedJobRole === "Project Manager" ? "workspace" : "connect-sources")} selectedRole={selectedJobRole} onSelectRole={onSelectJobRole} onBack={handleBack} />;
  if (step === "workspace") return <OnboardWorkspace onStep={onStep} onBack={handleBack} />;
  if (step === "connect-sources") return <OnboardConnectSources connectedSources={connectedSources} setConnectedSources={setConnectedSources} onStep={onStep} onBack={handleBack} />;
  if (step === "privacy-review") return <OnboardPrivacyReview connectedSources={connectedSources} onStep={onStep} onBack={handleBack} />;
  if (step === "processing") return <OnboardProcessing onStep={onStep} onBack={handleBack} />;
  return null;
}

// Shared onboarding chrome
function OnboardShell({ step, total, children, onBack }: { step: number; total: number; children: React.ReactNode; onBack?: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "#0d1117", fontFamily: "'Inter', sans-serif" }}>
      {/* logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Activity size={16} color="#fff" />
        </div>
        <span className="text-base font-semibold text-white">TeamPulse</span>
      </div>
      {/* progress */}
      {onBack && (
        <div className="w-full max-w-md mb-4">
          <button onClick={onBack} className="text-sm font-medium text-indigo-200 hover:text-white transition-colors">
            ← Back
          </button>
        </div>
      )}
      {total > 0 && (
        <div className="w-full max-w-md mb-6">
          <div className="h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(step / total) * 100}%`, background: "#6366f1" }} />
          </div>
          <div className="text-[10px] mt-1.5 text-right" style={{ fontFamily: "'DM Mono', monospace", color: "#374151" }}>Step {step} of {total}</div>
        </div>
      )}
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

function OnboardCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-7" style={{ background: "#131929", borderColor: "rgba(255,255,255,0.07)" }}>
      {children}
    </div>
  );
}

function OnboardBtn({ label, onClick, secondary = false }: { label: string; onClick: () => void; secondary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors"
      style={secondary
        ? { background: "rgba(255,255,255,0.05)", color: "#718096", border: "1px solid rgba(255,255,255,0.08)" }
        : { background: "#6366f1", color: "#fff" }}
    >
      {label}
    </button>
  );
}

function OnboardField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full text-sm px-3 py-2.5 rounded-lg"
        style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }}
      />
    </div>
  );
}

// 1. Landing
function OnboardLanding({ onStep }: { onStep: (s: FlowStep) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#0d1117", fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Activity size={20} color="#fff" />
        </div>
        <span className="text-xl font-semibold text-white">TeamPulse</span>
      </div>
      <div className="text-center max-w-lg mb-10">
        <h1 className="text-3xl font-semibold mb-4" style={{ color: "#e2e8f0" }}>Collaboration Intelligence for Better Team Decisions</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#4a5568" }}>
          Surface delivery risks, capacity pressure, knowledge dependencies and contribution evidence from the tools your team already uses.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-72">
        <button onClick={() => onStep("create-account")} className="w-full py-3 rounded-lg text-sm font-semibold transition-colors" style={{ background: "#6366f1", color: "#fff" }}>
          Get Started
        </button>
        <button onClick={() => onStep("login")} className="w-full py-3 rounded-lg text-sm font-medium border transition-colors" style={{ background: "transparent", borderColor: "rgba(255,255,255,0.1)", color: "#94a3b8" }}>
          Sign In
        </button>
      </div>
      <p className="text-[11px] mt-8 text-center max-w-xs leading-relaxed" style={{ color: "#374151" }}>
        TeamPulse supports managerial decisions. It does not score or rank employees.
      </p>
      {/* data sources note */}
      <div className="flex items-center gap-5 mt-12">
        {["Jira", "GitHub", "Confluence"].map((s) => (
          <div key={s} className="flex items-center gap-1.5 text-xs" style={{ color: "#2d3748" }}>
            <CheckCircle2 size={11} color="#374151" /> {s}
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Login
function OnboardLogin({ onStep }: { onStep: (s: FlowStep) => void }) {
  return (
    <OnboardShell step={0} total={0}>
      <OnboardCard>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Welcome back</h2>
        <p className="text-xs mb-6" style={{ color: "#4a5568" }}>Sign in to your TeamPulse account.</p>
        <div className="space-y-4 mb-5">
          <OnboardField label="Work Email" placeholder="manager@company.com" type="email" />
          <OnboardField label="Password" placeholder="••••••••" type="password" />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "#4a5568" }}>
              <input type="checkbox" className="rounded" /> Remember me
            </label>
            <button className="text-xs" style={{ color: "#6366f1" }}>Forgot password?</button>
          </div>
        </div>
        <OnboardBtn label="Sign In" onClick={() => onStep("app")} />
        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="text-[10px]" style={{ color: "#374151" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div className="space-y-2">
          <button className="w-full py-2 rounded-lg text-xs border transition-colors" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#718096" }}>Continue with Google</button>
          <button className="w-full py-2 rounded-lg text-xs border transition-colors" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#718096" }}>Continue with Microsoft</button>
        </div>
        <p className="text-[11px] text-center mt-5" style={{ color: "#374151" }}>
          New to TeamPulse?{" "}
          <button onClick={() => onStep("create-account")} className="underline" style={{ color: "#6366f1" }}>Create Workspace</button>
        </p>
      </OnboardCard>
    </OnboardShell>
  );
}

// 3. Create Account
function OnboardCreateAccount({
  onNext,
  selectedRole,
  onSelectRole,
  onBack,
}: {
  onNext: () => void;
  selectedRole: JobRole;
  onSelectRole: (role: JobRole) => void;
  onBack?: () => void;
}) {
  return (
    <OnboardShell step={1} total={4} onBack={onBack}>
      <OnboardCard>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Create your TeamPulse account</h2>
        <p className="text-xs mb-6" style={{ color: "#4a5568" }}>Job role is for context only — access permissions are set within your workspace.</p>
        <div className="space-y-4 mb-5">
          <OnboardField label="Full Name" placeholder="Sarah Chen" />
          <OnboardField label="Work Email" placeholder="sarah@acme.com" type="email" />
          <OnboardField label="Password" placeholder="••••••••" type="password" />
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Job Role</label>
            <select
              value={selectedRole}
              onChange={(event) => onSelectRole(event.target.value as JobRole)}
              className="w-full text-sm px-3 py-2.5 rounded-lg appearance-none"
              style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }}
            >
              <option>Project Manager</option>
              <option>Engineering Manager</option>
              <option>Team Lead</option>
              <option>Developer / Contributor</option>
              <option>Other</option>
            </select>
          </div>
          <label className="flex items-start gap-2 text-xs cursor-pointer" style={{ color: "#4a5568" }}>
            <input type="checkbox" className="mt-0.5 rounded" defaultChecked />
            <span>I agree to TeamPulse's data and privacy policy.</span>
          </label>
        </div>
        <OnboardBtn label="Create Account" onClick={onNext} />
      </OnboardCard>
    </OnboardShell>
  );
}

// 4. Workspace Setup
function OnboardWorkspace({ onStep, onBack }: { onStep: (s: FlowStep) => void; onBack?: () => void }) {
  return (
    <OnboardShell step={2} total={4} onBack={onBack}>
      <OnboardCard>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Set up your workspace</h2>
        <p className="text-xs mb-6" style={{ color: "#4a5568" }}>A workspace groups your projects and team. You can connect multiple projects later.</p>
        <div className="space-y-4 mb-5">
          <OnboardField label="Workspace Name" placeholder="Acme Engineering" />
          <OnboardField label="Your Role" placeholder="Project Manager" />
          <OnboardField label="Team Name" placeholder="Payments Platform" />
        </div>
        <OnboardBtn label="Continue" onClick={() => onStep("connect-sources")} />
        <button className="w-full text-xs text-center mt-3" style={{ color: "#374151" }}>
          Have an invitation? Join an existing workspace
        </button>
      </OnboardCard>
    </OnboardShell>
  );
}

// 5. Connect Data Sources
function OnboardConnectSources({ connectedSources, setConnectedSources, onStep, onBack }: { connectedSources: string[]; setConnectedSources: React.Dispatch<React.SetStateAction<string[]>>; onStep: (s: FlowStep) => void; onBack?: () => void }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const sources = [
    { name: "Jira", desc: "Task status · assignees · sprints · blockers · estimates" },
    { name: "GitHub", desc: "Pull requests · reviews · repository activity" },
    { name: "Confluence", desc: "Documentation activity · ownership" },
  ];

  const openConnectDialog = (name: string) => {
    if (!connectedSources.includes(name)) {
      setSelectedSource(name);
      setIsDialogOpen(true);
    }
  };

  const completeConnection = (name: string) => {
    setConnectedSources((prev) => (prev.includes(name) ? prev : [...prev, name]));
    setIsDialogOpen(false);
    setSelectedSource(null);
  };

  return (
    <OnboardShell step={3} total={4} onBack={onBack}>
      <OnboardCard>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Connect your work tools</h2>
        <p className="text-xs mb-6 leading-relaxed" style={{ color: "#4a5568" }}>
          TeamPulse uses project metadata to surface team-level conditions. Connect only the sources you want analyzed.
        </p>
        <div className="space-y-3 mb-5">
          {sources.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: connectedSources.includes(s.name) ? "#6366f1" : "rgba(255,255,255,0.07)", background: connectedSources.includes(s.name) ? "rgba(99,102,241,0.06)" : "transparent" }}>
              <div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: "#e2e8f0" }}>{s.name}</div>
                <div className="text-[11px]" style={{ color: "#374151" }}>{s.desc}</div>
              </div>
              <button
                onClick={() => openConnectDialog(s.name)}
                className="text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
                style={connectedSources.includes(s.name)
                  ? { background: "rgba(34,197,94,0.12)", color: "#22c55e" }
                  : { background: "rgba(99,102,241,0.12)", color: "#818cf8" }}
              >
                {connectedSources.includes(s.name) ? "✓ Connected" : `Connect ${s.name}`}
              </button>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-lg mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#374151" }}>TeamPulse does not collect</div>
          <div className="text-[11px]" style={{ color: "#4a5568" }}>Private messages · keystrokes · screen activity · webcam / microphone</div>
        </div>
        <OnboardBtn label="Continue" onClick={() => onStep("privacy-review")} />
      </OnboardCard>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {selectedSource}</DialogTitle>
            <DialogDescription>
              Choose how you’d like to connect {selectedSource?.toLowerCase()} for TeamPulse.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 mt-4">
            <button
              onClick={() => selectedSource && completeConnection(selectedSource)}
              className="w-full rounded-lg py-3 text-sm font-medium"
              style={{ background: "#6366f1", color: "#fff" }}
            >
              Connect with Google
            </button>
            <button
              onClick={() => selectedSource && completeConnection(selectedSource)}
              className="w-full rounded-lg py-3 text-sm font-medium border"
              style={{ background: "transparent", borderColor: "rgba(255,255,255,0.12)", color: "#94a3b8" }}
            >
              Connect with work email
            </button>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <button className="w-full rounded-lg py-3 text-sm font-medium" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}>
                Cancel
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </OnboardShell>
  );
}

// 9. Privacy Review
function OnboardPrivacyReview({ connectedSources, onStep, onBack }: { connectedSources: string[]; onStep: (s: FlowStep) => void; onBack?: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const connectedList = connectedSources.map((source) => {
    switch (source) {
      case "Jira":
        return "✓ Jira — Payments Platform";
      case "GitHub":
        return "✓ GitHub — payments-api";
      case "Confluence":
        return "✓ Confluence — Payments Space";
      default:
        return `✓ ${source}`;
    }
  });

  return (
    <OnboardShell step={4} total={4} onBack={onBack}>
      <OnboardCard>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Review what TeamPulse will analyse</h2>
        <p className="text-xs mb-5" style={{ color: "#4a5568" }}>Before we start, confirm what is and isn't collected in your workspace.</p>
        <div className="grid grid-cols-2 gap-3 mb-4 text-[11px]">
          <div className="p-3 rounded-lg" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)" }}>
            <div className="font-semibold mb-2" style={{ color: "#22c55e" }}>Connected</div>
            {connectedList.length > 0 ? (
              connectedList.map((s) => (
                <div key={s} className="mb-1" style={{ color: "#94a3b8" }}>{s}</div>
              ))
            ) : (
              <div className="text-sm" style={{ color: "#94a3b8" }}>No tools connected yet.</div>
            )}
            <div className="mt-2 pt-2 border-t" style={{ borderColor: "rgba(34,197,94,0.1)", color: "#374151" }}>5 contributors</div>
          </div>
          <div>
            <div className="p-3 rounded-lg mb-2" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)" }}>
              <div className="font-semibold mb-1.5" style={{ color: "#a5b4fc" }}>TeamPulse will analyse</div>
              {["Delivery workflow metadata", "Capacity allocation", "PR/review distribution", "Documentation activity"].map((s) => (
                <div key={s} className="flex items-center gap-1.5 mb-0.5" style={{ color: "#4a5568" }}><CheckCircle2 size={9} color="#6366f1" />{s}</div>
              ))}
            </div>
            <div className="p-3 rounded-lg" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <div className="font-semibold mb-1.5" style={{ color: "#ef4444" }}>Will not analyse</div>
              {["Private messages", "Screens / keystrokes", "Emotional state", "Employee personality"].map((s) => (
                <div key={s} className="flex items-center gap-1.5 mb-0.5" style={{ color: "#4a5568" }}><X size={9} color="#ef4444" />{s}</div>
              ))}
            </div>
          </div>
        </div>
        <label className="flex items-start gap-2.5 text-xs cursor-pointer mb-5" style={{ color: "#718096" }}>
          <input type="checkbox" className="mt-0.5 rounded shrink-0" checked={agreed} onChange={() => setAgreed(!agreed)} />
          I understand TeamPulse provides decision-support signals, not employee performance scores.
        </label>
        <button
          onClick={() => { if (agreed) onStep("processing"); }}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{ background: agreed ? "#6366f1" : "rgba(99,102,241,0.2)", color: agreed ? "#fff" : "#4a5568", cursor: agreed ? "pointer" : "not-allowed" }}
        >
          Start TeamPulse
        </button>
      </OnboardCard>
    </OnboardShell>
  );
}

// 10. Processing
function OnboardProcessing({ onStep, onBack }: { onStep: (s: FlowStep) => void; onBack?: () => void }) {
  const [done, setDone] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);

  const steps = [
    "Jira project connected",
    "5 contributors identified",
    "Sprint history imported",
    "GitHub identities mapped",
    "Contribution evidence organised",
    "Analysing team-level patterns...",
  ];

  useEffect(() => {
    if (stepIdx < steps.length) {
      const t = setTimeout(() => setStepIdx((i) => i + 1), 550);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), 600);
      return () => clearTimeout(t);
    }
  }, [stepIdx]);

  return (
    <OnboardShell step={0} total={0} onBack={onBack}>
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Activity size={16} color="#fff" />
        </div>
        <span className="text-base font-semibold text-white">TeamPulse</span>
      </div>
      {!done ? (
        <div className="w-80">
          <div className="text-sm font-medium mb-6 text-center" style={{ color: "#94a3b8" }}>Preparing your TeamPulse workspace...</div>
          <div className="space-y-2.5">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 text-xs" style={{ color: i < stepIdx ? "#22c55e" : i === stepIdx ? "#94a3b8" : "#2d3748" }}>
                {i < stepIdx ? (
                  <CheckCircle2 size={13} color="#22c55e" />
                ) : i === stepIdx ? (
                  <Loader2 size={13} className="animate-spin" color="#6366f1" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border" style={{ borderColor: "#2d3748" }} />
                )}
                {s}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}>
            <CheckCircle2 size={28} color="#22c55e" />
          </div>
          <div className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Workspace ready</div>
          <div className="text-sm mb-6" style={{ color: "#4a5568" }}>3 conditions need your attention</div>
          <button onClick={() => onStep("app")} className="flex items-center gap-2 mx-auto text-sm px-5 py-2.5 rounded-lg font-medium" style={{ background: "#6366f1", color: "#fff" }}>
            Go to Dashboard <ArrowRight size={14} />
          </button>
        </div>
      )}
    </OnboardShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EMPLOYEE INVITATION FLOW (invite accept/reject is a popup — see InvitationDialog)
// ═══════════════════════════════════════════════════════════════════════════════

function EmployeeFlow({ step, onStep }: { step: FlowStep; onStep: (s: FlowStep) => void }) {
  if (step === "emp-data") return <EmpDataConfirm onStep={onStep} />;
  return <EmpHome onStep={onStep} />;
}

function EmpDataConfirm({ onStep }: { onStep: (s: FlowStep) => void }) {
  const attrs = [
    { source: "Jira", identity: "Priya Sharma" },
    { source: "GitHub", identity: "priya-s" },
    { source: "Confluence", identity: "Priya Sharma" },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#0d1117", fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Activity size={16} color="#fff" />
        </div>
        <span className="text-base font-semibold text-white">TeamPulse</span>
      </div>
      <div className="w-full max-w-sm">
        <div className="p-7 rounded-xl border" style={{ background: "#131929", borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Your data in TeamPulse</h2>
          <p className="text-xs mb-5 leading-relaxed" style={{ color: "#4a5568" }}>
            TeamPulse currently associates the following identities with your account. You can review evidence, add context, and report inaccuracies.
          </p>
          <div className="space-y-2.5 mb-5">
            {attrs.map((a) => (
              <div key={a.source} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.1)" }}>
                <span className="text-xs font-medium" style={{ color: "#94a3b8" }}>{a.source}</span>
                <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#22c55e" }}>✓ {a.identity}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg text-[11px] leading-relaxed mb-5" style={{ background: "rgba(255,255,255,0.03)", color: "#374151" }}>
            Evidence attributed to you is visible only to you and your manager. You can dispute or add context to any item.
          </div>
          <button onClick={() => onStep("emp-home")} className="w-full py-2.5 rounded-lg text-sm font-medium" style={{ background: "#6366f1", color: "#fff" }}>
            Looks Correct
          </button>
        </div>
      </div>
    </div>
  );
}

function EmpHome({ onStep }: { onStep: (s: FlowStep) => void }) {
  return (
    <div className="min-h-screen" style={{ background: "#0d1117", fontFamily: "'Inter', sans-serif" }}>
      {/* Mini header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
            <Activity size={12} color="#fff" />
          </div>
          <span className="text-sm font-semibold text-white">TeamPulse</span>
          <span className="text-xs ml-2" style={{ color: "#374151" }}>Payments Platform</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center text-[9px] font-bold text-white">PS</div>
          <span className="text-xs" style={{ color: "#94a3b8" }}>Priya Sharma</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#374151" }}>Sprint 23 · Jul 24</div>
          <h1 className="text-xl font-semibold" style={{ color: "#e2e8f0" }}>Good morning, Priya</h1>
        </div>
        <div className="space-y-4">
          {/* Weekly Pulse */}
          <div className="p-5 rounded-xl border" style={{ background: "#131929", borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Your Weekly Pulse</div>
                <div className="text-xs mt-0.5" style={{ color: "#374151" }}>Not submitted this week</div>
              </div>
              <span className="w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
            </div>
            <button onClick={() => onStep("app")} className="text-xs px-4 py-2 rounded-lg font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>
              Complete this week's pulse
            </button>
          </div>
          {/* Contribution Evidence */}
          <div className="p-5 rounded-xl border" style={{ background: "#131929", borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "#e2e8f0" }}>Contribution Evidence</div>
            <div className="text-xs mb-3" style={{ color: "#374151" }}>6 recent items this sprint</div>
            <div className="space-y-2 text-xs" style={{ color: "#4a5568" }}>
              {["Jira — TASK-119 closed", "GitHub — PR #88 reviewed", "Confluence — Auth guide updated"].map((e) => (
                <div key={e} className="flex items-center gap-2">
                  <CheckCircle2 size={10} color="#374151" /> {e}
                </div>
              ))}
            </div>
          </div>
          {/* Context requested */}
          <div className="p-5 rounded-xl border" style={{ background: "#131929", borderColor: "rgba(245,158,11,0.2)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "#f59e0b" }}>Context requested</div>
            <div className="text-xs mb-3" style={{ color: "#94a3b8" }}>TASK-231 exceeded expected completion date. Your context helps give this signal meaning.</div>
            <button className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>Add Context</button>
          </div>
          {/* Peer context */}
          <div className="p-5 rounded-xl border" style={{ background: "#131929", borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "#e2e8f0" }}>Recent Peer Context</div>
            <div className="text-xs" style={{ color: "#94a3b8" }}>Liam Torres added context about your authentication support on Jul 20.</div>
          </div>
        </div>
        <button onClick={() => onStep("app")} className="mt-6 text-xs" style={{ color: "#374151" }}>← Back to manager demo view</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTRIBUTOR VIEW (role = contributor, inside main app shell)
// ═══════════════════════════════════════════════════════════════════════════════

function ContributorView({ page }: { page: ContribPage }) {
  if (page === "my-overview") return <ContribOverview />;
  if (page === "my-contributions") return <ContribContributions />;
  if (page === "my-pulse") return <SubmitPulse />;
  if (page === "my-data") return <MyData />;
  if (page === "my-profile") return <ContribProfile />;
  return <ContribTeamContext />;
}

function ContribOverview() {
  return (
    <div>
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#374151" }}>Sprint 23 · Jul 24</div>
        <h1 className="text-xl font-semibold" style={{ color: "#e2e8f0" }}>Good morning, Priya</h1>
        <p className="text-xs mt-1" style={{ color: "#374151" }}>Your responses provide context to project signals and are not used to calculate a performance score.</p>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <Card>
          <Label>Weekly Pulse</Label>
          <div className="text-sm font-medium mb-3" style={{ color: "#f59e0b" }}>Not submitted this week</div>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>Complete Pulse</button>
        </Card>
        <Card>
          <Label>Contribution Evidence</Label>
          <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'DM Mono', monospace", color: "#e2e8f0" }}>6</div>
          <div className="text-xs" style={{ color: "#374151" }}>items this sprint</div>
        </Card>
        <Card>
          <Label>Context Requested</Label>
          <div className="text-xs mb-2" style={{ color: "#94a3b8" }}>TASK-231 exceeded expected completion date.</div>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Add Context</button>
        </Card>
        <Card>
          <Label>Recent Peer Context</Label>
          <div className="text-xs" style={{ color: "#94a3b8" }}>Liam Torres added context about your authentication support on Jul 20.</div>
        </Card>
      </div>
    </div>
  );
}

function ContribContributions() {
  const [tab, setTab] = useState<"Timeline" | "Add Context" | "Peer Context">("Timeline");

  return (
    <div>
      <SectionHeader title="Contributions" subtitle="Evidence from connected systems and contextual contributions. Sprint 23." />
      <div className="flex flex-wrap gap-2 mb-5">
        {(["Timeline", "Add Context", "Peer Context"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setTab(option)}
            className="text-xs px-3 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: tab === option ? "#6366f1" : "rgba(255,255,255,0.08)",
              background: tab === option ? "rgba(99,102,241,0.12)" : "transparent",
              color: tab === option ? "#e2e8f0" : "#94a3b8",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {tab === "Timeline" ? <ContribTimeline /> : tab === "Add Context" ? <AddContext /> : <PeerContext />}
    </div>
  );
}

function ContribTeamContext() {
  return (
    <div>
      <SectionHeader title="Team Context" subtitle="High-level sprint and collaboration signals visible to all team members." />
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <Label>Sprint Progress</Label>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold" style={{ fontFamily: "'DM Mono', monospace", color: "#e2e8f0" }}>64%</span>
            <span className="text-xs mb-0.5" style={{ color: "#374151" }}>Sprint 23 complete</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full" style={{ width: "64%", background: "#6366f1" }} />
          </div>
        </Card>
        <Card>
          <Label>Team Conditions</Label>
          <div className="space-y-1.5 mt-1">
            {[["Delivery", "Stable →"], ["Collaboration", "Stable →"], ["Capacity", "Attention ↑"]].map(([l, v]) => (
              <div key={l as string} className="flex items-center justify-between text-xs">
                <span style={{ color: "#718096" }}>{l}</span>
                <span style={{ color: (v as string).includes("Attention") ? "#f59e0b" : "#818cf8" }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ContribProfile() {
  return (
    <div>
      <SectionHeader title="Individual Profile" subtitle="Your current contribution evidence, capacity context, and recent collaboration signals." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <Label>Contribution Evidence</Label>
          <div className="text-5xl font-semibold" style={{ color: "#e2e8f0", fontFamily: "'DM Mono', monospace" }}>6</div>
          <div className="text-xs" style={{ color: "#94a3b8" }}>Evidence items this sprint</div>
        </Card>
        <Card>
          <Label>Capacity Snapshot</Label>
          <div className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
            Workload: Manageable
            <br />
            Blockers: Minor
            <br />
            Context requested: None
          </div>
        </Card>
        <Card>
          <Label>Recent Peer Support</Label>
          <div className="text-xs" style={{ color: "#94a3b8" }}>
            Priya helped unblock a cross-team API integration on Jul 20 and added context to TASK-231.
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <Label>Recent Contribution Timeline</Label>
        <div className="space-y-3 mt-3">
          {[
            { date: "Jul 24", desc: "Closed TASK-119 — Auth Token Refresh Logic", source: "Jira" },
            { date: "Jul 22", desc: "Resolved authentication incident", source: "Jira" },
            { date: "Jul 21", desc: "Reviewed payment integration PR #88", source: "GitHub" },
            { date: "Jul 19", desc: "Updated API authentication guide", source: "Confluence" },
          ].map((item) => (
            <div key={item.desc} className="flex items-start gap-3">
              <Mono className="text-[10px] w-16 shrink-0" style={{ color: "#374151" }}>{item.date}</Mono>
              <div className="text-[11px]" style={{ color: "#94a3b8" }}>{item.desc}</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.08)", color: "#818cf8" }}>{item.source}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Shared primitives
// ═══════════════════════════════════════════════════════════════════════

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border p-5 ${className}`} style={{ background: "#131929", borderColor: "rgba(255,255,255,0.07)" }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-lg font-semibold" style={{ color: "#e2e8f0" }}>{title}</h1>
      {subtitle && <p className="text-xs mt-1 leading-relaxed" style={{ color: "#4a5568" }}>{subtitle}</p>}
    </div>
  );
}

function Mono({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <span className={className} style={{ fontFamily: "'DM Mono', monospace", ...style }}>{children}</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: "#4a5568" }}>{children}</div>;
}

type ConditionStatus = "healthy" | "stable" | "attention" | "at-risk";

function ConditionBadge({ status }: { status: ConditionStatus }) {
  const map: Record<ConditionStatus, { label: string; bg: string; color: string }> = {
    healthy: { label: "Healthy ↑", bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
    stable: { label: "Stable →", bg: "rgba(99,102,241,0.1)", color: "#818cf8" },
    attention: { label: "Attention Needed", bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
    "at-risk": { label: "At Risk ↓", bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
  };
  const s = map[status];
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: s.bg, color: s.color, fontFamily: "'DM Mono', monospace" }}>
      {s.label}
    </span>
  );
}

function RiskLevel({ level }: { level: "high" | "medium" | "low" }) {
  const map = {
    high: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
    medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    low: { color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  };
  const s = map[level];
  return (
    <span className="text-[9px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider" style={{ background: s.bg, color: s.color, fontFamily: "'DM Mono', monospace" }}>
      {level}
    </span>
  );
}

function MiniBar({ value, color = "#6366f1", max = 100 }: { value: number; color?: string; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
      <Mono className="text-[11px] w-8 text-right" style={{ color: "#718096" }}>{value}%</Mono>
    </div>
  );
}

function InsightFeedback() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  return (
    <div className="flex items-center gap-2 pt-3 mt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <span className="text-[10px]" style={{ color: "#4a5568" }}>Was this useful?</span>
      <button
        onClick={() => setVote("up")}
        className="flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors"
        style={{ background: vote === "up" ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)", color: vote === "up" ? "#22c55e" : "#4a5568" }}
      >
        <ThumbsUp size={10} /> Useful
      </button>
      <button
        onClick={() => setVote("down")}
        className="flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors"
        style={{ background: vote === "down" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.04)", color: vote === "down" ? "#ef4444" : "#4a5568" }}
      >
        <ThumbsDown size={10} /> Not useful
      </button>
    </div>
  );
}

function ExplainableRisk({
  level,
  title,
  what,
  evidence,
  whyMatters,
  action,
}: {
  level: "high" | "medium" | "low";
  title: string;
  what: string;
  evidence: string[];
  whyMatters: string;
  action: string;
}) {
  const [resolved, setResolved] = useState(false);
  if (resolved) return null;
  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <RiskLevel level={level} />
        <span className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{title}</span>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        <div>
          <Label>What changed?</Label>
          <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{what}</p>
        </div>
        <div>
          <Label>Evidence</Label>
          <ul className="space-y-1">
            {evidence.map((e) => (
              <li key={e} className="flex items-start gap-1.5 text-xs" style={{ color: "#94a3b8" }}>
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: level === "high" ? "#ef4444" : level === "medium" ? "#f59e0b" : "#22c55e" }} />
                {e}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>Why it matters</Label>
          <p className="text-xs leading-relaxed mb-2" style={{ color: "#94a3b8" }}>{whyMatters}</p>
          <Label>Suggested action</Label>
          <p className="text-xs leading-relaxed" style={{ color: "#a5b4fc" }}>{action}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <button className="text-xs px-3 py-1.5 rounded font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>View Evidence</button>
        <button onClick={() => setResolved(true)} className="text-xs px-3 py-1.5 rounded" style={{ color: "#4a5568" }}>Mark Resolved</button>
        <button className="text-xs px-3 py-1.5 rounded" style={{ color: "#4a5568" }}>Dismiss</button>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px]" style={{ color: "#374151" }}>Was this useful?</span>
          <FeedbackButtons />
        </div>
      </div>
    </Card>
  );
}

function FeedbackButtons() {
  const [v, setV] = useState<"up" | "down" | null>(null);
  return (
    <>
      <button onClick={() => setV("up")} className="px-1.5 py-0.5 rounded text-[10px] transition-colors" style={{ background: v === "up" ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)", color: v === "up" ? "#22c55e" : "#374151" }}>
        👍
      </button>
      <button onClick={() => setV("down")} className="px-1.5 py-0.5 rounded text-[10px] transition-colors" style={{ background: v === "down" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.04)", color: v === "down" ? "#ef4444" : "#374151" }}>
        👎
      </button>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 1 — Dashboard
// ═══════════════════════════════════════════════════════════════════════════════

function DashboardPage({ tab, onNav }: { tab: string; onNav: (p: Page) => void }) {
  if (tab === "Overview") return <DashOverview onNav={onNav} />;
  if (tab === "Active Risks") return <DashRisks />;
  if (tab === "Capacity Snapshot") return <DashCapacity />;
  return <DashSprintSummary />;
}

function DashOverview({ onNav }: { onNav: (p: Page) => void }) {
  const conditions = [
    { label: "Delivery Health", status: "stable" as ConditionStatus, detail: "Sprint completion on track" },
    { label: "Capacity Balance", status: "attention" as ConditionStatus, detail: "2 members above 85% utilization" },
    { label: "Collaboration Signals", status: "stable" as ConditionStatus, detail: "Blocker resolution improving" },
    { label: "Knowledge Distribution", status: "attention" as ConditionStatus, detail: "Auth module: high concentration" },
  ];

  const attentionCount = conditions.filter((c) => c.status === "attention" || c.status === "at-risk").length;

  const recentInsights = [
    { type: "warning" as const, text: "Delivery coordination risk flagged — 3 tasks blocked >48h" },
    { type: "warning" as const, text: "Auth knowledge concentrated around one contributor (68%)" },
    { type: "success" as const, text: "Blocker resolution time improved 18% vs Sprint 22" },
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#374151" }}>Thursday, Jul 24 · Sprint 23</div>
        <h1 className="text-xl font-semibold" style={{ color: "#e2e8f0" }}>Good morning, Sarah</h1>
        <p className="text-xs mt-1" style={{ color: "#4a5568" }}>Here's what needs your attention today.</p>
      </div>

      {/* Team Pulse status — no numeric score */}
      <Card className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <Label>Team Pulse</Label>
            <div className="text-2xl font-semibold mt-1" style={{ color: "#e2e8f0" }}>Stable</div>
            <div className="text-xs mt-1" style={{ color: "#4a5568" }}>
              <span className="font-medium" style={{ color: "#f59e0b" }}>{attentionCount} conditions</span> need attention this sprint
            </div>
          </div>
          <button
            onClick={() => onNav("risks")}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg font-medium"
            style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
          >
            View Active Risks <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-5">
          {conditions.map((c) => (
            <div key={c.label} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[11px] font-medium mb-2" style={{ color: "#94a3b8" }}>{c.label}</div>
              <ConditionBadge status={c.status} />
              <div className="text-[10px] mt-2 leading-relaxed" style={{ color: "#374151" }}>{c.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights + collaboration trend side by side */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 280px" }}>
        <Card>
          <Label>Recent Insights</Label>
          <div className="space-y-2 mt-1">
            {recentInsights.map((ins) => (
              <div key={ins.text} className="flex items-start gap-2.5 p-2.5 rounded-md" style={{ background: "rgba(255,255,255,0.02)" }}>
                {ins.type === "warning" ? <AlertCircle size={12} color="#f59e0b" className="mt-0.5 shrink-0" /> : <CheckCircle2 size={12} color="#22c55e" className="mt-0.5 shrink-0" />}
                <span className="text-xs" style={{ color: "#94a3b8" }}>{ins.text}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <Label>Collaboration Trend</Label>
          <div className="space-y-2.5 mt-1">
            {[
              { label: "Blocker Resolution", dir: "up", detail: "1.6 days vs 2.1 prev sprint" },
              { label: "Cross-Contributor Activity", dir: "stable", detail: "Steady across 3 sprints" },
              { label: "Delivery Coordination", dir: "down", detail: "3 dependency delays" },
            ].map((s) => (
              <div key={s.label} className="flex items-start gap-2">
                <span className="text-xs mt-0.5" style={{ color: s.dir === "up" ? "#22c55e" : s.dir === "down" ? "#ef4444" : "#818cf8" }}>
                  {s.dir === "up" ? "↑" : s.dir === "down" ? "↓" : "→"}
                </span>
                <div>
                  <div className="text-xs font-medium" style={{ color: "#94a3b8" }}>{s.label}</div>
                  <div className="text-[10px]" style={{ color: "#374151" }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DashRisks() {
  return (
    <div>
      <SectionHeader title="Active Risks" subtitle="Operational conditions flagged this sprint. Every insight shows evidence and a suggested action — the manager decides." />
      <div className="space-y-4">
        <ExplainableRisk
          level="high"
          title="Delivery Coordination Risk"
          what="Three tasks have remained blocked for more than 48 hours."
          evidence={["TASK-241 — blocked 3 days", "TASK-256 — blocked 2.5 days", "TASK-263 — blocked 2 days", "Spillover increased from 8% → 17%"]}
          whyMatters="Blocked work is accumulating near the sprint deadline."
          action="Review unresolved dependencies during the next stand-up."
        />
        <ExplainableRisk
          level="medium"
          title="Knowledge Dependency — Authentication"
          what="Authentication-related work is concentrated around one contributor."
          evidence={["68% of auth tasks assigned to Priya S.", "4/5 recent PR reviews required same contributor", "No secondary reviewer in Sprint 22 or 23"]}
          whyMatters="Single point of dependency creates delivery risk if contributor is unavailable."
          action="Consider secondary ownership or a knowledge-sharing session on auth flows."
        />
      </div>
    </div>
  );
}

function DashCapacity() {
  const members = [
    { name: "Priya Sharma", avail: 30, assigned: 27, pct: 90 },
    { name: "Liam Torres", avail: 28, assigned: 22, pct: 79 },
    { name: "Ji-yeon Park", avail: 24, assigned: 18, pct: 75 },
    { name: "Marcus Webb", avail: 24, assigned: 13, pct: 54 },
    { name: "Ananya Iyer", avail: 22, assigned: 16, pct: 73 },
  ];
  const capColor = (p: number) => p >= 85 ? "#ef4444" : p >= 60 ? "#22c55e" : "#38bdf8";

  return (
    <div>
      <SectionHeader title="Capacity Snapshot" />
      <Card className="mb-4">
        <div className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "#374151" }}>Story points are team-specific planning estimates, not measures of employee capability.</div>
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.name} className="flex items-center gap-4">
              <div className="w-32 text-xs font-medium shrink-0" style={{ color: "#94a3b8" }}>{m.name}</div>
              <div className="flex-1"><MiniBar value={m.pct} color={capColor(m.pct)} /></div>
              <Mono className="text-xs w-28 shrink-0" style={{ color: "#4a5568" }}>{m.assigned}pt / {m.avail}pt avail</Mono>
              <Mono className="text-[11px] w-8 text-right shrink-0" style={{ color: capColor(m.pct) }}>{m.pct}%</Mono>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex items-start gap-3">
          <Zap size={13} color="#f59e0b" className="mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>Capacity Pressure Signal</div>
            <p className="text-xs" style={{ color: "#94a3b8" }}>Priya's currently planned work reaches approximately 105% of configured capacity next week if upcoming assignments remain unchanged. Review upcoming allocation.</p>
            <div className="flex gap-2 mt-2">
              <button className="text-xs px-3 py-1.5 rounded font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>Review Allocation</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function DashSprintSummary() {
  const items = [
    { label: "Risks surfaced", value: 8, color: "#ef4444" },
    { label: "Risks resolved", value: 6, color: "#22c55e" },
    { label: "Capacity issues reviewed", value: 3, color: "#f59e0b" },
    { label: "Knowledge dependencies identified", value: 2, color: "#818cf8" },
  ];

  return (
    <div>
      <SectionHeader title="Sprint Retrospective Summary" subtitle="Sprint 23 — signal summary. TeamPulse surfaces patterns; team and manager determine their significance." />
      <div className="grid grid-cols-4 gap-4 mb-5">
        {items.map((it) => (
          <Card key={it.label}>
            <Mono className="text-3xl font-bold" style={{ color: it.color }}>{it.value}</Mono>
            <div className="text-xs mt-1" style={{ color: "#4a5568" }}>{it.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Label>Notable Signals — Sprint 23</Label>
        <div className="space-y-3 mt-2">
          {[
            { icon: "↑", color: "#22c55e", text: "Blocker resolution improved 14% — median duration dropped from 3.1 to 2.5 days." },
            { icon: "↓", color: "#ef4444", text: "Sprint completion rate declined from 88% to 71% — 3 high-priority stories still open." },
            { icon: "→", color: "#818cf8", text: "Cross-contributor activity stable — no significant change in review distribution." },
            { icon: "⚠", color: "#f59e0b", text: "Authentication knowledge concentration unchanged at 68%. No secondary reviewer added." },
          ].map((s) => (
            <div key={s.text} className="flex items-start gap-2.5 text-xs" style={{ color: "#94a3b8" }}>
              <span className="font-bold shrink-0" style={{ color: s.color }}>{s.icon}</span>
              {s.text}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 2 — Team Signals (replaces Team Health, no scores)
// ═══════════════════════════════════════════════════════════════════════════════

function SignalsPage({ tab }: { tab: string }) {
  if (tab === "Collaboration") return <CollabSignals />;
  return <DeliverySignals />;
}

function CollabSignals() {
  const signals = [
    {
      name: "Blocker Resolution",
      trend: "up" as const,
      status: "healthy" as ConditionStatus,
      detail: "Median resolution: 1.6 days vs 2.1 previous sprint",
      evidence: ["12 blockers resolved this sprint (was 9)", "Average time-to-resolution down 24%", "No blockers open >4 days currently"],
    },
    {
      name: "Cross-Contributor Activity",
      trend: "stable" as const,
      status: "stable" as ConditionStatus,
      detail: "Review distribution consistent across 3 sprints",
      evidence: ["4 contributors reviewed PRs this sprint", "Review coverage: 78% of PRs had ≥2 reviewers", "No single reviewer >40% of reviews"],
    },
    {
      name: "Delivery Coordination",
      trend: "down" as const,
      status: "attention" as ConditionStatus,
      detail: "3 dependency-related delays this sprint",
      evidence: ["TASK-241, TASK-256, TASK-263 blocked by cross-team dependencies", "Average dependency wait: 2.2 days", "2 cross-team syncs missed"],
    },
    {
      name: "Knowledge Distribution",
      trend: "stable" as const,
      status: "attention" as ConditionStatus,
      detail: "Authentication activity concentrated around one contributor",
      evidence: ["Priya S. involved in 68% of auth-related work", "No secondary owner identified in 3 consecutive sprints"],
    },
  ];

  const trendIcon = { up: "↑", down: "↓", stable: "→" };
  const trendColor = { up: "#22c55e", down: "#ef4444", stable: "#818cf8" };

  const chartData = [
    { sprint: "S20", blockers: 3.2, crossContrib: 72, coordination: 80 },
    { sprint: "S21", blockers: 2.8, crossContrib: 74, coordination: 77 },
    { sprint: "S22", blockers: 2.1, crossContrib: 76, coordination: 75 },
    { sprint: "S23", blockers: 1.6, crossContrib: 78, coordination: 70 },
  ];

  return (
    <div>
      <SectionHeader title="Collaboration Signals" subtitle="Observable indicators derived from project metadata — not personality or communication style analysis." />
      <div className="space-y-3 mb-5">
        {signals.map((s) => (
          <Card key={s.name}>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{s.name}</span>
                  <span className="text-sm font-bold" style={{ color: trendColor[s.trend] }}>{trendIcon[s.trend]}</span>
                  <ConditionBadge status={s.status} />
                </div>
                <div className="text-xs mb-2" style={{ color: "#718096" }}>{s.detail}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                  {s.evidence.map((e) => (
                    <div key={e} className="flex items-center gap-1 text-[11px]" style={{ color: "#4a5568" }}>
                      <span style={{ color: "#374151" }}>·</span> {e}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <Label>Trend — Last 4 Sprints (Blocker Resolution Median Days)</Label>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="blockers" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 3 }} />
            <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: "#4a5568" }} axisLine={false} tickLine={false} />
            <YAxis domain={[1, 4]} tick={{ fontSize: 10, fill: "#4a5568" }} axisLine={false} tickLine={false} width={24} tickFormatter={(v) => `${v}d`} />
            <Tooltip contentStyle={{ background: "#1a2235", border: "none", borderRadius: 6, fontSize: 11 }} formatter={(v: any) => [`${v} days`, "Median blocker duration"]} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function DeliverySignals() {
  const trend = [
    { sprint: "S20", completion: 85, spillover: 8, blocked: 4 },
    { sprint: "S21", completion: 88, spillover: 6, blocked: 3 },
    { sprint: "S22", completion: 88, spillover: 8, blocked: 5 },
    { sprint: "S23", completion: 71, spillover: 17, blocked: 9 },
  ];

  return (
    <div>
      <SectionHeader title="Delivery Signals" subtitle="Sprint metadata from Jira — Sprint 23." />
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Sprint Completion Rate", curr: "71%", prev: "88%", dir: "down" },
          { label: "Blocked Task Ratio", curr: "17%", prev: "8%", dir: "down" },
          { label: "Blocker Resolution (median)", curr: "1.6 days", prev: "2.1 days", dir: "up" },
        ].map((m) => (
          <Card key={m.label}>
            <Label>{m.label}</Label>
            <div className="flex items-end gap-2 mt-1">
              <Mono className="text-2xl font-bold" style={{ color: m.dir === "up" ? "#22c55e" : "#ef4444" }}>{m.curr}</Mono>
              <div className="flex items-center gap-1 text-[11px] mb-0.5" style={{ color: m.dir === "up" ? "#22c55e" : "#ef4444" }}>
                {m.dir === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />} vs {m.prev}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <Label>Sprint Completion Rate Trend</Label>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="completion" stroke="#6366f1" fill="url(#compGrad)" strokeWidth={2} dot={{ fill: "#6366f1", r: 3 }} />
            <Area type="monotone" dataKey="spillover" stroke="#ef4444" fill="none" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: "#4a5568" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#4a5568" }} axisLine={false} tickLine={false} width={28} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ background: "#1a2235", border: "none", borderRadius: 6, fontSize: 11 }} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2">
          {[["Completion Rate", "#6366f1"], ["Spillover Rate", "#ef4444"]].map(([l, c]) => (
            <div key={l as string} className="flex items-center gap-1.5 text-[10px]" style={{ color: "#4a5568" }}>
              <div className="w-3 h-0.5 rounded" style={{ background: c as string }} />{l}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function KnowledgeSignals() {
  const areas = [
    {
      area: "Authentication",
      status: "attention" as ConditionStatus,
      members: [{ name: "Priya S.", pct: 68 }, { name: "Liam T.", pct: 20 }, { name: "Ji-yeon P.", pct: 12 }],
      evidence: ["68% of related work involved Priya S.", "4/5 recent PR reviews required same contributor", "Priya S. owns most related documentation"],
      action: "Consider secondary ownership or a knowledge-sharing session.",
    },
    {
      area: "Frontend",
      status: "healthy" as ConditionStatus,
      members: [{ name: "Priya S.", pct: 25 }, { name: "Liam T.", pct: 40 }, { name: "Ji-yeon P.", pct: 35 }],
      evidence: ["Three contributors share review load", "Documentation spread across two authors"],
      action: "No action needed.",
    },
    {
      area: "Data Layer",
      status: "attention" as ConditionStatus,
      members: [{ name: "Marcus W.", pct: 55 }, { name: "Liam T.", pct: 30 }, { name: "Ananya I.", pct: 15 }],
      evidence: ["Marcus W. accounts for 55% of data layer activity", "2 tickets with no fallback reviewer"],
      action: "Identify a secondary owner for the data access layer.",
    },
  ];

  return (
    <div>
      <SectionHeader
        title="Knowledge Distribution"
        subtitle="Identifies areas where task ownership, review, or documentation activity is concentrated. Detects dependency — not intent."
      />
      <div className="space-y-4">
        {areas.map((a) => (
          <Card key={a.area}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{a.area}</span>
              <ConditionBadge status={a.status} />
            </div>
            <div className="space-y-2 mb-3">
              {a.members.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-20 text-xs" style={{ color: "#718096" }}>{m.name}</div>
                  <div className="flex-1 h-2.5 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded" style={{ width: `${m.pct}%`, background: m.pct >= 60 ? "#ef444430" : "#6366f130", borderRight: `3px solid ${m.pct >= 60 ? "#ef4444" : "#6366f1"}` }} />
                  </div>
                  <Mono className="text-xs w-8 text-right" style={{ color: m.pct >= 60 ? "#ef4444" : "#4a5568" }}>{m.pct}%</Mono>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div>
                <Label>Evidence</Label>
                <ul className="space-y-0.5">
                  {a.evidence.map((e) => (
                    <li key={e} className="text-[11px]" style={{ color: "#4a5568" }}>· {e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Label>Suggested Action</Label>
                <p className="text-[11px]" style={{ color: "#a5b4fc" }}>{a.action}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 3 — Workload & Capacity
// ═══════════════════════════════════════════════════════════════════════════════

function WorkloadPage({ tab }: { tab: string }) {
  if (tab === "Current Capacity") return <CurrentCapacity />;
  if (tab === "Trends") return <CapacityTrends />;
  if (tab === "Pressure Forecast") return <PressureForecast />;
  return <WorkloadRecs />;
}

function CurrentCapacity() {
  const members = [
    { name: "Priya Sharma", role: "Frontend", baseline: 34, leave: 2, other: 2, avail: 30, assigned: 27, pct: 90 },
    { name: "Liam Torres", role: "Backend", baseline: 34, leave: 0, other: 6, avail: 28, assigned: 22, pct: 79 },
    { name: "Ji-yeon Park", role: "Full Stack", baseline: 34, leave: 4, other: 6, avail: 24, assigned: 18, pct: 75 },
    { name: "Marcus Webb", role: "Backend", baseline: 34, leave: 0, other: 10, avail: 24, assigned: 13, pct: 54 },
    { name: "Ananya Iyer", role: "QA", baseline: 26, leave: 0, other: 4, avail: 22, assigned: 16, pct: 73 },
  ];
  const capColor = (p: number) => p >= 85 ? "#ef4444" : p >= 60 ? "#22c55e" : "#38bdf8";

  return (
    <div>
      <SectionHeader title="Current Capacity" />
      <Card className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Configure planning capacity</div>
            <div className="text-[11px]" style={{ color: "#94a3b8" }}>Adjust baseline, leave, and other commitments used to calculate available planning capacity.</div>
          </div>
          <button className="text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors" style={{ borderColor: "rgba(99,102,241,0.15)", color: "#94a3b8" }}>
            Edit capacity
          </button>
        </div>
        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="grid text-[9px] uppercase tracking-widest px-4 py-2 border-b" style={{ gridTemplateColumns: "160px 70px 70px 90px 70px", color: "#374151", borderColor: "rgba(255,255,255,0.07)", background: "#0d1117", gap: "0 8px" }}>
            <span>Member</span><span className="text-right">Baseline</span><span className="text-right">Leave</span><span className="text-right">Other</span><span className="text-right">Available</span>
          </div>
          {members.map((m) => (
            <div key={m.name} className="grid items-center px-4 py-2.5 border-b last:border-0" style={{ gridTemplateColumns: "160px 70px 70px 90px 70px", borderColor: "rgba(255,255,255,0.05)", gap: "0 8px" }}>
              <span className="text-xs font-medium" style={{ color: "#e2e8f0" }}>{m.name}</span>
              <span className="text-right text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#94a3b8" }}>{m.baseline}pt</span>
              <span className="text-right text-xs" style={{ fontFamily: "'DM Mono', monospace", color: m.leave > 0 ? "#f59e0b" : "#374151" }}>{m.leave > 0 ? `${m.leave}pt` : "—"}</span>
              <span className="text-right text-xs" style={{ fontFamily: "'DM Mono', monospace", color: m.other > 0 ? "#4a5568" : "#374151" }}>{m.other > 0 ? `${m.other}pt` : "—"}</span>
              <span className="text-right text-xs font-semibold" style={{ fontFamily: "'DM Mono', monospace", color: "#e2e8f0" }}>{m.avail}pt</span>
            </div>
          ))}
        </div>
        <div className="text-[10px]" style={{ color: "#374151" }}>
          Data origin: Assigned work → Jira · Baseline capacity → manager config · Leave → manager/team input
        </div>
      </Card>
      <Card className="mb-4">
        <div className="mb-4 p-3 rounded-md text-xs leading-relaxed" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", color: "#94a3b8" }}>
          <span className="font-medium" style={{ color: "#a5b4fc" }}>Capacity formula: </span>
          Baseline planned capacity − Planned leave − Holidays − Other commitments = Available capacity.
          Story points are team-specific planning estimates, not measures of employee capability or productivity.
        </div>
        <div className="grid text-[9px] uppercase tracking-widest pb-2 mb-3 border-b" style={{ gridTemplateColumns: "160px 70px 55px 55px 70px 1fr 65px", color: "#374151", borderColor: "rgba(255,255,255,0.06)", gap: "0 12px" }}>
          <span>Member</span><span className="text-right">Baseline</span><span className="text-right">Leave</span><span className="text-right">Other</span><span className="text-right">Available</span><span>Utilization</span><span className="text-right">Status</span>
        </div>
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.name} className="grid items-center" style={{ gridTemplateColumns: "160px 70px 55px 55px 70px 1fr 65px", gap: "0 12px" }}>
              <div>
                <div className="text-xs font-medium" style={{ color: "#e2e8f0" }}>{m.name}</div>
                <div className="text-[10px]" style={{ color: "#374151" }}>{m.role}</div>
              </div>
              <Mono className="text-xs text-right" style={{ color: "#4a5568" }}>{m.baseline}pt</Mono>
              <Mono className="text-xs text-right" style={{ color: m.leave > 0 ? "#f59e0b" : "#374151" }}>{m.leave > 0 ? `-${m.leave}pt` : "—"}</Mono>
              <Mono className="text-xs text-right" style={{ color: m.other > 0 ? "#718096" : "#374151" }}>{m.other > 0 ? `-${m.other}pt` : "—"}</Mono>
              <Mono className="text-xs text-right font-medium" style={{ color: "#94a3b8" }}>{m.avail}pt</Mono>
              <MiniBar value={m.pct} color={capColor(m.pct)} />
              <div className="flex justify-end">
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                  fontFamily: "'DM Mono', monospace",
                  background: m.pct >= 85 ? "rgba(239,68,68,0.1)" : m.pct >= 60 ? "rgba(34,197,94,0.1)" : "rgba(56,189,248,0.1)",
                  color: capColor(m.pct),
                }}>
                  {m.pct >= 85 ? "High" : m.pct >= 60 ? "Balanced" : "Available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function CapacityTrends() {
  const data = [
    { sprint: "S19", priya: 72, liam: 65, jiyeon: 80, marcus: 70, ananya: 60 },
    { sprint: "S20", priya: 78, liam: 70, jiyeon: 76, marcus: 62, ananya: 68 },
    { sprint: "S21", priya: 85, liam: 74, jiyeon: 80, marcus: 58, ananya: 71 },
    { sprint: "S22", priya: 88, liam: 77, jiyeon: 79, marcus: 55, ananya: 70 },
    { sprint: "S23", priya: 90, liam: 79, jiyeon: 75, marcus: 54, ananya: 73 },
  ];
  const palette: Record<string, string> = { priya: "#6366f1", liam: "#22c55e", jiyeon: "#38bdf8", marcus: "#f59e0b", ananya: "#a78bfa" };
  const names: Record<string, string> = { priya: "Priya S.", liam: "Liam T.", jiyeon: "Ji-yeon P.", marcus: "Marcus W.", ananya: "Ananya I." };

  return (
    <div>
      <SectionHeader title="Capacity Trends" subtitle="5-sprint view. Persistent imbalances surface here — not from one sprint of noise." />
      <Card className="mb-4">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              {Object.entries(palette).map(([k, c]) => (
                <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            {Object.entries(palette).map(([k, c]) => (
              <Area key={k} type="monotone" dataKey={k} stroke={c} fill={`url(#g-${k})`} strokeWidth={1.5} dot={false} />
            ))}
            <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: "#4a5568" }} axisLine={false} tickLine={false} />
            <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: "#4a5568" }} axisLine={false} tickLine={false} width={28} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ background: "#1a2235", border: "none", borderRadius: 6, fontSize: 11 }} formatter={(v: any, k: any) => [`${v}%`, names[k]]} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2">
          {Object.entries(palette).map(([k, c]) => (
            <div key={k} className="flex items-center gap-1.5 text-[10px]" style={{ color: "#4a5568" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: c }} />{names[k]}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex items-start gap-2.5">
          <AlertCircle size={13} color="#f59e0b" className="mt-0.5 shrink-0" />
          <p className="text-xs" style={{ color: "#94a3b8" }}>Priya's utilization has increased 3 consecutive sprints (+18pp). Marcus has consistently remained below 65%. This pattern persists regardless of sprint content.</p>
        </div>
      </Card>
    </div>
  );
}

function PressureForecast() {
  return (
    <div>
      <SectionHeader title="Capacity Pressure Forecast" subtitle="Projects upcoming allocation pressure based on planned work, deadlines, and availability. Does not predict burnout or future performance." />
      <div className="space-y-4">
        {[
          {
            member: "Priya Sharma",
            current: 90,
            projected: 105,
            evidence: ["Current utilization: 90%", "Upcoming planned work: +5 pts (TASK-271, TASK-272)", "1 day planned leave next week"],
            action: "Review upcoming allocation with Priya before assigning TASK-271.",
          },
          {
            member: "Liam Torres",
            current: 79,
            projected: 84,
            evidence: ["Current utilization: 79%", "Upcoming planned work: +3 pts", "No planned leave"],
            action: "No immediate action needed. Monitor next sprint.",
          },
        ].map((f) => (
          <Card key={f.member}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{f.member}</div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="text-[11px]" style={{ color: "#4a5568" }}>
                    Current: <Mono style={{ color: f.current >= 85 ? "#ef4444" : "#94a3b8" }}>{f.current}%</Mono>
                  </div>
                  <ArrowRight size={10} color="#374151" />
                  <div className="text-[11px]" style={{ color: "#4a5568" }}>
                    Projected: <Mono style={{ color: f.projected >= 100 ? "#ef4444" : f.projected >= 85 ? "#f59e0b" : "#94a3b8" }}>{f.projected}%</Mono>
                  </div>
                </div>
              </div>
              {f.projected >= 100 && (
                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>Pressure Signal</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div>
                <Label>Evidence</Label>
                <ul className="space-y-0.5">
                  {f.evidence.map((e) => (
                    <li key={e} className="text-[11px]" style={{ color: "#4a5568" }}>· {e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Label>Suggested Action</Label>
                <p className="text-[11px]" style={{ color: "#a5b4fc" }}>{f.action}</p>
                <button className="mt-2 text-xs px-3 py-1.5 rounded font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>Review Allocation</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function WorkloadRecs() {
  const opps = [
    {
      title: "Capacity Rebalancing Opportunity",
      task: "TASK-271 — Auth Token Refresh Logic",
      pressured: { name: "Priya Sharma", pct: 105 },
      available: [
        { name: "Marcus Webb", pct: 54, context: "Backend experience · Auth-adjacent work" },
        { name: "Ananya Iyer", pct: 73, context: "QA domain · Familiar with sprint context" },
      ],
      action: "Review task requirements and discuss possible reassignment with the team.",
    },
    {
      title: "Capacity Rebalancing Opportunity",
      task: "TASK-131 — API Rate Limit Tests",
      pressured: { name: "Priya Sharma", pct: 105 },
      available: [
        { name: "Ananya Iyer", pct: 73, context: "QA domain — natural fit" },
        { name: "Ji-yeon Park", pct: 75, context: "Full-stack · Previously reviewed rate-limit logic" },
      ],
      action: "Review task requirements and discuss possible reassignment with the team.",
    },
  ];

  return (
    <div>
      <SectionHeader title="Capacity Rebalancing Opportunities" subtitle="TeamPulse surfaces options — the manager reviews task context and decides." />
      <div className="space-y-4">
        {opps.map((o) => (
          <Card key={o.task}>
            <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#374151" }}>{o.title}</div>
            <div className="text-sm font-semibold mb-3" style={{ color: "#e2e8f0" }}>{o.task}</div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}>
                <Label>Projected capacity pressure</Label>
                <div className="text-xs font-medium" style={{ color: "#ef4444" }}>{o.pressured.name}</div>
                <Mono className="text-[10px]" style={{ color: "#4a5568" }}>Projected utilization: {o.pressured.pct}%</Mono>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Label>Potential available capacity</Label>
                <div className="space-y-1.5">
                  {o.available.map((a) => (
                    <div key={a.name}>
                      <div className="text-xs font-medium" style={{ color: "#94a3b8" }}>{a.name} — <Mono style={{ color: "#4a5568" }}>{a.pct}% utilized</Mono></div>
                      <div className="text-[10px]" style={{ color: "#374151" }}>{a.context}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-2.5 rounded-md text-xs mb-3" style={{ background: "rgba(99,102,241,0.06)", color: "#a5b4fc" }}>
              <span className="font-medium">Suggested action:</span> {o.action}
            </div>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>Review Task</button>
              <button className="text-xs px-3 py-1.5 rounded" style={{ color: "#374151" }}>Dismiss</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 4 — Risks & Insights
// ═══════════════════════════════════════════════════════════════════════════════

function RisksPage({ tab }: { tab: string }) {
  const all = [
    {
      level: "high" as const,
      title: "Delivery Coordination Risk",
      what: "Three tasks have remained blocked for more than 48 hours.",
      evidence: ["TASK-241 — blocked 3 days", "TASK-256 — blocked 2.5 days", "TASK-263 — blocked 2 days", "Spillover increased from 8% → 17%"],
      whyMatters: "Blocked work is accumulating near the sprint deadline.",
      action: "Review unresolved dependencies during the next stand-up.",
    },
    {
      level: "high" as const,
      title: "Capacity Pressure — Priya Sharma",
      what: "Priya's planned work for next week is projected to exceed her available capacity.",
      evidence: ["Current utilization: 90%", "Upcoming work: +5 pts (TASK-271, TASK-272)", "1 day planned leave"],
      whyMatters: "Without reallocation, sprint delivery may be affected.",
      action: "Review and consider redistributing TASK-271 to Marcus Webb.",
    },
    {
      level: "medium" as const,
      title: "Knowledge Dependency — Authentication",
      what: "Authentication-related work is concentrated around one contributor.",
      evidence: ["68% of auth tasks assigned to Priya S.", "4/5 recent PR reviews required same contributor", "No secondary reviewer in 3 sprints"],
      whyMatters: "Single point of dependency creates delivery risk.",
      action: "Consider secondary ownership or a knowledge-sharing session.",
    },
    {
      level: "medium" as const,
      title: "Knowledge Dependency — Data Layer",
      what: "Data layer activity is concentrated around Marcus Webb.",
      evidence: ["Marcus accounts for 55% of data layer activity", "2 tickets with no fallback reviewer"],
      whyMatters: "Limited secondary coverage for data layer work.",
      action: "Identify a secondary owner for data access layer work.",
    },
    {
      level: "low" as const,
      title: "PR Review Lag",
      what: "Two pull requests have been awaiting review for more than 24 hours.",
      evidence: ["PR #94 — open 26 hours", "PR #96 — open 31 hours"],
      whyMatters: "Review lag can delay task completion near sprint end.",
      action: "Assign reviewers or raise in the next stand-up.",
    },
  ];

  const filtered = tab === "All Risks" ? all : tab === "High Priority" ? all.filter((r) => r.level === "high") : [];

  return (
    <div>
      <SectionHeader
        title={tab === "All Risks" ? "Risks & Insights" : tab === "High Priority" ? "High Priority Risks" : "Resolved Risks"}
        subtitle="Signal → Evidence → Why it matters → Suggested action. Manager decides what to do."
      />
      {tab === "Resolved" ? (
        <Card>
          <div className="text-xs text-center py-6" style={{ color: "#374151" }}>No risks marked resolved this sprint yet.</div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <ExplainableRisk key={r.title} {...r} />
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 5 — Contributions
// ═══════════════════════════════════════════════════════════════════════════════

function ContributionsPage({ tab }: { tab: string }) {
  return <ContribTimeline />;
}

function ContribTimeline() {
  const entries = [
    { date: "Jul 24", source: "Jira", type: "Delivery", desc: "Closed TASK-119 — Refresh token endpoint", member: "Priya Sharma" },
    { date: "Jul 23", source: "GitHub", type: "Review", desc: "Reviewed payment integration PR #88", member: "Liam Torres" },
    { date: "Jul 22", source: "Peer Context", type: "Collaboration", desc: "Helped Ji-yeon unblock CORS configuration issue", member: "Marcus Webb" },
    { date: "Jul 21", source: "Confluence", type: "Documentation", desc: "Updated API authentication guide", member: "Priya Sharma" },
    { date: "Jul 20", source: "Self-added", type: "Cross-team", desc: "Supported Platform team during API outage · Manager validated", member: "Ananya Iyer" },
    { date: "Jul 18", source: "Jira", type: "Delivery", desc: "Resolved production authentication incident (blocker cleared)", member: "Priya Sharma" },
  ];

  const sourceColor: Record<string, string> = {
    "Jira": "#6366f1",
    "GitHub": "#22c55e",
    "Peer Context": "#f59e0b",
    "Confluence": "#38bdf8",
    "Self-added": "#a78bfa",
  };

  return (
    <div>
      <SectionHeader title="Contribution Timeline" subtitle="Automatically captured digital signals combined with voluntary contextual contributions. No scoring." />
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e.desc} className="relative">
              <div className="absolute -left-[18px] top-3 w-2.5 h-2.5 rounded-full border" style={{ background: "#131929", borderColor: sourceColor[e.source] }} />
              <Card>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5" style={{ background: `${sourceColor[e.source]}15`, color: sourceColor[e.source], fontFamily: "'DM Mono', monospace" }}>{e.source}</span>
                    <div>
                      <div className="text-xs font-medium" style={{ color: "#e2e8f0" }}>{e.desc}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: "#4a5568" }}>{e.member} · {e.type}</div>
                    </div>
                  </div>
                  <Mono className="text-[10px] shrink-0" style={{ color: "#374151" }}>{e.date}</Mono>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddContext() {
  const [type, setType] = useState("Peer Support");
  const types = ["Peer Support", "Mentoring", "Problem Solving", "Incident Support", "Knowledge Sharing", "Documentation", "Cross-Team Assistance", "Other"];

  return (
    <div>
      <SectionHeader title="Add Contribution Context" subtitle="Log work not automatically captured. Voluntary — under 30 seconds. Goes into your contribution timeline as evidence." />
      <Card>
        <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <Label>Contribution Type</Label>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="text-[11px] px-2.5 py-1 rounded-full border transition-colors"
                  style={{
                    borderColor: type === t ? "#6366f1" : "rgba(255,255,255,0.08)",
                    background: type === t ? "rgba(99,102,241,0.12)" : "transparent",
                    color: type === t ? "#a5b4fc" : "#374151",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Label>What happened?</Label>
              <textarea
                rows={3}
                className="w-full mt-0.5 text-xs px-3 py-2 rounded-md resize-none"
                placeholder="Helped another team resolve authentication API issue."
                style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Related task (optional)</Label>
                <input className="w-full text-xs px-3 py-1.5 rounded-md" placeholder="TASK-318" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }} />
              </div>
              <div>
                <Label>Outcome (optional)</Label>
                <input className="w-full text-xs px-3 py-1.5 rounded-md" placeholder="Unblocked deployment." style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }} />
              </div>
            </div>
            <button className="text-xs px-4 py-2 rounded-lg font-medium self-start" style={{ background: "#6366f1", color: "#fff" }}>Add to Timeline</button>
          </div>
        </div>
      </Card>

      <Card className="mt-4">
        <Label>Recent Self-Added Context</Label>
        <div className="space-y-2 mt-1">
          {[
            { type: "Incident Support", desc: "Supported Platform team during API outage", outcome: "Service restored within 40 min", date: "Jul 20", validated: true },
            { type: "Cross-Team Assistance", desc: "Reviewed authentication schema with Backend team", outcome: "Alignment reached before implementation", date: "Jul 16", validated: false },
          ].map((e) => (
            <div key={e.desc} className="flex items-start gap-3 p-2.5 rounded-md" style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", fontFamily: "'DM Mono', monospace" }}>{e.type}</span>
              <div className="flex-1 text-xs" style={{ color: "#94a3b8" }}>
                {e.desc}
                {e.validated && <span className="ml-2 text-[10px]" style={{ color: "#22c55e" }}>· Manager validated</span>}
              </div>
              <Mono className="text-[10px] shrink-0" style={{ color: "#374151" }}>{e.date}</Mono>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PeerContext() {
  const [selected, setSelected] = useState("Priya Sharma");
  const [helpType, setHelpType] = useState("Helped unblock my work");
  const members = ["Priya Sharma", "Liam Torres", "Ji-yeon Park", "Marcus Webb", "Ananya Iyer"];
  const helpTypes = ["Helped unblock my work", "Shared knowledge", "Reviewed my work", "Mentored me", "Solved a problem together", "Other"];

  return (
    <div>
      <SectionHeader
        title="Peer Contribution Context"
        subtitle="Add context when a colleague contributed to your work. This becomes evidence in their contribution timeline — not a vote, point, or rating."
      />
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 340px" }}>
        <Card>
          <div className="text-sm font-semibold mb-4" style={{ color: "#e2e8f0" }}>Add Contribution Context</div>
          <div className="mb-4">
            <Label>Who contributed?</Label>
            <div className="flex flex-col gap-1.5 mt-1">
              {members.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelected(m)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left border transition-colors"
                  style={{
                    borderColor: selected === m ? "#6366f1" : "rgba(255,255,255,0.06)",
                    background: selected === m ? "rgba(99,102,241,0.08)" : "transparent",
                    color: selected === m ? "#e2e8f0" : "#718096",
                  }}
                >
                  <div className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold text-white bg-indigo-700 shrink-0">
                    {m.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs">{m}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <Label>What happened?</Label>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {helpTypes.map((h) => (
                <button key={h} onClick={() => setHelpType(h)} className="text-[11px] px-2.5 py-1 rounded-full border transition-colors"
                  style={{ borderColor: helpType === h ? "#6366f1" : "rgba(255,255,255,0.06)", background: helpType === h ? "rgba(99,102,241,0.12)" : "transparent", color: helpType === h ? "#a5b4fc" : "#374151" }}>
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label>Related task (optional)</Label>
              <input className="w-full text-xs px-3 py-1.5 rounded-md" placeholder="TASK-318" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }} />
            </div>
            <div>
              <Label>Outcome / context (optional)</Label>
              <input className="w-full text-xs px-3 py-1.5 rounded-md" placeholder="Resolved dependency before release." style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }} />
            </div>
          </div>
          <div className="mb-4 p-3 rounded-md text-[11px] leading-relaxed" style={{ background: "rgba(255,255,255,0.03)", color: "#374151" }}>
            This context is added as evidence to {selected.split(" ")[0]}'s contribution timeline. It is not a vote, rating, or recognition score.
          </div>
          <button className="text-xs px-4 py-2 rounded-lg font-medium" style={{ background: "#6366f1", color: "#fff" }}>Submit Context</button>
        </Card>

        <Card>
          <Label>Recent Peer Context Added</Label>
          <div className="space-y-3 mt-1">
            {[
              { from: "Ji-yeon Park", to: "Marcus Webb", type: "Solved a problem together", task: "TASK-248", outcome: "CORS config resolved — blocker cleared same day.", date: "Jul 22" },
              { from: "Liam Torres", to: "Priya Sharma", type: "Shared knowledge", task: "TASK-241", outcome: "Auth token refresh approach clarified before implementation.", date: "Jul 20" },
              { from: "Priya Sharma", to: "Ananya Iyer", type: "Helped unblock my work", task: "TASK-255", outcome: "Regression caught in staging before merge.", date: "Jul 18" },
            ].map((r) => (
              <div key={r.outcome} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[11px]" style={{ color: "#4a5568" }}>
                    <span style={{ color: "#94a3b8" }}>{r.to}</span> — context by {r.from}
                  </div>
                  <Mono className="text-[10px]" style={{ color: "#374151" }}>{r.date}</Mono>
                </div>
                <div className="text-[10px] px-1.5 py-0.5 rounded inline-block mb-1" style={{ background: "rgba(99,102,241,0.08)", color: "#818cf8" }}>{r.type}</div>
                <p className="text-[11px]" style={{ color: "#718096" }}>{r.outcome}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 6 — Evidence Profiles (no scores, no ranking)
// ═══════════════════════════════════════════════════════════════════════════════

function ProfilesPage({ tab }: { tab: string }) {
  return <TeamRoster onSelect={() => {}} />;
}

function TeamRoster({ onSelect }: { onSelect: (m: string) => void }) {
  const members = [
    { name: "Priya Sharma", role: "Frontend Engineer", total: 12, types: ["Delivery activity", "PR reviews", "Documentation", "Cross-team contribution"] },
    { name: "Liam Torres", role: "Backend Engineer", total: 9, types: ["Delivery activity", "PR reviews", "Cross-team contribution"] },
    { name: "Ji-yeon Park", role: "Full Stack Engineer", total: 10, types: ["Delivery activity", "PR reviews", "Documentation", "Cross-team contribution"] },
    { name: "Marcus Webb", role: "Backend Engineer", total: 6, types: ["Delivery activity", "PR reviews"] },
    { name: "Ananya Iyer", role: "QA Engineer", total: 8, types: ["Delivery activity", "PR reviews", "Cross-team contribution"] },
  ];

  return (
    <div>
      <SectionHeader title="Evidence Profiles" subtitle="Sprint 23 — contribution evidence by team member. Select a member to view their full timeline." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {members.map((m) => (
          <Card key={m.name}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-indigo-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{m.name}</div>
                <div className="text-[10px]" style={{ color: "#374151" }}>{m.role}</div>
              </div>
            </div>
            <Label>Recent evidence</Label>
            <div className="space-y-1 mb-4">
              {m.types.map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-[11px]" style={{ color: "#4a5568" }}>
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "#6366f1" }} />{t}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-[11px]" style={{ color: "#374151" }}>{m.total} evidence items this sprint</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function IndivProfile({ member }: { member: string }) {
  const categories = [
    { label: "Delivery", items: ["12 tasks completed", "2 incident resolutions", "1 production fix"] },
    { label: "Code Reviews", items: ["9 PRs reviewed", "Avg review turnaround: 18h"] },
    { label: "Documentation", items: ["3 Confluence pages updated", "1 architecture doc authored"] },
    { label: "Cross-Team Support", items: ["2 peer context entries", "1 platform team assist (self-added, manager validated)"] },
  ];

  const timeline = [
    { date: "Jul 24", desc: "Closed TASK-119 — Auth Token Refresh Logic", source: "Jira" },
    { date: "Jul 22", desc: "Resolved production authentication incident", source: "Jira" },
    { date: "Jul 21", desc: "Reviewed payment integration PR #88", source: "GitHub" },
    { date: "Jul 19", desc: "Updated API authentication guide", source: "Confluence" },
    { date: "Jul 17", desc: "Helped Liam unblock API integration", source: "Peer Context" },
    { date: "Jul 15", desc: "Supported client issue resolution", source: "Self-added · Manager validated" },
  ];

  const sourceColor: Record<string, string> = { "Jira": "#6366f1", "GitHub": "#22c55e", "Confluence": "#38bdf8", "Peer Context": "#f59e0b", "Self-added · Manager validated": "#a78bfa" };

  return (
    <div>
      <SectionHeader title={`${member} — Contribution Evidence`} subtitle="Evidence from work systems and voluntary contributions. Interpretation belongs to the manager within role and project context." />
      <div className="grid grid-cols-4 gap-3 mb-5">
        {categories.map((c) => (
          <Card key={c.label}>
            <Label>{c.label}</Label>
            <ul className="space-y-1 mt-1">
              {c.items.map((i) => <li key={i} className="text-xs" style={{ color: "#94a3b8" }}>{i}</li>)}
            </ul>
          </Card>
        ))}
      </div>
      <Card>
        <Label>Contribution Timeline</Label>
        <div className="space-y-2.5 mt-1">
          {timeline.map((t) => (
            <div key={t.desc} className="flex items-start gap-3 pb-2.5 border-b last:border-0 last:pb-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <Mono className="text-[10px] w-14 shrink-0 mt-0.5" style={{ color: "#374151" }}>{t.date}</Mono>
              <div className="flex-1 text-xs" style={{ color: "#94a3b8" }}>{t.desc}</div>
              <span className="text-[10px] px-1.5 py-0.5 rounded shrink-0" style={{ background: `${sourceColor[t.source] ?? "#6b7a99"}15`, color: sourceColor[t.source] ?? "#6b7a99", fontFamily: "'DM Mono', monospace" }}>
                {t.source}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 7 — Weekly Pulse (employee-facing)
// ═══════════════════════════════════════════════════════════════════════════════

function PulsePage({ tab }: { tab: string }) {
  if (tab === "Submit Pulse") return <SubmitPulse />;
  return <ManagerPulseView />;
}

function SubmitPulse() {
  const [workload, setWorkload] = useState<string | null>(null);
  const [blockers, setBlockers] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const Select = ({ opts, val, set }: { opts: string[]; val: string | null; set: (v: string) => void }) => (
    <div className="flex gap-2">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => set(o)}
          className="text-xs px-3 py-1.5 rounded-lg border transition-colors"
          style={{
            borderColor: val === o ? "#6366f1" : "rgba(255,255,255,0.08)",
            background: val === o ? "rgba(99,102,241,0.12)" : "transparent",
            color: val === o ? "#a5b4fc" : "#4a5568",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <SectionHeader title="Weekly Team Pulse" />
      <div className="p-3 rounded-lg mb-5 text-xs" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", color: "#4a5568" }}>
        Your responses provide context to project signals and are not used to calculate a performance score.
      </div>
      <Card>
        <div className="text-sm font-semibold mb-5" style={{ color: "#e2e8f0" }}>This week — Sprint 23</div>
        <div className="space-y-6">
          <div>
            <div className="text-sm mb-2" style={{ color: "#94a3b8" }}>My workload currently feels:</div>
            <Select opts={["Too Low", "Manageable", "High", "Unsustainable"]} val={workload} set={setWorkload} />
          </div>
          <div>
            <div className="text-sm mb-2" style={{ color: "#94a3b8" }}>I currently have blockers:</div>
            <Select opts={["None", "Minor", "Significant"]} val={blockers} set={setBlockers} />
          </div>
          <div>
            <div className="text-sm mb-2" style={{ color: "#94a3b8" }}>I have the information / context needed to do my work:</div>
            <Select opts={["Yes", "Partially", "No"]} val={info} set={setInfo} />
          </div>
          <div>
            <div className="text-sm mb-2" style={{ color: "#94a3b8" }}>Anything your manager should know? <span style={{ color: "#374151" }}>(optional)</span></div>
            <textarea
              rows={3}
              className="w-full text-xs px-3 py-2 rounded-lg resize-none"
              placeholder="Open text — context that project data can't capture..."
              style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }}
            />
          </div>
          <button className="text-sm px-5 py-2.5 rounded-lg font-medium" style={{ background: "#6366f1", color: "#fff" }}>Submit Pulse</button>
        </div>
      </Card>
    </div>
  );
}

function ManagerPulseView() {
  return (
    <div>
      <SectionHeader title="Team Pulse — Manager View" subtitle="Aggregated responses and how they combine with system signals. Individual responses are not displayed verbatim." />
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { q: "Workload perception", dist: { "Too Low": 0, "Manageable": 2, "High": 2, "Unsustainable": 1 } },
          { q: "Blocker severity", dist: { "None": 1, "Minor": 3, "Significant": 1 } },
          { q: "Information / context", dist: { "Yes": 2, "Partially": 2, "No": 1 } },
        ].map((s) => (
          <Card key={s.q}>
            <Label>{s.q}</Label>
            <div className="space-y-1.5 mt-2">
              {Object.entries(s.dist).map(([opt, count]) => (
                <div key={opt} className="flex items-center gap-2">
                  <div className="text-xs w-24 shrink-0" style={{ color: "#718096" }}>{opt}</div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: `${(count / 5) * 100}%`, background: "#6366f1" }} />
                  </div>
                  <Mono className="text-[10px] w-4 text-right" style={{ color: "#374151" }}>{count}</Mono>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <Label>Combined Signal — Capacity Pressure</Label>
        <div className="mt-2 p-3.5 rounded-lg" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
          <div className="text-xs font-semibold mb-2" style={{ color: "#f59e0b" }}>Capacity pressure requires attention</div>
          <div className="space-y-1 mb-3">
            <div className="flex items-start gap-2 text-xs" style={{ color: "#94a3b8" }}>
              <Database size={11} color="#6366f1" className="mt-0.5 shrink-0" />
              <span><span style={{ color: "#818cf8" }}>System signal:</span> 94% planned capacity (Priya S.)</span>
            </div>
            <div className="flex items-start gap-2 text-xs" style={{ color: "#94a3b8" }}>
              <MessageSquare size={11} color="#f59e0b" className="mt-0.5 shrink-0" />
              <span><span style={{ color: "#f59e0b" }}>Human context:</span> Team member reports workload as High; blockers: Significant</span>
            </div>
          </div>
          <p className="text-xs" style={{ color: "#a5b4fc" }}>Suggested action: Discuss workload and priorities during the next 1:1.</p>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 8 — Data, Privacy & Governance
// ═══════════════════════════════════════════════════════════════════════════════

function GovernancePage({ tab }: { tab: string }) {
  if (tab === "Connected Sources") return <ConnectedSources />;
  if (tab === "My Data") return <MyData />;
  return <GovernanceControls />;
}

function ConnectedSources() {
  const tools = [
    { name: "Jira", desc: "Task tracking, sprint data, blocked status", connected: true },
    { name: "GitHub", desc: "Pull requests, code reviews, contributions", connected: true },
    { name: "Confluence", desc: "Documentation activity", connected: true },
    { name: "Slack / Teams", desc: "Not connected — message content is not collected", connected: false },
    { name: "Azure DevOps", desc: "Future scope", connected: false, future: true },
    { name: "GitLab", desc: "Future scope", connected: false, future: true },
  ];

  const dataUsed = [
    { signal: "Task metadata (title, status, assignee)", why: "Identify delivery activity and assignment patterns." },
    { signal: "Sprint / workflow status", why: "Detect blocked tasks, spillovers, and timeline deviations." },
    { signal: "PR and review metadata", why: "Identify knowledge concentration and review distribution." },
    { signal: "Documentation activity", why: "Include documentation work in contribution evidence." },
    { signal: "Voluntary contribution context", why: "Allow self-reported evidence that systems cannot capture." },
    { signal: "Weekly Pulse responses", why: "Provide human context that complements system signals." },
  ];

  const notCollected = [
    "Private message content", "Keystrokes or typing patterns", "Screen activity", "Webcam or microphone", "Physical movement or location", "Continuous employee activity monitoring",
  ];

  return (
    <div>
      <SectionHeader title="Connected Sources" subtitle="Jira + GitHub + Confluence are the V1 integration set. Additional integrations are future scope." />

      <div className="grid grid-cols-3 gap-3 mb-5">
        {tools.map((t) => (
          <Card key={t.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{t.name}</div>
              {t.connected ? (
                <span className="text-[10px] flex items-center gap-1" style={{ color: "#22c55e" }}><CheckCircle2 size={11} />Connected</span>
              ) : t.future ? (
                <span className="text-[10px]" style={{ color: "#374151" }}>Future scope</span>
              ) : (
                <span className="text-[10px] flex items-center gap-1" style={{ color: "#374151" }}><X size={10} />Not connected</span>
              )}
            </div>
            <div className="text-[11px]" style={{ color: "#374151" }}>{t.desc}</div>
            {t.connected && <Mono className="text-[10px] mt-1.5 block" style={{ color: "#374151" }}>Last sync: 2 min ago</Mono>}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={13} color="#22c55e" />
            <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>What TeamPulse Uses</span>
          </div>
          <div className="space-y-2.5">
            {dataUsed.map((d) => (
              <div key={d.signal}>
                <div className="text-xs font-medium" style={{ color: "#94a3b8" }}>{d.signal}</div>
                <div className="text-[10px] mt-0.5" style={{ color: "#374151" }}>Purpose: {d.why}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <X size={13} color="#ef4444" />
            <span className="text-xs font-semibold" style={{ color: "#ef4444" }}>What TeamPulse Does Not Monitor</span>
          </div>
          <div className="space-y-1.5">
            {notCollected.map((n) => (
              <div key={n} className="flex items-center gap-2 text-xs" style={{ color: "#4a5568" }}>
                <X size={10} color="#ef4444" className="shrink-0" />{n}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t text-[11px] leading-relaxed" style={{ borderColor: "rgba(255,255,255,0.06)", color: "#374151" }}>
            <Lock size={10} color="#6366f1" className="inline mr-1.5 mb-0.5" />
            TeamPulse analyzes work-system patterns, not private employee behavior.
          </div>
        </Card>
      </div>
    </div>
  );
}

function MyData() {
  const [contextTarget, setContextTarget] = useState<string | null>(null);

  const items = [
    { id: "TASK-231", source: "Jira", desc: "TASK-231 exceeded expected completion date by 3 days.", date: "Jul 15", status: "flagged", context: null },
    { id: "PR-88", source: "GitHub", desc: "Reviewed payment integration PR #88.", date: "Jul 21", status: "accurate", context: null },
    { id: "DOC-41", source: "Confluence", desc: "Updated API authentication guide.", date: "Jul 19", status: "accurate", context: null },
    { id: "PEER-22", source: "Peer Context", desc: "Helped Ji-yeon unblock CORS configuration issue.", date: "Jul 22", status: "accurate", context: "This took about 2 hours and required reviewing 3 different services." },
  ];

  return (
    <div>
      <SectionHeader title="My TeamPulse Data" subtitle="Evidence attributed to you from connected systems and peer context. You can add context or report inaccuracies." />
      <div className="space-y-3">
        {items.map((it) => (
          <Card key={it.id}>
            <div className="flex items-start gap-3">
              <span className="text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", fontFamily: "'DM Mono', monospace" }}>{it.source}</span>
              <div className="flex-1">
                <div className="text-xs font-medium mb-0.5" style={{ color: "#e2e8f0" }}>{it.desc}</div>
                {it.context && (
                  <div className="text-[11px] mt-1 p-2 rounded" style={{ background: "rgba(34,197,94,0.06)", color: "#6ee7b7", border: "1px solid rgba(34,197,94,0.12)" }}>
                    Context added: {it.context}
                  </div>
                )}
              </div>
              <Mono className="text-[10px] shrink-0" style={{ color: "#374151" }}>{it.date}</Mono>
              <div className="flex flex-col gap-1.5 shrink-0">
                {it.status === "flagged" ? (
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>Review suggested</span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e" }}>Accurate ✓</span>
                )}
                <button onClick={() => setContextTarget(contextTarget === it.id ? null : it.id)} className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#4a5568" }}>
                  Add Context
                </button>
                <button className="text-[10px] px-2 py-0.5 rounded" style={{ color: "#374151" }}>Report Incorrect</button>
              </div>
            </div>
            {contextTarget === it.id && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <textarea rows={2} className="w-full text-xs px-3 py-2 rounded-md resize-none" placeholder="Add context that gives this signal more meaning..." style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", outline: "none" }} />
                <button className="mt-2 text-xs px-3 py-1.5 rounded font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>Save Context</button>
              </div>
            )}
            {it.id === "TASK-231" && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="text-[10px] p-2 rounded" style={{ background: "rgba(34,197,94,0.06)", color: "#6ee7b7", border: "1px solid rgba(34,197,94,0.1)" }}>
                  Example context: "Delayed because external API access wasn't provided until July 27."
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function GovernanceControls() {
  const [empView, setEmpView] = useState(true);
  const [weeklyPulse, setWeeklyPulse] = useState(true);
  const [aggOnly, setAggOnly] = useState(false);
  const [selectedProject, setSelectedProject] = useState("Payments Platform — PAY");
  const projects = ["Payments Platform — PAY", "Customer Portal — CP", "Internal Tools — INT"];

  const Toggle = ({ on, toggle }: { on: boolean; toggle: () => void }) => (
    <button onClick={toggle} className="w-10 h-5 rounded-full relative transition-colors shrink-0" style={{ background: on ? "#6366f1" : "#1e293b" }}>
      <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: on ? "22px" : "2px" }} />
    </button>
  );

  return (
    <div>
      <SectionHeader title="Controls" subtitle="Configure how TeamPulse surfaces data. These settings apply to your project workspace." />
      <Card className="mb-4">
        <div className="space-y-3">
          <div className="text-xs font-semibold" style={{ color: "#a5b4fc" }}>Select project to analyse</div>
          <div className="text-[11px]" style={{ color: "#4a5568" }}>Choose the project whose Jira and code metadata TeamPulse should focus on for this workspace.</div>
          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project}
                onClick={() => setSelectedProject(project)}
                className="w-full rounded-lg px-4 py-3 text-left transition-colors"
                style={{
                  border: "1px solid",
                  borderColor: selectedProject === project ? "#6366f1" : "rgba(255,255,255,0.08)",
                  background: selectedProject === project ? "rgba(99,102,241,0.08)" : "transparent",
                  color: selectedProject === project ? "#e2e8f0" : "#94a3b8",
                }}
              >
                <div className="font-medium">{project}</div>
                <div className="text-[11px] mt-1" style={{ color: selectedProject === project ? "#c7d2fe" : "#94a3b8" }}>
                  {project === "Payments Platform — PAY"
                    ? "Sprint project with connected Jira metadata and contributor data."
                    : "Select this project for TeamPulse analysis."
                  }
                </div>
              </button>
            ))}
          </div>
          {selectedProject === "Payments Platform — PAY" && (
            <div className="p-3 rounded-lg border" style={{ borderColor: "rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.06)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#22c55e" }}>Current project status</div>
              <div className="grid grid-cols-2 gap-3 text-[11px]" style={{ color: "#94a3b8" }}>
                <div>
                  <div className="font-medium" style={{ color: "#e2e8f0" }}>Sprint 23</div>
                  <div>Jul 14 – Jul 28 · 64% complete</div>
                </div>
                <div>
                  <div className="font-medium" style={{ color: "#e2e8f0" }}>Historical data</div>
                  <div>4 previous sprints available</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Project contributors</div>
            <div className="text-[11px]" style={{ color: "#4a5568" }}>Mapped identities from connected systems.</div>
          </div>
          <span className="text-[10px] px-2 py-1 rounded" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", fontFamily: "'DM Mono', monospace" }}>5 matched</span>
        </div>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {[
            { name: "Priya Sharma", jira: "✓", github: "priya-s", confluence: "Priya Sharma" },
            { name: "Liam Torres", jira: "✓", github: "liam-t", confluence: "Liam Torres" },
            { name: "Ji-yeon Park", jira: "✓", github: "jiyeon", confluence: "J. Park" },
            { name: "Marcus Webb", jira: "✓", github: "mwebb", confluence: "Marcus Webb" },
            { name: "Ananya Iyer", jira: "✓", github: "ananya-i", confluence: "Ananya Iyer" },
          ].map((member) => (
            <div key={member.name} className="grid items-center px-4 py-2.5 border-b last:border-0" style={{ gridTemplateColumns: "1fr 50px 90px 100px", display: "grid", borderColor: "rgba(255,255,255,0.05)", gap: "0 12px" }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-800 flex items-center justify-center text-[9px] font-bold text-white">{member.name.split(" ").map((n) => n[0]).join("")}</div>
                <span className="text-xs font-medium" style={{ color: "#e2e8f0" }}>{member.name}</span>
              </div>
              <span className="text-[11px]" style={{ color: "#22c55e" }}>{member.jira}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#4a5568" }}>{member.github}</span>
              <span className="text-[11px]" style={{ color: "#718096" }}>{member.confluence}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mb-4">
        <div className="space-y-5">
          {[
            { label: "Employees can view their own contribution evidence", desc: "Team members can see evidence attributed to them and add context or report inaccuracies.", on: empView, toggle: () => setEmpView(!empView) },
            { label: "Weekly Pulse check-in enabled", desc: "Enables the optional operational check-in. Responses are not used to calculate performance scores.", on: weeklyPulse, toggle: () => setWeeklyPulse(!weeklyPulse) },
            { label: "Aggregate-only mode for manager view", desc: "Manager sees team-level patterns only, not individual-level breakdowns. Reduces individual visibility.", on: aggOnly, toggle: () => setAggOnly(!aggOnly) },
          ].map((c, i) => (
            <div key={c.label} className={`flex items-start gap-4 ${i > 0 ? "pt-5 border-t" : ""}`} style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <Toggle on={c.on} toggle={c.toggle} />
              <div>
                <div className="text-xs font-medium" style={{ color: "#e2e8f0" }}>{c.label}</div>
                <div className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "#374151" }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Lock size={13} color="#6366f1" />
          <span className="text-xs font-semibold" style={{ color: "#a5b4fc" }}>Governance Principles</span>
        </div>
        <div className="space-y-2">
          {[
            "TeamPulse analyzes work patterns from project metadata, not private employee behavior.",
            "Scores and signals are decision-support indicators. Managers retain full interpretive authority.",
            "Employees can view, add context to, and report inaccuracies in evidence attributed to them.",
            "No private messages, screen activity, keystrokes, physical movement, or continuous activity monitoring.",
          ].map((p) => (
            <div key={p} className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: "#4a5568" }}>
              <span className="text-indigo-500 mt-0.5 shrink-0">·</span>{p}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
