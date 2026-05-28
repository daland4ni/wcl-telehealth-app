const User = require('../models/User');
const Availability = require('../models/Availability');

const getDoctors = async (req, res) => {
  try {
    const availableSlots = await Availability.find({ isBooked: false, });
    // EXTRACT UNIQUE DOCTOR IDS 
    const doctorIds = [...new Set(availableSlots.map((slot) => slot.doctor.toString())),];
    // FIND AVAILABLE DOCTORS 
    const doctors = await User.find({ _id: { $in: doctorIds, }, role: 'doctor', isAvailable: true, });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message, });
  }
};

const getAllDoctors = async (
  req,
  res
) => {
  try {
    const doctors = await User.find({
      role: 'doctor',
    }).select('-password');

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDoctors,
  getAllDoctors,
};