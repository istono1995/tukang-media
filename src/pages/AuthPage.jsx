import { useState } from "react";

export default function AuthPage({ onBack }) {
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  if (success) return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#fafafa", fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      textAlign: "center", padding: 24
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
      @keyframes popIn { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }`}</style>
      <div style={{ animation: "popIn 0.4s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{mode === "forgot" ? "📧" : "🎉"}</div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, marginBottom: 8 }}>
          {mode === "forgot" ? "Email Terkirim!" : mode === "register" ? "Akun Dibuat!" : "Selamat Datang!"}
        </div>
        <div style={{ color: "#71717a", fontSize: 14, maxWidth: 300, margin: "0 auto 28px", lineHeight: 1.6 }}>
          {mode === "forgot"
            ? "Cek inbox email kamu untuk link reset password."
            : mode === "register"
            ? "Akun kamu berhasil dibuat. Selamat bergabung di Tukang Media!"
            : "Kamu berhasil masuk. Selamat berbelanja di Tukang Media!"}
        </div>
        <button onClick={onBack} style={{
          background: "#18181b", color: "white", border: "none",
          borderRadius: 12, padding: "13px 32px", fontSize: 14,
          fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
        }}>← Kembali ke Marketplace</button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#fafafa",
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .auth-input {
          width: 100%; border: 1.5px solid #e4e4e7; border-radius: 11px;
          padding: 12px 14px; font-size: 14px; background: white;
          outline: none; font-family: inherit; color: #18181b;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .auth-input:focus { border-color: #18181b; box-shadow: 0 0 0 3px rgba(24,24,27,0.07); }
        .auth-input::placeholder { color: #a1a1aa; }

        .auth-btn {
          width: 100%; padding: 13px; border-radius: 11px; border: none;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: all 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .auth-btn:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .social-btn {
          flex: 1; padding: 11px; border-radius: 10px;
          border: 1.5px solid #e4e4e7; background: white;
          font-size: 13px; font-weight: 500; cursor: pointer;
          font-family: inherit; display: flex; align-items: center;
          justify-content: center; gap: 7px; transition: all 0.18s; color: #18181b;
        }
        .social-btn:hover { border-color: #a1a1aa; background: #fafafa; }

        .tab-btn {
          flex: 1; padding: 10px; border-radius: 9px; border: none;
          font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: inherit; transition: all 0.18s;
        }

        .divider {
          display: flex; align-items: center; gap: 12; margin: 4px 0;
        }
        .divider-line { flex: 1; height: 1px; background: #e4e4e7; }
        .divider-text { font-size: 12px; color: #a1a1aa; padding: 0 10px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "white", borderBottom: "1.5px solid #f0f0f0",
        padding: "0 28px", height: 58,
        display: "flex", alignItems: "center", gap: 12,
        position: "sticky", top: 0, zIndex: 10
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontSize: 18,
          cursor: "pointer", color: "#52525b"
        }}>←</button>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18 }}>
          tukang<span style={{ color: "#2563eb" }}>media</span>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 20px"
      }}>
        <div style={{
          width: "100%", maxWidth: 420,
          animation: "fadeUp 0.3s ease"
        }}>

          {/* CARD */}
          <div style={{
            background: "white", border: "1.5px solid #f0f0f0",
            borderRadius: 20, padding: "32px 32px 28px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
          }}>

            {/* LOGO */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, marginBottom: 4 }}>
                tukang<span style={{ color: "#2563eb" }}>media</span>
              </div>
              <div style={{ fontSize: 13, color: "#71717a" }}>
                {mode === "forgot"
                  ? "Reset password akun kamu"
                  : "Platform tools kreator digital Indonesia"}
              </div>
            </div>

            {/* TABS (login/register) */}
            {mode !== "forgot" && (
              <div style={{
                display: "flex", gap: 4, background: "#f4f4f5",
                borderRadius: 11, padding: 4, marginBottom: 24
              }}>
                {["login", "register"].map(m => (
                  <button
                    key={m}
                    className="tab-btn"
                    onClick={() => setMode(m)}
                    style={{
                      background: mode === m ? "white" : "transparent",
                      color: mode === m ? "#18181b" : "#71717a",
                      boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
                    }}
                  >
                    {m === "login" ? "Masuk" : "Daftar"}
                  </button>
                ))}
              </div>
            )}

            {/* FORGOT PASSWORD */}
            {mode === "forgot" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
                  <input className="auth-input" type="email" placeholder="email@kamu.com"
                    value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
                <button className="auth-btn" onClick={handleSubmit} disabled={!form.email || loading}
                  style={{ background: "#18181b", color: "white", marginTop: 4 }}>
                  {loading ? "Mengirim..." : "Kirim Link Reset"}
                </button>
                <button onClick={() => setMode("login")} style={{
                  background: "none", border: "none", color: "#2563eb",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
                }}>← Kembali ke Login</button>
              </div>
            )}

            {/* LOGIN */}
            {mode === "login" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Social login */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="social-btn">
                    <span style={{ fontSize: 16 }}>🇬</span> Google
                  </button>
                  <button className="social-btn">
                    <span style={{ fontSize: 16 }}>👤</span> Facebook
                  </button>
                </div>

                <div className="divider">
                  <div className="divider-line" />
                  <span className="divider-text">atau dengan email</span>
                  <div className="divider-line" />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
                  <input className="auth-input" type="email" placeholder="email@kamu.com"
                    value={form.email} onChange={e => set("email", e.target.value)} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
                    <button onClick={() => setMode("forgot")} style={{
                      background: "none", border: "none", color: "#2563eb",
                      fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
                    }}>Lupa password?</button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input className="auth-input" type={showPass ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={form.password} onChange={e => set("password", e.target.value)}
                      style={{ paddingRight: 44 }} />
                    <button onClick={() => setShowPass(s => !s)} style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#a1a1aa"
                    }}>{showPass ? "🙈" : "👁️"}</button>
                  </div>
                </div>

                <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "#52525b", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "#18181b", width: 15, height: 15 }} />
                  Ingat saya
                </label>

                <button className="auth-btn" onClick={handleSubmit}
                  disabled={!form.email || !form.password || loading}
                  style={{ background: "#18181b", color: "white", marginTop: 2 }}>
                  {loading
                    ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Memproses...</>
                    : "Masuk →"}
                </button>

                <div style={{ textAlign: "center", fontSize: 13, color: "#71717a" }}>
                  Belum punya akun?{" "}
                  <button onClick={() => setMode("register")} style={{
                    background: "none", border: "none", color: "#2563eb",
                    fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 13
                  }}>Daftar sekarang</button>
                </div>
              </div>
            )}

            {/* REGISTER */}
            {mode === "register" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {/* Social */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="social-btn">
                    <span style={{ fontSize: 16 }}>🇬</span> Google
                  </button>
                  <button className="social-btn">
                    <span style={{ fontSize: 16 }}>👤</span> Facebook
                  </button>
                </div>

                <div className="divider">
                  <div className="divider-line" />
                  <span className="divider-text">atau isi form</span>
                  <div className="divider-line" />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Nama Lengkap</label>
                  <input className="auth-input" type="text" placeholder="Nama kamu"
                    value={form.name} onChange={e => set("name", e.target.value)} />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
                  <input className="auth-input" type="email" placeholder="email@kamu.com"
                    value={form.email} onChange={e => set("email", e.target.value)} />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input className="auth-input" type={showPass ? "text" : "password"}
                      placeholder="Min. 8 karakter"
                      value={form.password} onChange={e => set("password", e.target.value)}
                      style={{ paddingRight: 44 }} />
                    <button onClick={() => setShowPass(s => !s)} style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#a1a1aa"
                    }}>{showPass ? "🙈" : "👁️"}</button>
                  </div>
                  {/* Password strength */}
                  {form.password.length > 0 && (
                    <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                      {[1,2,3,4].map(i => (
                        <div key={i} style={{
                          flex: 1, height: 3, borderRadius: 3,
                          background: form.password.length >= i * 2
                            ? (form.password.length >= 8 ? "#16a34a" : form.password.length >= 4 ? "#f59e0b" : "#ef4444")
                            : "#e4e4e7",
                          transition: "background 0.2s"
                        }} />
                      ))}
                      <span style={{ fontSize: 11, color: "#71717a", marginLeft: 4 }}>
                        {form.password.length < 4 ? "Lemah" : form.password.length < 8 ? "Sedang" : "Kuat"}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Konfirmasi Password</label>
                  <input className="auth-input" type="password" placeholder="Ulangi password"
                    value={form.confirm} onChange={e => set("confirm", e.target.value)}
                    style={{ borderColor: form.confirm && form.confirm !== form.password ? "#ef4444" : "" }} />
                  {form.confirm && form.confirm !== form.password && (
                    <div style={{ fontSize: 11.5, color: "#ef4444", marginTop: 5 }}>Password tidak cocok</div>
                  )}
                </div>

                <label style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 12.5, color: "#52525b", cursor: "pointer", lineHeight: 1.5 }}>
                  <input type="checkbox" checked={form.agree} onChange={e => set("agree", e.target.checked)}
                    style={{ accentColor: "#18181b", width: 15, height: 15, marginTop: 1, flexShrink: 0 }} />
                  Saya setuju dengan <span style={{ color: "#2563eb", fontWeight: 500 }}>Syarat & Ketentuan</span> dan <span style={{ color: "#2563eb", fontWeight: 500 }}>Kebijakan Privasi</span> Tukang Media
                </label>

                <button className="auth-btn" onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.password || form.password !== form.confirm || !form.agree || loading}
                  style={{ background: "#18181b", color: "white", marginTop: 2 }}>
                  {loading
                    ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Membuat akun...</>
                    : "Buat Akun Gratis 🚀"}
                </button>

                <div style={{ textAlign: "center", fontSize: 13, color: "#71717a" }}>
                  Sudah punya akun?{" "}
                  <button onClick={() => setMode("login")} style={{
                    background: "none", border: "none", color: "#2563eb",
                    fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 13
                  }}>Masuk</button>
                </div>
              </div>
            )}
          </div>

          {/* TRUST BADGES */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
            {["🔒 SSL Aman", "✅ Gratis Daftar", "🚀 Instan"].map(b => (
              <div key={b} style={{ fontSize: 12, color: "#a1a1aa", display: "flex", alignItems: "center", gap: 4 }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}