const express = require('express');

const router = express.Router();

const {
  createAvailability,
  getDoctorAvailability,
  bookAvailability,
} = require(
  '../controllers/availabilityController'
);


// CREATE SLOT
router.post(
  '/',
  createAvailability
);


// GET DOCTOR SLOTS
router.get(
  '/doctor/:doctorId',
  getDoctorAvailability
);


// BOOK SLOT
router.put(
  '/book/:slotId',
  bookAvailability
);

module.exports = router;