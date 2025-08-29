import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const { username, service, quantity } = req.body;

    // ✅ Free orders for owner
    if (username === "owner") {
      return res.json({
        success: true,
        message: "Free order created for owner ✅",
        data: { username, service, quantity }
      });
    }

    // ✅ Otherwise call real API
    const apiResponse = await fetch("https://your-smm-api-link.com/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, service, quantity })
    });

    const result = await apiResponse.json();
    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
