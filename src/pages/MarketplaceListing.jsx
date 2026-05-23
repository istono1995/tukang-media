import { useState } from "react";

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

const categories = ["Semua", "Template", "Source Code", "Graphic Pack"];

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

export default function MarketplaceListing() {
  const [activePlatform, setActivePlatform] = useState("all");
  const [activeCategory, setActiveCategory] = useState("Semua");
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
    .filter((p) => activeCategory === "Semua" || p.category === activeCategory)
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
          }}>Masuk</button>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button
                key={c}
                className={`cat-btn${activeCategory === c ? " active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >{c}</button>
            ))}
          </div>

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
                <span className="category-chip">{p.category}</span>
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
                    onClick={() => addToCart(p)}
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
