export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ success: true, message: "API is working ✅ Use POST to place order." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { platform, service, username, quantity, promo } = req.body;

  if (!platform || !service || !username || !quantity) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  let isFree = promo && promo.toLowerCase() === "free100";
  const orderId = Date.now();

  return res.status(200).json({
    success: true,
    message: isFree ? "🎉 Your FREE order has been placed!" : "✅ Order placed successfully!",
    platform,
    service,
    username,
    quantity,
    promo,
    orderId,
    free: isFree,
    cost: isFree ? 0 : quantity * 0.01
  });
}
