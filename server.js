const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",           // allow all origins; restrict to your frontend domain in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Routes
app.use("/api/forms", require("./routes/routes"));

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
