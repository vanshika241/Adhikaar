import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";  // Authentication routes
import blogRoutes from "./routes/blogRoutes.js";
import ocrRoutes from './routes/ocrRoutes.js';
import chatbotRoutes from "./routes/chatbotRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();  // Load environment variables
mongoose.set('strictQuery', true);
const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());  // To allow cross-origin requests

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/news", newsRoutes); 

// Simple Route to test if server is running
app.get("/", (req, res) => {
  res.send("Blog API is running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));