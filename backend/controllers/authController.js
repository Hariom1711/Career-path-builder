// const User = require('../models/userModel');
// const { generateToken } = require('../utils/jwtUtils');

// /**
//  * @desc    Register a new user
//  * @route   POST /api/auth/register
//  * @access  Public
//  */
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, experienceLevel, weeklyAvailableHours } = req.body;

//     // Check if required fields are provided
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide name, email, and password'
//       });
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     // Create new user
//     const user = await User.create({
//       name,
//       email,
//       password,
//       experienceLevel: experienceLevel || 'beginner',
//       weeklyAvailableHours: weeklyAvailableHours || 10
//     });

//     if (user) {
//       res.status(201).json({
//         success: true,
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           experienceLevel: user.experienceLevel,
//           weeklyAvailableHours: user.weeklyAvailableHours
//         },
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: 'Invalid user data'
//       });
//     }
//   } catch (error) {
//     console.error('Error in registerUser:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// /**
//  * @desc    Login user
//  * @route   POST /api/auth/login
//  * @access  Public
//  */
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email and password'
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
    
//     // Check if user exists and password matches
//     if (user && (await user.comparePassword(password))) {
//       // Update lastLogin
//       user.lastLogin = Date.now();
//       await user.save();
      
//       res.json({
//         success: true,
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           experienceLevel: user.experienceLevel,
//           weeklyAvailableHours: user.weeklyAvailableHours
//         },
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }
//   } catch (error) {
//     console.error('Error in loginUser:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// /**
//  * @desc    Get user profile
//  * @route   GET /api/auth/profile
//  * @access  Private
//  */
// const getUserProfile = async (req, res) => {
//   try {
//     // User is already attached to req object by auth middleware
//     res.json({
//       success: true,
//       user: {
//         _id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//         experienceLevel: req.user.experienceLevel,
//         weeklyAvailableHours: req.user.weeklyAvailableHours,
//         createdAt: req.user.createdAt,
//         lastLogin: req.user.lastLogin
//       }
//     });
//   } catch (error) {
//     console.error('Error in getUserProfile:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// /**
//  * @desc    Update user profile
//  * @route   PUT /api/auth/profile
//  * @access  Private
//  */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Update fields if provided
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.experienceLevel = req.body.experienceLevel || user.experienceLevel;
//     user.weeklyAvailableHours = req.body.weeklyAvailableHours || user.weeklyAvailableHours;

//     // Update password if provided
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       success: true,
//       user: {
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         experienceLevel: updatedUser.experienceLevel,
//         weeklyAvailableHours: updatedUser.weeklyAvailableHours
//       },
//       token: generateToken(updatedUser._id)
//     });
//   } catch (error) {
//     console.error('Error in updateUserProfile:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile
// };


const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};