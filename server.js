const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
 
// Middleware
app.use(express.json());
app.use(cors());

// Static folder (important for file access)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/forms", require("./routes/routes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});