const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  hotel_name: { type: String, required: true },
  capacity: { type: Number, default: 2 },
  rooms: { type: Number, default: 2 },
  bathrooms: { type: Number, default: 1 },
  images: { type: [], require: true },
  rent: { type: Number, require: true },
  floor : { type: String, required: true },
  address : { type: String, required: true }, 
  reviews: { type: [], require: true },
  manager: { type: String, required: true },
  manager_contact: { type: String, required: true },
  description: { type: String, required: true },
  ratting : { type: Number, default: 4 },  
  createdAt: { type: Date, default: Date.now() },
 
});

module.exports = mongoose.model("Room", RoomSchema);
