export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, service, quantity } = req.body;

    // Simple check
    if (!username || !service || !quantity) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Test response (yahan future mein real order system connect kar sakte ho)
    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      order: {
        username,
        service,
        quantity,
        orderId: Math.floor(Math.random() * 100000)
      }
    });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
