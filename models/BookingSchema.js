const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Country: { type: String, required: true },
  ID: { type: String, required: true },
  Address: { type: String, required: true },
  From_date: { type: String, required: true },
  To_date: { type: String, required: true },
  Duration: { type: Number, require: true },
  Amount: { type: Number, require: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  capacity: { type: Number, default: 2 },
  description: { type: String, required: true },
  images: { type: [], require: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  roomID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Booking", BookingSchema);
