const MedicalRecord =
  require('../models/MedicalRecord');

const Appointment =
  require('../models/Appointment');

const User =
  require('../models/User');


// CREATE MEDICAL RECORD
const createMedicalRecord =
  async (req, res) => {

    try {

      const {
        appointmentId,
        diagnosis,
        consultationNotes,
        prescription,
      } = req.body;

      // FIND APPOINTMENT
      const appointment =
        await Appointment.findById(
          appointmentId
        );

      if (!appointment) {

        return res.status(404)
          .json({
            message:
              'Appointment not found',
          });
      }

      // CHECK IF RECORD EXISTS
      const existingRecord =
        await MedicalRecord.findOne(
          {
            appointment:
              appointmentId,
          }
        );

      if (existingRecord) {

        return res.status(400)
          .json({
            message:
              'Medical record already exists for this appointment',
          });
      }

      // GET PATIENT
      const patient =
        await User.findById(
          appointment.patient
        );

      // CREATE RECORD
      const medicalRecord =
        await MedicalRecord.create(
          {
            patient:
              appointment.patient,

            doctor:
              appointment.doctor,

            appointment:
              appointment._id,

            // PATIENT BASELINE INFO
            height:
              patient.height,

            weight:
              patient.weight,

            birthday:
              patient.birthday,

            allergies:
              patient.allergies,

            chronicIllnesses:
              patient.chronicIllnesses,

            operations:
              patient.operations,

            // CONSULTATION INFO
            diagnosis,

            consultationNotes,

            prescription,
          }
        );

      // MARK APPOINTMENT COMPLETE
      appointment.status =
        'completed';

      await appointment.save();

      res.status(201).json(
        medicalRecord
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


// GET PATIENT RECORDS
const getPatientRecords =
  async (req, res) => {

    try {

      const records =
        await MedicalRecord.find({
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
        records
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


// GET DOCTOR RECORDS
const getDoctorRecords =
  async (req, res) => {

    try {

      const records =
        await MedicalRecord.find({
          doctor:
            req.params.doctorId,
        })
          .populate(
            'patient',
            'name'
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        records
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createMedicalRecord,
  getPatientRecords,
  getDoctorRecords,
};