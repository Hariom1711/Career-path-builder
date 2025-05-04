
// const axios = require('axios');

// /**
//  * Build prompt for OpenAI API
//  * @param {Object} userData - User input data
//  * @returns {string} - Formatted prompt
//  */
// const buildPrompt = (userData) => {
//   return `
// You are a career advisor specializing in technology career planning.
// Create a detailed career roadmap for someone who wants to become a ${userData.careerGoal}.

// Current skills: ${userData.currentSkills.join(', ') || 'None'}
// Available study time: ${userData.weeklyHours} hours per week
// Target completion time: ${userData.timeline} months
// Experience level: ${userData.experienceLevel}

// For each skill in the roadmap, include:
// 1. A brief description
// 2. Estimated hours to learn
// 3. Prerequisites (if any)
// 4. 2-3 specific learning resources (courses, books, tutorials)

// Also include 3-5 project milestones that demonstrate progress.

// Format your response as valid JSON following this structure:
// {
//   "skills": [
//     {
//       "name": "skill name",
//       "description": "brief description",
//       "estimated_hours": 40,
//       "dependencies": ["prerequisite skills"],
//       "resources": [
//         {"type": "course", "title": "resource name", "url": "resource URL"},
//         {"type": "book", "title": "book name", "description": "brief description"}
//       ]
//     }
//   ],
//   "milestones": [
//     {
//       "name": "milestone name",
//       "description": "milestone description",
//       "skills_required": ["skill1", "skill2"],
//       "suggested_project": "project description"
//     }
//   ]
// }

// Ensure all skill names in dependencies and skills_required are exact matches to the skill names you've defined. Do not include any markdown formatting or explanations outside the JSON structure.`;
// };

// /**
//  * Call OpenAI API to generate roadmap
//  * @param {Object} userData - User input data
//  * @returns {Object} - Processed roadmap data
//  */
// const generateRoadmap = async (userData) => {
//   try {
//     // Your JWT token
//     const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTA4YWRjZjk1ZjI4NmZkNDRkYzUzNSIsImlhdCI6MTc0NjEwNTY2NSwiZXhwIjoxNzQ4Njk3NjY1fQ.2bHbZ2gOfs0MKhgOMUQh7bBEluob6Pl17qAWG2F4v7w";
    
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: "gpt-3.5-turbo-16k",
//         messages: [
//           {
//             role: "system",
//             content: "You are a career advisor specializing in technology career planning."
//           },
//           {
//             role: "user",
//             content: buildPrompt(userData)
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 3000
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//           'X-Auth-Token': authToken // Add your JWT token here
//         }
//       }
//     );

//     // Extract and parse the response
//     const responseText = response.data.choices[0].message.content.trim();
    
//     // Find and extract JSON content
//     const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('Failed to extract JSON from AI response');
//     }
    
//     const roadmapData = JSON.parse(jsonMatch[0]);
//     return validateAndFormatRoadmap(roadmapData, userData);
//   } catch (error) {
//     console.error("AI Service Error:", error);
//     if (error.response) {
//       console.error("OpenAI API Error:", error.response.data);
//     }
//     throw new Error("Failed to generate roadmap: " + (error.message || 'Unknown error'));
//   }
// };

// /**
//  * Validate and format the roadmap data
//  * @param {Object} roadmapData - Raw roadmap data from OpenAI
//  * @param {Object} userData - Original user input
//  * @returns {Object} - Formatted roadmap
//  */
// const validateAndFormatRoadmap = (roadmapData, userData) => {
//   // Basic validation
//   if (!roadmapData.skills || !Array.isArray(roadmapData.skills) || roadmapData.skills.length === 0) {
//     throw new Error('Invalid roadmap: No skills provided');
//   }
  
//   if (!roadmapData.milestones || !Array.isArray(roadmapData.milestones)) {
//     roadmapData.milestones = []; // Ensure milestones is at least an empty array
//   }
  
//   // Format and clean skills
//   const skills = roadmapData.skills.map(skill => ({
//     name: skill.name,
//     description: skill.description || `Learn ${skill.name}`,
//     estimatedHours: skill.estimated_hours || 10,
//     dependencies: Array.isArray(skill.dependencies) ? skill.dependencies : [],
//     resources: Array.isArray(skill.resources) ? skill.resources.map(res => ({
//       type: res.type || 'other',
//       title: res.title || 'Resource',
//       url: res.url || '',
//       description: res.description || ''
//     })) : [],
//     completed: false
//   }));
  
//   // Format and clean milestones
//   const milestones = roadmapData.milestones.map(milestone => ({
//     name: milestone.name,
//     description: milestone.description || `Complete ${milestone.name}`,
//     skillsRequired: milestone.skills_required || [],
//     suggestedProject: milestone.suggested_project || '',
//     completed: false
//   }));
  
//   return {
//     careerGoal: userData.careerGoal,
//     timeline: userData.timeline,
//     weeklyHours: userData.weeklyHours,
//     currentSkills: userData.currentSkills,
//     skills,
//     milestones
//   };
// };

// module.exports = { generateRoadmap };

// services/aiService.js - Using Hugging Face instead of OpenAI
const axios = require('axios');

/**
 * Build prompt for AI API
 * @param {Object} userData - User input data
 * @returns {string} - Formatted prompt
 */
const buildPrompt = (userData) => {
  return `
You are a career advisor specializing in technology careers.
Create a detailed career roadmap for someone with the following profile:

Current role: ${userData.currentRole || 'None'}
Target role: ${userData.targetRole}
Experience level: ${userData.experienceLevel}
Current skills: ${userData.currentSkills?.join(', ') || 'None'}
Timeline: ${userData.timeline || '1 year'}

The roadmap should include:
- Key skills to develop (technical and soft skills)
- Learning resources for each skill
- Milestones and checkpoints
- Recommended projects to build
- Estimated timeline for each phase
`;
};

/**
 * Generate career roadmap using Hugging Face Inference API
 * @param {Object} userData - User input data
 * @returns {Object} - Generated roadmap
 */
const generateRoadmap = async (userData) => {
    try {
      const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY;
      const model = "google/flan-t5-base"; // Try this model first
      
      const prompt = buildPrompt(userData);
      
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          inputs: prompt,
          // Simpler parameters for more compatibility
          parameters: {
            max_length: 1024,
            temperature: 0.7,
            num_return_sequences: 1
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${huggingFaceApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // The response format depends on the model
      let rawResponse;
      if (Array.isArray(response.data)) {
        rawResponse = response.data[0].generated_text;
      } else if (response.data.generated_text) {
        rawResponse = response.data.generated_text;
      } else {
        rawResponse = response.data; // Fallback
      }
      
      // Parse the response
      const parsedRoadmap = parseRoadmapResponse(rawResponse, userData);
      
      return parsedRoadmap;
    } catch (error) {
      // Better error handling
      console.error('Error generating roadmap:', error.response ? error.response.data : error);
      throw new Error('Failed to generate roadmap:' );
    }
  };
/**
 * Parse the AI response into a structured roadmap
 * @param {string} rawText - Raw text from AI
 * @param {Object} userData - Original user data
 * @returns {Object} - Structured roadmap
 */
const parseRoadmapResponse = (rawText, userData) => {
  // You'll need to implement parsing logic here
  // This is a simple example - you may need more sophisticated parsing
  
  // Basic structure to return
  return {
    title: `${userData.currentRole || 'Beginner'} to ${userData.targetRole}`,
    description: `Customized career path from ${userData.currentRole || 'Beginner'} to ${userData.targetRole} over ${userData.timeline || '1 year'}`,
    skills: extractSkills(rawText),
    milestones: extractMilestones(rawText),
    resources: extractResources(rawText)
  };
};

// Helper functions to extract structured data from AI response
const extractSkills = (text) => {
  // Implement extraction logic
  // Basic example - would need improvement
  const skillsSection = text.match(/Key skills[\s\S]*?(?=Learning resources|Milestones|Recommended projects|Estimated timeline|$)/i);
  if (!skillsSection) return [];
  
  // Extract bullet points or lists
  const skills = skillsSection[0].match(/[•\-\*]\s*(.*?)(?=\n[•\-\*]|\n\n|$)/g) || [];
  return skills.map(skill => ({
    name: skill.replace(/[•\-\*]\s*/, '').trim(),
    status: 'not-started'
  }));
};

const extractMilestones = (text) => {
  // Similar implementation
  return [];
};

const extractResources = (text) => {
  // Similar implementation
  return [];
};

module.exports = {
  generateRoadmap
};