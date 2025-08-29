export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, service, quantity } = req.body;

    // Simple response abhi ke liye
    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      data: { username, service, quantity }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
