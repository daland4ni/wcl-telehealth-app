const express = require('express');
const router = express.Router();

const {
  getDoctors, getAllDoctors
} = require('../controllers/doctorController');

router.get('/', getDoctors);
router.get('/all', getAllDoctors);

module.exports = router;