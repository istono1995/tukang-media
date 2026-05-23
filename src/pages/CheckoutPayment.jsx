import { useState } from "react";

const cartItems = [
  { id: 1, name: "Notion Finance Tracker", category: "Template", price: 49000, preview: "📊", seller: "Rizky Studio" },
  { id: 2, name: "UI Kit – Figma Mobile", category: "Design Asset", price: 129000, preview: "🎨", seller: "Dian Kreasi" },
];

const paymentMethods = [
  {
    group: "QRIS",
    icon: "⬛",
    color: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
    id: "qris",
    label: "QRIS",
    desc: "Scan & bayar dari aplikasi apapun",
    instant: true,
  },
  {
    group: "E-Wallet",
    id: "dana",
    icon: "💙",
    color: "#118EEA",
    bg: "#eff6ff",
    border: "#bfdbfe",
    label: "DANA",
    desc: "Bayar langsung dari saldo DANA",
    instant: true,
  },
  {
    group: "E-Wallet",
    id: "ovo",
    icon: "💜",
    color: "#4C3494",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    label: "OVO",
    desc: "Bayar dari saldo OVO / OVO Points",
    instant: true,
  },
  {
    group: "E-Wallet",
    id: "gopay",
    icon: "💚",
    color: "#00B14F",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    label: "GoPay",
    desc: "Bayar via aplikasi Gojek / GoPay",
    instant: true,
  },
  {
    group: "E-Wallet",
    id: "shopeepay",
    icon: "🧡",
    color: "#EE4D2D",
    bg: "#fff7ed",
    border: "#fed7aa",
    label: "ShopeePay",
    desc: "Bayar dari saldo ShopeePay",
    instant: true,
  },
  {
    group: "Transfer Bank",
    id: "bca",
    icon: "🏦",
    color: "#003087",
    bg: "#eff6ff",
    border: "#bfdbfe",
    label: "BCA Virtual Account",
    desc: "Transfer ke nomor VA BCA",
    instant: false,
  },
  {
    group: "Transfer Bank",
    id: "mandiri",
    icon: "🏛️",
    color: "#F7A800",
    bg: "#fffbeb",
    border: "#fde68a",
    label: "Mandiri Virtual Account",
    desc: "Transfer ke nomor VA Mandiri",
    instant: false,
  },
  {
    group: "Transfer Bank",
    id: "bni",
    icon: "🏢",
    color: "#F68B1F",
    bg: "#fff7ed",
    border: "#fed7aa",
    label: "BNI Virtual Account",
    desc: "Transfer ke nomor VA BNI",
    instant: false,
  },
];

const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

const groups = ["QRIS", "E-Wallet", "Transfer Bank"];

function QrisModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(4px)",
    }} onClick={onClose}>
      <div style={{
        background: "white", borderRadius: 20, padding: "32px 28px",
        maxWidth: 360, width: "90%", textAlign: "center",
        boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
        animation: "popIn 0.22s cubic-bezier(.22,1,.36,1)"
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>Scan QRIS</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Rp 183.000</div>
        {/* Fake QR */}
        <div style={{
          width: 180, height: 180, margin: "0 auto 20px",
          background: "linear-gradient(135deg,#18181b,#3f3f46)",
          borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 70, boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
        }}>⬛</div>
        <div style={{ fontSize: 13, color: "#71717a", marginBottom: 20, lineHeight: 1.6 }}>
          Scan dengan aplikasi <strong>DANA, OVO, GoPay,</strong><br />
          ShopeePay, atau mobile banking apapun.
        </div>
        <div style={{
          background: "#f4f4f5", borderRadius: 10, padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 16, fontSize: 13
        }}>
          <span style={{ color: "#52525b", fontWeight: 500 }}>Berlaku selama <strong style={{ color: "#e11d48" }}>14:59</strong></span>
          <button onClick={handleCopy} style={{
            background: copied ? "#166534" : "#18181b", color: "white",
            border: "none", borderRadius: 7, padding: "5px 12px",
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
          }}>{copied ? "✓ Disalin" : "Salin"}</button>
        </div>
        <button onClick={onClose} style={{
          width: "100%", border: "1.5px solid #e4e4e7", background: "white",
          borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", color: "#52525b"
        }}>Tutup</button>
      </div>
    </div>
  );
}

function VAModal({ method, onClose }) {
  const vaNumber = "8800" + Math.floor(Math.random() * 900000000 + 100000000);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(4px)"
    }} onClick={onClose}>
      <div style={{
        background: "white", borderRadius: 20, padding: "32px 28px",
        maxWidth: 360, width: "90%",
        boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
        animation: "popIn 0.22s cubic-bezier(.22,1,.36,1)"
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: method.bg, border: `1.5px solid ${method.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
          }}>{method.icon}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{method.label}</div>
            <div style={{ fontSize: 12, color: "#71717a" }}>Nomor Virtual Account</div>
          </div>
        </div>
        <div style={{
          background: "#f4f4f5", borderRadius: 12, padding: "16px",
          marginBottom: 16, textAlign: "center"
        }}>
          <div style={{ fontSize: 12, color: "#a1a1aa", marginBottom: 6 }}>Nomor VA</div>
          <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, letterSpacing: 2, color: method.color }}>
            {vaNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <div style={{ flex: 1, background: "#f4f4f5", borderRadius: 10, padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#a1a1aa" }}>Total Bayar</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Rp 183.000</div>
          </div>
          <div style={{ flex: 1, background: "#fff7ed", borderRadius: 10, padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#a1a1aa" }}>Berlaku</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#ea580c" }}>23:59:59</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#71717a", lineHeight: 1.6, marginBottom: 20 }}>
          Transfer tepat <strong>Rp 183.000</strong> ke nomor VA di atas melalui ATM, mobile banking, atau internet banking {method.label.split(" ")[0]}.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleCopy} style={{
            flex: 1, background: method.color, color: "white",
            border: "none", borderRadius: 10, padding: "12px",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
          }}>{copied ? "✓ Disalin!" : "Salin Nomor VA"}</button>
          <button onClick={onClose} style={{
            flex: 1, border: "1.5px solid #e4e4e7", background: "white",
            borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", color: "#52525b"
          }}>Tutup</button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState("checkout"); // checkout | processing | success
  const [modal, setModal] = useState(null); // null | "qris" | "va"
  const [agree, setAgree] = useState(false);

  const subtotal = cartItems.reduce((s, i) => s + i.price, 0);
  const adminFee = 2000;
  const total = subtotal + adminFee;

  const selectedMethod = paymentMethods.find(p => p.id === selected);

  const handlePay = () => {
    if (!selected || !agree) return;
    if (selected === "qris") { setModal("qris"); return; }
    if (["bca", "mandiri", "bni"].includes(selected)) { setModal("va"); return; }
    // E-wallet: simulate processing
    setStep("processing");
    setTimeout(() => setStep("success"), 2200);
  };

  if (step === "processing") return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#fafafa", fontFamily: "'DM Sans','Helvetica Neue',sans-serif"
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
      @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
      <div style={{ width: 56, height: 56, borderRadius: "50%", border: "4px solid #e4e4e7", borderTopColor: "#18181b", animation: "spin 0.8s linear infinite", marginBottom: 24 }} />
      <div style={{ fontWeight: 600, fontSize: 18 }}>Memproses pembayaran...</div>
      <div style={{ color: "#71717a", fontSize: 13, marginTop: 6 }}>Menghubungkan ke {selectedMethod?.label}</div>
    </div>
  );

  if (step === "success") return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#fafafa", fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      textAlign: "center", padding: 24
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
      @keyframes popIn { from { opacity:0;transform:scale(.85) } to { opacity:1;transform:scale(1) } }
      `}</style>
      <div style={{ animation: "popIn 0.4s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 32, marginBottom: 8 }}>Pembayaran Berhasil!</div>
        <div style={{ color: "#71717a", fontSize: 14, maxWidth: 320, margin: "0 auto 28px", lineHeight: 1.6 }}>
          Produk kamu sudah siap diunduh. Cek email untuk link download & invoice.
        </div>
        <div style={{ background: "white", border: "1.5px solid #f0f0f0", borderRadius: 16, padding: "20px 24px", marginBottom: 24, textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
          {cartItems.map(i => (
            <div key={i.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f4f4f5" }}>
              <span style={{ fontSize: 28 }}>{i.preview}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{i.name}</div>
                <div style={{ fontSize: 12, color: "#71717a" }}>{i.category}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{formatRp(i.price)}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, fontWeight: 700, fontSize: 15 }}>
            <span>Total</span><span>{formatRp(total)}</span>
          </div>
        </div>
        <button onClick={() => setStep("checkout")} style={{
          background: "#18181b", color: "white", border: "none",
          borderRadius: 12, padding: "14px 32px", fontSize: 14, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit"
        }}>⬇ Unduh Produk</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans','Helvetica Neue',sans-serif", color: "#18181b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes popIn { from { opacity:0;transform:scale(.92) translateY(10px) } to { opacity:1;transform:scale(1) translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

        .pay-card {
          border: 2px solid #e4e4e7;
          border-radius: 14px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.18s;
          display: flex;
          align-items: center;
          gap: 14px;
          background: white;
        }
        .pay-card:hover { border-color: #a1a1aa; }
        .pay-card.active { border-color: #18181b; background: #fafafa; box-shadow: 0 0 0 3px rgba(24,24,27,0.06); }

        .pay-btn {
          width: 100%;
          padding: 15px;
          border-radius: 13px;
          border: none;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.18s;
        }
        .pay-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .pay-btn:not(:disabled):hover { filter: brightness(1.1); transform: translateY(-1px); }
        .pay-btn:not(:disabled):active { transform: translateY(0); }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "white", borderBottom: "1.5px solid #f0f0f0",
        padding: "0 32px", height: 58,
        display: "flex", alignItems: "center", gap: 12,
        position: "sticky", top: 0, zIndex: 10
      }}>
        <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>←</button>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18 }}>tukang<span style={{ color: "#2563eb" }}>media</span></div>
        <span style={{ color: "#d4d4d8", margin: "0 4px" }}>›</span>
        <span style={{ fontSize: 13, color: "#71717a", fontWeight: 500 }}>Checkout</span>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 60px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Order Summary */}
          <div style={{ background: "white", border: "1.5px solid #f0f0f0", borderRadius: 18, padding: "22px 22px 16px" }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🛒 Ringkasan Pesanan</div>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f4f4f5" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: "linear-gradient(135deg,#f4f4f5,#e4e4e7)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0
                }}>{item.preview}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#71717a" }}>{item.category} · oleh {item.seller}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#18181b" }}>{formatRp(item.price)}</div>
              </div>
            ))}
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#71717a" }}>
                <span>Subtotal</span><span>{formatRp(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#71717a" }}>
                <span>Biaya admin</span><span>{formatRp(adminFee)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, borderTop: "1.5px solid #f0f0f0", paddingTop: 10, marginTop: 4 }}>
                <span>Total</span><span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20 }}>{formatRp(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{ background: "white", border: "1.5px solid #f0f0f0", borderRadius: 18, padding: "22px" }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>💳 Metode Pembayaran</div>

            {groups.map(group => (
              <div key={group} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#a1a1aa", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>{group}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {paymentMethods.filter(p => p.group === group).map(method => (
                    <div
                      key={method.id}
                      className={`pay-card${selected === method.id ? " active" : ""}`}
                      onClick={() => setSelected(method.id)}
                    >
                      {/* Radio */}
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `2px solid ${selected === method.id ? "#18181b" : "#d4d4d8"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "border-color 0.15s"
                      }}>
                        {selected === method.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#18181b" }} />}
                      </div>

                      {/* Icon */}
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: method.bg, border: `1.5px solid ${method.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, flexShrink: 0
                      }}>{method.icon}</div>

                      {/* Label */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{method.label}</div>
                        <div style={{ fontSize: 12, color: "#71717a" }}>{method.desc}</div>
                      </div>

                      {/* Badge */}
                      {method.instant && (
                        <span style={{
                          background: "#f0fdf4", color: "#166534",
                          border: "1px solid #bbf7d0",
                          borderRadius: 6, padding: "2px 8px",
                          fontSize: 11, fontWeight: 600, flexShrink: 0
                        }}>Instan</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Sticky summary & pay button */}
        <div style={{ position: "sticky", top: 78, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "white", border: "1.5px solid #f0f0f0", borderRadius: 18, padding: "22px" }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>📦 Detail Pembayaran</div>

            {selectedMethod ? (
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                background: selectedMethod.bg, border: `1.5px solid ${selectedMethod.border}`,
                borderRadius: 12, padding: "12px 14px", marginBottom: 16
              }}>
                <span style={{ fontSize: 24 }}>{selectedMethod.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedMethod.label}</div>
                  <div style={{ fontSize: 12, color: "#71717a" }}>{selectedMethod.desc}</div>
                </div>
              </div>
            ) : (
              <div style={{
                background: "#f4f4f5", borderRadius: 12, padding: "14px",
                textAlign: "center", color: "#a1a1aa", fontSize: 13, marginBottom: 16
              }}>
                Pilih metode pembayaran
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#71717a" }}>
                <span>Subtotal</span><span>{formatRp(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#71717a" }}>
                <span>Biaya admin</span><span>{formatRp(adminFee)}</span>
              </div>
              <div style={{ height: 1, background: "#f0f0f0", margin: "4px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 17 }}>
                <span>Total</span>
                <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22 }}>{formatRp(total)}</span>
              </div>
            </div>

            {/* Agreement */}
            <label style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              cursor: "pointer", marginBottom: 18, fontSize: 12, color: "#71717a", lineHeight: 1.5
            }}>
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                style={{ marginTop: 2, width: 15, height: 15, cursor: "pointer", accentColor: "#18181b" }}
              />
              Saya menyetujui <span style={{ color: "#18181b", fontWeight: 500 }}>Syarat & Ketentuan</span> dan <span style={{ color: "#18181b", fontWeight: 500 }}>Kebijakan Privasi</span> tukang media.
            </label>

            <button
              className="pay-btn"
              disabled={!selected || !agree}
              onClick={handlePay}
              style={{
                background: selected && agree ? "#18181b" : "#e4e4e7",
                color: selected && agree ? "white" : "#a1a1aa",
              }}
            >
              {selected && agree ? `Bayar ${formatRp(total)}` : "Pilih pembayaran dulu"}
            </button>
          </div>

          {/* Security badges */}
          <div style={{
            background: "white", border: "1.5px solid #f0f0f0",
            borderRadius: 14, padding: "14px 18px",
            display: "flex", flexDirection: "column", gap: 8
          }}>
            {[
              { icon: "🔒", text: "Transaksi dienkripsi SSL 256-bit" },
              { icon: "✅", text: "Pembayaran aman & terverifikasi" },
              { icon: "↩️", text: "Garansi uang kembali 3 hari" },
            ].map(b => (
              <div key={b.text} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: "#71717a" }}>
                <span style={{ fontSize: 16 }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal === "qris" && <QrisModal onClose={() => setModal(null)} />}
      {modal === "va" && selectedMethod && <VAModal method={selectedMethod} onClose={() => setModal(null)} />}
    </div>
  );
}
