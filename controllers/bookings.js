const Bookings = require("./../models/BookingSchema");
const moment = require("moment");

const addBooking = async (req, res) => {
  const {
    body: { bookingData },
  } = req;

  try {
    const newBooking = new Bookings(bookingData);
    newBooking.save();

    res.status(200).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const deleteBooking = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const Details = await Bookings.findOneAndDelete({ _id: id });

    if (!Details) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, booking: Details });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const bookingByUser = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const Details = await Bookings.find({ userId: id }).sort({ createdAt: -1 });
    if (!Details) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: Details });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const editBooking = async (req, res) => {
  const {
    body: { bookingData, id },
  } = req;

  try {
    const item = await Bookings.findByIdAndUpdate(id, bookingData, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, edited : item });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const getBookedIds = async (req, res) => {
  const {
    query: { start_date, end_date },
  } = req;

  try {
    const AllBookings = await Bookings.find({});

    let availableRooms = [];

    if ((start_date, end_date)) {
      AllBookings.forEach((item) => {
        let startDate = moment(item?.From_date, "YYYY/MM/DD");
        let endDate = moment(item?.To_date, "YYYY/MM/DD");
        let testDate01 = moment(start_date, "YYYY/MM/DD");
        let testDate02 = moment(end_date, "YYYY/MM/DD");
        const inDate0 = testDate01.isBetween(startDate, endDate, "days", true); // will return true
        const outDate0 = testDate02.isBetween(startDate, endDate, "days", true); // will return true

        const inDate = startDate.isBetween(
          testDate01,
          testDate02,
          "days",
          true
        ); // will return true
        const outDate = endDate.isBetween(testDate01, testDate02, "days", true); // will return true

        if (inDate || outDate || inDate0 || outDate0) {
          availableRooms.push(item?.roomID);
        }
      });

      res.status(200).json({ success: true, booked: availableRooms });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = {
  addBooking,
  deleteBooking,
  bookingByUser,
  editBooking,
  getBookedIds,
};
