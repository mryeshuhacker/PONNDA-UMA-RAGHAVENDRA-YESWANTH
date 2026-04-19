import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Partner Notification API
  app.post("/api/notify-partner", async (req, res) => {
    const { partnerEmail, partnerName, clientName, status, commissionEarned } = req.body;
    
    if (!resend) {
      console.warn("Resend API key missing. Skipping email notification.");
      return res.json({ success: true, message: "Email service not configured" });
    }

    try {
      const subject = `Update on your referral: ${clientName}`;
      let message = `Hi ${partnerName},\n\nWe wanted to update you on your referral, ${clientName}.\n\nThe project status has been updated to: **${status.toUpperCase()}**.`;

      if (status === "completed" && commissionEarned) {
        message += `\n\nCongratulations! The project for **${clientName}** is officially complete. As per our Partner Program, you have earned a commission of **₹${commissionEarned}**.\n\n**Payout Schedule:**\n- All commissions are processed between the 1st and 5th of the following month.\n- Payouts are sent via your preferred UPI/Bank details provided during registration.\n- If you haven't shared your details yet, please reply to this email.`;
      } else if (status === "started") {
        message += `\n\nGreat news! The project has officially started.`;
      } else if (status === "paid") {
        message += `\n\nSuccess! Your commission for the referral ${clientName} has been processed and paid out. Please check your account.`;
      }

      message += `\n\nThank you for partnering with Lumina Digital.\n\nBest regards,\nLumina Digital Team`;

      await resend.emails.send({
        from: "Lumina Digital <notifications@lumina.digital>",
        to: partnerEmail,
        subject: subject,
        text: message,
      });

      console.log(`Notification sent to ${partnerEmail} for status ${status}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).json({ success: false, error: "Failed to send notification" });
    }
  });

  app.post("/api/notify-admin", async (req, res) => {
    const { order } = req.body;
    console.log("Admin notification triggered for order:", order);
    // In a real production app, we would use an email service like SendGrid or Nodemailer.
    // For this build, we'll log it and the data is already saved to Firestore.
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
