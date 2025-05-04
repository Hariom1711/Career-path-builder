// const Roadmap = require('../models/roadmapModel');
// const Progress = require('../models/progressModel');
// const { generateRoadmap } = require('../services/aiService');

// /**
//  * @desc    Create a new roadmap
//  * @route   POST /api/roadmaps
//  * @access  Private
//  */
// const createRoadmap = async (req, res) => {
//   try {
//     const { careerGoal, timeline, weeklyHours, currentSkills = [], experienceLevel } = req.body;

//     // Validate input
//     if (!careerGoal || !timeline || !weeklyHours) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide careerGoal, timeline, and weeklyHours'
//       });
//     }

//     // Generate roadmap using AI service
//     const roadmapData = await generateRoadmap({
//       careerGoal,
//       timeline,
//       weeklyHours,
//       currentSkills,
//       experienceLevel: experienceLevel || req.user.experienceLevel
//     });

//     // Create roadmap in database
//     const roadmap = await Roadmap.create({
//       userId: req.user._id,
//       careerGoal: roadmapData.careerGoal,
//       timeline: roadmapData.timeline,
//       weeklyHours: roadmapData.weeklyHours,
//       currentSkills: roadmapData.currentSkills,
//       skills: roadmapData.skills,
//       milestones: roadmapData.milestones
//     });

//     // Create initial progress tracking for this roadmap
//     await Progress.create({
//       userId: req.user._id,
//       roadmapId: roadmap._id,
//       totalHoursSpent: 0,
//       completedSkills: [],
//       completedMilestones: [],
//       entries: []
//     });

//     res.status(201).json({
//       success: true,
//       roadmap
//     });
//   } catch (error) {
//     console.error('Error in createRoadmap:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create roadmap',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// module.exports = {
//     createRoadmap
//   };


const Roadmap = require('../models/roadmapModel');
const Progress = require('../models/progressModel');
const { generateRoadmap, getAvailableCareerPaths } = require('../services/templateService');

/**
 * @desc    Create a new roadmap
 * @route   POST /api/roadmaps
 * @access  Private
 */
const createRoadmap = async (req, res) => {
  try {
    const { careerPath, experienceLevel, weeklyHours, existingSkills } = req.body;

    if (!careerPath) {
      return res.status(400).json({ message: 'Career path is required' });
    }

    // Generate roadmap using template service instead of AI
    const roadmapData = generateRoadmap({
      careerPath,
      experienceLevel,
      weeklyHours,
      existingSkills
    });
// console.log('Generated roadmap data:', roadmapData);   
    // Create roadmap in database
    const roadmap = await Roadmap.create({
      userId: req.user._id,
      title: roadmapData.title,
      description: roadmapData.description,
      careerGoal: roadmapData.careerGoal,
      estimatedTimeInMonths: roadmapData.estimatedTimeInMonths,
      skills: roadmapData.skills,
      milestones: roadmapData.milestones,
      userExperience: roadmapData.userExperience,
      timeCommitment: roadmapData.timeCommitment,
      userSkills: roadmapData.userSkills
    });

    res.status(201).json(roadmap);
  } catch (error) {
    console.error('Error creating roadmap:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all roadmaps for a user
 * @route   GET /api/roadmaps
 * @access  Private
 */
const getUserRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.status(200).json(roadmaps);
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get a specific roadmap by ID
 * @route   GET /api/roadmaps/:id
 * @access  Private
 */
const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    // Check if roadmap belongs to user
    if (roadmap.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this roadmap' });
    }

    res.status(200).json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Update a skill status
 * @route   PATCH /api/roadmaps/:id/skills/:skillId
 * @access  Private
 */
const updateSkillStatus = async (req, res) => {
  try {
    const { completed } = req.body;
    
    const roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    // Check if roadmap belongs to user
    if (roadmap.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this roadmap' });
    }

    // Find skill and update status
    const skill = roadmap.skills.id(req.params.skillId);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    skill.completed = completed;
    await roadmap.save();

    res.status(200).json(roadmap);
  } catch (error) {
    console.error('Error updating skill status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Update a milestone status
 * @route   PATCH /api/roadmaps/:id/milestones/:milestoneId
 * @access  Private
 */
const updateMilestoneStatus = async (req, res) => {
  try {
    const { completed } = req.body;
    
    const roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    // Check if roadmap belongs to user
    if (roadmap.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this roadmap' });
    }

    // Find milestone and update status
    const milestone = roadmap.milestones.id(req.params.milestoneId);
    
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    milestone.completed = completed;
    await roadmap.save();

    res.status(200).json(roadmap);
  } catch (error) {
    console.error('Error updating milestone status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// /**
//  * @desc    Delete a roadmap
//  * @route   DELETE /api/roadmaps/:id
//  * @access  Private
//  */
// const deleteRoadmap = async (req, res) => {
//   try {
//     const roadmap = await Roadmap.findById(req.params.id);
    
//     if (!roadmap) {
//       return res.status(404).json({ message: 'Roadmap not found' });
//     }

//     // Check if roadmap belongs to user
//     if (roadmap.userId.toString() !== req.user._id.toString()) {
//       return res.status(



module.exports = {
    createRoadmap,
    getUserRoadmaps,
    getRoadmapById,
    updateSkillStatus,
    updateMilestoneStatus,
    // deleteRoadmap
    // getAvailableCareerPaths
  };
