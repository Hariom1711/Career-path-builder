// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// /**
//  * Protect routes - verify token and set user
//  */
// const protect = async (req, res, next) => {
//   let token;

//   // Check if token exists in Authorization header
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Find user and attach to request object (exclude password)
//       req.user = await User.findById(decoded.id).select('-password');

//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'User not found'
//         });
//       }

//       next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized, token failed'
//       });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized, no token'
//     });
//   }
// };

// module.exports = { protect };


const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Protect routes - verify token and set user
 */
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };