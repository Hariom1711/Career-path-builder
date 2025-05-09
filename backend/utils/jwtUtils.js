// const jwt = require('jsonwebtoken');

// /**
//  * Generate JWT token
//  * @param {string} id - User ID
//  * @returns {string} - JWT token
//  */
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d'
//   });
// };

// module.exports = { generateToken };

const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} - JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = { generateToken };