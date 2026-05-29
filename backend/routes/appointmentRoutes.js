const express = require('express');

const router = express.Router();

const {
    createAppointment,
    getDoctorAppointments,
    toggleAvailability,
    getPatientAppointments,
    cancelAppointment,
    rescheduleAppointment,
    startConsultation,
} = require('../controllers/appointmentController');


// CREATE APPOINTMENT
router.post(
    '/',
    createAppointment
);

// GET APPOINTMENTS OF PATIENT
router.get(
    '/patient/:patientId',
    getPatientAppointments
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

router.put(
    '/cancel/:id',
    cancelAppointment
);

router.put(
    '/reschedule/:id',
    rescheduleAppointment
);

router.put(
    '/:id/start-consultation',
    startConsultation
)

module.exports = router;