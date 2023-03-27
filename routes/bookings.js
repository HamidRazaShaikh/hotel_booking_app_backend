const express = require("express");
const router = express.Router();

const {
  addBooking,
  bookingByUser,
  deleteBooking,
  editBooking,
  getBookedIds,
} = require("../controllers/bookings");


router.route("/getBookedIds").get(getBookedIds);
router.route("/bookingByUser").get(bookingByUser);
router.route("/addBooking").post(addBooking);
router.route("/editBooking").post(editBooking);
router.route("/cancelBooking").delete(deleteBooking);

module.exports = router;
