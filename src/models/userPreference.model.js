import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  preferences: {
    marketing: { type: Boolean, required: true },
    newsletter: { type: Boolean, required: true },
    updates: { type: Boolean, required: true },
    frequency: { type: String, enum: ["daily", "weekly", "monthly", "never"], required: true },
    channels: {
      email: { type: Boolean, required: true },
      sms: { type: Boolean, required: true },
      push: { type: Boolean, required: true },
    },
  },
  timezone: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const UserPreference = mongoose.model("UserPreference", userPreferenceSchema);