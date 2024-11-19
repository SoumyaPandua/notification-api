import mongoose from "mongoose";

const notificationLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ["marketing", "newsletter", "updates"], required: true },
  channel: { type: String, enum: ["email", "sms", "push"], required: true },
  status: { type: String, enum: ["pending", "sent", "failed"], required: true },
  sentAt: { type: Date },
  failureReason: { type: String },
  metadata: { type: Object },
});

export const NotificationLog = mongoose.model("NotificationLog", notificationLogSchema);
