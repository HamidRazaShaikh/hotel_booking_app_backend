const express = require("express");
const router = express.Router();

const {
  getALLRooms,

  getRoomById,
  addBooking,
} = require("../controllers/rooms");

router.route("/allrooms").get(getALLRooms);
router.route("/roombyid").get(getRoomById);
router.route("/booking").put(addBooking);

module.exports = router;
