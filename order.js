// POST /api/order
// Owner ke liye FREE (sirf TikTok/Instagram/YouTube), ya promo "FREE100"

const OWNER_USERNAME = "owner"; // <-- apna owner username yahan daalo (lowercase best)
const ALLOWED_FREE_PLATFORMS = ["tiktok", "instagram", "youtube"]; // sirf in platforms par free

function allowCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async (req, res) => {
  allowCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { platform, service, username, quantity, promo } = req.body || {};

    if (!platform || !service || !username || !quantity) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const isOwner =
      String(username).toLowerCase() === String(OWNER_USERNAME).toLowerCase();
    const isPromo = String(promo || "").toUpperCase() === "FREE100";
    const platformOk = ALLOWED_FREE_PLATFORMS.includes(
      String(platform).toLowerCase()
    );

    // ---- Owner or Promo FREE ----
    if ((isOwner && platformOk) || isPromo) {
      return res.status(200).json({
        success: true,
        free: true,
        message: "🎉 Free order placed for owner!",
        orderId: Math.floor(Math.random() * 1_000_000),
        platform,
        service,
        username,
        quantity: Number(quantity),
        cost: 0
      });
    }

    // ---- Paid calculation (demo) ----
    const PRICES = {
      // $ per unit (example)
      tiktok: { followers: 0.02, likes: 0.015, views: 0.005 },
      instagram: { followers: 0.025, likes: 0.018, views: 0.006 },
      youtube: { followers: 0.03, likes: 0.02, views: 0.008 }
    };

    const p = (PRICES[platform] && PRICES[platform][service]) || 0.02;
    const cost = Number(quantity) * p;

    return res.status(200).json({
      success: true,
      free: false,
      message: "✅ Order placed",
      orderId: Math.floor(Math.random() * 1_000_000),
      platform,
      service,
      username,
      quantity: Number(quantity),
      cost
    });
  } catch (e) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
