import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { service, username, quantity } = req.body;

  try {
    // 👑 FREE ORDER for Owner
    if (username === "FREE100") {
      return res.status(200).json({
        success: true,
        message: "🎉 Free order placed for owner!"
      });
    }

    // ✅ REAL API CALL for other users
    const response = await fetch("https://YOUR-SMM-PANEL.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "YOUR_API_KEY",   // apna SMM panel ka API key daalo
        action: "add",
        service: service,
        link: `https://tiktok.com/@${username}`,
        quantity: quantity
      })
    });

    const data = await response.json();

    if (data.order) {
      return res.status(200).json({
        success: true,
        orderId: data.order,
        message: "✅ Order placed successfully!"
      });
    } else {
      return res.status(200).json({
        success: false,
        error: data
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "❌ Failed to connect with SMM panel"
    });
  }
}
