import { useState } from "react";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { loginUser, registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) return setError("Email aur password zaroori hai.");
    if (mode === "signup" && !form.name) return setError("Naam zaroori hai.");
    setLoading(true);
    try {
      if (mode === "signup") {
        await registerUser({ name: form.name, email: form.email, password: form.password, role: form.role });
      }
      const data = await loginUser({ email: form.email, password: form.password });
      setUser(data.user);
      setToken(data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", border: "2px solid #e5e7eb",
    borderRadius: "10px", fontSize: "14px", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "inherit",
    color: "#111827", background: "white"
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)"
    }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "420px" }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "62px", height: "62px", borderRadius: "18px",
            background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
            marginBottom: "12px", border: "2px solid rgba(255,255,255,0.4)"
          }}>
            <Sparkles style={{ width: "28px", height: "28px", color: "white" }} />
          </div>
          <h1 style={{ color: "white", fontSize: "30px", fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>
            TaskFlow
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: "4px 0 0 0" }}>
            Team Task Manager
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "white", borderRadius: "24px", overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)"
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: "#fafafa", borderBottom: "1px solid #f1f5f9" }}>
            {(["login", "signup"] as const).map((tab) => (
              <button key={tab} onClick={() => { setMode(tab); setError(""); }}
                style={{
                  flex: 1, padding: "16px", fontSize: "14px", fontWeight: 700, border: "none",
                  cursor: "pointer", transition: "all 0.2s",
                  background: mode === tab ? "white" : "transparent",
                  color: mode === tab ? "#7c3aed" : "#94a3b8",
                  borderBottom: mode === tab ? "3px solid #7c3aed" : "3px solid transparent",
                  marginBottom: "-1px"
                }}>
                {tab === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {mode === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                  Aapka Naam *
                </label>
                <input name="name" value={form.name} onChange={handleChange} onKeyDown={handleKey}
                  placeholder="e.g. Rahul Sharma" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} onKeyDown={handleKey}
                placeholder="aap@example.com" style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Password *</label>
              <div style={{ position: "relative" }}>
                <input name="password" type={showPass ? "text" : "password"} value={form.password}
                  onChange={handleChange} onKeyDown={handleKey} placeholder="Min. 6 characters"
                  style={{ ...inputStyle, paddingRight: "42px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
                <button type="button" onClick={() => setShowPass((s) => !s)} style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex"
                }}>
                  {showPass ? <EyeOff style={{ width: "16px", height: "16px" }} /> : <Eye style={{ width: "16px", height: "16px" }} />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Role</label>
                <select name="role" value={form.role} onChange={handleChange}
                  style={{ ...inputStyle, appearance: "auto" }}>
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
                fontSize: "13px", padding: "12px 14px", borderRadius: "10px"
              }}>⚠️ {error}</div>
            )}

            <button onClick={handleSubmit} disabled={loading} style={{
              width: "100%", padding: "13px",
              background: loading ? "#c4b5fd" : "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white", border: "none", borderRadius: "12px", fontSize: "15px",
              fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              boxShadow: "0 4px 15px rgba(124,58,237,0.35)", transition: "all 0.2s"
            }}>
              {loading && <Loader2 style={{ width: "16px", height: "16px" }} />}
              {mode === "login" ? "Sign In →" : "Create Account →"}
            </button>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", margin: 0 }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                style={{ background: "none", border: "none", color: "#7c3aed", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}>
                {mode === "login" ? "Sign Up karein" : "Sign In karein"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
