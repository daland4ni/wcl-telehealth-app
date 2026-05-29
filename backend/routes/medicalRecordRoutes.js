const express =
  require('express');

const router =
  express.Router();

const {
  createMedicalRecord,
  getPatientRecords,
  getDoctorRecords,
} = require(
  '../controllers/medicalRecordController'
);

router.post(
  '/',
  createMedicalRecord
);

router.get(
  '/patient/:patientId',
  getPatientRecords
);

router.get(
  '/doctor/:doctorId',
  getDoctorRecords
);

module.exports =
  router;