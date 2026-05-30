console.log('medicalRecordRoutes loaded');
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

router.get('/test', (req, res) => {
  res.json({ message: 'Medical records route works' });
});

module.exports =
  router;