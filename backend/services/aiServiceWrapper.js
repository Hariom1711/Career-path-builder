/**
 * AI Service Wrapper
 * Tries different AI services and falls back to template-based generation if they fail
 */

const huggingFaceService = require('./huggingFaceService');
const fallbackService = require('./fallbackService');

// Track API failures to avoid repeated attempts within a session
let apiFailureStatus = {
  huggingFace: false,
  lastCheck: null
};

/**
 * Reset API failure status after some cooldown period (6 hours)
 */
const resetApiStatusIfNeeded = () => {
  const now = new Date();
  const sixHoursAgo = new Date(now.getTime() - (6 * 60 * 60 * 1000));
  
  if (apiFailureStatus.lastCheck && apiFailureStatus.lastCheck < sixHoursAgo) {
    apiFailureStatus = {
      huggingFace: false,
      lastCheck: null
    };
  }
};

/**
 * Generate roadmap with API service, falling back to template-based if needed
 * @param {Object} userData - User input data
 * @returns {Object} - Generated roadmap data
 */
const generateRoadmap = async (userData) => {
  // Reset API failure status if enough time has passed
  resetApiStatusIfNeeded();
  
  // If we know Hugging Face API is failing, skip the attempt
  if (apiFailureStatus.huggingFace) {
    console.log('Skipping Hugging Face API due to previous failures, using fallback');
    return await fallbackService.generateRoadmap(userData);
  }
  
  try {
    // Try Hugging Face API first
    console.log('Attempting to generate roadmap using Hugging Face API');
    const roadmapData = await huggingFaceService.generateRoadmap(userData);
    return roadmapData;
  } catch (error) {
    // Mark API as failing
    apiFailureStatus.huggingFace = true;
    apiFailureStatus.lastCheck = new Date();
    
    console.log('Hugging Face API failed, falling back to template-based generation');
    console.error('API Error:', error.message);
    
    // Use fallback service
    return await fallbackService.generateRoadmap(userData);
  }
};

/**
 * Check if API service is available without making a full request
 * @returns {Promise<boolean>} - Whether the API service appears to be available
 */
const checkApiAvailability = async () => {
  // Skip check if we already know it's failing
  if (apiFailureStatus.huggingFace) {
    return false;
  }
  
  try {
    // Make a lightweight request to check if the API is responsive
    // Example implementation - in a real app you might have a specific endpoint for this
    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      { 
        method: 'HEAD',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        }
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error('API availability check failed:', error);
    return false;
  }
};

module.exports = {
  generateRoadmap,
  checkApiAvailability
};