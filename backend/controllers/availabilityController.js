const Availability = require(
  '../models/Availability'
);


// CREATE SLOT
const createAvailability =
  async (req, res) => {
    try {
      const {
        doctor,
        date,
        startTime,
        endTime,
      } = req.body;

      const slot =
        await Availability.create({
          doctor,
          date,
          startTime,
          endTime,
        });

      res.status(201).json(slot);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// GET DOCTOR SLOTS
const getDoctorAvailability =
  async (req, res) => {
    try {
      const slots =
        await Availability.find({
          doctor:
            req.params.doctorId,
          isBooked: false,
        }).sort({
          date: 1,
        });

      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// BOOK SLOT
const bookAvailability =
  async (req, res) => {
    try {
      const slot =
        await Availability.findById(
          req.params.slotId
        );

      if (!slot) {
        return res.status(404).json({
          message:
            'Slot not found',
        });
      }

      slot.isBooked = true;

      await slot.save();

      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createAvailability,
  getDoctorAvailability,
  bookAvailability,
};