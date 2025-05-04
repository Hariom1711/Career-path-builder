// const express = require('express');
// const { 
//   createRoadmap,
//   getUserRoadmaps,
//   getRoadmapById,
//   updateSkillStatus,
//   updateMilestoneStatus,
//   deleteRoadmap
// } = require('../controllers/roadmapController');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// // All routes are protected
// router.use(protect);
// console.log({ createRoadmap, getUserRoadmaps });

// router.route('/')
//   .post(createRoadmap)
//   .get(getUserRoadmaps);

// router.route('/:id')
//   .get(getRoadmapById)
//   .delete(deleteRoadmap);

// router.put('/:id/skills/:skillName', updateSkillStatus);
// router.put('/:id/milestones/:milestoneName', updateMilestoneStatus);

// module.exports = router;


const express = require('express');
const { 
  createRoadmap,
  getUserRoadmaps,
  getRoadmapById,
  updateSkillStatus,
  updateMilestoneStatus,
  deleteRoadmap,
  getCareerPaths
} = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
// router.get('/career-paths', getCareerPaths);

// Protected routes
router.route('/')
  .post(protect, createRoadmap)
  .get(protect, getUserRoadmaps);

router.route('/:id')
  .get(protect, getRoadmapById)
//   .delete(protect, deleteRoadmap);

router.patch('/:id/skills/:skillId', protect, updateSkillStatus);
router.patch('/:id/milestones/:milestoneId', protect, updateMilestoneStatus);

module.exports = router;