const roadmapTemplates = require('../data/roadmapTemplates');

/**
 * Template service to replace AI generation with predefined career roadmaps
 */

/**
 * Get a roadmap template based on career path
 * @param {Object} userData - User input data containing careerPath
 * @returns {Object} - Roadmap template
 */
const getRoadmapTemplate = (userData) => {
  const { careerPath } = userData;
  
  // Convert to lowercase and remove spaces for matching
  const normalizedPath = careerPath.toLowerCase().replace(/[\s_]+/g, '-');
  console.log('Normalized career path:', normalizedPath);
  // Map common variations to our template keys
  const pathMapping = {
    'front-end': 'frontend-developer',
    'frontend': 'frontend-developer',
    'front': 'frontend-developer',
    'back-end': 'backend-developer',
    'backend': 'backend-developer',
    'fullstack': 'fullstack-developer',
    'full-stack': 'fullstack-developer',
    'devops': 'devops-engineer',
    'data-science': 'data-scientist',
    'data-science': 'data-science-engineer'
  };
  
  // Try to find an exact match or use the mapping
  const templateKey = pathMapping[normalizedPath] || normalizedPath;
  console.log('Template key:', templateKey);
  // Check if template exists
  if (roadmapTemplates[templateKey]) {
    console.log('Found template for:', templateKey);
    return roadmapTemplates[templateKey];
  }
  
  // If not found, return a default template (fullstack)
  return roadmapTemplates['fullstack-developer'];
};

/**
 * Generate a roadmap based on user input
 * @param {Object} userData - User input data
 * @returns {Object} - Generated roadmap
 */
const generateRoadmap = (userData) => {
  const template = getRoadmapTemplate(userData);
  
  // Customize the template with user data
  const customizedRoadmap = {
    ...template,
    userExperience: userData.experienceLevel || 'beginner',
    timeCommitment: userData.weeklyHours || 10,
    // Add user's existing skills if provided
    userSkills: userData.existingSkills || []
  };
  
  return customizedRoadmap;
};

/**
 * List available career paths
 * @returns {Array} - List of available career paths
 */
const getAvailableCareerPaths = () => {
  return [
    { id: 'frontend-developer', name: 'Frontend Developer' },
    { id: 'backend-developer', name: 'Backend Developer' },
    { id: 'fullstack-developer', name: 'Full Stack Developer' },
    { id: 'devops-engineer', name: 'DevOps Engineer' },
    { id: 'data-scientist', name: 'Data Scientist' }
  ];
};

module.exports = {
  generateRoadmap,
  getAvailableCareerPaths
};