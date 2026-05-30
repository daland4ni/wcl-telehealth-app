const upload = require('../middleware/uploadMiddleware');
const { updateProfile, getUserById } = require('../controllers/userController');

const express =
  require('express');

const router =
  express.Router();

router.put(
  '/profile/:id',
  upload.single('profilePicture'),
  updateProfile
);


router.get('/:id', getUserById);

module.exports =
  router;