// const mongoose = require('mongoose');

// const progressEntrySchema = new mongoose.Schema({
//   date: { 
//     type: Date, 
//     default: Date.now 
//   },
//   hoursSpent: { 
//     type: Number, 
//     required: true 
//   },
//   skillsWorkedOn: [{ 
//     type: String 
//   }],
//   resourcesCompleted: [{ 
//     type: String 
//   }],
//   notes: { 
//     type: String 
//   }
// });

// const progressSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
//     required: true
//   },
//   roadmapId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Roadmap',
//     required: true
//   },
//   totalHoursSpent: { 
//     type: Number, 
//     default: 0 
//   },
//   completedSkills: [{ 
//     type: String 
//   }],
//   completedMilestones: [{ 
//     type: String 
//   }],
//   entries: [progressEntrySchema],
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   },
//   lastUpdatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Progress = mongoose.model('Progress', progressSchema);

// module.exports = Progress;


const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  hoursSpent: { 
    type: Number, 
    required: true 
  },
  skillsWorkedOn: [{ 
    type: String 
  }],
  notes: { 
    type: String 
  }
}, {
  timestamps: true
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;