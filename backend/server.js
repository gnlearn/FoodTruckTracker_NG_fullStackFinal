import cors from 'cors';

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trucksRouter = require("./routes/trucks");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://foodtrucktrackercs195.netlify.app/'
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

app.use("/", trucksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
