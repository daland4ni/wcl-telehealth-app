const express = require('express');

const router = express.Router();

const {
  createAppointment,
  getDoctorAppointments,
  toggleAvailability,
} = require('../controllers/appointmentController');


// CREATE APPOINTMENT
router.post(
  '/',
  createAppointment
);


// GET APPOINTMENTS OF DOCTOR
router.get(
  '/doctor/:doctorId',
  getDoctorAppointments
);


// TOGGLE DOCTOR AVAILABILITY
router.put(
  '/doctor/:doctorId/availability',
  toggleAvailability
);

module.exports = router;