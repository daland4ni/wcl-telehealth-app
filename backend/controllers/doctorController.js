const User = require('../models/User');

const getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;

    let query = {
      role: 'doctor',
    };

    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await User.find(query).select(
      '-password'
    );

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDoctors,
};