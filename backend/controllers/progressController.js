// const Progress = require('../models/progressModel');
// const Roadmap = require('../models/roadmapModel');

// /**
//  * @desc    Get progress for a specific roadmap
//  * @route   GET /api/progress/:roadmapId
//  * @access  Private
//  */
// const getRoadmapProgress = async (req, res) => {
//   try {
//     const { roadmapId } = req.params;

//     // Verify roadmap exists and belongs to user
//     const roadmap = await Roadmap.findById(roadmapId);
//     if (!roadmap) {
//       return res.status(404).json({
//         success: false,
//         message: 'Roadmap not found'
//       });
//     }

//     // Check if user owns this roadmap
//     if (roadmap.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to access this progress'
//       });
//     }

//     // Get progress
//     let progress = await Progress.findOne({ 
//       userId: req.user._id, 
//       roadmapId 
//     });

//     // If no progress exists yet, create it
//     if (!progress) {
//       progress = await Progress.create({
//         userId: req.user._id,
//         roadmapId,
//         totalHoursSpent: 0,
//         completedSkills: [],
//         completedMilestones: [],
//         entries: []
//       });
//     }

//     res.json({
//       success: true,
//       progress
//     });
//   } catch (error) {
//     console.error('Error in getRoadmapProgress:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// /**
//  * @desc    Add a progress entry
//  * @route   POST /api/progress/:roadmapId/entries
//  * @access  Private
//  */
// const addProgressEntry = async (req, res) => {
//   try {
//     const { roadmapId } = req.params;
//     const { date, hoursSpent, skillsWorkedOn, resourcesCompleted, notes } = req.body;

//     // Validate input
//     if (!hoursSpent || hoursSpent <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide valid hours spent'
//       });
//     }

//     // Verify roadmap exists and belongs to user
//     const roadmap = await Roadmap.findById(roadmapId);
//     if (!roadmap) {
//       return res.status(404).json({
//         success: false,
//         message: 'Roadmap not found'
//       });
//     }

//     // Check if user owns this roadmap
//     if (roadmap.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to update this progress'
//       });
//     }

//     // Find progress document
//     let progress = await Progress.findOne({ userId: req.user._id, roadmapId });

//     // If no progress exists yet, create it
//     if (!progress) {
//       progress = await Progress.create({
//         userId: req.user._id,
//         roadmapId,
//         totalHoursSpent: 0,
//         completedSkills: [],
//         completedMilestones: [],
//         entries: []
//       });
//     }

//     // Create new entry
//     const newEntry = {
//       date: date || Date.now(),
//       hoursSpent,
//       skillsWorkedOn: skillsWorkedOn || [],
//       resourcesCompleted: resourcesCompleted || [],
//       notes: notes || ''
//     };

//     // Add entry to progress and update total hours
//     progress.entries.push(newEntry);
//     progress.totalHoursSpent += hoursSpent;
//     progress.lastUpdatedAt = Date.now();

//     // Save progress
//     await progress.save();

//     res.status(201).json({
//       success: true,
//       message: 'Progress entry added successfully',
//       entry: newEntry,
//       totalHoursSpent: progress.totalHoursSpent
//     });
//   } catch (error) {
//     console.error('Error in addProgressEntry:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// /**
//  * @desc    Delete a progress entry
//  * @route   DELETE /api/progress/:roadmapId/entries/:entryId
//  * @access  Private
//  */
// const deleteProgressEntry = async (req, res) => {
//   try {
//     const { roadmapId, entryId } = req.params;

//     // Find progress document
//     const progress = await Progress.findOne({ userId: req.user._id, roadmapId });

//     if (!progress) {
//       return res.status(404).json({
//         success: false,
//         message: 'Progress not found'
//       });
//     }

//     // Find entry
//     const entryIndex = progress.entries.findIndex(entry => entry._id.toString() === entryId);

//     if (entryIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: 'Entry not found'
//       });
//     }

//     // Adjust total hours
//     const hoursToRemove = progress.entries[entryIndex].hoursSpent;
//     progress.totalHoursSpent -= hoursToRemove;

//     // Remove entry
//     progress.entries.splice(entryIndex, 1);
//     progress.lastUpdatedAt = Date.now();

//     // Save progress
//     await progress.save();

//     res.json({
//       success: true,
//       message: 'Progress entry deleted successfully',
//       totalHoursSpent: progress.totalHoursSpent
//     });
//   } catch (error) {
//     console.error('Error in deleteProgressEntry:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// /**
//  * @desc    Get all progress for a user
//  * @route   GET /api/progress
//  * @access  Private
//  */
// const getUserProgress = async (req, res) => {
//   try {
//     // Find all progress documents for this user
//     const progressList = await Progress.find({ userId: req.user._id });

//     // Get associated roadmap basic info
//     const roadmapIds = progressList.map(p => p.roadmapId);
//     const roadmaps = await Roadmap.find(
//       { _id: { $in: roadmapIds } },
//       { careerGoal: 1, timeline: 1, weeklyHours: 1 }
//     );

//     // Map roadmap info to progress
//     const progressWithRoadmapInfo = progressList.map(progress => {
//       const roadmap = roadmaps.find(r => r._id.toString() === progress.roadmapId.toString());
//       return {
//         _id: progress._id,
//         roadmapId: progress.roadmapId,
//         totalHoursSpent: progress.totalHoursSpent,
//         completedSkills: progress.completedSkills,
//         completedMilestones: progress.completedMilestones,
//         lastUpdatedAt: progress.lastUpdatedAt,
//         careerGoal: roadmap?.careerGoal || 'Unknown',
//         timeline: roadmap?.timeline || 0,
//         weeklyHours: roadmap?.weeklyHours || 0
//       };
//     });

//     res.json({
//       success: true,
//       count: progressWithRoadmapInfo.length,
//       progress: progressWithRoadmapInfo
//     });
//   } catch (error) {
//     console.error('Error in getUserProgress:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// module.exports = {
//   getRoadmapProgress,
//   addProgressEntry,
//   deleteProgressEntry,
//   getUserProgress
// };


const Progress = require('../models/progressModel');
const Roadmap = require('../models/roadmapModel');

/**
 * @desc    Get progress for a specific roadmap
 * @route   GET /api/progress/:roadmapId
 * @access  Private
 */
const getRoadmapProgress = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    // Check if roadmap belongs to user
    if (roadmap.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this roadmap' });
    }

    const progress = await Progress.find({ 
      userId: req.user._id,
      roadmapId: req.params.roadmapId 
    }).sort({ date: -1 });

    res.status(200).json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Add a new progress entry
 * @route   POST /api/progress/:roadmapId
 * @access  Private
 */
const addProgressEntry = async (req, res) => {
    try {
      const { date, hoursSpent, skillsWorkedOn, skillId, notes, milestoneId, status } = req.body;
  
      const roadmap = await Roadmap.findById(req.params.roadmapId);
      
      if (!roadmap) {
        return res.status(404).json({ message: 'Roadmap not found' });
      }
  
      // Check if roadmap belongs to user
      if (roadmap.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to add progress to this roadmap' });
      }
  
      // Fallback: if skillsWorkedOn is not provided, but skillId is, wrap it into an array
      const resolvedSkillsWorkedOn = skillsWorkedOn || (skillId ? [skillId] : []);
  
      const progress = await Progress.create({
        userId: req.user._id,
        roadmapId: req.params.roadmapId,
        date: date || Date.now(),
        hoursSpent,
        skillsWorkedOn: resolvedSkillsWorkedOn,
        notes,
        milestoneId,
        status
      });
  
      res.status(201).json(progress);
    } catch (error) {
      console.error('Error adding progress entry:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

/**
 * @desc    Delete a progress entry
 * @route   DELETE /api/progress/:progressId
 * @access  Private
 */
const deleteProgressEntry = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.progressId);
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    // Check if progress belongs to user
    if (progress.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this progress entry' });
    }

    await progress.deleteOne();

    res.status(200).json({ message: 'Progress entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting progress entry:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all progress for a user
 * @route   GET /api/progress
 * @access  Private
 */
const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id })
      .sort({ date: -1 });
    
    res.status(200).json(progress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getRoadmapProgress,
  addProgressEntry,
  deleteProgressEntry,
  getUserProgress
};