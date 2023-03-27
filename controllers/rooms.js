const Rooms = require("./../models/RoomSchema");

const getALLRooms = async (req, res) => {
  try {
    const data = await Rooms.find({});
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};


const getRoomById = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const Details = await Rooms.findById(id);

    if (!Details) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: Details });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const addBooking = async (req, res) => {
  const {
    body: { bookingData, id },
  } = req;

  try {
    const item = await Rooms.findByIdAndUpdate(id, bookingData, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = { getALLRooms, getRoomById, addBooking };
