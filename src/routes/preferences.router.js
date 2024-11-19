import express from "express";
import { UserPreference } from "../models/userPreference.model.js";

const router = express.Router();

// Create user preference
router.post("/", async (req, res) => {
  try {
    const newPreference = new UserPreference(req.body);
    const savedPreference = await newPreference.save();
    res.status(201).json(savedPreference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user preference
router.get("/:userId", async (req, res) => {
  try {
    const preference = await UserPreference.findOne({ userId: req.params.userId });
    if (!preference) return res.status(404).json({ error: "User not found" });
    res.json(preference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user preference
router.patch("/:userId", async (req, res) => {
  try {
    const updatedPreference = await UserPreference.findOneAndUpdate(
      { userId: req.params.userId },
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );
    res.json(updatedPreference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user preference
router.delete("/:userId", async (req, res) => {
  try {
    await UserPreference.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "User preference deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
