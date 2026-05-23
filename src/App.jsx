import { useState } from "react";

// ============================================================
// DATA
// ============================================================
const platforms = [
  { id: "youtube",   label: "YouTube",   emoji: "▶️",  color: "#FF0000", bg: "#fff1f1", border: "#fecaca" },
  { id: "instagram", label: "Instagram", emoji: "📸",  color: "#E1306C", bg: "#fdf2f8", border: "#f9a8d4" },
  { id: "tiktok",    label: "TikTok",    emoji: "🎵",  color: "#010101", bg: "#f4f4f5", border: "#d4d4d8" },
  { id: "facebook",  label: "Facebook",  emoji: "👤",  color: "#1877F2", bg: "#eff6ff", border: "#bfdbfe" },
  { id: "shopee",    label: "Shopee",    emoji: "🛍️", color: "#EE4D2D", bg: "#fff7ed", border: "#fed7aa" },
  { id: "twitter",   label: "Twitter/X", emoji: "✖️",  color: "#000000", bg: "#f4f4f5", border: "#d4d4d8" },
  { id: "threads",   label: "Threads",   emoji: "🧵",  color: "#000000", bg: "#f4f4f5", border: "#d4d4d8" },
  { id: "telegram",  label: "Telegram",  emoji: "✈️",  color: "#2AABEE", bg: "#eff9ff", border: "#bae6fd" },
  { id: "whatsapp",  label: "WhatsApp",  emoji: "💬",  color: "#25D366", bg: "#f0fdf4", border: "#bbf7d0" },
];

const products = [
  { id: 1,  platform: "youtube",   category: "Template",     name: "YouTube Thumbnail Pack Pro",      price: 79000,  rating: 4.9, reviews: 412, seller: "ThumbKing.id", tag: "Terlaris", tagColor: "#18181b", downloads: "3.2k", preview: "▶️", desc: "100+ template thumbnail YouTube siap edit di Canva & Photoshop. CTR terbukti naik 40%." },
  { id: 2,  platform: "youtube",   category: "Source Code",  name: "YouTube Auto-Upload Bot",         price: 149000, rating: 4.7, reviews: 88,  seller: "DevTube",      tag: "Baru",     tagColor: "#2563eb", downloads: "410",  preview: "🤖", desc: "Script Python otomatis upload video ke YouTube dengan judul, deskripsi & tag otomatis." },
  { id: 3,  platform: "youtube",   category: "Graphic Pack", name: "Channel Art Bundle 2025",         price: 59000,  rating: 4.8, reviews: 201, seller: "VisualYT",     tag: null,       tagColor: "",        downloads: "1.5k", preview: "🎨", desc: "Banner channel, watermark, end screen & card template untuk niche gaming, vlog, edukasi." },
  { id: 4,  platform: "instagram", category: "Template",     name: "Instagram Feed Grid Template",    price: 69000,  rating: 4.9, reviews: 534, seller: "FeedArtist",   tag: "Terlaris", tagColor: "#18181b", downloads: "4.1k", preview: "📸", desc: "30 desain feed grid estetik untuk Canva. Cocok untuk bisnis, UMKM, dan personal brand." },
  { id: 5,  platform: "instagram", category: "Source Code",  name: "IG Auto DM Bot – Python",        price: 189000, rating: 4.6, reviews: 67,  seller: "BotNusantara", tag: "Populer",  tagColor: "#7c3aed", downloads: "320",  preview: "🐍", desc: "Bot DM Instagram otomatis untuk campaign marketing. Anti-ban & proxy support." },
  { id: 6,  platform: "instagram", category: "Graphic Pack", name: "Story & Reels Template Pack",    price: 89000,  rating: 4.8, reviews: 298, seller: "StoryKing",    tag: "Diskon",   tagColor: "#dc2626", downloads: "2.7k", preview: "✨", desc: "200+ template story & reels animasi untuk fashion, kuliner, properti, dan lifestyle." },
  { id: 7,  platform: "tiktok",    category: "Template",     name: "TikTok Viral Caption Pack",       price: 39000,  rating: 4.7, reviews: 189, seller: "ViralText",    tag: "Baru",     tagColor: "#2563eb", downloads: "980",  preview: "🎵", desc: "500+ caption viral TikTok berbahasa Indonesia untuk berbagai niche konten kreator." },
  { id: 8,  platform: "tiktok",    category: "Source Code",  name: "TikTok Scraper & Analytics",     price: 129000, rating: 4.5, reviews: 72,  seller: "DataTok",      tag: null,       tagColor: "",        downloads: "290",  preview: "📊", desc: "Scraper data TikTok: followers, likes, views, engagement rate — export ke CSV/Excel." },
  { id: 9,  platform: "tiktok",    category: "Graphic Pack", name: "TikTok Overlay & Sticker Pack",  price: 55000,  rating: 4.8, reviews: 143, seller: "DesainTok",    tag: "Populer",  tagColor: "#7c3aed", downloads: "1.1k", preview: "🎭", desc: "300+ overlay, sticker, dan efek text animasi untuk video TikTok yang eye-catching." },
  { id: 10, platform: "facebook",  category: "Template",     name: "Facebook Ads Template Kit",      price: 99000,  rating: 4.8, reviews: 321, seller: "AdsGenius",    tag: "Terlaris", tagColor: "#18181b", downloads: "2.4k", preview: "👤", desc: "80+ template iklan Facebook & Instagram Ads untuk berbagai industri. Siap custom." },
  { id: 11, platform: "facebook",  category: "Source Code",  name: "FB Group Auto-Post Bot",         price: 159000, rating: 4.4, reviews: 54,  seller: "FBDevPro",     tag: null,       tagColor: "",        downloads: "210",  preview: "🤖", desc: "Bot otomatis posting ke ribuan grup Facebook sekaligus. Dilengkapi scheduler & delay." },
  { id: 12, platform: "facebook",  category: "Graphic Pack", name: "Facebook Page Cover Bundle",     price: 49000,  rating: 4.6, reviews: 176, seller: "CoverArtist",  tag: "Diskon",   tagColor: "#dc2626", downloads: "890",  preview: "🎨", desc: "50+ cover Facebook Page untuk bisnis, komunitas, event & personal. Format PSD & PNG." },
  { id: 13, platform: "shopee",    category: "Template",     name: "Shopee Product Photo Template",  price: 69000,  rating: 4.9, reviews: 445, seller: "ShopeeDesign", tag: "Terlaris", tagColor: "#18181b", downloads: "3.8k", preview: "🛍️", desc: "100+ template foto produk Shopee siap pakai. Terbukti tingkatkan konversi toko." },
  { id: 14, platform: "shopee",    category: "Source Code",  name: "Shopee Product Scraper",         price: 109000, rating: 4.6, reviews: 93,  seller: "DataShop",     tag: "Populer",  tagColor: "#7c3aed", downloads: "510",  preview: "📦", desc: "Scraper harga & data produk Shopee. Cocok untuk riset kompetitor & price monitoring." },
  { id: 15, platform: "shopee",    category: "Graphic Pack", name: "Shopee Banner & Voucher Pack",   price: 59000,  rating: 4.7, reviews: 267, seller: "BannerKu",     tag: "Baru",     tagColor: "#2563eb", downloads: "1.9k", preview: "🏷️", desc: "50+ desain banner promosi, voucher, dan flash sale untuk toko Shopee kamu." },
  { id: 16, platform: "twitter",   category: "Template",     name: "Twitter Thread Template Kit",    price: 45000,  rating: 4.7, reviews: 134, seller: "ThreadMaster", tag: "Populer",  tagColor: "#7c3aed", downloads: "760",  preview: "✖️", desc: "30 struktur thread viral Twitter/X untuk edukasi, bisnis, dan personal branding." },
  { id: 17, platform: "twitter",   category: "Source Code",  name: "X (Twitter) Bot – Auto Reply",  price: 139000, rating: 4.4, reviews: 48,  seller: "XDevBot",      tag: null,       tagColor: "",        downloads: "180",  preview: "🤖", desc: "Bot Twitter auto reply & retweet dengan filter keyword. Cocok untuk engagement campaign." },
  { id: 18, platform: "threads",   category: "Template",     name: "Threads Content Calendar",       price: 39000,  rating: 4.6, reviews: 89,  seller: "ThreadsKu",    tag: "Baru",     tagColor: "#2563eb", downloads: "420",  preview: "🧵", desc: "Kalender konten 30 hari Threads lengkap dengan ide posting, caption, dan hashtag." },
  { id: 19, platform: "threads",   category: "Graphic Pack", name: "Threads Quote Card Pack",        price: 49000,  rating: 4.7, reviews: 112, seller: "QuoteDesign",  tag: null,       tagColor: "",        downloads: "560",  preview: "💬", desc: "100+ template quote card estetik untuk Threads. Format Canva & Figma tersedia." },
  { id: 20, platform: "telegram",  category: "Source Code",  name: "Telegram Bot – Auto Broadcast", price: 179000, rating: 4.8, reviews: 156, seller: "BotTelegram",  tag: "Terlaris", tagColor: "#18181b", downloads: "830",  preview: "✈️", desc: "Bot Telegram untuk broadcast pesan ke member grup/channel. Support scheduling & media." },
  { id: 21, platform: "telegram",  category: "Template",     name: "Telegram Channel Post Template", price: 55000,  rating: 4.6, reviews: 98,  seller: "TeleDesign",   tag: null,       tagColor: "",        downloads: "490",  preview: "📡", desc: "80+ template visual post Telegram channel untuk berita, promo, dan konten harian." },
  { id: 22, platform: "whatsapp",  category: "Source Code",  name: "WhatsApp Blast Bot – Node.js",  price: 199000, rating: 4.7, reviews: 203, seller: "WADevPro",     tag: "Premium",  tagColor: "#b45309", downloads: "1.1k", preview: "💬", desc: "Bot WhatsApp blast pesan ke ribuan kontak. Dilengkapi anti-ban & delay random." },
  { id: 23, platform: "whatsapp",  category: "Template",     name: "WA Broadcast Message Template",  price: 49000,  rating: 4.8, reviews: 334, seller: "PesanKu",      tag: "Terlaris", tagColor: "#18181b", downloads: "2.6k", preview: "📱", desc: "500+ template pesan broadcast WhatsApp untuk promo, reminder, ucapan, dan CS." },
  { id: 24, platform: "whatsapp",  category: "Graphic Pack", name: "WhatsApp Sticker Pack Custom",  price: 35000,  rating: 4.5, reviews: 287, seller: "StickerID",    tag: "Diskon",   tagColor: "#dc2626", downloads: "3.1k", preview: "😄", desc: "200 stiker custom WhatsApp siap pakai. Bisa request tema: bisnis, hari raya, lucu." },
];

const formatPrice = (p) =>
  "Rp " + p.toLocaleString("id-ID");

const StarRow = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#f59e0b", fontSize: 13, letterSpacing: -1 }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

function MarketplaceListing({ onLogin, onCheckout }) {
  const [activePlatform, setActivePlatform] = useState("all");
  const [sortBy, setSortBy] = useState("populer");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);

  const toggleWishlist = (id) => {
    setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  };

  const addToCart = (product) => {
    if (!cartItems.includes(product.id)) {
      setCartItems((c) => [...c, product.id]);
      setToast(`"${product.name}" ditambahkan ke keranjang`);
      setTimeout(() => setToast(null), 2500);
    }
  };

  const currentPlatform = platforms.find(p => p.id === activePlatform);

  const filtered = products
    .filter((p) => activePlatform === "all" || p.platform === activePlatform)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "harga-asc") return a.price - b.price;
      if (sortBy === "harga-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fafafa",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#18181b",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }

        .nav-link { text-decoration: none; color: #71717a; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #18181b; }

        .platform-tab {
          display: flex; align-items: center; gap: 7px;
          border: 1.5px solid #e4e4e7; background: white;
          border-radius: 10px; padding: 8px 14px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: all 0.18s; color: #52525b; font-family: inherit;
          white-space: nowrap;
        }
        .platform-tab:hover { border-color: #a1a1aa; color: #18181b; }
        .platform-tab.active { color: white; border-color: transparent; }

        .platform-scroll {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 20px;
        }
        .platform-scroll::-webkit-scrollbar { display: none; }
        .search-input {
          border: 1.5px solid #e4e4e7;
          border-radius: 10px;
          padding: 10px 16px 10px 40px;
          font-size: 14px;
          background: white;
          outline: none;
          width: 280px;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }
        .search-input:focus { border-color: #18181b; box-shadow: 0 0 0 3px rgba(24,24,27,0.06); }

        .cat-btn {
          border: 1.5px solid #e4e4e7;
          background: white;
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s;
          color: #52525b;
          font-family: inherit;
          white-space: nowrap;
        }
        .cat-btn:hover { border-color: #a1a1aa; color: #18181b; }
        .cat-btn.active { background: #18181b; color: white; border-color: #18181b; }

        .card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #f0f0f0;
          overflow: hidden;
          transition: transform 0.22s cubic-bezier(.22,1,.36,1), box-shadow 0.22s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }

        .card-thumb {
          height: 160px;
          background: linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 52px;
          position: relative;
        }

        .platform-pip {
          position: absolute; bottom: 10px; left: 10px;
          border-radius: 7px; padding: 3px 9px;
          font-size: 11px; font-weight: 600;
          display: flex; align-items: center; gap: 4px;
        }

        .wish-btn {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: white;
          border: 1.5px solid #e4e4e7;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.18s;
        }
        .wish-btn:hover { border-color: #f43f5e; }
        .wish-btn.active { background: #fff1f2; border-color: #f43f5e; }

        .tag-badge {
          position: absolute;
          top: 12px; left: 12px;
          border-radius: 6px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.3px;
        }

        .card-body { padding: 18px 18px 14px; flex: 1; display: flex; flex-direction: column; gap: 6px; }

        .category-chip {
          display: inline-block;
          background: #f4f4f5;
          color: #71717a;
          border-radius: 6px;
          padding: 2px 9px;
          font-size: 11px;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .product-name {
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
          color: #18181b;
        }

        .product-desc {
          font-size: 12.5px;
          color: #71717a;
          line-height: 1.5;
          flex: 1;
        }

        .seller-row {
          font-size: 12px;
          color: #a1a1aa;
          margin-top: 4px;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 12px;
          border-top: 1px solid #f4f4f5;
        }

        .price-text {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #18181b;
        }

        .cart-btn {
          background: #18181b;
          color: white;
          border: none;
          border-radius: 9px;
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
          font-family: inherit;
        }
        .cart-btn:hover { background: #3f3f46; }
        .cart-btn.added { background: #166534; }

        .sort-select {
          border: 1.5px solid #e4e4e7;
          border-radius: 9px;
          padding: 8px 14px;
          font-size: 13px;
          background: white;
          outline: none;
          font-family: inherit;
          color: #18181b;
          cursor: pointer;
        }

        .toast {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          background: #18181b;
          color: white;
          padding: 12px 22px;
          border-radius: 100px;
          font-size: 13.5px;
          font-weight: 500;
          z-index: 999;
          animation: fadeInUp 0.3s ease;
          white-space: nowrap;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .stat-card {
          background: white;
          border: 1.5px solid #f0f0f0;
          border-radius: 14px;
          padding: 16px 22px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .grid-listing {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        @media (max-width: 600px) {
          .grid-listing { grid-template-columns: 1fr 1fr; gap: 12px; }
          .search-input { width: 100%; }
        }
        @media (max-width: 420px) {
          .grid-listing { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        background: "white",
        borderBottom: "1.5px solid #f0f0f0",
        padding: "0 32px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, letterSpacing: -0.5 }}>
            tukang<span style={{ color: "#2563eb" }}>media</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Jelajahi", "Seller", "Blog"].map(l => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={{
            background: "none", border: "1.5px solid #e4e4e7", borderRadius: 9,
            padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit", color: "#18181b", position: "relative"
          }}>
            🛒
            {cartItems.length > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "#2563eb", color: "white",
                borderRadius: "50%", width: 18, height: 18,
                fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{cartItems.length}</span>
            )}
          </button>
          <button style={{
            background: "#18181b", color: "white",
            border: "none", borderRadius: 9,
            padding: "8px 18px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit"
          }} onClick={() => onLogin && onLogin()}>Masuk</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: "#2563eb", textTransform: "uppercase", marginBottom: 6 }}>
            Marketplace Digital
          </p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 38, fontWeight: 400, lineHeight: 1.15,
            letterSpacing: -1, marginBottom: 6
          }}>
            Tools & template kreator<br />
            <em style={{ color: "#71717a" }}>semua platform, satu tempat.</em>
          </h1>
        </div>

        {/* PLATFORM TABS */}
        <div className="platform-scroll">
          <button
            className={`platform-tab${activePlatform === "all" ? " active" : ""}`}
            style={activePlatform === "all" ? { background: "#18181b" } : {}}
            onClick={() => setActivePlatform("all")}
          >🌐 Semua Platform</button>
          {platforms.map(p => (
            <button
              key={p.id}
              className={`platform-tab${activePlatform === p.id ? " active" : ""}`}
              style={activePlatform === p.id ? { background: p.color } : {}}
              onClick={() => setActivePlatform(p.id)}
            >
              <span>{p.emoji}</span>{p.label}
            </button>
          ))}
        </div>

        {/* STATS */}
        <div style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
          {[
            { label: "Produk Aktif", value: "4,820+" },
            { label: "Seller Terverifikasi", value: "1,200+" },
            { label: "Transaksi Sukses", value: "98,000+" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#71717a", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* FILTER ROW */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#a1a1aa" }}>🔍</span>
              <input
                className="search-input"
                placeholder="Cari produk..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="populer">Terpopuler</option>
              <option value="rating">Rating tertinggi</option>
              <option value="harga-asc">Harga: rendah ke tinggi</option>
              <option value="harga-desc">Harga: tinggi ke rendah</option>
            </select>
          </div>
        </div>

        {/* RESULT COUNT */}
        <p style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 18 }}>
          Menampilkan <strong style={{ color: "#18181b" }}>{filtered.length}</strong> produk
          {activePlatform !== "all" && currentPlatform && (
            <span style={{ marginLeft: 8, background: currentPlatform.bg, color: currentPlatform.color, border: `1px solid ${currentPlatform.border}`, borderRadius: 6, padding: "2px 9px", fontSize: 11.5, fontWeight: 600 }}>
              {currentPlatform.emoji} {currentPlatform.label}
            </span>
          )}
        </p>

        {/* GRID */}
        <div className="grid-listing">
          {filtered.map(p => {
            const plat = platforms.find(x => x.id === p.platform);
            return (
            <div key={p.id} className="card">
              <div className="card-thumb" style={{ background: `linear-gradient(135deg, ${plat.bg}, #e4e4e7)` }}>
                <span>{p.preview}</span>
                {p.tag && (
                  <span className="tag-badge" style={{ background: p.tagColor }}>{p.tag}</span>
                )}
                <div className="platform-pip" style={{ background: plat.bg, color: plat.color, border: `1px solid ${plat.border}` }}>
                  <span style={{ fontSize: 12 }}>{plat.emoji}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700 }}>{plat.label}</span>
                </div>
                <button
                  className={`wish-btn${wishlist.includes(p.id) ? " active" : ""}`}
                  onClick={e => { e.stopPropagation(); toggleWishlist(p.id); }}
                  title="Simpan"
                >
                  {wishlist.includes(p.id) ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="card-body">
                <div className="product-name">{p.name}</div>
                <div className="product-desc">{p.desc}</div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <StarRow rating={p.rating} />
                  <span style={{ fontSize: 12, color: "#a1a1aa" }}>{p.rating} ({p.reviews})</span>
                  <span style={{ fontSize: 12, color: "#a1a1aa", marginLeft: "auto" }}>⬇ {p.downloads}</span>
                </div>

                <div className="seller-row">oleh <span style={{ color: "#52525b", fontWeight: 500 }}>{p.seller}</span></div>

                <div className="price-row">
                  <span className="price-text">{formatPrice(p.price)}</span>
                  <button
                    className={`cart-btn${cartItems.includes(p.id) ? " added" : ""}`}
                    onClick={() => { addToCart(p); }}
                  >
                    {cartItems.includes(p.id) ? "✓ Ditambahkan" : "+ Keranjang"}
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#a1a1aa" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>Produk tidak ditemukan</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Coba kata kunci atau platform lain</div>
          </div>
        )}
      </div>

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}


// ============================================================
// CHECKOUT
// ============================================================
const cartItemsData = [
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

function CheckoutPage({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState("checkout"); // checkout | processing | success
  const [modal, setModal] = useState(null); // null | "qris" | "va"
  const [agree, setAgree] = useState(false);

  const subtotal = cartItemsData.reduce((s, i) => s + i.price, 0);
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
          {cartItemsData.map(i => (
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
            {cartItemsData.map(item => (
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


// ============================================================
// AUTH
// ============================================================
function AuthPage({ onBack }) {
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


// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");

  if (page === "auth") return <AuthPage onBack={() => setPage("home")} />;
  if (page === "checkout") return <CheckoutPage onBack={() => setPage("home")} />;
  return (
    <MarketplaceListing
      onLogin={() => setPage("auth")}
      onCheckout={() => setPage("checkout")}
    />
  );
}