// const express = require('express');
// const { 
//   getRoadmapProgress,
//   addProgressEntry,
//   deleteProgressEntry,
//   getUserProgress
// } = require('../controllers/progressController');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// // All routes are protected
// router.use(protect);

// // Get all progress for user
// router.get('/', getUserProgress);

// // Get progress for specific roadmap
// router.get('/:roadmapId', getRoadmapProgress);

// // Add progress entry
// router.post('/:roadmapId/entries', addProgressEntry);

// // Delete progress entry
// router.delete('/:roadmapId/entries/:entryId', deleteProgressEntry);

// module.exports = router;

const express = require('express');
const { 
  getRoadmapProgress,
  addProgressEntry,
  deleteProgressEntry,
  getUserProgress
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.get('/', protect, getUserProgress);
router.route('/:roadmapId')
  .get(protect, getRoadmapProgress)
  .post(protect, addProgressEntry);

router.delete('/:progressId', protect, deleteProgressEntry);

module.exports = router;