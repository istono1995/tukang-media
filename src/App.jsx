import React, { useState, useEffect, useRef } from "react";
import { supabase } from './supabase';

// ============================================================
// PLATFORM ICONS
// ============================================================
const PlatformIcon = ({ id, size = 18 }) => {
  const s = { width: size, height: size, display: "inline-block", flexShrink: 0 };
  if (id === "youtube") return <svg style={s} viewBox="0 0 24 24" fill="#FF0000"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z"/><polygon fill="#fff" points="9.75,15.02 15.5,12 9.75,8.98"/></svg>;
  if (id === "instagram") return <svg style={s} viewBox="0 0 24 24"><defs><radialGradient id="ig" cx="30%" cy="107%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
  if (id === "tiktok") return <svg style={s} viewBox="0 0 24 24" fill="#000"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>;
  if (id === "facebook") return <svg style={s} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  if (id === "shopee") return <svg style={s} viewBox="0 0 24 24"><path fill="#EE4D2D" d="M12 1a5 5 0 0 0-5 5H5a2 2 0 0 0-2 2l-1 12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2L21 8a2 2 0 0 0-2-2h-2a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3zm-1 8a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0v-4z"/></svg>;
  if (id === "twitter") return <svg style={s} viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
  if (id === "threads") return <svg style={s} viewBox="0 0 192 192" fill="#000"><path d="M141.537 88.988a66 66 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 6.987 4.678 15.994 6.95 25.393 6.435 12.374-.688 22.058-5.394 28.774-13.99 5.1-6.549 8.317-15.017 9.697-25.67 5.818 3.512 10.126 8.131 12.552 13.683 4.366 9.953 4.631 26.308-9.003 39.367-11.977 11.432-26.389 16.376-48.177 16.537-24.142-.179-42.496-7.917-54.558-23-11.366-14.187-17.222-34.645-17.412-60.812.19-26.167 6.046-46.625 17.412-60.812 12.062-15.083 30.416-22.82 54.558-23 24.293.18 42.935 7.953 55.437 23.11 6.134 7.4 10.76 16.638 13.765 27.375l16.112-4.283c-3.612-13.194-9.392-24.55-17.286-33.878C128.553 10.585 105.621.5 79.02.5h-.125C52.302.5 29.664 10.545 14.628 29.978 1.056 47.6-5.928 72.514-6.148 96.5c.22 23.986 7.204 48.9 20.776 66.522C29.664 182.455 52.302 192.5 79.02 192.5h.125c23.365-.16 39.647-6.288 53.382-19.44 17.994-17.181 17.406-38.713 11.505-51.925-4.21-9.598-12.222-17.44-23.496-22.147zm-41.69 39.249c-10.463.588-21.297-4.108-21.83-14.18-.397-7.439 5.276-15.733 22.462-16.734 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.37 1.765-1.978 24.645-13.754 28.733-23.793 29.318z"/></svg>;
  if (id === "telegram") return <svg style={s} viewBox="0 0 24 24" fill="#2AABEE"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
  if (id === "whatsapp") return <svg style={s} viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
  return <span style={{ fontSize: size * 0.8 }}>🌐</span>;
};

const platforms = [
  { id: "youtube",   label: "YouTube",   color: "#FF0000", bg: "#fff1f1", border: "#fecaca" },
  { id: "instagram", label: "Instagram", color: "#E1306C", bg: "#fdf2f8", border: "#f9a8d4" },
  { id: "tiktok",    label: "TikTok",    color: "#010101", bg: "#f4f4f5", border: "#d4d4d8" },
  { id: "facebook",  label: "Facebook",  color: "#1877F2", bg: "#eff6ff", border: "#bfdbfe" },
  { id: "shopee",    label: "Shopee",    color: "#EE4D2D", bg: "#fff7ed", border: "#fed7aa" },
  { id: "twitter",   label: "Twitter/X", color: "#000000", bg: "#f4f4f5", border: "#d4d4d8" },
  { id: "threads",   label: "Threads",   color: "#000000", bg: "#f4f4f5", border: "#d4d4d8" },
  { id: "telegram",  label: "Telegram",  color: "#2AABEE", bg: "#eff9ff", border: "#bae6fd" },
  { id: "whatsapp",  label: "WhatsApp",  color: "#25D366", bg: "#f0fdf4", border: "#bbf7d0" },
];

const tagColors = { Terlaris:"#18181b", Baru:"#2563eb", Populer:"#7c3aed", Diskon:"#dc2626", Premium:"#b45309" };
const formatRp = (n) => "Rp " + parseInt(n||0).toLocaleString("id-ID");
const StarRow = ({ rating }) => {
  const r = rating||0, full = Math.floor(r), half = r%1>=0.5;
  return <span style={{color:"#f59e0b",fontSize:13,letterSpacing:-1}}>{"★".repeat(full)}{half?"½":""}{"☆".repeat(5-full-(half?1:0))}</span>;
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}body{background:#fafafa;font-family:'DM Sans',sans-serif;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeInUp{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.nav-link{text-decoration:none;color:#71717a;font-size:14px;font-weight:500;transition:color 0.2s;cursor:pointer;background:none;border:none;font-family:inherit;padding:0;}
.nav-link:hover{color:#18181b;}
.platform-tab{display:flex;align-items:center;gap:7px;border:1.5px solid #e4e4e7;background:white;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.18s;color:#52525b;font-family:inherit;white-space:nowrap;}
.platform-tab:hover{border-color:#a1a1aa;}.platform-tab.active{color:white;border-color:transparent;}
.pscroll{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:20px;}.pscroll::-webkit-scrollbar{display:none;}
.sinput{border:1.5px solid #e4e4e7;border-radius:10px;padding:10px 16px 10px 40px;font-size:14px;background:white;outline:none;width:260px;font-family:inherit;}
.sinput:focus{border-color:#18181b;}
.sselect{border:1.5px solid #e4e4e7;border-radius:9px;padding:8px 12px;font-size:13px;background:white;outline:none;font-family:inherit;color:#18181b;cursor:pointer;}
.card{background:white;border-radius:16px;border:1.5px solid #f0f0f0;overflow:hidden;transition:transform 0.22s cubic-bezier(.22,1,.36,1),box-shadow 0.22s;cursor:pointer;display:flex;flex-direction:column;}
.card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.08);}
.cthumb{height:160px;display:flex;align-items:center;justify-content:center;position:relative;}
.wbtn{position:absolute;top:10px;right:10px;width:30px;height:30px;border-radius:50%;background:white;border:1.5px solid #e4e4e7;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;}
.wbtn.active{background:#fff1f2;border-color:#f43f5e;}
.tbadge{position:absolute;top:10px;left:10px;border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700;color:white;}
.ppip{position:absolute;bottom:10px;left:10px;border-radius:7px;padding:3px 9px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:4px;}
.cbody{padding:16px;flex:1;display:flex;flex-direction:column;gap:5px;}
.prow{display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:11px;border-top:1px solid #f4f4f5;}
.ptxt{font-family:'DM Serif Display',serif;font-size:17px;color:#18181b;}
.cbtn{background:#18181b;color:white;border:none;border-radius:8px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;}
.cbtn:hover{background:#3f3f46;}.cbtn.added{background:#166534;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px;}
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#18181b;color:white;padding:11px 22px;border-radius:100px;font-size:13px;font-weight:500;z-index:999;animation:fadeInUp 0.3s ease;white-space:nowrap;}
.ainput{width:100%;border:1.5px solid #e4e4e7;border-radius:11px;padding:12px 14px;font-size:14px;background:white;outline:none;font-family:inherit;}
.ainput:focus{border-color:#18181b;}
.abtn{width:100%;padding:13px;border-radius:11px;border:none;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px;}
.abtn:disabled{opacity:0.6;cursor:not-allowed;}
.tbtn{flex:1;padding:10px;border-radius:9px;border:none;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
.dtab{padding:10px 20px;border:none;background:none;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;color:#71717a;border-bottom:2px solid transparent;}
.dtab.active{color:#18181b;border-bottom-color:#18181b;}
.dinput{width:100%;border:1.5px solid #e4e4e7;border-radius:10px;padding:10px 14px;font-size:13px;background:white;outline:none;font-family:inherit;}
.dinput:focus{border-color:#18181b;}
.pitem{display:flex;align-items:center;gap:14px;padding:14px 18px;background:white;border:1.5px solid #f0f0f0;border-radius:12px;margin-bottom:10px;}
.pitem:hover{border-color:#d4d4d8;}
.uitem{display:flex;align-items:center;gap:14px;padding:14px 18px;background:white;border:1.5px solid #f0f0f0;border-radius:12px;margin-bottom:10px;}
.oitem{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:white;border:1.5px solid #f0f0f0;border-radius:12px;margin-bottom:10px;}
.badge-owner{background:#fef3c7;color:#b45309;border:1px solid #fde68a;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;}
.badge-admin{background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;}
.badge-buyer{background:#f4f4f5;color:#71717a;border:1px solid #e4e4e7;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;}
@media(max-width:600px){.grid{grid-template-columns:1fr 1fr;gap:12px;}.sinput{width:100%;}}
@media(max-width:420px){.grid{grid-template-columns:1fr;}}
@media(max-width:600px){
  .dtab{padding:8px 12px;font-size:12px;}
  .pitem{flex-wrap:wrap;}
  .oitem{flex-direction:column;gap:8px;}
  .stat-card{padding:12px 14px;}
}
html{-webkit-text-size-adjust:100%;}
`;

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ user, role, onLogin, onDashboard, cart, setCart, siteSettings }) {
  const ss = siteSettings || {site_name:"tukangmedia",primary_color:"#2563eb",logo_url:""};
  return (
    <nav style={{background:"white",borderBottom:"1.5px solid #f0f0f0",padding:"0 28px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:28}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,letterSpacing:-0.5}}>
              {ss.logo_url ? <img src={ss.logo_url} alt={ss.site_name} style={{height:36,objectFit:"contain"}} /> : <>tukang<span style={{color:ss.primary_color||"#2563eb"}}>media</span></>}
            </div>
        <div style={{display:"flex",gap:18}}>
          {ss.navbar_tagline && <span style={{fontFamily:"'DM Serif Display',serif",fontSize:13,color:"#a1a1aa",fontStyle:"italic",letterSpacing:0.2}}>{ss.navbar_tagline}</span>}


        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        {!(role==="owner"||role==="admin") && <CartCheckout cart={cart||[]} setCart={setCart||(()=>{})} user={user} onLogin={onLogin} onDashboard={onDashboard} onOrderDone={onDashboard} />}
        {user ? (
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {(role==="owner"||role==="admin") && (
              <span className={role==="owner"?"badge-owner":"badge-admin"}>
                {role==="owner"?"👑 OWNER":"🛡️ ADMIN"}
              </span>
            )}
            <span style={{fontSize:12,color:"#71717a"}}>{user.email?.split("@")[0]}</span>
            {(role==="owner"||role==="admin") && (
              <button onClick={onDashboard} style={{background:"#2563eb",color:"white",border:"none",borderRadius:9,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {role==="owner"?"Control Panel":"Dashboard"}
              </button>
            )}
            {role==="buyer" && (
              <button onClick={onDashboard} style={{background:"none",border:"1.5px solid #e4e4e7",borderRadius:9,padding:"7px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Pesanan</button>
            )}
            <button onClick={() => supabase.auth.signOut()} style={{background:"none",border:"1.5px solid #e4e4e7",borderRadius:9,padding:"7px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Keluar</button>
          </div>
        ) : (
          <button onClick={onLogin} style={{background:"#18181b",color:"white",border:"none",borderRadius:9,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Masuk</button>
        )}
      </div>
    </nav>
  );
}


// ============================================================
// CART SIDEBAR + CHECKOUT
// ============================================================
function CartCheckout({ cart, setCart, user, onLogin, onOrderDone, onDashboard }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("cart"); // cart | checkout | success
  const [payMethods, setPayMethods] = useState([]);
  const [selectedPay, setSelectedPay] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [orderIds, setOrderIds] = useState([]);
  const [lastOrderCode, setLastOrderCode] = useState("");
  const [lastOrderTotal, setLastOrderTotal] = useState(0);
  const [buyerLink, setBuyerLink] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);

  const PAYMENT_TYPES_MAP = {
    bca:"🏦", bni:"🏛️", bri:"🏢", mandiri:"🏦", bsi:"🕌",
    qris:"⬛", dana:"💙", ovo:"💜", gopay:"💚", shopeepay:"🧡", linkaja:"❤️"
  };

  useEffect(() => {
    if (open && step==="checkout") {
      supabase.from("payment_settings").select("*").then(({data}) => setPayMethods(data||[]));
      if (user) getWallet(user.email).then(w => setWalletBalance(w?.balance||0));
    }
  }, [open, step]);

  const total = cart.reduce((s, p) => s + (p.price * (p.qty||1)), 0);
  const cartCount = cart.reduce((s,p) => s+(p.qty||1), 0);

  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id);
    setCart(c => c.map(p => p.id===id ? {...p, qty} : p));
  };
  const removeItem = (id) => setCart(c => c.filter(p => p.id!==id));

  const placeOrder = async () => {
    if (!user) return onLogin();
    if (!useWallet && !selectedPay) return alert("Pilih metode pembayaran dulu!");
    if (useWallet && walletBalance < total) return alert("Saldo wallet tidak cukup! Saldo: "+formatRp(walletBalance)+", Total: "+formatRp(total));
    setPlacing(true);
    const pm = useWallet ? null : payMethods.find(p => p.id===selectedPay);
    const payInfo = useWallet ? "💰 Wallet" : (pm ? (pm.account_number ? `${pm.bank_name} - ${pm.account_number} a/n ${pm.holder_name}` : pm.bank_name) : "");
    // Generate unique order code: TM + date + random 4 digits
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `TM-${dateStr}-${rand}`;
    const groupId = `${user.email}-${Date.now()}`;
    const totalAmount = cart.reduce((s,p) => s + p.price*(p.qty||1), 0);
    // Add unique 3-digit suffix for payment tracking (e.g. Rp 834.000 -> Rp 834.253)
    const uniqueSuffix = useWallet ? 0 : Math.floor(100 + Math.random() * 900);
    const uniqueAmount = totalAmount + uniqueSuffix;
    const inserts = cart.map((p, idx) => ({
      product_id: p.id,
      product_name: p.name,
      price: p.price * (p.qty||1),
      quantity: p.qty||1,
      user_email: user.email,
      payment_method: payInfo,
      status: useWallet ? "paid" : "pending",
      download_url: p.download_url || "",
      order_code: orderCode,
      order_group_id: groupId,
      notes: idx === 0 ? (useWallet ? `wallet_payment:${totalAmount}` : `unique_amount:${uniqueAmount}`) : "",
      buyer_link: buyerLink || "",
    }));
    const { data, error } = await supabase.from("orders").insert(inserts).select();
    if (error) { setPlacing(false); return alert("Gagal: " + error.message); }
    // Deduct wallet if used
    if (useWallet) {
      await deductWalletBalance(user.email, totalAmount, "Pembayaran pesanan "+orderCode, orderCode);
    }
    setPlacing(false);
    setOrderIds(data?.map(o=>o.id)||[]);
    setLastOrderCode(orderCode);
    setLastOrderTotal(useWallet ? totalAmount : uniqueAmount);
    setCart([]);
    localStorage.removeItem("tm_cart");
    setStep("success");
    if (onOrderDone) onOrderDone();
  };



  return (
    <>
      {/* CART BUTTON */}
      <button onClick={() => { if (!user) return onLogin(); setOpen(true); setStep("cart"); }}
        style={{position:"relative",background:"none",border:"1.5px solid #e4e4e7",borderRadius:9,padding:"7px 13px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:"#18181b"}}>
        🛒
        {cart.length > 0 && <span style={{position:"absolute",top:-6,right:-6,background:"#2563eb",color:"white",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{cart.reduce((s,p)=>s+(p.qty||1),0)}</span>}
      </button>

      {/* OVERLAY */}
      {open && (
        <div style={{position:"fixed",inset:0,zIndex:200}} onClick={()=>setOpen(false)}>
          {/* BACKDROP */}
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(2px)"}} />

          {/* SIDEBAR */}
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:"min(420px,100vw)",background:"white",boxShadow:"-8px 0 32px rgba(0,0,0,0.12)",display:"flex",flexDirection:"column",animation:"slideIn 0.25s ease"}}
            onClick={e=>e.stopPropagation()}>

            {/* HEADER */}
            <div style={{padding:"20px 24px 16px",borderBottom:"1.5px solid #f0f0f0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20}}>
                {step==="cart"?"🛒 Keranjang":step==="checkout"?"💳 Pembayaran":"✅ Pesanan Berhasil"}
              </div>
              <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#71717a"}}>✕</button>
            </div>

            {/* CONTENT */}
            <div style={{flex:1,overflowY:"auto",padding:24}}>

              {/* STEP: CART */}
              {step==="cart" && (
                cart.length===0 ? (
                  <div style={{textAlign:"center",padding:"60px 0",color:"#a1a1aa"}}>
                    <div style={{fontSize:48,marginBottom:12}}>🛒</div>
                    <div style={{fontWeight:600,fontSize:15}}>Keranjang kosong</div>
                    <div style={{fontSize:13,marginTop:4}}>Tambahkan produk dari marketplace</div>
                    <button onClick={()=>setOpen(false)} style={{marginTop:20,background:"#18181b",color:"white",border:"none",borderRadius:10,padding:"11px 24px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Belanja Sekarang</button>
                  </div>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {cart.map(p => {
                      const plat = platforms.find(x=>x.id===p.platform)||platforms[0];
                      return (
                        <div key={p.id} style={{display:"flex",gap:12,background:"#fafafa",borderRadius:12,padding:14,border:"1.5px solid #f0f0f0"}}>
                          <div style={{width:48,height:48,borderRadius:10,background:plat.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            <PlatformIcon id={plat.id} size={24} />
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontWeight:600,fontSize:13,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
                            <div style={{fontSize:12,color:"#71717a"}}>{formatRp(p.price)} / pcs</div>
                            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                              <button onClick={()=>updateQty(p.id,(p.qty||1)-1)} style={{width:26,height:26,borderRadius:6,border:"1.5px solid #e4e4e7",background:"white",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                              <span style={{fontWeight:600,fontSize:13,minWidth:20,textAlign:"center"}}>{p.qty||1}</span>
                              <button onClick={()=>updateQty(p.id,(p.qty||1)+1)} style={{width:26,height:26,borderRadius:6,border:"1.5px solid #e4e4e7",background:"white",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                              <span style={{fontSize:13,fontWeight:700,color:"#18181b",marginLeft:4}}>{formatRp(p.price*(p.qty||1))}</span>
                            </div>
                          </div>
                          <button onClick={()=>removeItem(p.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#a1a1aa",fontSize:16,alignSelf:"flex-start"}}>✕</button>
                        </div>
                      );
                    })}
                  </div>
                )
              )}

              {/* STEP: CHECKOUT */}
              {step==="checkout" && (
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  {/* Order summary */}
                  <div style={{background:"#f8fafc",borderRadius:12,padding:16}}>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:10,color:"#52525b"}}>RINGKASAN PESANAN</div>
                    {cart.map(p => (
                      <div key={p.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}>
                        <span style={{color:"#52525b"}}>{p.name} x{p.qty||1}</span>
                        <span style={{fontWeight:600}}>{formatRp(p.price*(p.qty||1))}</span>
                      </div>
                    ))}
                    <div style={{borderTop:"1px solid #e4e4e7",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:15}}>
                      <span>Total</span>
                      <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18}}>{formatRp(total)}</span>
                    </div>
                  </div>

                  {/* WALLET OPTION */}
                  {walletBalance > 0 && (
                    <div onClick={()=>{setUseWallet(w=>!w);setSelectedPay(null);}}
                      style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,border:"2px solid "+(useWallet?"#18181b":"#e4e4e7"),background:useWallet?"#f8fafc":"white",cursor:"pointer",transition:"all 0.15s"}}>
                      <div style={{width:36,height:36,borderRadius:9,background:"#18181b",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>💰</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:13}}>Bayar dengan Saldo Wallet</div>
                        <div style={{fontSize:12,color:walletBalance>=total?"#16a34a":"#dc2626",fontWeight:600}}>
                          Saldo: {formatRp(walletBalance)} {walletBalance>=total?"✓ Cukup":"✗ Kurang"}
                        </div>
                      </div>
                      <div style={{width:18,height:18,borderRadius:"50%",border:"2px solid "+(useWallet?"#18181b":"#d4d4d8"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {useWallet && <div style={{width:8,height:8,borderRadius:"50%",background:"#18181b"}} />}
                      </div>
                    </div>
                  )}

                  {/* Payment methods */}
                  {!useWallet && <div>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:10,color:"#52525b"}}>PILIH METODE PEMBAYARAN</div>
                    {payMethods.length===0 ? (
                      <div style={{textAlign:"center",padding:20,color:"#a1a1aa",fontSize:13,background:"#f8fafc",borderRadius:10}}>Belum ada metode pembayaran tersedia</div>
                    ) : (
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {payMethods.map(pm => {
                          const icon = PAYMENT_TYPES_MAP[pm.method_name]||"💳";
                          const isSelected = selectedPay===pm.id;
                          return (
                            <div key={pm.id} onClick={()=>setSelectedPay(pm.id)}
                              style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,border:"2px solid "+(isSelected?"#18181b":"#e4e4e7"),background:isSelected?"#fafafa":"white",cursor:"pointer",transition:"all 0.15s"}}>
                              <div style={{width:36,height:36,borderRadius:9,background:"#f4f4f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:600,fontSize:13}}>{pm.bank_name}</div>
                                {pm.account_number && <div style={{fontSize:12,color:"#71717a",fontFamily:"monospace"}}>{pm.account_number} · {pm.holder_name}</div>}
                                {pm.method_name==="qris" && <div style={{fontSize:12,color:"#71717a"}}>Scan QR Code</div>}
                              </div>
                              <div style={{width:18,height:18,borderRadius:"50%",border:"2px solid "+(isSelected?"#18181b":"#d4d4d8"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                                {isSelected && <div style={{width:8,height:8,borderRadius:"50%",background:"#18181b"}} />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>}

                  {/* QRIS preview */}
                  {!useWallet && selectedPay && payMethods.find(p=>p.id===selectedPay)?.method_name==="qris" && payMethods.find(p=>p.id===selectedPay)?.qris_url && (
                    <div style={{textAlign:"center",background:"#f8fafc",borderRadius:12,padding:16}}>
                      <div style={{fontSize:12,fontWeight:600,color:"#52525b",marginBottom:8}}>Scan QRIS ini untuk bayar</div>
                      <img src={payMethods.find(p=>p.id===selectedPay).qris_url} alt="QRIS" style={{maxWidth:200,borderRadius:8}} />
                    </div>
                  )}

                  {/* Link/Target input */}
                  <div style={{background:"#f0f9ff",border:"1.5px solid #bae6fd",borderRadius:12,padding:14}}>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:4,color:"#0369a1"}}>📎 Link / Target Kamu (wajib isi)</div>
                    <div style={{fontSize:12,color:"#0369a1",marginBottom:8}}>Masukkan link akun/konten yang mau ditingkatkan. Contoh: link YouTube, TikTok, Instagram, Shopee, dll.</div>
                    <textarea value={buyerLink} onChange={e=>setBuyerLink(e.target.value)}
                      placeholder={"Contoh:\nhttps://www.youtube.com/@channelkamu\nhttps://www.tiktok.com/@usernamekamu\natau tulis kebutuhan spesifik kamu di sini"}
                      style={{width:"100%",border:"1.5px solid #bae6fd",borderRadius:9,padding:"10px 12px",fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",minHeight:70,background:"white"}} />
                  </div>

                  <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#b45309"}}>
                    ⚠️ Setelah klik "Konfirmasi Pesanan", transfer pembayaran ke metode yang dipilih. Admin akan verifikasi dan silahkan tunggu prosesnya, sabar ya 🙂
                  </div>
                </div>
              )}

              {/* STEP: SUCCESS */}
              {step==="success" && (
                <div style={{padding:"20px 0"}}>
                  <div style={{textAlign:"center",marginBottom:20}}>
                    <div style={{fontSize:56,marginBottom:12}}>🎉</div>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,marginBottom:6}}>Pesanan Berhasil!</div>
                    <div style={{fontSize:13,color:"#71717a"}}>Pesanan kamu sudah tercatat</div>
                  </div>
                  {/* Order Code Box */}
                  <div style={{background:"#f0fdf4",border:"2px solid #16a34a",borderRadius:14,padding:"16px 20px",marginBottom:16,textAlign:"center"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#16a34a",letterSpacing:1.5,marginBottom:6}}>KODE PESANAN KAMU</div>
                    <div style={{fontFamily:"monospace",fontSize:26,fontWeight:700,color:"#18181b",letterSpacing:2}}>{lastOrderCode}</div>
                    <div style={{fontSize:11,color:"#71717a",marginTop:6}}>Screenshot kode ini sebagai bukti pemesanan</div>
                  </div>
                  {/* Total */}
                  <div style={{background:"#f8fafc",borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:13,color:"#52525b",fontWeight:600}}>Total Pembayaran</span>
                    <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18,fontWeight:400}}>{formatRp(lastOrderTotal)}</span>
                  </div>
                  {/* Instructions */}
                  <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"12px 14px",marginBottom:20,fontSize:12,color:"#92400e",lineHeight:1.7}}>
                    <div style={{fontWeight:700,marginBottom:4}}>📋 Langkah selanjutnya:</div>
                    <div>1. Lakukan transfer sesuai metode yang dipilih</div>
                    <div>2. Screenshot bukti transfer</div>
                    <div>3. Kirim ke admin beserta <strong>kode pesanan {lastOrderCode}</strong></div>
                    <div>4. Admin akan verifikasi dan kirim link download</div>
                  </div>
                  <button onClick={()=>{setOpen(false);setStep("cart");if(onOrderDone)onOrderDone();}} style={{width:"100%",background:"#18181b",color:"white",border:"none",borderRadius:10,padding:"12px 28px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                    Tutup & Lihat Pesanan Saya →
                  </button>
                </div>
              )}
            </div>

            {/* FOOTER */}
            {step!=="success" && cart.length>0 && (
              <div style={{padding:"16px 24px",borderTop:"1.5px solid #f0f0f0",background:"white"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <span style={{fontSize:13,color:"#71717a"}}>{cartCount} produk</span>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:20,fontWeight:400}}>{formatRp(total)}</span>
                </div>
                {step==="cart" ? (
                  <button onClick={()=>setStep("checkout")} style={{width:"100%",background:"#18181b",color:"white",border:"none",borderRadius:11,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                    Lanjut ke Pembayaran →
                  </button>
                ) : (
                  <div style={{display:"flex",gap:10}}>
                    <button onClick={()=>setStep("cart")} style={{flex:1,background:"none",border:"1.5px solid #e4e4e7",borderRadius:11,padding:"13px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>← Kembali</button>
                    {(() => {
                      const canProceed = useWallet ? walletBalance>=total : !!selectedPay;
                      return (
                        <button onClick={placeOrder} disabled={placing||!canProceed}
                          style={{flex:2,background:canProceed?"#18181b":"#e4e4e7",color:canProceed?"white":"#a1a1aa",border:"none",borderRadius:11,padding:"13px",fontSize:14,fontWeight:700,cursor:canProceed?"pointer":"not-allowed",fontFamily:"inherit",opacity:placing?0.7:1}}>
                          {placing?"Memproses...":useWallet?"💰 Bayar dengan Wallet":"✅ Konfirmasi Pesanan"}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html:"@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}"}} />
    </>
  );
}

// ============================================================
// MARKETPLACE
// ============================================================
function MarketplaceListing({ user, role, onLogin, onDashboard }) {
  const [activePlatform, setActivePlatform] = useState("all");
  const [sortBy, setSortBy] = useState("terbaru");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState(() => {
    try { const saved = localStorage.getItem("tm_cart"); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });

  // Sync cart ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("tm_cart", JSON.stringify(cart));
  }, [cart]);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState({
    site_name:"tukangmedia", tagline:"", logo_url:"",
    hero_title:"Tools & template kreator", hero_subtitle:"semua platform, satu tempat.",
    primary_color:"#2563eb", whatsapp:"", telegram:"",
  });

  useEffect(() => {
    Promise.all([
      supabase.from("products").select("*").order("created_at",{ascending:false}),
      supabase.from("site_settings").select("*").maybeSingle(),
    ]).then(([{data:p},{data:s}]) => {
      setProducts(p||[]);
      if (s) setSiteSettings(s);
      setLoading(false);
    });
  }, []);

  const addToCart = (p) => {
    if (!cart.find(c => c.id===p.id)) {
      setCart(c => [...c, {...p, qty:1}]);
      setToast('"'+p.name+'" ditambahkan ke keranjang');
      setTimeout(() => setToast(null), 2500);
    }
  };

  const currentPlat = platforms.find(p => p.id===activePlatform);
  const filtered = products
    .filter(p => activePlatform==="all" || p.platform===activePlatform)
    .filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sortBy==="harga-asc"?a.price-b.price:sortBy==="harga-desc"?b.price-a.price:sortBy==="rating"?(b.rating||0)-(a.rating||0):new Date(b.created_at)-new Date(a.created_at));

  const ss = siteSettings;
  const getTestimoni = () => { try { return JSON.parse(ss.testimoni||"[]"); } catch { return []; } };
  const getFaq = () => { try { return JSON.parse(ss.faq||"[]"); } catch { return []; } };

  return (
    <div style={{minHeight:"100vh",background:"#fafafa"}}>
      <style>{STYLES}</style>
      {/* ANNOUNCEMENT BAR */}
      {ss.announcement_active && ss.announcement && (
        <div style={{background:ss.announcement_color||"#2563eb",color:"white",textAlign:"center",padding:"9px 20px",fontSize:13,fontWeight:500}}>
          {ss.announcement}
        </div>
      )}
      <Navbar user={user} role={role} onLogin={onLogin} onDashboard={onDashboard} cart={cart} setCart={setCart} siteSettings={siteSettings} />

      <div style={{maxWidth:1160,margin:"0 auto",padding:"28px 20px 60px"}}>
        <div style={{marginBottom:24}}>
          <p style={{fontSize:11.5,fontWeight:700,letterSpacing:1.5,color:ss.primary_color||"#2563eb",textTransform:"uppercase",marginBottom:5}}>{ss.hero_badge||"Marketplace Digital"}</p>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:34,fontWeight:400,lineHeight:1.15,letterSpacing:-0.8}}>
            {ss.hero_title}<br /><em style={{color:"#71717a"}}>{ss.hero_subtitle}</em>
          </h1>
        </div>

        <div className="pscroll">
          <button className={"platform-tab"+(activePlatform==="all"?" active":"")} style={activePlatform==="all"?{background:"#18181b"}:{}} onClick={() => setActivePlatform("all")}>🌐 Semua Platform</button>
          {platforms.map(p => (
            <button key={p.id} className={"platform-tab"+(activePlatform===p.id?" active":"")} style={activePlatform===p.id?{background:p.color}:{}} onClick={() => setActivePlatform(p.id)}>
              <PlatformIcon id={p.id} size={16} />{p.label}
            </button>
          ))}
        </div>

        {ss.show_stats!==false && (
        <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap"}}>
          {[{l:"Produk",v:ss.stats_produk||products.length+"+"},{l:"Platform",v:ss.stats_platform||"9"},{l:"Transaksi",v:ss.stats_transaksi||"100+"}].map(s => (
            <div key={s.l} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:"16px 22px",display:"flex",flexDirection:"column",gap:2}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22}}>{s.v}</div>
              <div style={{fontSize:12,color:"#71717a",fontWeight:500}}>{s.l}</div>
            </div>
          ))}
        </div>
        )}

        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:18,gap:10,flexWrap:"wrap"}}>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:"#a1a1aa"}}>🔍</span>
            <input className="sinput" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="sselect" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="terbaru">Terbaru</option>
            <option value="rating">Rating tertinggi</option>
            <option value="harga-asc">Harga: terendah</option>
            <option value="harga-desc">Harga: tertinggi</option>
          </select>
        </div>

        <p style={{fontSize:12.5,color:"#a1a1aa",marginBottom:16}}>
          Menampilkan <strong style={{color:"#18181b"}}>{filtered.length}</strong> produk
          {activePlatform!=="all" && currentPlat && (
            <span style={{marginLeft:8,background:currentPlat.bg,color:currentPlat.color,border:"1px solid "+currentPlat.border,borderRadius:6,padding:"2px 9px",fontSize:11.5,fontWeight:600,display:"inline-flex",alignItems:"center",gap:4}}>
              <PlatformIcon id={currentPlat.id} size={12} /> {currentPlat.label}
            </span>
          )}
        </p>

        {loading ? <div style={{textAlign:"center",padding:60,color:"#a1a1aa"}}>Memuat produk...</div> : (
          <div className="grid">
            {filtered.map(p => {
              const plat = platforms.find(x => x.id===p.platform)||platforms[0];
              const inCart = cart.find(c => c.id===p.id);
              return (
                <div key={p.id} className="card">
                  <div className="cthumb" style={{background:"linear-gradient(135deg,"+plat.bg+",#e4e4e7)"}}>
                    <div style={{fontSize:52}}><PlatformIcon id={plat.id} size={60} /></div>
                    {p.tag && <span className="tbadge" style={{background:tagColors[p.tag]||"#18181b"}}>{p.tag}</span>}
                    <div className="ppip" style={{background:plat.bg,color:plat.color,border:"1px solid "+plat.border}}>
                      <PlatformIcon id={p.platform} size={13} />
                      <span style={{fontSize:10.5,fontWeight:700}}>{plat.label}</span>
                    </div>
                    <button className={"wbtn"+(wishlist.includes(p.id)?" active":"")} onClick={e=>{e.stopPropagation();setWishlist(w=>w.includes(p.id)?w.filter(x=>x!==p.id):[...w,p.id]);}}>
                      {wishlist.includes(p.id)?"❤️":"🤍"}
                    </button>
                  </div>
                  <div className="cbody">
                    <div style={{fontSize:14,fontWeight:600,lineHeight:1.35}}>{p.name}</div>
                    <div style={{fontSize:12,color:"#71717a",lineHeight:1.5,flex:1}}>{p.description}</div>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginTop:5}}>
                      <StarRow rating={p.rating} />
                      <span style={{fontSize:11.5,color:"#a1a1aa"}}>{p.rating}</span>
                      <span style={{fontSize:11.5,color:"#a1a1aa",marginLeft:"auto"}}>⬇ {p.downloads}</span>
                    </div>
                    <div style={{fontSize:11.5,color:"#a1a1aa",marginTop:4}}>oleh <span style={{color:"#52525b",fontWeight:500}}>{p.seller}</span></div>
                    <div className="prow">
                      <span className="ptxt">{formatRp(p.price)}</span>
                      {!(role==="owner"||role==="admin") && (
                        <button className={"cbtn"+(inCart?" added":"")} onClick={() => user ? addToCart(p) : onLogin()}>
                          {inCart?"✓ Di Keranjang":"+ Keranjang"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!loading && filtered.length===0 && (
          <div style={{textAlign:"center",padding:"60px 0",color:"#a1a1aa"}}>
            <div style={{fontSize:40,marginBottom:12}}>🔍</div>
            <div style={{fontSize:15,fontWeight:500}}>Produk tidak ditemukan</div>
          </div>
        )}
      </div>
      {toast && <div className="toast">{toast}</div>}

      {/* TESTIMONI */}
      {ss.show_testimoni!==false && getTestimoni().length>0 && (
        <div style={{maxWidth:1160,margin:"0 auto",padding:"0 20px 40px"}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:1.5,color:ss.primary_color||"#2563eb",textTransform:"uppercase",marginBottom:4}}>Apa Kata Mereka</p>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24}}>Testimoni Pelanggan</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
            {getTestimoni().map((t,i) => (
              <div key={i} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:16,padding:20}}>
                <div style={{color:"#f59e0b",fontSize:16,marginBottom:8}}>{"★".repeat(t.bintang||5)}</div>
                <div style={{fontSize:13,color:"#52525b",lineHeight:1.6,marginBottom:12}}>"{t.teks}"</div>
                <div style={{fontWeight:700,fontSize:13}}>{t.nama}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {ss.show_faq!==false && getFaq().length>0 && (
        <div style={{maxWidth:720,margin:"0 auto",padding:"0 20px 40px"}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:1.5,color:ss.primary_color||"#2563eb",textTransform:"uppercase",marginBottom:4}}>Bantuan</p>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24}}>Pertanyaan Umum</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {getFaq().map((f,i) => (
              <details key={i} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:12,padding:"14px 18px",cursor:"pointer"}}>
                <summary style={{fontWeight:600,fontSize:14,listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  {f.q} <span style={{color:"#a1a1aa",flexShrink:0}}>＋</span>
                </summary>
                <div style={{fontSize:13,color:"#52525b",lineHeight:1.7,marginTop:10,paddingTop:10,borderTop:"1px solid #f4f4f5"}}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      {ss.footer_text && (
        <div style={{background:"#18181b",color:"#a1a1aa",textAlign:"center",padding:"16px 20px",fontSize:12}}>
          {ss.footer_text}
        </div>
      )}

      {/* FLOATING CONTACT BUTTONS */}
      {(ss.whatsapp || ss.telegram) && (
        <div style={{position:"fixed",bottom:24,right:24,display:"flex",flexDirection:"column",gap:10,zIndex:99}}>
          {ss.whatsapp && (
            <a href={"https://wa.me/"+ss.whatsapp} target="_blank" rel="noopener noreferrer"
              style={{width:50,height:50,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37,211,102,0.4)",textDecoration:"none",fontSize:24}}>
              💬
            </a>
          )}
          {ss.telegram && (
            <a href={"https://t.me/"+ss.telegram.replace("@","")} target="_blank" rel="noopener noreferrer"
              style={{width:50,height:50,borderRadius:"50%",background:"#2AABEE",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(42,171,238,0.4)",textDecoration:"none",fontSize:24}}>
              ✈️
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// AUTH PAGE
// ============================================================
function AuthPage({ onBack }) {
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({name:"",email:"",password:"",confirm:"",agree:false});
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    setLoading(true);
    try {
      if (mode==="register") {
        const {error} = await supabase.auth.signUp({email:form.email,password:form.password,options:{data:{full_name:form.name}}});
        if (error) throw error;
        // Auto-assign buyer role
        await supabase.from("user_roles").insert([{email:form.email,role:"buyer"}]);
        onBack();
      } else if (mode==="login") {
        const {error} = await supabase.auth.signInWithPassword({email:form.email,password:form.password});
        if (error) throw error;
        onBack();
      } else {
        const {error} = await supabase.auth.resetPasswordForEmail(form.email);
        if (error) throw error;
        setDone(true);
      }
    } catch(err) { alert("Error: "+err.message); }
    finally { setLoading(false); }
  };

  if (done) return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#fafafa",textAlign:"center",padding:24}}>
      <style>{STYLES}</style>
      <div style={{fontSize:64,marginBottom:16}}>📧</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,marginBottom:8}}>Email Terkirim!</div>
      <div style={{color:"#71717a",fontSize:14,marginBottom:28}}>Cek inbox untuk link reset password.</div>
      <button onClick={onBack} style={{background:"#18181b",color:"white",border:"none",borderRadius:12,padding:"13px 32px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>← Kembali</button>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#fafafa"}}>
      <style>{STYLES}</style>
      <nav style={{background:"white",borderBottom:"1.5px solid #f0f0f0",padding:"0 28px",height:58,display:"flex",alignItems:"center",gap:12,position:"sticky",top:0}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#52525b"}}>←</button>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18}}>tukang<span style={{color:"#2563eb"}}>media</span></div>
      </nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px",minHeight:"calc(100vh - 58px)"}}>
        <div style={{width:"100%",maxWidth:420,animation:"fadeUp 0.3s ease"}}>
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:20,padding:32,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,marginBottom:4}}>tukang<span style={{color:"#2563eb"}}>media</span></div>
              <div style={{fontSize:13,color:"#71717a"}}>{mode==="forgot"?"Reset password akun kamu":"Platform tools kreator digital Indonesia"}</div>
            </div>
            {mode!=="forgot" && (
              <div style={{display:"flex",gap:4,background:"#f4f4f5",borderRadius:11,padding:4,marginBottom:24}}>
                {["login","register"].map(m => (
                  <button key={m} className="tbtn" onClick={()=>setMode(m)} style={{background:mode===m?"white":"transparent",color:mode===m?"#18181b":"#71717a",boxShadow:mode===m?"0 1px 4px rgba(0,0,0,0.08)":"none"}}>
                    {m==="login"?"Masuk":"Daftar"}
                  </button>
                ))}
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {mode==="register" && (
                <div>
                  <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:6}}>Nama Lengkap</label>
                  <input className="ainput" placeholder="Nama kamu" value={form.name} onChange={e=>set("name",e.target.value)} />
                </div>
              )}
              <div>
                <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:6}}>Email</label>
                <input className="ainput" type="email" placeholder="email@kamu.com" value={form.email} onChange={e=>set("email",e.target.value)} />
              </div>
              {mode!=="forgot" && (
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <label style={{fontSize:13,fontWeight:600}}>Password</label>
                    {mode==="login" && <button onClick={()=>setMode("forgot")} style={{background:"none",border:"none",color:"#2563eb",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Lupa password?</button>}
                  </div>
                  <div style={{position:"relative"}}>
                    <input className="ainput" type={showPass?"text":"password"} placeholder="Masukkan password" value={form.password} onChange={e=>set("password",e.target.value)} style={{paddingRight:44}} />
                    <button onClick={()=>setShowPass(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#a1a1aa"}}>{showPass?"🙈":"👁️"}</button>
                  </div>
                </div>
              )}
              {mode==="register" && (
                <>
                  <div>
                    <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:6}}>Konfirmasi Password</label>
                    <input className="ainput" type="password" placeholder="Ulangi password" value={form.confirm} onChange={e=>set("confirm",e.target.value)} style={{borderColor:form.confirm&&form.confirm!==form.password?"#ef4444":""}} />
                    {form.confirm&&form.confirm!==form.password&&<div style={{fontSize:11.5,color:"#ef4444",marginTop:5}}>Password tidak cocok</div>}
                  </div>
                  <label style={{display:"flex",gap:9,alignItems:"flex-start",fontSize:12.5,color:"#52525b",cursor:"pointer",lineHeight:1.5}}>
                    <input type="checkbox" checked={form.agree} onChange={e=>set("agree",e.target.checked)} style={{accentColor:"#18181b",width:15,height:15,marginTop:1,flexShrink:0}} />
                    Saya setuju dengan <span style={{color:"#2563eb",fontWeight:500}}>Syarat & Ketentuan</span> Tukang Media
                  </label>
                </>
              )}
              <button className="abtn" onClick={submit}
                disabled={!form.email||(mode!=="forgot"&&!form.password)||(mode==="register"&&(form.password!==form.confirm||!form.agree))||loading}
                style={{background:"#18181b",color:"white",marginTop:4}}>
                {loading?<><span style={{display:"inline-block",width:16,height:16,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.7s linear infinite"}} /> Memproses...</>:mode==="login"?"Masuk →":mode==="register"?"Buat Akun Gratis 🚀":"Kirim Link Reset"}
              </button>
              {mode!=="forgot" && (
                <>
                  <div style={{display:"flex",alignItems:"center",gap:10,margin:"4px 0"}}>
                    <div style={{flex:1,height:1,background:"#e4e4e7"}} />
                    <span style={{fontSize:12,color:"#a1a1aa",fontWeight:500}}>atau</span>
                    <div style={{flex:1,height:1,background:"#e4e4e7"}} />
                  </div>
                  <button onClick={async()=>{
                    const redirectTo = window.location.origin + window.location.pathname;
                    const {error} = await supabase.auth.signInWithOAuth({
                      provider:"google",
                      options:{redirectTo}
                    });
                    if (error) alert("Error: "+error.message);
                  }} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",background:"white",border:"1.5px solid #e4e4e7",borderRadius:12,padding:"11px 16px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}
                    onMouseOver={e=>e.currentTarget.style.borderColor="#18181b"}
                    onMouseOut={e=>e.currentTarget.style.borderColor="#e4e4e7"}>
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    {mode==="login"?"Masuk dengan Google":"Daftar dengan Google"}
                  </button>
                </>
              )}
              {mode==="forgot" && <button onClick={()=>setMode("login")} style={{background:"none",border:"none",color:"#2563eb",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>← Kembali ke Login</button>}
              {mode!=="forgot" && (
                <div style={{textAlign:"center",fontSize:13,color:"#71717a"}}>
                  {mode==="login"?"Belum punya akun? ":"Sudah punya akun? "}
                  <button onClick={()=>setMode(mode==="login"?"register":"login")} style={{background:"none",border:"none",color:"#2563eb",fontWeight:600,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>
                    {mode==="login"?"Daftar sekarang":"Masuk"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:20}}>
            {["🔒 SSL Aman","✅ Gratis Daftar","🚀 Instan"].map(b=><div key={b} style={{fontSize:12,color:"#a1a1aa"}}>{b}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PRODUCT FORM (shared owner+admin)
// ============================================================
function ProductForm({ editData, onSave, onCancel, saving }) {
  const [form, setForm] = useState(editData || {name:"",platform:"youtube",price:"",description:"",tag:"",download_url:""});
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  return (
    <div style={{background:"white",border:"1.5px solid #e4e4e7",borderRadius:14,padding:22,marginBottom:20}}>
      <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>{editData?"✏️ Edit Produk":"📝 Tambah Produk Baru"}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div>
          <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Nama Produk *</label>
          <input className="dinput" placeholder="Nama produk..." value={form.name} onChange={e=>set("name",e.target.value)} />
        </div>
        <div>
          <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Platform *</label>
          <select className="dinput" value={form.platform} onChange={e=>set("platform",e.target.value)}>
            {platforms.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Harga (Rp) *</label>
          <input className="dinput" type="number" placeholder="50000" value={form.price} onChange={e=>set("price",e.target.value)} />
        </div>
        <div>
          <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Badge</label>
          <select className="dinput" value={form.tag||""} onChange={e=>set("tag",e.target.value)}>
            <option value="">Tidak ada</option>
            {["Terlaris","Baru","Populer","Diskon","Premium"].map(t=><option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div style={{marginBottom:12}}>
        <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Link Download (setelah bayar)</label>
        <input className="dinput" placeholder="https://drive.google.com/..." value={form.download_url||""} onChange={e=>set("download_url",e.target.value)} />
      </div>
      <div style={{marginBottom:16}}>
        <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Deskripsi</label>
        <textarea className="dinput" rows={3} placeholder="Deskripsi produk..." value={form.description||""} onChange={e=>set("description",e.target.value)} style={{resize:"vertical"}} />
      </div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={()=>onSave(form)} disabled={saving||!form.name||!form.price} style={{background:"#18181b",color:"white",border:"none",borderRadius:9,padding:"10px 24px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",opacity:saving?0.6:1}}>
          {saving?"Menyimpan...":editData?"💾 Update":"💾 Simpan"}
        </button>
        <button onClick={onCancel} style={{background:"none",border:"1.5px solid #e4e4e7",borderRadius:9,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Batal</button>
      </div>
    </div>
  );
}



// ============================================================
// OWNER SITE SETTINGS TAB
// ============================================================
function OwnerSiteSettings() {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState("identitas");
  const [form, setForm] = useState({
    site_name: "tukangmedia", tagline: "Tools & template kreator semua platform, satu tempat.",
    logo_url: "", banner_url: "", whatsapp: "", telegram: "", email_cs: "",
    hero_title: "Tools & template kreator", hero_subtitle: "semua platform, satu tempat.",
    primary_color: "#2563eb", secondary_color: "#f4f4f5",
    hero_badge: "Marketplace Digital", stats_produk: "24+", stats_platform: "9", stats_transaksi: "100+",
    navbar_tagline: "Kreator. Jualan. Cuan.",
    announcement: "", announcement_color: "#2563eb", announcement_active: false,
    testimoni: JSON.stringify([
      {nama:"Budi S.", teks:"Produk berkualitas, langsung bisa dipakai!", bintang:5},
      {nama:"Sari A.", teks:"Admin responsif dan fast response!", bintang:5},
    ]),
    faq: JSON.stringify([
      {q:"Apakah produk bisa digunakan langsung?", a:"Ya! Semua produk siap pakai setelah download."},
      {q:"Bagaimana cara pembayaran?", a:"Transfer bank/e-wallet lalu konfirmasi ke admin."},
    ]),
    footer_text: "© 2025 tukangmedia. All rights reserved.",
    show_testimoni: true, show_faq: true, show_stats: true,
  });
  const setF = (k,v) => setForm(f=>({...f,[k]:v}));

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*").single();
    if (data) setForm(prev => ({...prev, ...data}));
  };

  const handleSave = async () => {
    setSaving(true); setMessage(null);
    const { error } = await supabase.from("site_settings").upsert([{...form, id:1, updated_at: new Date().toISOString()}], {onConflict:"id"});
    setSaving(false);
    if (error) setMessage({type:"err", txt:"Gagal: "+error.message});
    else setMessage({type:"ok", txt:"Berhasil disimpan! Refresh halaman utama untuk melihat perubahan."});
  };

  const handleUpload = async (e, field) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const path = `${field}-${Date.now()}.${file.name.split(".").pop()}`;
    const { error: upErr } = await supabase.storage.from("media").upload(path, file, {upsert:true});
    if (upErr) { setMessage({type:"err",txt:"Upload gagal: "+upErr.message}); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setF(field, urlData.publicUrl);
    setUploading(false);
    setMessage({type:"ok", txt:"Gambar berhasil diupload!"});
  };

  const getTestimoni = () => { try { return JSON.parse(form.testimoni||"[]"); } catch { return []; } };
  const getFaq = () => { try { return JSON.parse(form.faq||"[]"); } catch { return []; } };
  const setTestimoni = (arr) => setF("testimoni", JSON.stringify(arr));
  const setFaq = (arr) => setF("faq", JSON.stringify(arr));

  const sections = [
    {id:"identitas", label:"🏪 Identitas"},
    {id:"hero", label:"🎯 Hero"},
    {id:"gambar", label:"🖼️ Logo & Gambar"},
    {id:"tampilan", label:"🎨 Tampilan"},
    {id:"konten", label:"📝 Konten"},
    {id:"testimoni", label:"⭐ Testimoni"},
    {id:"faq", label:"❓ FAQ"},
    {id:"kontak", label:"📞 Kontak"},
    {id:"footer", label:"🔻 Footer"},
  ];

  return (
    <div style={{display:"flex",gap:20}}>
      {/* SIDEBAR NAV */}
      <div style={{width:160,flexShrink:0}}>
        <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,overflow:"hidden",position:"sticky",top:80}}>
          {sections.map(s => (
            <button key={s.id} onClick={()=>setActiveSection(s.id)}
              style={{width:"100%",textAlign:"left",padding:"11px 16px",border:"none",background:activeSection===s.id?"#f0f9ff":"white",color:activeSection===s.id?"#2563eb":"#52525b",fontSize:12,fontWeight:activeSection===s.id?700:500,cursor:"pointer",fontFamily:"inherit",borderBottom:"1px solid #f4f4f5"}}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:14}}>
        {message && (
          <div style={{background:message.type==="err"?"#fef2f2":"#f0fdf4",color:message.type==="err"?"#991b1b":"#166534",padding:"12px 16px",borderRadius:10,fontSize:13,fontWeight:500}}>
            {message.type==="ok"?"✅ ":"❌ "}{message.txt}
          </div>
        )}

        {/* IDENTITAS */}
        {activeSection==="identitas" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>🏪 Identitas Toko</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Nama Toko</label>
                <input className="dinput" value={form.site_name} onChange={e=>setF("site_name",e.target.value)} placeholder="tukangmedia" />
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Tagline Toko</label>
                <input className="dinput" value={form.tagline} onChange={e=>setF("tagline",e.target.value)} placeholder="Tools & template kreator..." />
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Tagline Navbar (samping logo)</label>
                <input className="dinput" value={form.navbar_tagline||""} onChange={e=>setF("navbar_tagline",e.target.value)} placeholder="Kreator. Jualan. Cuan." />
                <div style={{fontSize:11,color:"#a1a1aa",marginTop:4}}>Teks kecil yang muncul di sebelah logo di navbar</div>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Footer Text</label>
                <input className="dinput" value={form.footer_text||""} onChange={e=>setF("footer_text",e.target.value)} placeholder="© 2025 tukangmedia..." />
              </div>
            </div>
          </div>
        )}

        {/* HERO */}
        {activeSection==="hero" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>🎯 Hero Section (Halaman Utama)</div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Badge Kecil (di atas judul)</label>
                <input className="dinput" value={form.hero_badge||""} onChange={e=>setF("hero_badge",e.target.value)} placeholder="Marketplace Digital" />
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Judul Besar</label>
                <input className="dinput" value={form.hero_title} onChange={e=>setF("hero_title",e.target.value)} placeholder="Tools & template kreator" />
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Subjudul (miring)</label>
                <input className="dinput" value={form.hero_subtitle} onChange={e=>setF("hero_subtitle",e.target.value)} placeholder="semua platform, satu tempat." />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                <div>
                  <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Stat: Produk</label>
                  <input className="dinput" value={form.stats_produk||""} onChange={e=>setF("stats_produk",e.target.value)} placeholder="24+" />
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Stat: Platform</label>
                  <input className="dinput" value={form.stats_platform||""} onChange={e=>setF("stats_platform",e.target.value)} placeholder="9" />
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Stat: Transaksi</label>
                  <input className="dinput" value={form.stats_transaksi||""} onChange={e=>setF("stats_transaksi",e.target.value)} placeholder="100+" />
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <input type="checkbox" id="show_stats" checked={form.show_stats!==false} onChange={e=>setF("show_stats",e.target.checked)} style={{accentColor:"#18181b",width:15,height:15}} />
                <label htmlFor="show_stats" style={{fontSize:13,cursor:"pointer"}}>Tampilkan bagian statistik</label>
              </div>
            </div>
            {/* Preview */}
            <div style={{marginTop:16,background:"#f8fafc",borderRadius:12,padding:20,border:"1px solid #e4e4e7"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:10,letterSpacing:1}}>PREVIEW HERO</div>
              <p style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:form.primary_color,textTransform:"uppercase",marginBottom:4}}>{form.hero_badge||"Marketplace Digital"}</p>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,lineHeight:1.2,marginBottom:4}}>
                {form.hero_title}<br/><em style={{color:"#71717a"}}>{form.hero_subtitle}</em>
              </div>
            </div>
          </div>
        )}

        {/* GAMBAR */}
        {activeSection==="gambar" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>🖼️ Logo & Gambar</div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[
                {field:"logo_url", label:"Logo Toko", desc:"Muncul di navbar, disarankan PNG transparan", icon:"📷"},
                {field:"banner_url", label:"Gambar Banner Hero", desc:"Opsional, muncul di background hero section", icon:"🖼️"},
                {field:"favicon_url", label:"Favicon (Tab Browser)", desc:"Opsional, ikon kecil di tab browser", icon:"🔖"},
              ].map(({field, label, desc, icon}) => (
                <div key={field}>
                  <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>{label}</label>
                  <div style={{border:"2px dashed #e4e4e7",borderRadius:12,padding:16,background:"#f8fafc",display:"flex",alignItems:"center",gap:16}}>
                    <div style={{width:64,height:64,borderRadius:10,background:"white",border:"1px solid #e4e4e7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
                      {form[field] ? <img src={form[field]} alt={label} style={{width:"100%",height:"100%",objectFit:"contain"}} /> : <span style={{fontSize:24}}>{icon}</span>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,color:"#71717a",marginBottom:8}}>{desc}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <label style={{background:"#18181b",color:"white",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",display:"inline-block"}}>
                          {uploading?"Mengupload...":"📁 Upload"}
                          <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleUpload(e,field)} disabled={uploading} />
                        </label>
                        {form[field] && <button onClick={()=>setF(field,"")} style={{background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:8,padding:"7px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>🗑️ Hapus</button>}
                      </div>
                      <input className="dinput" value={form[field]||""} onChange={e=>setF(field,e.target.value)} placeholder="Atau paste URL gambar..." style={{fontSize:11,marginTop:8}} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAMPILAN */}
        {activeSection==="tampilan" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>🎨 Tampilan & Warna</div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[
                {k:"primary_color", label:"Warna Utama", desc:"Warna tombol, link, dan aksen utama"},
                {k:"secondary_color", label:"Warna Sekunder", desc:"Warna background dan elemen pendukung"},
                {k:"announcement_color", label:"Warna Pengumuman", desc:"Warna bar pengumuman di atas navbar"},
              ].map(({k, label, desc}) => (
                <div key={k}>
                  <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>{label}</label>
                  <div style={{fontSize:11,color:"#71717a",marginBottom:8}}>{desc}</div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <input type="color" value={form[k]||"#2563eb"} onChange={e=>setF(k,e.target.value)}
                      style={{width:48,height:40,borderRadius:10,border:"1.5px solid #e4e4e7",cursor:"pointer",padding:2}} />
                    <input className="dinput" value={form[k]||""} onChange={e=>setF(k,e.target.value)} style={{flex:1}} />
                    <div style={{width:40,height:40,borderRadius:10,background:form[k]||"#2563eb",border:"1px solid #e4e4e7"}} />
                  </div>
                </div>
              ))}

              <div style={{borderTop:"1px solid #f0f0f0",paddingTop:16}}>
                <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>📢 Pengumuman / Promo Bar</div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <input type="checkbox" id="ann_active" checked={form.announcement_active||false} onChange={e=>setF("announcement_active",e.target.checked)} style={{accentColor:"#18181b",width:15,height:15}} />
                  <label htmlFor="ann_active" style={{fontSize:13,cursor:"pointer",fontWeight:600}}>Aktifkan bar pengumuman</label>
                </div>
                <textarea className="dinput" rows={2} value={form.announcement||""} onChange={e=>setF("announcement",e.target.value)}
                  placeholder="Contoh: 🎉 Promo Ramadan! Diskon 30% untuk semua produk hari ini!" style={{resize:"none"}} />
                {form.announcement_active && form.announcement && (
                  <div style={{marginTop:10,background:form.announcement_color||"#2563eb",color:"white",borderRadius:8,padding:"10px 16px",fontSize:13,fontWeight:500,textAlign:"center"}}>
                    {form.announcement}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* KONTEN */}
        {activeSection==="konten" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>📝 Pengaturan Konten</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {[
                {k:"show_stats", label:"Tampilkan Statistik (Produk, Platform, Transaksi)"},
                {k:"show_testimoni", label:"Tampilkan Section Testimoni"},
                {k:"show_faq", label:"Tampilkan Section FAQ"},
              ].map(({k,label}) => (
                <div key={k} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"#f8fafc",borderRadius:10}}>
                  <input type="checkbox" id={k} checked={form[k]!==false} onChange={e=>setF(k,e.target.checked)} style={{accentColor:"#18181b",width:16,height:16}} />
                  <label htmlFor={k} style={{fontSize:13,cursor:"pointer",flex:1}}>{label}</label>
                  <span style={{fontSize:11,fontWeight:600,color:form[k]!==false?"#16a34a":"#a1a1aa"}}>{form[k]!==false?"AKTIF":"MATI"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONI */}
        {activeSection==="testimoni" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:15}}>⭐ Testimoni Pelanggan</div>
              <button onClick={()=>setTestimoni([...getTestimoni(),{nama:"",teks:"",bintang:5}])}
                style={{background:"#18181b",color:"white",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Tambah</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {getTestimoni().map((t,i) => (
                <div key={i} style={{background:"#f8fafc",borderRadius:12,padding:16,border:"1.5px solid #e4e4e7"}}>
                  <div style={{display:"flex",gap:10,marginBottom:10}}>
                    <input className="dinput" value={t.nama} onChange={e=>{const arr=getTestimoni();arr[i]={...arr[i],nama:e.target.value};setTestimoni(arr);}} placeholder="Nama pelanggan" style={{flex:1}} />
                    <select className="dinput" value={t.bintang} onChange={e=>{const arr=getTestimoni();arr[i]={...arr[i],bintang:parseInt(e.target.value)};setTestimoni(arr);}} style={{width:80}}>
                      {[5,4,3,2,1].map(n=><option key={n} value={n}>{"⭐".repeat(n)}</option>)}
                    </select>
                  </div>
                  <textarea className="dinput" rows={2} value={t.teks} onChange={e=>{const arr=getTestimoni();arr[i]={...arr[i],teks:e.target.value};setTestimoni(arr);}}
                    placeholder="Isi testimoni..." style={{resize:"none",marginBottom:8}} />
                  <button onClick={()=>setTestimoni(getTestimoni().filter((_,j)=>j!==i))}
                    style={{background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:7,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>🗑️ Hapus</button>
                </div>
              ))}
              {getTestimoni().length===0 && <div style={{textAlign:"center",padding:30,color:"#a1a1aa",fontSize:13}}>Belum ada testimoni. Klik "+ Tambah" untuk menambahkan.</div>}
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeSection==="faq" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:15}}>❓ FAQ (Pertanyaan Umum)</div>
              <button onClick={()=>setFaq([...getFaq(),{q:"",a:""}])}
                style={{background:"#18181b",color:"white",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Tambah</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {getFaq().map((f,i) => (
                <div key={i} style={{background:"#f8fafc",borderRadius:12,padding:16,border:"1.5px solid #e4e4e7"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:6}}>PERTANYAAN #{i+1}</div>
                  <input className="dinput" value={f.q} onChange={e=>{const arr=getFaq();arr[i]={...arr[i],q:e.target.value};setFaq(arr);}} placeholder="Pertanyaan..." style={{marginBottom:8}} />
                  <textarea className="dinput" rows={2} value={f.a} onChange={e=>{const arr=getFaq();arr[i]={...arr[i],a:e.target.value};setFaq(arr);}}
                    placeholder="Jawaban..." style={{resize:"none",marginBottom:8}} />
                  <button onClick={()=>setFaq(getFaq().filter((_,j)=>j!==i))}
                    style={{background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:7,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>🗑️ Hapus</button>
                </div>
              ))}
              {getFaq().length===0 && <div style={{textAlign:"center",padding:30,color:"#a1a1aa",fontSize:13}}>Belum ada FAQ. Klik "+ Tambah" untuk menambahkan.</div>}
            </div>
          </div>
        )}

        {/* KONTAK */}
        {activeSection==="kontak" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>📞 Kontak & Sosial Media</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>💬 WhatsApp</label>
                <input className="dinput" value={form.whatsapp} onChange={e=>setF("whatsapp",e.target.value)} placeholder="628xxxxxxxxxx" />
                <div style={{fontSize:11,color:"#a1a1aa",marginTop:4}}>Format: 628xxx (tanpa +)</div>
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>✈️ Telegram</label>
                <input className="dinput" value={form.telegram} onChange={e=>setF("telegram",e.target.value)} placeholder="@username" />
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>📧 Email CS</label>
                <input className="dinput" value={form.email_cs} onChange={e=>setF("email_cs",e.target.value)} placeholder="cs@tukangmedia.com" />
              </div>
            </div>
            <div style={{marginTop:14,background:"#eff6ff",borderRadius:10,padding:"12px 14px",fontSize:12,color:"#2563eb"}}>
              💡 WhatsApp & Telegram akan muncul sebagai tombol floating di pojok kanan bawah halaman utama.
            </div>
          </div>
        )}

        {/* FOOTER */}
        {activeSection==="footer" && (
          <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>🔻 Footer</div>
            <div>
              <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Teks Footer</label>
              <input className="dinput" value={form.footer_text||""} onChange={e=>setF("footer_text",e.target.value)} placeholder="© 2025 tukangmedia. All rights reserved." />
            </div>
            <div style={{marginTop:12,background:"#18181b",borderRadius:10,padding:"14px 20px",textAlign:"center"}}>
              <div style={{fontSize:12,color:"#a1a1aa"}}>{form.footer_text||"© 2025 tukangmedia. All rights reserved."}</div>
            </div>
          </div>
        )}

        {/* SAVE BUTTON */}
        <button onClick={handleSave} disabled={saving}
          style={{background:"#18181b",color:"white",border:"none",borderRadius:11,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:saving?0.7:1,position:"sticky",bottom:20,boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>
          {saving?"💾 Menyimpan...":"💾 Simpan Semua Perubahan"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// PAYMENT TYPES CONFIG
// ============================================================
const PAYMENT_TYPES = [
  { id: "bca",       label: "BCA",        icon: "🏦", type: "bank",    color: "#003087" },
  { id: "bni",       label: "BNI",        icon: "🏛️", type: "bank",    color: "#F68B1F" },
  { id: "bri",       label: "BRI",        icon: "🏢", type: "bank",    color: "#003D82" },
  { id: "mandiri",   label: "Mandiri",    icon: "🏦", type: "bank",    color: "#F7A800" },
  { id: "bsi",       label: "BSI",        icon: "🕌", type: "bank",    color: "#00703C" },
  { id: "qris",      label: "QRIS",       icon: "⬛", type: "ewallet", color: "#e11d48" },
  { id: "dana",      label: "DANA",       icon: "💙", type: "ewallet", color: "#118EEA" },
  { id: "ovo",       label: "OVO",        icon: "💜", type: "ewallet", color: "#4C3494" },
  { id: "gopay",     label: "GoPay",      icon: "💚", type: "ewallet", color: "#00B14F" },
  { id: "shopeepay", label: "ShopeePay",  icon: "🧡", type: "ewallet", color: "#EE4D2D" },
  { id: "linkaja",   label: "LinkAja",    icon: "❤️", type: "ewallet", color: "#E82529" },
];

// ============================================================
// OWNER PAYMENT TAB
// ============================================================
function OwnerPaymentTab() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({ method_name:"bca", bank_name:"", account_number:"", holder_name:"", method_type:"bank", qris_url:"" });
  const setF = (k,v) => setForm(f => ({...f,[k]:v}));

  useEffect(() => { fetchMethods(); }, []);

  const fetchMethods = async () => {
    setLoading(true);
    const { data } = await supabase.from("payment_settings").select("*").order("created_at");
    setMethods(data||[]);
    setLoading(false);
  };

  const openAdd = () => {
    setEditData(null);
    setForm({ method_name:"bca", bank_name:"", account_number:"", holder_name:"", method_type:"bank", qris_url:"" });
    setShowForm(true); setMessage(null);
  };

  const openEdit = (m) => {
    setEditData(m);
    setForm({ method_name:m.method_name||"bca", bank_name:m.bank_name||"", account_number:m.account_number||"", holder_name:m.holder_name||"", method_type:m.method_type||"bank", qris_url:m.qris_url||"" });
    setShowForm(true); setMessage(null);
  };

  const handleSave = async () => {
    if (!form.bank_name) return setMessage({type:"err",txt:"Nama metode wajib diisi!"});
    setSaving(true);
    const payload = { method_name:form.method_name, method_type:form.method_type, bank_name:form.bank_name, account_number:form.account_number, holder_name:form.holder_name, qris_url:form.qris_url };
    const { error } = editData?.id
      ? await supabase.from("payment_settings").update(payload).eq("id",editData.id)
      : await supabase.from("payment_settings").insert([payload]);
    setSaving(false);
    if (error) { setMessage({type:"err",txt:"Gagal: "+error.message}); }
    else { setMessage({type:"ok",txt:editData?"Berhasil diupdate!":"Berhasil ditambahkan!"}); setShowForm(false); setEditData(null); fetchMethods(); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus metode pembayaran ini?")) return;
    await supabase.from("payment_settings").delete().eq("id",id);
    fetchMethods();
  };

  const selectedType = PAYMENT_TYPES.find(p => p.id===form.method_name);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontWeight:700,fontSize:16}}>💳 Metode Pembayaran</div>
          <div style={{fontSize:12,color:"#71717a",marginTop:2}}>Kelola semua metode pembayaran aktif di toko</div>
        </div>
        <button onClick={openAdd} style={{background:"#18181b",color:"white",border:"none",borderRadius:9,padding:"9px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Tambah Metode</button>
      </div>

      {message && (
        <div style={{background:message.type==="err"?"#fef2f2":"#f0fdf4",color:message.type==="err"?"#991b1b":"#166534",padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:16,fontWeight:500}}>
          {message.type==="ok"?"✅ ":"❌ "}{message.txt}
        </div>
      )}

      {showForm && (
        <div style={{background:"white",border:"1.5px solid #e4e4e7",borderRadius:14,padding:22,marginBottom:20}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>{editData?"✏️ Edit Metode":"➕ Tambah Metode Baru"}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div>
              <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Pilih Metode *</label>
              <select className="dinput" value={form.method_name} onChange={e => {
                const t = PAYMENT_TYPES.find(p=>p.id===e.target.value);
                setF("method_name",e.target.value); setF("method_type",t?.type||"bank");
              }}>
                <optgroup label="🏦 Transfer Bank">
                  {PAYMENT_TYPES.filter(p=>p.type==="bank").map(p=><option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}
                </optgroup>
                <optgroup label="💳 E-Wallet & QRIS">
                  {PAYMENT_TYPES.filter(p=>p.type==="ewallet").map(p=><option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}
                </optgroup>
              </select>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Label Tampilan *</label>
              <input className="dinput" placeholder={"Contoh: "+(selectedType?.label||"BCA")+" Utama"} value={form.bank_name} onChange={e=>setF("bank_name",e.target.value)} />
            </div>
            {form.method_type==="bank" && <>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Nomor Rekening</label>
                <input className="dinput" placeholder="1234567890" value={form.account_number} onChange={e=>setF("account_number",e.target.value)} />
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Atas Nama</label>
                <input className="dinput" placeholder="Nama pemilik rekening" value={form.holder_name} onChange={e=>setF("holder_name",e.target.value)} />
              </div>
            </>}
            {form.method_type==="ewallet" && form.method_name!=="qris" && <>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Nomor {selectedType?.label}</label>
                <input className="dinput" placeholder="08xxxxxxxxxx" value={form.account_number} onChange={e=>setF("account_number",e.target.value)} />
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Atas Nama</label>
                <input className="dinput" placeholder="Nama pemilik akun" value={form.holder_name} onChange={e=>setF("holder_name",e.target.value)} />
              </div>
            </>}
            {form.method_name==="qris" && (
              <div style={{gridColumn:"1 / -1"}}>
                <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>URL Gambar QRIS</label>
                <input className="dinput" placeholder="https://... (upload ke Google Drive lalu paste link)" value={form.qris_url} onChange={e=>setF("qris_url",e.target.value)} />
                <div style={{fontSize:11,color:"#71717a",marginTop:4}}>Upload gambar QRIS ke Google Drive → klik kanan → Dapatkan link → Izinkan semua orang → paste di sini.</div>
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={handleSave} disabled={saving} style={{background:"#18181b",color:"white",border:"none",borderRadius:9,padding:"10px 24px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",opacity:saving?0.6:1}}>
              {saving?"Menyimpan...":editData?"💾 Update":"💾 Simpan"}
            </button>
            <button onClick={()=>{setShowForm(false);setEditData(null);}} style={{background:"none",border:"1.5px solid #e4e4e7",borderRadius:9,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Batal</button>
          </div>
        </div>
      )}

      {loading ? <div style={{textAlign:"center",padding:40,color:"#a1a1aa"}}>Memuat...</div> :
      methods.length===0 ? (
        <div style={{textAlign:"center",padding:60,background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,color:"#a1a1aa"}}>
          <div style={{fontSize:40,marginBottom:12}}>💳</div>
          <div style={{fontWeight:600,fontSize:15}}>Belum ada metode pembayaran</div>
          <div style={{fontSize:13,marginTop:4}}>Klik "+ Tambah Metode" untuk menambahkan</div>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {methods.map(m => {
            const type = PAYMENT_TYPES.find(p=>p.id===m.method_name);
            return (
              <div key={m.id} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:18,position:"relative"}}>
                <span style={{position:"absolute",top:14,right:14,background:m.method_type==="bank"?"#eff6ff":"#f0fdf4",color:m.method_type==="bank"?"#2563eb":"#16a34a",border:"1px solid "+(m.method_type==="bank"?"#bfdbfe":"#bbf7d0"),borderRadius:6,padding:"2px 8px",fontSize:10,fontWeight:700}}>
                  {m.method_type==="bank"?"🏦 Bank":"💳 E-Wallet"}
                </span>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <div style={{width:44,height:44,borderRadius:12,background:(type?.color||"#18181b")+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                    {type?.icon||"💳"}
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:15}}>{m.bank_name}</div>
                    <div style={{fontSize:12,color:"#71717a"}}>{type?.label||m.method_name}</div>
                  </div>
                </div>
                {m.method_name==="qris" ? (
                  <div style={{background:"#f8fafc",borderRadius:8,padding:"10px 12px",marginBottom:14}}>
                    {m.qris_url ? <div style={{fontSize:12,color:"#16a34a",fontWeight:500}}>✅ QRIS URL sudah diset</div>
                    : <div style={{fontSize:12,color:"#ef4444"}}>⚠️ QRIS URL belum diset</div>}
                  </div>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
                    {m.account_number && <div style={{background:"#f8fafc",borderRadius:8,padding:"8px 12px"}}>
                      <div style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>NOMOR</div>
                      <div style={{fontSize:14,fontWeight:700,fontFamily:"monospace"}}>{m.account_number}</div>
                    </div>}
                    {m.holder_name && <div style={{background:"#f8fafc",borderRadius:8,padding:"8px 12px"}}>
                      <div style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>ATAS NAMA</div>
                      <div style={{fontSize:13,fontWeight:600}}>{m.holder_name}</div>
                    </div>}
                  </div>
                )}
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>openEdit(m)} style={{flex:1,background:"#eff6ff",color:"#2563eb",border:"1px solid #bfdbfe",borderRadius:8,padding:"7px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>✏️ Edit</button>
                  <button onClick={()=>handleDelete(m.id)} style={{flex:1,background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:8,padding:"7px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>🗑️ Hapus</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// OWNER DASHBOARD
// ============================================================
function OwnerDashboard({ user, onBack }) {
  const [tab, setTab] = useState(() => localStorage.getItem("tm_owner_tab") || "overview");
  const setTabP = (t) => { localStorage.setItem("tm_owner_tab", t); setTab(t); };
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [cancelModal, setCancelModal] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data:p },{ data:o },{ data:u }] = await Promise.all([
      supabase.from("products").select("*").order("created_at",{ascending:false}),
      supabase.from("orders").select("*").order("created_at",{ascending:false}),
      supabase.from("user_roles").select("*"),
    ]);
    setProducts(p||[]); setOrders(o||[]); setUsers(u||[]);
    setLoading(false);
  };

  const handleSave = async (form) => {
    setSaving(true);
    if (editData?.id) {
      await supabase.from("products").update({name:form.name,platform:form.platform,price:parseInt(form.price),description:form.description,tag:form.tag||null,download_url:form.download_url||""}).eq("id",editData.id);
    } else {
      await supabase.from("products").insert([{name:form.name,platform:form.platform,price:parseInt(form.price),description:form.description,seller:"tukangmedia",tag:form.tag||null,download_url:form.download_url||"",rating:5.0,downloads:"0",image_url:""}]);
    }
    setSaving(false); setShowForm(false); setEditData(null); fetchAll();
  };

  const deleteProduct = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    await supabase.from("products").delete().eq("id",id); fetchAll();
  };

  const changeRole = async (userId, email, newRole) => {
    if (!confirm("Ubah role "+email+" menjadi "+newRole+"?")) return;
    const existing = users.find(u => u.email===email);
    if (existing) {
      await supabase.from("user_roles").update({role:newRole}).eq("email",email);
    } else {
      await supabase.from("user_roles").insert([{email,role:newRole}]);
    }
    fetchAll();
  };

  const paidStatuses = ["paid","processing","done"];
  const todayStr = new Date().toISOString().slice(0,10);
  const thisMonth = new Date().toISOString().slice(0,7);
  const totalRevenue = orders.filter(o=>paidStatuses.includes(o.status)).reduce((s,o)=>s+(o.price||0),0);
  const todayRevenue = orders.filter(o=>paidStatuses.includes(o.status)&&(o.created_at||"").slice(0,10)===todayStr).reduce((s,o)=>s+(o.price||0),0);
  const monthRevenue = orders.filter(o=>paidStatuses.includes(o.status)&&(o.created_at||"").slice(0,7)===thisMonth).reduce((s,o)=>s+(o.price||0),0);
  const doneOrders = orders.filter(o=>o.status==="done").length;
  const paidOrders = orders.filter(o=>paidStatuses.includes(o.status)).length;

  return (
    <div style={{minHeight:"100vh",background:"#fafafa"}}>
      <style>{STYLES}</style>
      <nav style={{background:"#18181b",padding:"0 28px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#a1a1aa"}}>←</button>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:"white"}}>tukang<span style={{color:"#60a5fa"}}>media</span></div>
          <span style={{background:"#fef3c7",color:"#b45309",border:"1px solid #fde68a",borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:700}}>👑 OWNER</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:12,color:"#a1a1aa"}}>{user.email}</span>
          <button onClick={()=>{supabase.auth.signOut();onBack();}} style={{background:"none",border:"1px solid #52525b",borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:"#a1a1aa"}}>Keluar</button>
        </div>
      </nav>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px 60px"}}>
        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:16}}>
          {[
            {icon:"📦",label:"Total Produk",value:products.length,color:"#2563eb",sub:null},
            {icon:"🛒",label:"Total Pesanan",value:orders.length,color:"#7c3aed",sub:paidOrders+" sudah bayar"},
            {icon:"✅",label:"Pesanan Selesai",value:doneOrders,color:"#16a34a",sub:orders.filter(o=>o.status==="processing").length+" sedang proses"},
            {icon:"💰",label:"Total Pendapatan",value:formatRp(totalRevenue),color:"#b45309",sub:null},
          ].map(s => (
            <div key={s.label} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:"18px 20px"}}>
              <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:s.value.toString().length>8?16:22,color:s.color}}>{s.value}</div>
              <div style={{fontSize:12,color:"#71717a",marginTop:2}}>{s.label}</div>
              {s.sub && <div style={{fontSize:11,color:"#a1a1aa",marginTop:3}}>{s.sub}</div>}
            </div>
          ))}
        </div>
        {/* REVENUE BREAKDOWN */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:28}}>
          {[
            {icon:"📅",label:"Pendapatan Hari Ini",value:formatRp(todayRevenue),color:"#0369a1",bg:"#f0f9ff"},
            {icon:"🗓️",label:"Pendapatan Bulan Ini",value:formatRp(monthRevenue),color:"#7c3aed",bg:"#fdf4ff"},
            {icon:"💎",label:"Total Keseluruhan",value:formatRp(totalRevenue),color:"#b45309",bg:"#fffbeb"},
          ].map(s => (
            <div key={s.label} style={{background:s.bg,border:"1.5px solid #f0f0f0",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:28}}>{s.icon}</div>
              <div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:s.color,fontWeight:700}}>{s.value}</div>
                <div style={{fontSize:11,color:"#71717a",marginTop:1}}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{borderBottom:"1.5px solid #f0f0f0",marginBottom:24,display:"flex",gap:4,overflowX:"auto"}}>
          {[["overview","📊 Overview"],["products","📦 Produk"],["orders","🛒 Pesanan"],["users","👥 Kelola User"],["website","🌐 Website"],["settings","💳 Pembayaran"]].map(([id,label]) => (
            <button key={id} className={"dtab"+(tab===id?" active":"")} onClick={()=>setTabP(id)}>{label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab==="overview" && (
          <div>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,marginBottom:20}}>Selamat datang, Owner! 👑</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:20}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📦 Produk Terbaru</div>
                {products.slice(0,5).map(p => (
                  <div key={p.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f4f4f5",fontSize:13}}>
                    <span>{p.name?.substring(0,30)}{p.name?.length>30?"...":""}</span>
                    <span style={{fontWeight:600,color:"#2563eb"}}>{formatRp(p.price)}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:20}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>🛒 Pesanan Terbaru</div>
                {orders.length===0 ? <div style={{color:"#a1a1aa",fontSize:13}}>Belum ada pesanan</div> :
                orders.slice(0,5).map(o => (
                  <div key={o.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f4f4f5",fontSize:13}}>
                    <span>{o.user_email?.split("@")[0]}</span>
                    <span style={{background:o.status==="paid"?"#f0fdf4":o.status==="cancelled"?"#fef2f2":"#fffbeb",color:o.status==="paid"?"#16a34a":o.status==="cancelled"?"#dc2626":"#b45309",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600}}>
                      {o.status==="paid"?"✓ Lunas":o.status==="cancelled"?"❌ Batal":"⏳ Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab==="products" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div style={{fontWeight:700,fontSize:16}}>Semua Produk ({products.length})</div>
              <button onClick={()=>{setShowForm(true);setEditData(null);}} style={{background:"#18181b",color:"white",border:"none",borderRadius:9,padding:"9px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Tambah Produk</button>
            </div>
            {showForm && <ProductForm editData={editData} onSave={handleSave} onCancel={()=>{setShowForm(false);setEditData(null);}} saving={saving} />}
            {loading ? <div style={{textAlign:"center",padding:40,color:"#a1a1aa"}}>Memuat...</div> :
            products.map(p => {
              const plat = platforms.find(x=>x.id===p.platform)||platforms[0];
              return (
                <div key={p.id} className="pitem">
                  <div style={{width:44,height:44,borderRadius:10,background:plat.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <PlatformIcon id={p.platform} size={22} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:14}}>{p.name}</div>
                    <div style={{fontSize:12,color:"#71717a"}}>{plat.label} · {formatRp(p.price)}</div>
                  </div>
                  {p.tag && <span style={{background:"#f4f4f5",color:"#52525b",borderRadius:6,padding:"2px 9px",fontSize:11,fontWeight:600}}>{p.tag}</span>}
                  {p.download_url && <span style={{background:"#f0fdf4",color:"#16a34a",border:"1px solid #bbf7d0",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600}}>🔗 Link</span>}
                  <div style={{fontSize:12,color:"#a1a1aa"}}>⭐ {p.rating}</div>
                  <button onClick={()=>{setEditData(p);setShowForm(true);}} style={{background:"#eff6ff",color:"#2563eb",border:"1px solid #bfdbfe",borderRadius:7,padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Edit</button>
                  <button onClick={()=>deleteProduct(p.id)} style={{background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:7,padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Hapus</button>
                </div>
              );
            })}
          </div>
        )}

        {/* ORDERS */}
        {tab==="orders" && (
          <div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:18}}>Semua Pesanan ({orders.length})</div>
            {orders.length===0 ? (
              <div style={{textAlign:"center",padding:60,color:"#a1a1aa"}}>
                <div style={{fontSize:40,marginBottom:12}}>🛒</div>
                <div style={{fontWeight:600}}>Belum ada pesanan</div>
              </div>
            ) : (
          <div>
          <div style={{marginBottom:16,position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:"#a1a1aa"}}>🔍</span>
            <input className="dinput" placeholder="Cari kode pesanan atau email..." style={{paddingLeft:36}}
              onChange={e => {
                const q = e.target.value.toLowerCase();
                document.querySelectorAll(".order-row").forEach(r => {
                  r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none";
                });
              }} />
          </div>
          {orders.map(o => (
              <div key={o.id} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:12,marginBottom:10,overflow:"hidden"}}>
                <div className="oitem order-row" style={{border:"none",borderRadius:0,marginBottom:0}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    {o.order_code && <span style={{fontFamily:"monospace",fontSize:11,background:"#f4f4f5",padding:"1px 7px",borderRadius:5,fontWeight:700,color:"#52525b"}}>{o.order_code}</span>}
                    <div style={{fontWeight:600,fontSize:14}}>{o.product_name}</div>
                  </div>
                  <div style={{fontSize:11,color:"#71717a"}}>{o.user_email} · {new Date(o.created_at).toLocaleDateString("id-ID")} · x{o.quantity||1}</div>
                  {o.buyer_link && <div style={{fontSize:12,color:"#2563eb",marginTop:4,wordBreak:"break-all"}}>🔗 {o.buyer_link}</div>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                  <div>
                    <div style={{fontWeight:700}}>{formatRp(o.price)}</div>
                    {o.notes && o.notes.includes("unique_amount:") && (
                      <div style={{fontSize:11,color:"#2563eb",fontWeight:600}}>
                        Transfer: {formatRp(parseInt(o.notes.split("unique_amount:")[1]))}
                      </div>
                    )}
                  </div>
                  {o.status==="cancelled" ? (
                    <span style={{background:"#fef2f2",color:"#dc2626",border:"1px solid #fecdd3",borderRadius:8,padding:"5px 14px",fontSize:12,fontWeight:700}}>❌ Dibatalkan</span>
                  ) : (
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      {(() => {
                        const statusOrder = ["pending","paid","processing","done"];
                        const curIdx = statusOrder.indexOf(o.status||"pending");
                        const opts = [
                          {v:"pending",l:"⏳ Pending"},
                          {v:"paid",l:"🔵 Bayar Diterima"},
                          {v:"processing",l:"⚙️ Diproses"},
                          {v:"done",l:"✅ Selesai"},
                        ];
                        return (
                          <select value={o.status||"pending"} onChange={async e => {
                            const newIdx = statusOrder.indexOf(e.target.value);
                            if (newIdx < curIdx) return; // block going backward
                            await supabase.from("orders").update({status:e.target.value}).eq("id",o.id);
                            fetchAll();
                          }} style={{border:"1.5px solid #e4e4e7",borderRadius:8,padding:"5px 10px",fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>
                            {opts.map(opt => (
                              <option key={opt.v} value={opt.v} disabled={statusOrder.indexOf(opt.v)<curIdx}>
                                {statusOrder.indexOf(opt.v)<curIdx?"🔒 ":""}{opt.l}
                              </option>
                            ))}
                          </select>
                        );
                      })()}
                      {(o.status==="pending"||o.status==="paid") && (
                        <button onClick={() => setCancelModal({order:o})}
                          style={{background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                          Batal
                        </button>
                      )}
                    </div>
                  )}
                </div>
                </div>
                {/* Chat - pakai order_group_id sebagai room ID */}
                {(o.status==="paid"||o.status==="processing"||o.status==="done") && (
                  <div style={{padding:"0 16px 16px"}}>
                    <OrderChat orderId={o.order_code||String(o.id)} orderCode={o.order_code||"#"+o.id} currentEmail={o.user_email} isAdmin={true} />
                  </div>
                )}
              </div>
            ))}
          </div>
            )}
          </div>
        )}

        {/* USERS */}
        {tab==="users" && (
          <div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:18}}>Kelola User ({users.length})</div>
            <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"12px 16px",marginBottom:16,fontSize:13,color:"#b45309"}}>
              ⚠️ Hanya Owner yang bisa mengubah role user. Admin tidak bisa mengakses halaman ini.
            </div>
            {loading ? <div style={{textAlign:"center",padding:40,color:"#a1a1aa"}}>Memuat...</div> :
            users.map(u => (
              <div key={u.id} className="uitem">
                <div style={{width:40,height:40,borderRadius:"50%",background:"#f4f4f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                  {u.role==="owner"?"👑":u.role==="admin"?"🛡️":"🛒"}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{u.email}</div>
                  <div style={{fontSize:12,color:"#71717a"}}>{new Date(u.created_at).toLocaleDateString("id-ID")}</div>
                </div>
                <span className={u.role==="owner"?"badge-owner":u.role==="admin"?"badge-admin":"badge-buyer"}>
                  {u.role==="owner"?"👑 Owner":u.role==="admin"?"🛡️ Admin":"🛒 Buyer"}
                </span>
                {u.role!=="owner" && (
                  <div style={{display:"flex",gap:6}}>
                    {u.role!=="admin" && <button onClick={()=>changeRole(u.user_id,u.email,"admin")} style={{background:"#eff6ff",color:"#2563eb",border:"1px solid #bfdbfe",borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Jadikan Admin</button>}
                    {u.role!=="buyer" && <button onClick={()=>changeRole(u.user_id,u.email,"buyer")} style={{background:"#f4f4f5",color:"#52525b",border:"1px solid #e4e4e7",borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Reset ke Buyer</button>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SETTINGS */}
        {tab==="website" && <OwnerSiteSettings />}
        {tab==="settings" && <OwnerPaymentTab />}
      </div>

      {/* CANCEL ORDER MODAL */}
      {cancelModal && (
        <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>{setCancelModal(null);setCancelReason("");}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}} />
          <div style={{position:"relative",background:"white",borderRadius:20,padding:28,width:"90%",maxWidth:420,boxShadow:"0 24px 60px rgba(0,0,0,0.2)"}}
            onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:40,marginBottom:8}}>🙏</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,marginBottom:6}}>Batalkan Pesanan</div>
              <div style={{fontSize:13,color:"#71717a",lineHeight:1.6}}>
                Pesanan <strong>{cancelModal.order.order_code||"#"+cancelModal.order.id}</strong> dari <strong>{cancelModal.order.user_email?.split("@")[0]}</strong>
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Alasan pembatalan *</label>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
                {[
                  "Mohon maaf, stok produk sedang habis sementara",
                  "Mohon maaf, produk sedang dalam perbaikan",
                  "Mohon maaf, terjadi kendala teknis pada sistem kami",
                  "Mohon maaf, pesanan tidak dapat diproses saat ini",
                ].map(reason => (
                  <button key={reason} onClick={()=>setCancelReason(reason)}
                    style={{textAlign:"left",background:cancelReason===reason?"#eff6ff":"#f8fafc",border:"1.5px solid "+(cancelReason===reason?"#2563eb":"#e4e4e7"),borderRadius:9,padding:"9px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit",color:cancelReason===reason?"#1d4ed8":"#52525b",fontWeight:cancelReason===reason?600:400}}>
                    {reason}
                  </button>
                ))}
              </div>
              <textarea className="dinput" rows={2} placeholder="Atau tulis alasan lain..." value={cancelReason} onChange={e=>setCancelReason(e.target.value)}
                style={{fontSize:12,resize:"none"}} />
            </div>
            <div style={{background:"#f0fdf4",borderRadius:10,padding:"10px 12px",marginBottom:16,fontSize:12,color:"#16a34a",lineHeight:1.6}}>
              💡 Pesan ini akan terlihat oleh pembeli di halaman pesanan mereka.
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={async () => {
                if (!cancelReason.trim()) return alert("Mohon isi alasan pembatalan");
                const finalReason = cancelReason + " Kami mohon maaf atas ketidaknyamanan ini. 🙏";
                const o = cancelModal.order;
                await supabase.from("orders").update({status:"cancelled", notes: "cancel_reason:"+finalReason}).eq("id",o.id);
                // Refund ke wallet kalau sudah bayar (paid/processing)
                if (o.status==="paid"||o.status==="processing") {
                  const refundAmt = o.price||0;
                  await addWalletBalance(o.user_email, refundAmt, "refund",
                    "Refund pesanan "+(o.order_code||"#"+o.id)+" — "+cancelReason.substring(0,40),
                    o.order_code||"#"+o.id
                  );
                }
                setCancelModal(null); setCancelReason(""); fetchAll();
              }} style={{flex:2,background:"#e11d48",color:"white",border:"none",borderRadius:10,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {(cancelModal.order.status==="paid"||cancelModal.order.status==="processing")?"💰 Batalkan & Refund ke Wallet":"Konfirmasi Batalkan"}
              </button>
              <button onClick={()=>{setCancelModal(null);setCancelReason("");}}
                style={{flex:1,background:"none",border:"1.5px solid #e4e4e7",borderRadius:10,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
function AdminDashboard({ user, onBack }) {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [cancelModal, setCancelModal] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data:p },{ data:o }] = await Promise.all([
      supabase.from("products").select("*").order("created_at",{ascending:false}),
      supabase.from("orders").select("*").order("created_at",{ascending:false}),
    ]);
    setProducts(p||[]); setOrders(o||[]);
    setLoading(false);
  };

  const handleSave = async (form) => {
    setSaving(true);
    if (editData?.id) {
      await supabase.from("products").update({name:form.name,platform:form.platform,price:parseInt(form.price),description:form.description,tag:form.tag||null,download_url:form.download_url||""}).eq("id",editData.id);
    } else {
      await supabase.from("products").insert([{name:form.name,platform:form.platform,price:parseInt(form.price),description:form.description,seller:user.email,tag:form.tag||null,download_url:form.download_url||"",rating:5.0,downloads:"0",image_url:""}]);
    }
    setSaving(false); setShowForm(false); setEditData(null); fetchData();
  };

  return (
    <div style={{minHeight:"100vh",background:"#fafafa"}}>
      <style>{STYLES}</style>
      <nav style={{background:"#1e3a5f",padding:"0 28px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#93c5fd"}}>←</button>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:"white"}}>tukang<span style={{color:"#60a5fa"}}>media</span></div>
          <span style={{background:"#eff6ff",color:"#2563eb",border:"1px solid #bfdbfe",borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:700}}>🛡️ ADMIN</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:12,color:"#93c5fd"}}>{user.email}</span>
          <button onClick={()=>{supabase.auth.signOut();onBack();}} style={{background:"none",border:"1px solid #3b5998",borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:"#93c5fd"}}>Keluar</button>
        </div>
      </nav>

      <div style={{maxWidth:900,margin:"0 auto",padding:"28px 20px 60px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:28}}>
          {[{icon:"📦",label:"Total Produk",value:products.length},{icon:"🛒",label:"Total Pesanan",value:orders.length},{icon:"✅",label:"Pesanan Lunas",value:orders.filter(o=>o.status==="paid").length}].map(s => (
            <div key={s.label} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:"18px 20px"}}>
              <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22}}>{s.value}</div>
              <div style={{fontSize:12,color:"#71717a",marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{borderBottom:"1.5px solid #f0f0f0",marginBottom:24,display:"flex",gap:4}}>
          {[["products","📦 Produk"],["orders","🛒 Pesanan"]].map(([id,label]) => (
            <button key={id} className={"dtab"+(tab===id?" active":"")} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>

        {tab==="products" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div style={{fontWeight:700,fontSize:16}}>Produk ({products.length})</div>
              <button onClick={()=>{setShowForm(true);setEditData(null);}} style={{background:"#18181b",color:"white",border:"none",borderRadius:9,padding:"9px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Tambah Produk</button>
            </div>
            {showForm && <ProductForm editData={editData} onSave={handleSave} onCancel={()=>{setShowForm(false);setEditData(null);}} saving={saving} />}
            {loading ? <div style={{textAlign:"center",padding:40,color:"#a1a1aa"}}>Memuat...</div> :
            products.map(p => {
              const plat = platforms.find(x=>x.id===p.platform)||platforms[0];
              return (
                <div key={p.id} className="pitem">
                  <div style={{width:44,height:44,borderRadius:10,background:plat.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <PlatformIcon id={p.platform} size={22} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:14}}>{p.name}</div>
                    <div style={{fontSize:12,color:"#71717a"}}>{plat.label} · {formatRp(p.price)}</div>
                  </div>
                  {p.tag && <span style={{background:"#f4f4f5",color:"#52525b",borderRadius:6,padding:"2px 9px",fontSize:11,fontWeight:600}}>{p.tag}</span>}
                  <button onClick={()=>{setEditData(p);setShowForm(true);}} style={{background:"#eff6ff",color:"#2563eb",border:"1px solid #bfdbfe",borderRadius:7,padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Edit</button>
                </div>
              );
            })}
          </div>
        )}

        {tab==="orders" && (
          <div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:18}}>Pesanan ({orders.length})</div>
            <div style={{marginBottom:16,position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:"#a1a1aa"}}>🔍</span>
              <input className="dinput" placeholder="Cari kode pesanan atau email..." style={{paddingLeft:36}}
                onChange={e => {
                  const q = e.target.value.toLowerCase();
                  document.querySelectorAll(".admin-order-row").forEach(r => {
                    r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none";
                  });
                }} />
            </div>
            {orders.length===0 ? (
              <div style={{textAlign:"center",padding:60,color:"#a1a1aa"}}>
                <div style={{fontSize:40,marginBottom:12}}>🛒</div>
                <div style={{fontWeight:600}}>Belum ada pesanan</div>
              </div>
            ) : orders.map(o => (
              <div key={o.id} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:12,marginBottom:10,overflow:"hidden"}}>
              <div className="oitem admin-order-row" style={{border:"none",borderRadius:0,marginBottom:0}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    {o.order_code && <span style={{fontFamily:"monospace",fontSize:11,background:"#f4f4f5",padding:"1px 7px",borderRadius:5,fontWeight:700,color:"#52525b"}}>{o.order_code}</span>}
                    <div style={{fontWeight:600,fontSize:14}}>{o.product_name}</div>
                  </div>
                  <div style={{fontSize:11,color:"#71717a"}}>{o.user_email} · {new Date(o.created_at).toLocaleDateString("id-ID")} · x{o.quantity||1}</div>
                  {o.buyer_link && <div style={{fontSize:12,color:"#2563eb",marginTop:4,wordBreak:"break-all"}}>🔗 {o.buyer_link}</div>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                  <div>
                    <div style={{fontWeight:700}}>{formatRp(o.price)}</div>
                    {o.notes && o.notes.includes("unique_amount:") && (
                      <div style={{fontSize:11,color:"#2563eb",fontWeight:600}}>Transfer: {formatRp(parseInt(o.notes.split("unique_amount:")[1]))}</div>
                    )}
                  </div>
                  {o.status==="cancelled" ? (
                    <span style={{background:"#fef2f2",color:"#dc2626",border:"1px solid #fecdd3",borderRadius:8,padding:"5px 14px",fontSize:12,fontWeight:700}}>❌ Dibatalkan</span>
                  ) : (
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      {(() => {
                        const statusOrder = ["pending","paid","processing","done"];
                        const curIdx = statusOrder.indexOf(o.status||"pending");
                        const opts = [
                          {v:"pending",l:"⏳ Pending"},
                          {v:"paid",l:"🔵 Bayar Diterima"},
                          {v:"processing",l:"⚙️ Diproses"},
                          {v:"done",l:"✅ Selesai"},
                        ];
                        return (
                          <select value={o.status||"pending"} onChange={async e => {
                            const newIdx = statusOrder.indexOf(e.target.value);
                            if (newIdx < curIdx) return; // block going backward
                            await supabase.from("orders").update({status:e.target.value}).eq("id",o.id);
                            fetchData();
                          }} style={{border:"1.5px solid #e4e4e7",borderRadius:8,padding:"5px 10px",fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>
                            {opts.map(opt => (
                              <option key={opt.v} value={opt.v} disabled={statusOrder.indexOf(opt.v)<curIdx}>
                                {statusOrder.indexOf(opt.v)<curIdx?"🔒 ":""}{opt.l}
                              </option>
                            ))}
                          </select>
                        );
                      })()}
                      {(o.status==="pending"||o.status==="paid") && (
                        <button onClick={() => setCancelModal({order:o})}
                          style={{background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                          Batal
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {(o.status==="paid"||o.status==="processing"||o.status==="done") && (
                <div style={{padding:"0 16px 16px"}}>
                  <OrderChat orderId={o.order_code||String(o.id)} orderCode={o.order_code||"#"+o.id} currentEmail={o.user_email} isAdmin={true} />
                </div>
              )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CANCEL ORDER MODAL */}
      {cancelModal && (
        <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>{setCancelModal(null);setCancelReason("");}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}} />
          <div style={{position:"relative",background:"white",borderRadius:20,padding:28,width:"90%",maxWidth:420,boxShadow:"0 24px 60px rgba(0,0,0,0.2)"}}
            onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:40,marginBottom:8}}>🙏</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,marginBottom:6}}>Batalkan Pesanan</div>
              <div style={{fontSize:13,color:"#71717a",lineHeight:1.6}}>
                Pesanan <strong>{cancelModal.order.order_code||"#"+cancelModal.order.id}</strong> dari <strong>{cancelModal.order.user_email?.split("@")[0]}</strong>
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Alasan pembatalan *</label>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
                {[
                  "Mohon maaf, stok produk sedang habis sementara",
                  "Mohon maaf, produk sedang dalam perbaikan",
                  "Mohon maaf, terjadi kendala teknis pada sistem kami",
                  "Mohon maaf, pesanan tidak dapat diproses saat ini",
                ].map(reason => (
                  <button key={reason} onClick={()=>setCancelReason(reason)}
                    style={{textAlign:"left",background:cancelReason===reason?"#eff6ff":"#f8fafc",border:"1.5px solid "+(cancelReason===reason?"#2563eb":"#e4e4e7"),borderRadius:9,padding:"9px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit",color:cancelReason===reason?"#1d4ed8":"#52525b",fontWeight:cancelReason===reason?600:400}}>
                    {reason}
                  </button>
                ))}
              </div>
              <textarea className="dinput" rows={2} placeholder="Atau tulis alasan lain..." value={cancelReason} onChange={e=>setCancelReason(e.target.value)}
                style={{fontSize:12,resize:"none"}} />
            </div>
            <div style={{background:"#f0fdf4",borderRadius:10,padding:"10px 12px",marginBottom:16,fontSize:12,color:"#16a34a",lineHeight:1.6}}>
              💡 Pesan ini akan terlihat oleh pembeli di halaman pesanan mereka.
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={async () => {
                if (!cancelReason.trim()) return alert("Mohon isi alasan pembatalan");
                const finalReason = cancelReason + " Kami mohon maaf atas ketidaknyamanan ini. 🙏";
                const o = cancelModal.order;
                await supabase.from("orders").update({status:"cancelled", notes: "cancel_reason:"+finalReason}).eq("id",o.id);
                if (o.status==="paid"||o.status==="processing") {
                  await addWalletBalance(o.user_email, o.price||0, "refund",
                    "Refund pesanan "+(o.order_code||"#"+o.id)+" — "+cancelReason.substring(0,40),
                    o.order_code||"#"+o.id
                  );
                }
                setCancelModal(null); setCancelReason(""); fetchData();
              }} style={{flex:2,background:"#e11d48",color:"white",border:"none",borderRadius:10,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {(cancelModal.order.status==="paid"||cancelModal.order.status==="processing")?"💰 Batalkan & Refund ke Wallet":"Konfirmasi Batalkan"}
              </button>
              <button onClick={()=>{setCancelModal(null);setCancelReason("");}}
                style={{flex:1,background:"none",border:"1.5px solid #e4e4e7",borderRadius:10,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




// ============================================================
// WALLET HELPER FUNCTIONS
// ============================================================
const getWallet = async (email) => {
  const { data } = await supabase.from("wallets").select("*").eq("user_email", email).maybeSingle();
  return data;
};

const addWalletBalance = async (email, amount, type, description, orderCode) => {
  // Upsert wallet
  const existing = await getWallet(email);
  const newBalance = (existing?.balance || 0) + amount;
  await supabase.from("wallets").upsert([{user_email: email, balance: newBalance, updated_at: new Date().toISOString()}], {onConflict:"user_email"});
  // Log transaction
  await supabase.from("wallet_transactions").insert([{
    user_email: email, amount, type, description, order_code: orderCode
  }]);
  return newBalance;
};

const deductWalletBalance = async (email, amount, description, orderCode) => {
  const existing = await getWallet(email);
  const newBalance = (existing?.balance || 0) - amount;
  await supabase.from("wallets").upsert([{user_email: email, balance: newBalance, updated_at: new Date().toISOString()}], {onConflict:"user_email"});
  await supabase.from("wallet_transactions").insert([{
    user_email: email, amount: -amount, type: "payment", description, order_code: orderCode
  }]);
  return newBalance;
};

// ============================================================
// WALLET DISPLAY COMPONENT
// ============================================================
function WalletCard({ email, onBalanceLoaded }) {
  const [wallet, setWallet] = useState(null);
  const [txs, setTxs] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, [email]);

  const fetchWallet = async () => {
    const w = await getWallet(email);
    setWallet(w);
    if (onBalanceLoaded) onBalanceLoaded(w?.balance||0);
    const { data } = await supabase.from("wallet_transactions").select("*").eq("user_email",email).order("created_at",{ascending:false}).limit(10);
    setTxs(data||[]);
  };

  const balance = wallet?.balance || 0;

  return (
    <div style={{background:"linear-gradient(135deg,#18181b,#3f3f46)",borderRadius:16,padding:20,color:"white",marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div>
          <div style={{fontSize:11,fontWeight:600,color:"#a1a1aa",letterSpacing:1,marginBottom:4}}>SALDO WALLET</div>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:32}}>{formatRp(balance)}</div>
          <div style={{fontSize:11,color:"#71717a",marginTop:4}}>Bisa dipakai untuk belanja</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"8px 14px",fontSize:12,fontWeight:600}}>💰 Wallet</div>
      </div>
      <button onClick={()=>setShowHistory(s=>!s)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:9,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:"white"}}>
        {showHistory?"▲ Sembunyikan":"▼ Lihat Riwayat"} ({txs.length})
      </button>
      {showHistory && (
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
          {txs.length===0 && <div style={{fontSize:12,color:"#71717a",textAlign:"center",padding:12}}>Belum ada transaksi</div>}
          {txs.map(tx => (
            <div key={tx.id} style={{background:"rgba(255,255,255,0.07)",borderRadius:10,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:tx.amount>0?"#4ade80":"#f87171"}}>
                  {tx.amount>0?"+ ":"- "}{formatRp(Math.abs(tx.amount))}
                </div>
                <div style={{fontSize:11,color:"#a1a1aa"}}>{tx.description}</div>
                <div style={{fontSize:10,color:"#71717a"}}>{new Date(tx.created_at).toLocaleDateString("id-ID")}</div>
              </div>
              <span style={{fontSize:10,background:tx.type==="refund"?"#166534":tx.type==="payment"?"#7f1d1d":"#1e3a5f",color:"white",borderRadius:6,padding:"2px 8px",fontWeight:700}}>
                {tx.type==="refund"?"REFUND":tx.type==="payment"?"BAYAR":"TOP UP"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// BUYER LINK INPUT (separate component to avoid hook-in-render)
// ============================================================
function BuyerLinkInput({ groupOrders }) {
  const [link, setLink] = useState(groupOrders[0]?.buyer_link||"");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div style={{background:"#f8fafc",border:"1.5px solid #e4e4e7",borderRadius:12,padding:16}}>
      <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>📎 Link / Target Kamu</div>
      <div style={{fontSize:12,color:"#71717a",marginBottom:10}}>Masukkan link akun/konten yang ingin ditingkatkan (followers, jam tayang, like, view, dll)</div>
      <textarea value={link} onChange={e=>setLink(e.target.value)}
        placeholder={"Contoh:\nhttps://www.youtube.com/@channelkamu\nhttps://www.tiktok.com/@usernamekamu\natau kirim detail via chat di bawah"}
        style={{width:"100%",border:"1.5px solid #e4e4e7",borderRadius:9,padding:"10px 12px",fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",minHeight:80}} />
      <button onClick={async()=>{
        setSaving(true);
        await Promise.all(groupOrders.map(o=>supabase.from("orders").update({buyer_link:link}).eq("id",o.id)));
        setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2500);
      }} style={{marginTop:8,background:saved?"#16a34a":"#18181b",color:"white",border:"none",borderRadius:9,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
        {saving?"Menyimpan...":saved?"✓ Tersimpan!":"💾 Simpan Link"}
      </button>
    </div>
  );
}

// ============================================================
// ORDER CHAT COMPONENT (shared buyer & admin)
// ============================================================
function OrderChat({ orderId, orderCode, currentEmail, isAdmin }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const prevCountRef = useRef(0);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    // Scroll hanya kalau ada pesan baru (count bertambah), bukan setiap poll
    if (messages.length > prevCountRef.current) {
      prevCountRef.current = messages.length;
      bottomRef.current?.scrollIntoView({behavior:"smooth", block:"nearest"});
    } else {
      prevCountRef.current = messages.length;
    }
  }, [messages]);

  const fetchMessages = async () => {
    const { data } = await supabase.from("order_messages")
      .select("*").eq("room_code", orderId).order("created_at",{ascending:true});
    setMessages(data||[]);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    setSending(true);
    await supabase.from("order_messages").insert([{
      room_code: orderId,
      sender_email: currentEmail,
      message: text.trim(),
      is_admin: isAdmin,
    }]);
    setText("");
    setSending(false);
    fetchMessages();
  };

  return (
    <div style={{border:"1.5px solid #e4e4e7",borderRadius:12,overflow:"hidden"}}>
      <div style={{background:"#f8fafc",padding:"10px 14px",borderBottom:"1px solid #e4e4e7",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:14}}>💬</span>
        <span style={{fontWeight:700,fontSize:13}}>Chat dengan {isAdmin?"Pembeli":"Admin"}</span>
        <span style={{fontSize:11,color:"#a1a1aa",marginLeft:"auto"}}>Kode: {orderCode}</span>
      </div>
      <div style={{height:200,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8,background:"white"}}>
        {messages.length===0 && <div style={{textAlign:"center",color:"#a1a1aa",fontSize:12,margin:"auto"}}>Belum ada pesan. Mulai percakapan!</div>}
        {messages.map(m => {
          const isMine = m.sender_email===currentEmail;
          return (
            <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMine?"flex-end":"flex-start"}}>
              <div style={{background:isMine?"#18181b":m.is_admin?"#eff6ff":"#f4f4f5",color:isMine?"white":m.is_admin?"#1d4ed8":"#18181b",borderRadius:isMine?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"8px 12px",maxWidth:"80%",fontSize:13,lineHeight:1.5}}>
                {m.message}
              </div>
              <div style={{fontSize:10,color:"#a1a1aa",marginTop:2}}>
                {m.is_admin?"🛡️ Admin":"👤 Pembeli"} · {new Date(m.created_at).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div style={{padding:"10px 12px",borderTop:"1px solid #e4e4e7",background:"#fafafa",display:"flex",gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
          placeholder="Tulis pesan..." style={{flex:1,border:"1.5px solid #e4e4e7",borderRadius:9,padding:"8px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:"white"}} />
        <button onClick={sendMessage} disabled={sending||!text.trim()}
          style={{background:"#18181b",color:"white",border:"none",borderRadius:9,padding:"8px 16px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",opacity:sending?0.6:1}}>
          Kirim
        </button>
      </div>
    </div>
  );
}

// ============================================================
// BUYER DASHBOARD
// ============================================================
function BuyerDashboard({ user, onBack }) {
  const [orders, setOrders] = useState([]);
  const [payMethods, setPayMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // selected group for modal
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState(null);

  const PAYMENT_ICONS = {
    bca:"🏦",bni:"🏛️",bri:"🏢",mandiri:"🏦",bsi:"🕌",
    qris:"⬛",dana:"💙",ovo:"💜",gopay:"💚",shopeepay:"🧡",linkaja:"❤️"
  };

  useEffect(() => {
    Promise.all([
      supabase.from("orders").select("*").eq("user_email",user.email).order("created_at",{ascending:false}),
      supabase.from("payment_settings").select("*")
    ]).then(([{data:o},{data:p}]) => {
      setOrders(o||[]); setPayMethods(p||[]); setLoading(false);
    });
  }, []);

  const cancelGroup = async (groupOrders, orderCode) => {
    if (!confirm("Batalkan pesanan "+orderCode+"?")) return;
    await Promise.all(groupOrders.map(o =>
      supabase.from("orders").update({status:"cancelled"}).eq("id",o.id)
    ));
    setOrders(prev => prev.map(o =>
      groupOrders.find(g=>g.id===o.id) ? {...o,status:"cancelled"} : o
    ));
    setModal(null);
  };

  // Group orders by order_group_id
  const getGroups = () => {
    const groups = {};
    orders.forEach(o => {
      const key = o.order_group_id || String(o.id);
      if (!groups[key]) groups[key] = [];
      groups[key].push(o);
    });
    return Object.entries(groups).map(([groupId, groupOrders]) => {
      const first = groupOrders[0];
      const total = groupOrders.reduce((s,o)=>s+o.price,0);
      const notesOrder = groupOrders.find(o=>o.notes&&o.notes.includes("unique_amount:"));
      const uniqueAmt = notesOrder ? parseInt(notesOrder.notes.split("unique_amount:")[1]) : total;
      // Status priority: done > processing > paid > cancelled > pending
      const allStatuses = groupOrders.map(o=>o.status||"pending");
      const status = allStatuses.includes("done")?"done":
                     allStatuses.includes("processing")?"processing":
                     allStatuses.includes("paid")?"paid":
                     allStatuses.every(s=>s==="cancelled")?"cancelled":"pending";
      const code = first.order_code || "#"+first.id;
      const pm = payMethods.find(p => first.payment_method && first.payment_method.includes(p.bank_name));
      return { groupId, groupOrders, first, total, uniqueAmt, status, code, pm };
    });
  };

  const groups = getGroups();

  return (
    <div style={{minHeight:"100vh",background:"#fafafa"}}>
      <style>{STYLES}</style>
      <nav style={{background:"white",borderBottom:"1.5px solid #f0f0f0",padding:"0 28px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#52525b"}}>←</button>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18}}>tukang<span style={{color:"#2563eb"}}>media</span></div>
        </div>
        <div style={{fontSize:12,color:"#71717a"}}>{user.email}</div>
      </nav>

      <div style={{maxWidth:700,margin:"0 auto",padding:"28px 20px 60px"}}>
        <WalletCard email={user.email} />
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:24,marginBottom:6}}>Pesanan Saya</h2>
        <p style={{fontSize:13,color:"#71717a",marginBottom:24}}>Klik pesanan untuk lihat detail & instruksi pembayaran</p>

        {loading ? <div style={{textAlign:"center",padding:60,color:"#a1a1aa"}}>Memuat...</div> :
        groups.length===0 ? (
          <div style={{textAlign:"center",padding:60,color:"#a1a1aa"}}>
            <div style={{fontSize:48,marginBottom:16}}>🛒</div>
            <div style={{fontWeight:600,fontSize:16,marginBottom:8}}>Belum ada pesanan</div>
            <button onClick={onBack} style={{background:"#18181b",color:"white",border:"none",borderRadius:10,padding:"12px 28px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>🛍️ Belanja Sekarang</button>
          </div>
        ) : groups.map(g => (
          <div key={g.groupId} onClick={() => setModal(g)}
            style={{background:"white",border:"1.5px solid "+(g.status==="cancelled"?"#fecdd3":g.status==="done"?"#bbf7d0":g.status==="processing"?"#e9d5ff":g.status==="paid"?"#bfdbfe":"#f0f0f0"),borderRadius:14,padding:"16px 20px",marginBottom:12,cursor:"pointer",transition:"all 0.18s",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span style={{fontFamily:"monospace",fontWeight:700,fontSize:13,background:"#f4f4f5",padding:"2px 8px",borderRadius:6}}>{g.code}</span>
                  {(()=>{
                    const cfg={
                      pending:{bg:"#fffbeb",color:"#b45309",label:"⏳ Menunggu Bayar"},
                      paid:{bg:"#eff6ff",color:"#2563eb",label:"🔵 Bayar Diterima"},
                      processing:{bg:"#fdf4ff",color:"#7c3aed",label:"⚙️ Dalam Proses"},
                      done:{bg:"#f0fdf4",color:"#16a34a",label:"✅ Selesai"},
                      cancelled:{bg:"#fef2f2",color:"#dc2626",label:"❌ Dibatalkan"},
                    }[g.status]||{bg:"#fffbeb",color:"#b45309",label:"⏳ Menunggu"};
                    return <span style={{background:cfg.bg,color:cfg.color,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600}}>{cfg.label}</span>;
                  })()}
                </div>
                <div style={{fontSize:12,color:"#71717a"}}>{new Date(g.first.created_at).toLocaleDateString("id-ID")} · {g.groupOrders.length} produk</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:700,fontSize:15}}>{formatRp(g.total)}</div>
                {g.uniqueAmt !== g.total && g.status==="pending" && (
                  <div style={{fontSize:11,color:"#2563eb",fontWeight:600}}>Transfer: {formatRp(g.uniqueAmt)}</div>
                )}
                <span style={{fontSize:18,color:"#a1a1aa"}}>›</span>
              </div>
            </div>
            <div style={{marginTop:10,display:"flex",gap:6,flexWrap:"wrap"}}>
              {g.groupOrders.slice(0,3).map(o => (
                <span key={o.id} style={{background:"#f4f4f5",borderRadius:6,padding:"2px 8px",fontSize:11,color:"#52525b"}}>{o.product_name?.substring(0,20)}{o.product_name?.length>20?"...":""}</span>
              ))}
              {g.groupOrders.length>3 && <span style={{background:"#f4f4f5",borderRadius:6,padding:"2px 8px",fontSize:11,color:"#a1a1aa"}}>+{g.groupOrders.length-3} lagi</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ORDER DETAIL MODAL */}
      {modal && (
        <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>{setModal(null);setUploadMsg(null);}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)"}} />
          <div style={{position:"relative",background:"white",borderRadius:20,width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 60px rgba(0,0,0,0.25)",animation:"popIn 0.22s cubic-bezier(.22,1,.36,1)"}}
            onClick={e=>e.stopPropagation()}>
            {/* Header bar */}
            <div style={{position:"sticky",top:0,background:"white",borderBottom:"1px solid #f0f0f0",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderRadius:"20px 20px 0 0",zIndex:1}}>
              <div style={{fontFamily:"monospace",fontWeight:700,fontSize:14,color:"#18181b"}}>{modal.code}</div>
              <button onClick={()=>{setModal(null);setUploadMsg(null);}} style={{background:"#f4f4f5",border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
            <div style={{padding:"16px 20px 24px"}}>

            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <div style={{fontFamily:"monospace",fontWeight:700,fontSize:16,marginBottom:4}}>{modal.code}</div>
                {(() => {
                  const cfg = {
                    pending:  {bg:"#fffbeb",color:"#b45309",label:"⏳ Menunggu Pembayaran"},
                    paid:     {bg:"#eff6ff",color:"#2563eb",label:"🔵 Pembayaran Diterima - Diproses"},
                    processing:{bg:"#fdf4ff",color:"#7c3aed",label:"⚙️ Sedang Diproses"},
                    done:     {bg:"#f0fdf4",color:"#16a34a",label:"✅ Selesai"},
                    cancelled:{bg:"#fef2f2",color:"#dc2626",label:"❌ Dibatalkan"},
                  }[modal.status]||{bg:"#fffbeb",color:"#b45309",label:"⏳ Menunggu"};
                  return <span style={{background:cfg.bg,color:cfg.color,borderRadius:6,padding:"4px 12px",fontSize:12,fontWeight:700}}>{cfg.label}</span>;
                })()}
              </div>
              <button onClick={()=>{setModal(null);setUploadMsg(null);}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#71717a"}}>✕</button>
            </div>

            {/* Items */}
            <div style={{background:"#f8fafc",borderRadius:12,padding:"12px 14px",marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:8,letterSpacing:1}}>PRODUK DIPESAN</div>
              {modal.groupOrders.map(o => (
                <div key={o.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"5px 0",borderBottom:"1px solid #f0f0f0"}}>
                  <span>{o.product_name} <span style={{color:"#a1a1aa"}}>x{o.quantity||1}</span></span>
                  <span style={{fontWeight:600}}>{formatRp(o.price)}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:14,paddingTop:8,marginTop:4}}>
                <span>Total</span><span>{formatRp(modal.total)}</span>
              </div>
            </div>

            {/* Payment instruction for pending */}
            {modal.status==="pending" && (
              <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                <div style={{fontSize:12,fontWeight:700,color:"#b45309",marginBottom:10}}>💳 Instruksi Pembayaran</div>
                <div style={{fontSize:13,color:"#92400e",marginBottom:12}}>
                  Transfer tepat <strong style={{fontSize:15}}>{formatRp(modal.uniqueAmt)}</strong>
                  {modal.uniqueAmt!==modal.total && <span style={{fontSize:11,display:"block",marginTop:2,opacity:0.8}}>(kode unik +{modal.uniqueAmt-modal.total} untuk identifikasi)</span>}
                </div>
                {modal.pm ? (
                  <div style={{background:"white",borderRadius:10,padding:"12px 14px",border:"1px solid #fde68a"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:modal.pm.method_name==="qris"?10:8}}>
                      <span style={{fontSize:22}}>{PAYMENT_ICONS[modal.pm.method_name]||"💳"}</span>
                      <div style={{fontWeight:700,fontSize:15}}>{modal.pm.bank_name}</div>
                    </div>
                    {modal.pm.method_name==="qris" ? (
                      modal.pm.qris_url && <div style={{textAlign:"center"}}>
                        <img src={modal.pm.qris_url} alt="QRIS" style={{maxWidth:180,borderRadius:8,border:"1px solid #e4e4e7"}} />
                      </div>
                    ) : (
                      <div style={{display:"flex",flexDirection:"column",gap:6}}>
                        {modal.pm.account_number && <div style={{background:"#f8fafc",borderRadius:8,padding:"8px 12px"}}>
                          <div style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>NOMOR REKENING</div>
                          <div style={{fontSize:18,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>{modal.pm.account_number}</div>
                        </div>}
                        {modal.pm.holder_name && <div style={{background:"#f8fafc",borderRadius:8,padding:"8px 12px"}}>
                          <div style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>ATAS NAMA</div>
                          <div style={{fontSize:14,fontWeight:600}}>{modal.pm.holder_name}</div>
                        </div>}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{background:"white",borderRadius:8,padding:"10px 12px",border:"1px solid #fde68a",fontSize:13,fontWeight:600}}>{modal.first.payment_method}</div>
                )}
                <div style={{fontSize:11,color:"#92400e",marginTop:10,padding:"8px 10px",background:"#fef3c7",borderRadius:8,lineHeight:1.6}}>
                  📸 Screenshot bukti transfer → kirim ke admin via WhatsApp beserta kode <strong>{modal.code}</strong>
                </div>
              </div>
            )}

            {/* Paid / Processing / Done */}
            {(modal.status==="paid"||modal.status==="processing"||modal.status==="done") && (
              <div style={{marginBottom:16,display:"flex",flexDirection:"column",gap:12}}>
                {/* Status info */}
                {modal.status==="paid" && (
                  <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:"12px 14px",fontSize:13,color:"#1d4ed8"}}>
                    🔵 Pembayaran kamu sudah diterima! Silahkan isi link/target di bawah supaya kami bisa segera proses.
                  </div>
                )}
                {modal.status==="processing" && (
                  <div style={{background:"#fdf4ff",border:"1px solid #e9d5ff",borderRadius:10,padding:"12px 14px",fontSize:13,color:"#7c3aed"}}>
                    ⚙️ Pesanan sedang dalam proses. Mohon bersabar ya 🙂
                  </div>
                )}
                {modal.status==="done" && (
                  <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"14px 16px",fontSize:13,color:"#16a34a"}}>
                    <div style={{fontWeight:700,marginBottom:6}}>✅ Pesanan Selesai!</div>
                    {modal.groupOrders.some(o=>o.download_url) && (
                      <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>
                        {modal.groupOrders.filter(o=>o.download_url).map(o=>(
                          <a key={o.id} href={o.download_url} target="_blank" rel="noopener noreferrer"
                            style={{display:"flex",alignItems:"center",gap:8,background:"#18181b",color:"white",textDecoration:"none",borderRadius:10,padding:"10px 16px",fontSize:13,fontWeight:600}}>
                            ⬇️ Download: {o.product_name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Link/target input - shown for paid & processing */}
                {(modal.status==="paid"||modal.status==="processing") && (
                  <BuyerLinkInput groupOrders={modal.groupOrders} />
                )}
                {modal.status==="done" && modal.groupOrders[0]?.buyer_link && (
                  <div style={{background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:10,padding:"12px 14px",fontSize:13,color:"#0369a1"}}>
                    <div style={{fontWeight:600,marginBottom:4}}>📎 Link yang kamu kirim:</div>
                    <div style={{wordBreak:"break-all"}}>{modal.groupOrders[0].buyer_link}</div>
                  </div>
                )}

                {/* Chat - gunakan groupId sebagai room ID supaya semua order dalam group share 1 chat */}
                <OrderChat orderId={modal.code} orderCode={modal.code} currentEmail={user.email} isAdmin={false} />
              </div>
            )}

            {/* Cancelled */}
            {modal.status==="cancelled" && (() => {
              const cancelNote = modal.groupOrders.find(o=>o.notes&&o.notes.includes("cancel_reason:"));
              const reason = cancelNote ? cancelNote.notes.split("cancel_reason:")[1] : null;
              return (
                <div style={{background:"#fef2f2",border:"1px solid #fecdd3",borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#dc2626",marginBottom:reason?8:0}}>❌ Pesanan Dibatalkan</div>
                  {reason && (
                    <div style={{fontSize:13,color:"#7f1d1d",lineHeight:1.6,background:"white",borderRadius:8,padding:"10px 12px",border:"1px solid #fecdd3"}}>
                      <div style={{fontSize:10,fontWeight:700,color:"#dc2626",marginBottom:4}}>PESAN DARI TUKANG MEDIA</div>
                      {reason}
                    </div>
                  )}
                  {!reason && (
                    <div style={{fontSize:12,color:"#991b1b"}}>Pesanan ini dibatalkan oleh pembeli.</div>
                  )}
                </div>
              );
            })()}

            {/* Status timeline */}
            {modal.status!=="cancelled" && (
              <div style={{background:"#f8fafc",borderRadius:12,padding:"14px 16px",marginBottom:8}}>
                <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:12,letterSpacing:1}}>PROGRES PESANAN</div>
                <div style={{display:"flex",alignItems:"center",gap:0}}>
                  {[
                    {key:"pending",label:"Menunggu Bayar",icon:"⏳"},
                    {key:"paid",label:"Bayar Diterima",icon:"🔵"},
                    {key:"processing",label:"Diproses",icon:"⚙️"},
                    {key:"done",label:"Selesai",icon:"✅"},
                  ].map((s,i,arr)=>{
                    const order = ["pending","paid","processing","done"];
                    const curIdx = order.indexOf(modal.status);
                    const thisIdx = order.indexOf(s.key);
                    const isDone = thisIdx <= curIdx;
                    const isActive = thisIdx === curIdx;
                    return (
                      <React.Fragment key={s.key}>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
                          <div style={{width:28,height:28,borderRadius:"50%",background:isDone?"#18181b":"#e4e4e7",color:isDone?"white":"#a1a1aa",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,border:isActive?"3px solid #2563eb":"none"}}>
                            {isDone&&!isActive?"✓":s.icon}
                          </div>
                          <div style={{fontSize:9,color:isDone?"#18181b":"#a1a1aa",fontWeight:isDone?700:400,marginTop:4,textAlign:"center",lineHeight:1.2}}>{s.label}</div>
                        </div>
                        {i<arr.length-1 && <div style={{height:2,flex:0.5,background:thisIdx<curIdx?"#18181b":"#e4e4e7",marginBottom:18}} />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Cancel button - only for pending */}
            {modal.status==="pending" && (
              <button onClick={() => cancelGroup(modal.groupOrders, modal.code)}
                style={{width:"100%",background:"none",border:"1.5px solid #fecdd3",borderRadius:10,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:"#e11d48"}}>
                ❌ Batalkan Pesanan Ini
              </button>
            )}
            </div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html:"@keyframes popIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}"}} />
    </div>
  );
}



// ============================================================
// LANDING PAGE (shown before login)
// ============================================================
function LandingPage({ onLogin, onRegister, siteSettings }) {
  const ss = siteSettings || {};
  const primary = ss.primary_color || "#2563eb";
  const [faqOpen, setFaqOpen] = React.useState(null);

  const features = [
    {icon:"⚡",title:"Proses Instan",desc:"Pesanan diproses cepat dan real-time. Tidak perlu menunggu lama."},
    {icon:"🔒",title:"100% Aman",desc:"Sistem keamanan berlapis dengan enkripsi data penuh."},
    {icon:"💰",title:"Harga Terjangkau",desc:"Harga terbaik dengan kualitas layanan premium."},
    {icon:"🎯",title:"Hasil Terjamin",desc:"Garansi hasil sesuai pesanan atau uang kembali."},
    {icon:"📞",title:"Support 24 Jam",desc:"Tim admin siap membantu kamu kapan saja."},
    {icon:"🏆",title:"Terpercaya",desc:"Ribuan pelanggan puas telah menggunakan layanan kami."},
  ];

  const steps = [
    {n:"1",title:"Daftar Akun",desc:"Buat akun gratis hanya dalam 30 detik"},
    {n:"2",title:"Pilih Layanan",desc:"Browse ratusan layanan digital tersedia"},
    {n:"3",title:"Bayar & Kirim Target",desc:"Transfer & kirim link/akun yang ingin ditingkatkan"},
    {n:"4",title:"Pesanan Diproses",desc:"Admin kami segera memproses pesananmu"},
  ];

  const faqs = [
    {q:"Apakah layanan ini aman?", a:"Ya, semua layanan kami telah diuji dan terbukti aman. Tidak ada risiko banned selama mengikuti panduan penggunaan."},
    {q:"Berapa lama proses pengerjaan?", a:"Tergantung layanan, rata-rata 1-24 jam setelah pembayaran dikonfirmasi."},
    {q:"Bagaimana cara pembayaran?", a:"Kami menerima transfer bank (BCA, BNI, BRI, Mandiri) dan e-wallet (DANA, OVO, GoPay, ShopeePay)."},
    {q:"Apakah ada garansi?", a:"Ya! Jika pesanan tidak selesai sesuai target, saldo akan dikembalikan ke wallet akun kamu."},
    {q:"Bisa daftar pakai Google?", a:"Bisa! Klik tombol 'Daftar dengan Google' untuk registrasi instan tanpa perlu password."},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#fafafa",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{STYLES}</style>

      {/* NAVBAR */}
      <nav style={{background:"white",borderBottom:"1.5px solid #f0f0f0",padding:"0 5%",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {ss.logo_url ? <img src={ss.logo_url} alt="logo" style={{height:36,borderRadius:8}} /> : null}
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20}}>
            {(ss.site_name||"tukangmedia").replace(/\s/g,"").toLowerCase().includes("tukang")
              ? <>{(ss.site_name||"tukangmedia").split(/(?=media|digital)/i)[0]}<span style={{color:primary}}>{(ss.site_name||"tukangmedia").replace(/^[^m]*(media|digital)/i,m=>m.replace(/^[^m]*/i,""))|| "media"}</span></>
              : <span>{ss.site_name||"tukangmedia"}</span>}
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={onLogin} style={{background:"none",border:"1.5px solid #e4e4e7",borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:"#18181b"}}>Masuk</button>
          <button onClick={onRegister} style={{background:primary,color:"white",border:"none",borderRadius:10,padding:"8px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Daftar Gratis</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:`linear-gradient(135deg, ${primary}15 0%, white 50%, ${primary}08 100%)`,padding:"80px 5% 60px",textAlign:"center"}}>
        <div style={{display:"inline-block",background:primary+"20",color:primary,borderRadius:20,padding:"5px 16px",fontSize:12,fontWeight:700,letterSpacing:1,marginBottom:20,textTransform:"uppercase"}}>
          {ss.hero_badge||"Platform Digital Terpercaya"}
        </div>
        <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(28px,5vw,52px)",fontWeight:400,lineHeight:1.15,marginBottom:16,maxWidth:800,margin:"0 auto 16px"}}>
          {ss.hero_title||"Tools & template kreator"}
          <br/><em style={{color:"#71717a"}}>{ss.hero_subtitle||"semua platform, satu tempat."}</em>
        </h1>
        <p style={{fontSize:16,color:"#71717a",maxWidth:520,margin:"0 auto 32px",lineHeight:1.7}}>
          {ss.tagline||"Platform digital terlengkap untuk kebutuhan sosial media, top up, dan layanan digital kamu."}
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onRegister} style={{background:primary,color:"white",border:"none",borderRadius:12,padding:"14px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 20px ${primary}40`}}>
            🚀 Mulai Gratis Sekarang
          </button>
          <button onClick={onLogin} style={{background:"white",color:"#18181b",border:"1.5px solid #e4e4e7",borderRadius:12,padding:"14px 28px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            Masuk ke Akun →
          </button>
        </div>

        {/* STATS */}
        {ss.show_stats!==false && (
          <div style={{display:"flex",gap:0,justifyContent:"center",marginTop:48,flexWrap:"wrap"}}>
            {[
              {v:ss.stats_produk||"24+",l:"Layanan Tersedia"},
              {v:ss.stats_platform||"9",l:"Platform Didukung"},
              {v:ss.stats_transaksi||"100+",l:"Transaksi Selesai"},
              {v:"24/7",l:"Support Online"},
            ].map((s,i,arr) => (
              <div key={s.l} style={{textAlign:"center",padding:"20px 32px",borderRight:i<arr.length-1?"1px solid #e4e4e7":"none"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:32,color:primary,fontWeight:700}}>{s.v}</div>
                <div style={{fontSize:12,color:"#71717a",marginTop:4,fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FEATURES */}
      <div style={{padding:"60px 5%",background:"white"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:700,color:primary,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Keunggulan Kami</div>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:400}}>Kenapa Harus Pilih Kami?</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20,maxWidth:1100,margin:"0 auto"}}>
          {features.map(f => (
            <div key={f.title} style={{background:"#f8fafc",borderRadius:16,padding:24,border:"1.5px solid #f0f0f0",transition:"all 0.2s"}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=primary;e.currentTarget.style.background="white"}}
              onMouseOut={e=>{e.currentTarget.style.borderColor="#f0f0f0";e.currentTarget.style.background="#f8fafc"}}>
              <div style={{fontSize:32,marginBottom:12}}>{f.icon}</div>
              <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>{f.title}</div>
              <div style={{fontSize:13,color:"#71717a",lineHeight:1.6}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{padding:"60px 5%",background:`linear-gradient(135deg, ${primary}08, #fafafa)`}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:700,color:primary,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Cara Kerja</div>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:400}}>Mudah dalam 4 Langkah</h2>
        </div>
        <div style={{display:"flex",gap:0,maxWidth:900,margin:"0 auto",flexWrap:"wrap",justifyContent:"center"}}>
          {steps.map((s,i) => (
            <div key={s.n} style={{flex:"1 1 200px",textAlign:"center",padding:"20px 16px",position:"relative"}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:primary,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Serif Display',serif",fontSize:22,fontWeight:700,margin:"0 auto 16px",boxShadow:`0 4px 16px ${primary}40`}}>
                {s.n}
              </div>
              {i<steps.length-1 && <div style={{position:"absolute",top:48,left:"60%",width:"80%",height:2,background:`linear-gradient(to right,${primary},${primary}40)`,display:"none"}} className="step-line" />}
              <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{s.title}</div>
              <div style={{fontSize:12,color:"#71717a",lineHeight:1.6}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONI */}
      {ss.show_testimoni!==false && (() => {
        try {
          const testimoni = JSON.parse(ss.testimoni||"[]");
          if (testimoni.length===0) return null;
          return (
            <div style={{padding:"60px 5%",background:"white"}}>
              <div style={{textAlign:"center",marginBottom:40}}>
                <div style={{fontSize:11,fontWeight:700,color:primary,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Testimoni</div>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:400}}>Apa Kata Mereka?</h2>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16,maxWidth:1100,margin:"0 auto"}}>
                {testimoni.map((t,i) => (
                  <div key={i} style={{background:"#f8fafc",borderRadius:16,padding:20,border:"1.5px solid #f0f0f0"}}>
                    <div style={{color:"#f59e0b",fontSize:16,marginBottom:8}}>{"★".repeat(t.bintang||5)}</div>
                    <div style={{fontSize:13,color:"#52525b",lineHeight:1.6,marginBottom:12}}>"{t.teks}"</div>
                    <div style={{fontWeight:700,fontSize:13}}>— {t.nama}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        } catch { return null; }
      })()}

      {/* FAQ */}
      {ss.show_faq!==false && (() => {
        try {
          const faqList = JSON.parse(ss.faq||"[]");
          const allFaqs = [...faqs, ...faqList];
          return (
            <div style={{padding:"60px 5%",background:"#f8fafc"}}>
              <div style={{textAlign:"center",marginBottom:40}}>
                <div style={{fontSize:11,fontWeight:700,color:primary,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>FAQ</div>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:400}}>Pertanyaan Umum</h2>
              </div>
              <div style={{maxWidth:720,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
                {allFaqs.map((f,i) => (
                  <div key={i} onClick={()=>setFaqOpen(faqOpen===i?null:i)}
                    style={{background:"white",borderRadius:12,border:"1.5px solid "+(faqOpen===i?primary:"#e4e4e7"),overflow:"hidden",cursor:"pointer",transition:"all 0.2s"}}>
                    <div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{fontWeight:600,fontSize:14,color:faqOpen===i?primary:"#18181b"}}>{f.q}</div>
                      <div style={{color:primary,fontSize:18,flexShrink:0,marginLeft:12,transition:"transform 0.2s",transform:faqOpen===i?"rotate(45deg)":"rotate(0deg)"}}>+</div>
                    </div>
                    {faqOpen===i && <div style={{padding:"0 18px 16px",fontSize:13,color:"#52525b",lineHeight:1.7,borderTop:"1px solid #f4f4f5"}}>{f.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        } catch { return null; }
      })()}

      {/* CTA BOTTOM */}
      <div style={{background:`linear-gradient(135deg,${primary},${primary}cc)`,padding:"60px 5%",textAlign:"center",color:"white"}}>
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:400,marginBottom:12}}>
          Siap Mulai Sekarang?
        </h2>
        <p style={{fontSize:15,opacity:0.85,marginBottom:32,maxWidth:480,margin:"0 auto 32px"}}>
          Bergabung bersama ribuan pengguna yang sudah merasakan manfaatnya. Gratis daftar, langsung bisa order!
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onRegister} style={{background:"white",color:primary,border:"none",borderRadius:12,padding:"14px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>
            🚀 Daftar Gratis Sekarang
          </button>
          <button onClick={onLogin} style={{background:"transparent",color:"white",border:"2px solid rgba(255,255,255,0.5)",borderRadius:12,padding:"14px 28px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            Sudah punya akun? Masuk →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#18181b",color:"#a1a1aa",textAlign:"center",padding:"20px",fontSize:12}}>
        {ss.footer_text||"© 2025 tukangmedia. All rights reserved."}
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("tm_page");
    return saved || "home";
  });
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [siteSettings, setSiteSettings] = useState({});

  useEffect(() => {
    supabase.from("site_settings").select("*").maybeSingle().then(({data}) => {
      if (data) setSiteSettings(data);
    });
  }, []);

  // Halaman yang butuh login — home & auth bebas diakses siapapun
  const protectedPages = ["owner", "admin", "buyer"];

  const goTo = (p) => {
    localStorage.setItem("tm_page", p);
    setPage(p);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.email);
      } else {
        setLoadingRole(false);
        // Hanya redirect kalau halaman saat ini butuh login
        const saved = localStorage.getItem("tm_page");
        if (saved && protectedPages.includes(saved)) {
          localStorage.setItem("tm_page", "home");
          setPage("home");
        }
      }
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.email);
        // Kalau user baru login dan masih di "home", arahkan ke marketplace
        setPage(prev => {
          if (prev==="home") {
            localStorage.setItem("tm_page","marketplace");
            return "marketplace";
          }
          return prev;
        });
      } else {
        setRole(null);
        setLoadingRole(false);
        // Hanya redirect kalau memang lagi di halaman protected
        setPage(prev => {
          if (protectedPages.includes(prev)||prev==="marketplace") {
            localStorage.setItem("tm_page", "home");
            return "home";
          }
          return prev;
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (email) => {
    setLoadingRole(true);
    const { data } = await supabase.from("user_roles").select("role").eq("email", email).maybeSingle();
    setRole(data?.role || "buyer");
    setLoadingRole(false);
  };

  const handleDashboard = () => {
    if (role==="owner") goTo("owner");
    else if (role==="admin") goTo("admin");
    else goTo("buyer");
  };

  const loadingScreen = (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#fafafa",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{STYLES}</style>
      <div style={{textAlign:"center"}}>
        <div style={{width:40,height:40,border:"3px solid #e4e4e7",borderTopColor:"#18181b",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}} />
        <div style={{fontSize:14,color:"#71717a"}}>Memuat...</div>
      </div>
    </div>
  );

  // Tunggu cek auth selesai dulu sebelum render apapun — cegah flicker/redirect prematur
  if (!authReady) return loadingScreen;
  if (loadingRole && user) return loadingScreen;

  if (page==="auth") return <AuthPage onBack={() => goTo(user?"marketplace":"home")} />;
  if (page==="owner" && role==="owner") return <OwnerDashboard user={user} onBack={() => goTo("marketplace")} />;
  if (page==="admin" && role==="admin") return <AdminDashboard user={user} onBack={() => goTo("marketplace")} />;
  if (page==="buyer") return <BuyerDashboard user={user} onBack={() => goTo("marketplace")} />;
  if (page==="marketplace") return <MarketplaceListing user={user} role={role} onLogin={() => goTo("auth")} onDashboard={handleDashboard} />;

  // home atau tidak ada page: landing page kalau belum login, marketplace kalau sudah login
  if (!user) return <LandingPage siteSettings={siteSettings} onLogin={() => goTo("auth")} onRegister={() => goTo("auth")} />;

  // User sudah login tapi page masih "home" → arahkan ke marketplace
  return <MarketplaceListing user={user} role={role} onLogin={() => goTo("auth")} onDashboard={handleDashboard} />;
}
