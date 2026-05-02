import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertCircle, BarChart3, FolderOpen, ListChecks, TrendingUp } from "lucide-react";
import { getTaskStats } from "../api/tasks";
import { getProjects } from "../api/projects";
import { useAuth } from "../context/AuthContext";

interface Stats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

const statCards = (stats: Stats, projectCount: number) => [
  { label: "Total Tasks", value: stats.total, icon: ListChecks, gradient: "linear-gradient(135deg, #6366f1, #818cf8)", light: "#eef2ff", text: "#4338ca" },
  { label: "Pending", value: stats.pending, icon: Clock, gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", light: "#fffbeb", text: "#b45309" },
  { label: "In Progress", value: stats.inProgress, icon: BarChart3, gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)", light: "#eff6ff", text: "#1d4ed8" },
  { label: "Completed", value: stats.completed, icon: CheckCircle2, gradient: "linear-gradient(135deg, #10b981, #34d399)", light: "#ecfdf5", text: "#047857" },
  { label: "Overdue", value: stats.overdue, icon: AlertCircle, gradient: "linear-gradient(135deg, #ef4444, #f87171)", light: "#fef2f2", text: "#b91c1c" },
  { label: "Projects", value: projectCount, icon: FolderOpen, gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)", light: "#f5f3ff", text: "#6d28d9" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, inProgress: 0, completed: 0, overdue: 0 });
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, projectsRes] = await Promise.all([getTaskStats(), getProjects()]);
        setStats(statsRes.stats);
        setProjectCount(projectsRes.count || projectsRes.projects?.length || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const cards = statCards(stats, projectCount);

  return (
    <div style={{ padding: "28px 32px", maxWidth: "1100px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#1e1b4b", margin: 0, letterSpacing: "-0.3px" }}>
          Welcome, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "14px" }}>
          Here is your tasks overview for today.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "16px", padding: "22px",
                height: "100px", animation: "pulse 1.5s infinite",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
              }} />
            ))
          : cards.map(({ label, value, icon: Icon, gradient, light, text }) => (
              <div key={label} style={{
                background: "white", borderRadius: "16px", padding: "20px 22px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9",
                transition: "transform 0.15s, box-shadow 0.15s"
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {label}
                  </span>
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: gradient, display: "flex", alignItems: "center",
                    justifyContent: "center", boxShadow: "0 3px 8px rgba(0,0,0,0.15)"
                  }}>
                    <Icon style={{ width: "18px", height: "18px", color: "white" }} />
                  </div>
                </div>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#1e1b4b", lineHeight: 1 }}>
                  {value}
                </div>
              </div>
            ))}
      </div>

      {/* Progress Card */}
      <div style={{
        background: "white", borderRadius: "16px", padding: "24px 26px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <TrendingUp style={{ width: "18px", height: "18px", color: "#6366f1" }} />
              <span style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "15px" }}>Overall Progress</span>
            </div>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
              {stats.completed} / {stats.total} tasks completed
            </p>
          </div>
          <div style={{
            fontSize: "28px", fontWeight: 800, color: "#6366f1",
            background: "#eef2ff", padding: "6px 16px", borderRadius: "12px"
          }}>
            {completionRate}%
          </div>
        </div>
        <div style={{ background: "#f1f5f9", borderRadius: "999px", height: "12px", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: "999px", transition: "width 0.8s ease",
            width: `${completionRate}%`,
            background: "linear-gradient(90deg, #6366f1, #a78bfa, #34d399)"
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          <span style={{ fontSize: "11px", color: "#cbd5e1" }}>0%</span>
          <span style={{ fontSize: "11px", color: "#cbd5e1" }}>50%</span>
          <span style={{ fontSize: "11px", color: "#cbd5e1" }}>100%</span>
        </div>
      </div>

      {/* Role Info */}
      <div style={{
        background: user?.role === "admin"
          ? "linear-gradient(135deg, #fef3c7, #fde68a)"
          : "linear-gradient(135deg, #d1fae5, #a7f3d0)",
        borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px",
        border: `1px solid ${user?.role === "admin" ? "#fcd34d" : "#6ee7b7"}`
      }}>
        <span style={{ fontSize: "22px" }}>{user?.role === "admin" ? "👑" : "👤"}</span>
        <div>
          <p style={{ fontWeight: 700, color: user?.role === "admin" ? "#92400e" : "#065f46", margin: 0, fontSize: "14px" }}>
            You are logged in as <span style={{ textTransform: "capitalize" }}>{user?.role}</span>
          </p>
          <p style={{ fontSize: "12px", color: user?.role === "admin" ? "#b45309" : "#047857", margin: "2px 0 0" }}>
            {user?.role === "admin"
              ? "You can create/delete projects, tasks and manage the team."
              : "You can view your assigned tasks and update their status."}
          </p>
        </div>
      </div>
    </div>
  );
}
