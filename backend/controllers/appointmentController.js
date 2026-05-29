const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Availability = require('../models/Availability');

// CREATE APPOINTMENT
const createAppointment =
    async (req, res) => {
        try {
            const {
                patient,
                doctor,
                slotId,
                consentToShareRecords,
            } = req.body;

            // GET SLOT
            const slot =
                await Availability.findById(
                    slotId
                );

            if (!slot) {
                return res.status(404).json({
                    message:
                        'Slot not found',
                });
            }

            // SLOT ALREADY BOOKED
            if (slot.isBooked) {
                return res.status(400).json({
                    message:
                        'Slot already booked',
                });
            }

            // CHECK CONFLICTS
            const existingAppointment =
                await Appointment.findOne({
                    patient,
                    appointmentDate:
                        slot.date,
                    startTime:
                        slot.startTime,
                    status: {
                        $in: [
                            'pending',
                            'confirmed',
                        ],
                    },
                });

            if (existingAppointment) {
                return res.status(400).json({
                    message:
                        'You already have an appointment during this schedule.',
                });
            }

            // CREATE APPOINTMENT
            const appointment =
                await Appointment.create({
                    patient,
                    doctor,
                    availabilitySlot:
                        slot._id,
                    appointmentDate:
                        slot.date,
                    startTime:
                        slot.startTime,
                    endTime:
                        slot.endTime,
                    consentToShareRecords,
                });

            // MARK SLOT BOOKED
            slot.isBooked = true;

            await slot.save();

            res.status(201).json(
                appointment
            );
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };


// TOGGLE AVAILABILITY
const toggleAvailability =
    async (req, res) => {
        try {
            const doctor =
                await User.findById(
                    req.params.doctorId
                );

            if (!doctor) {
                return res.status(404).json({
                    message: 'Doctor not found',
                });
            }

            doctor.isAvailable =
                !doctor.isAvailable;

            await doctor.save();

            res.status(200).json({
                isAvailable:
                    doctor.isAvailable,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };

// GET PATIENT APPOINTMENTS
const getPatientAppointments =
    async (req, res) => {
        try {

            const appointments =
                await Appointment.find({
                    patient:
                        req.params.patientId,
                })
                    .populate(
                        'doctor',
                        'name specialization'
                    )
                    .sort({
                        createdAt: -1,
                    });

            res.status(200).json(
                appointments
            );

        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };


// GET DOCTOR APPOINTMENTS
const getDoctorAppointments =
    async (req, res) => {
        try {

            const appointments =
                await Appointment.find({
                    doctor:
                        req.params.doctorId,
                })
                    .populate(
                        'patient',
                        'name email'
                    )
                    .sort({
                        createdAt: -1,
                    });

            res.status(200).json(
                appointments
            );

        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };

// CANCEL APPOINTMENT
const cancelAppointment =
    async (req, res) => {

        try {

            const appointment =
                await Appointment.findById(
                    req.params.id
                );

            if (!appointment) {
                return res.status(404).json({
                    message:
                        'Appointment not found',
                });
            }

            appointment.status =
                'cancelled';

            await appointment.save();

            // FREE SLOT AGAIN
            const slot =
                await Availability.findById(
                    appointment.slotId
                );

            if (slot) {

                slot.isBooked = false;

                await slot.save();
            }

            res.status(200).json({
                message:
                    'Appointment cancelled successfully',
            });

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });
        }
    };


// RESCHEDULE APPOINTMENT
const rescheduleAppointment =
    async (req, res) => {

        try {

            const {
                newSlotId,
            } = req.body;

            const appointment =
                await Appointment.findById(
                    req.params.id
                );

            if (!appointment) {
                return res.status(404).json({
                    message:
                        'Appointment not found',
                });
            }

            // OLD SLOT
            const oldSlot =
                await Availability.findById(
                    appointment.slotId
                );

            if (oldSlot) {

                oldSlot.isBooked = false;

                await oldSlot.save();
            }

            // NEW SLOT
            const newSlot =
                await Availability.findById(
                    newSlotId
                );

            if (!newSlot) {
                return res.status(404).json({
                    message:
                        'New slot not found',
                });
            }

            if (newSlot.isBooked) {
                return res.status(400).json({
                    message:
                        'Slot already booked',
                });
            }

            newSlot.isBooked = true;

            await newSlot.save();

            // UPDATE APPOINTMENT
            appointment.slotId =
                newSlot._id;

            appointment.appointmentDate =
                newSlot.date;

            appointment.startTime =
                newSlot.startTime;

            appointment.endTime =
                newSlot.endTime;

            await appointment.save();

            res.status(200).json({
                message:
                    'Appointment rescheduled successfully',
            });

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });
        }
    };

const startConsultation =
    async (req, res) => {

        try {

            const appointment =
                await Appointment.findById(
                    req.params.id
                );

            if (!appointment) {
                return res.status(404).json({
                    message:
                        'Appointment not found',
                });
            }

            appointment.consultationStarted =
                true;

            await appointment.save();

            res.status(200).json({
                message:
                    'Consultation started',
            });

        } catch (error) {

            res.status(500).json({
                message: error.message,
            });
        }
    };

module.exports = {
    createAppointment,
    getDoctorAppointments,
    toggleAvailability,
    getPatientAppointments,
    cancelAppointment,
    rescheduleAppointment,
    startConsultation,
};