// backend/order.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Order API
app.post("/order", (req, res) => {
  const { username, service, quantity } = req.body;

  if (!username || !service || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Example response (API call ka simulation)
  res.json({
    success: true,
    message: "Order placed successfully!",
    data: { username, service, quantity },
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

export default app;
