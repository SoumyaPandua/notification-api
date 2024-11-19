// src/app.js
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import preferencesRoutes from "./routes/preferences.router.js";
import notificationsRoutes from "./routes/notifications.router.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use("/api/preferences", preferencesRoutes);
app.use("/api/notifications", notificationsRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
