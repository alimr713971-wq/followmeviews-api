import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "✅ API is running fine!" });
});

// order route
app.post("/order", (req, res) => {
  const { service, username, quantity, promo } = req.body;

  // promo code check
  if (promo === "FREE100") {
    return res.json({
      success: true,
      message: "🎉 Free order placed for owner!"
    });
  }

  // normally order response (yahan baad me real API connect hoga)
  res.json({
    success: true,
    orderId: Math.floor(Math.random() * 100000),
    service,
    username,
    quantity
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
