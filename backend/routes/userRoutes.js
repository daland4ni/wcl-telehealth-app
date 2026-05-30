const upload = require('../middleware/uploadMiddleware');
const { updateProfile } = require('../controllers/userController');

const express =
  require('express');

const router =
  express.Router();

router.put(
  '/profile/:id',
  upload.single('profilePicture'),
  updateProfile
);

module.exports =
  router;