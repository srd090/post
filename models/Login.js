const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  pin: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Login', loginSchema);
