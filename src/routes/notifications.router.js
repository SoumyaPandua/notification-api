import express from "express";
import { NotificationLog } from "../models/notificationLog.model.js";

const router = express.Router();

// Send notification (simulation)
router.post("/send", async (req, res) => {
  const { userId, type, channel, content } = req.body;

  try {
    const log = new NotificationLog({
      userId,
      type,
      channel,
      status: "sent",
      sentAt: new Date(),
      metadata: content,
    });

    const savedLog = await log.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user notification logs
router.get("/:userId/logs", async (req, res) => {
  try {
    const logs = await NotificationLog.find({ userId: req.params.userId });
    res.json(logs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
