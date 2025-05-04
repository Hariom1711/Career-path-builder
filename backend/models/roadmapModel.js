// const mongoose = require('mongoose');

// const resourceSchema = new mongoose.Schema({
//   type: { 
//     type: String,
//     enum: ['course', 'book', 'tutorial', 'project', 'video', 'article', 'other'],
//     required: true
//   },
//   title: { 
//     type: String, 
//     required: true 
//   },
//   url: { 
//     type: String 
//   },
//   description: {
//     type: String
//   }
// });

// const skillSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: true 
//   },
//   description: { 
//     type: String 
//   },
//   estimatedHours: { 
//     type: Number 
//   },
//   dependencies: [{ 
//     type: String 
//   }],
//   resources: [resourceSchema],
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Date
//   }
// });

// const milestoneSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: true 
//   },
//   description: {
//     type: String
//   },
//   skillsRequired: [{ 
//     type: String 
//   }],
//   suggestedProject: { 
//     type: String 
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Date
//   }
// });

// const roadmapSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
//     required: true
//   },
//   careerGoal: { 
//     type: String, 
//     required: true 
//   },
//   timeline: { 
//     type: Number,  // in months
//     required: true
//   },
//   currentSkills: [{
//     type: String
//   }],
//   skills: [skillSchema],
//   milestones: [milestoneSchema],
//   weeklyHours: {
//     type: Number,
//     required: true
//   },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   },
//   lastUpdatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Roadmap = mongoose.model('Roadmap', roadmapSchema);

// module.exports = Roadmap;


const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: { 
    type: String,
    enum: ['course', 'book', 'tutorial', 'project', 'video', 'article', 'other'],
    required: true
  },
  title: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String 
  },
  description: { 
    type: String 
  }
});

const skillSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  priority: { 
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  timeEstimate: { 
    type: String 
  },
  resources: [resourceSchema]
});

const milestoneSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  targetDate: { 
    type: String 
  }
});

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  careerGoal: { 
    type: String, 
    required: true 
  },
  estimatedTimeInMonths: { 
    type: Number 
  },
  skills: [skillSchema],
  milestones: [milestoneSchema],
  userExperience: { 
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  timeCommitment: { 
    type: Number,
    default: 10 
  },
  userSkills: [{ 
    type: String 
  }]
}, {
  timestamps: true
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

module.exports = Roadmap;