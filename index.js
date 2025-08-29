import express from "express";
import cors from "cors";
import fetch from "node-fetch";  // real API call ke liye

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "✅ API is running fine!" });
});

// order route
app.post("/order", async (req, res) => {
  const { service, username, quantity, promo } = req.body;

  try {
    // ✅ Promo code free order
    if (promo === "FREE100") {
      return res.json({
        success: true,
        message: "🎉 Free order placed for owner!"
      });
    }

    // ✅ Real SMM Panel API call
    const response = await fetch("https://YOUR-SMM-PANEL.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "YOUR_API_KEY",   // apni API key dalni hogi
        action: "add",
        service: service,      // service id jo panel se milegi
        link: `https://tiktok.com/@${username}`,  // user link ya username
        quantity: quantity
      })
    });

    const data = await response.json();

    if (data.order) {
      return res.json({
        success: true,
        orderId: data.order,
        message: "✅ Order placed successfully!"
      });
    } else {
      return res.json({
        success: false,
        error: data
      });
    }

  } catch (err) {
    return res.json({
      success: false,
      error: "❌ Failed to connect with SMM panel"
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
