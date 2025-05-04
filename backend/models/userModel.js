// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   email: { 
//     type: String, 
//     required: [true, 'Email is required'], 
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters long']
//   },
//   name: { 
//     type: String, 
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   experienceLevel: { 
//     type: String,
//     enum: ['beginner', 'intermediate', 'advanced'],
//     default: 'beginner'
//   },
//   weeklyAvailableHours: { 
//     type: Number,
//     default: 10
//   },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   },
//   lastLogin: {
//     type: Date
//   }
// });

// // Pre-save hook to hash password
// userSchema.pre('save', async function(next) {
//   // Only hash the password if it's modified (or new)
//   if (!this.isModified('password')) return next();
  
//   try {
//     // Generate salt
//     const salt = await bcrypt.genSalt(10);
//     // Hash password
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  }
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;