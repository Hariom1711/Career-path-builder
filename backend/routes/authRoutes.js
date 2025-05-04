// const express = require('express');
// const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// // Public routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // Protected routes
// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);

// module.exports = router;


const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;