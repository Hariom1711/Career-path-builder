const axios = require('axios');

/**
 * Build prompt for Hugging Face API
 * @param {Object} userData - User input data
 * @returns {string} - Formatted prompt
 */


const buildPrompt = (userData) => {
  console.log(userData,"userdata")
  const { 
    currentRole, 
    targetRole, 
    experience, 
    education, 
    skills, 
    timeframe, 
    learningPreferences 
  } = userData;

  return `
As a career advisor specializing in technology, create a detailed career roadmap for a professional with the following information:

Current Role: ${currentRole}
Target Role: ${targetRole}
Experience Level: ${experience}
Education Background: ${education}
Current Skills: ${skills.join(', ')}
Timeframe: ${timeframe}
Learning Preferences: ${learningPreferences}

Please provide a structured career roadmap including:
1. Essential skills to acquire (technical and soft skills)
2. Learning milestones with timeline
3. Recommended resources (courses, books, or projects)
4. Practical projects to build
5. Industry certifications to pursue if applicable
6. Networking strategies
7. Job search advice

The roadmap should be practical, realistic for the timeframe, and focused on modern industry requirements.
`;
};

/**
 * Generate roadmap using Hugging Face API
 * @param {Object} userData - User input data 
 * @returns {Object} - Generated roadmap data
 */
const generateRoadmap = async (userData) => {
  try {
    // Using a free Hugging Face model
    const model = "google/flan-t5-base"; // Free to use model
    
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        inputs: buildPrompt(userData),
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Parse the response
    const aiResponse = response.data[0]?.generated_text || response.data?.generated_text;
    console.log('Raw Hugging Face response:', JSON.stringify(response.data, null, 2));

    if (!aiResponse) {
      throw new Error('No valid response from Hugging Face API');
    }
console.log('AI Response:', aiResponse, userData);
    // Process the response into a structured roadmap
    const roadmapData = processRoadmapResponse(aiResponse, userData);
    return roadmapData;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error('Failed to generate roadmap. Please try again laterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.');
  }
};

/**
 * Process the AI response text into structured roadmap data
 * @param {string} responseText - Raw AI response  
 * @param {Object} userData - Original user input
 * @returns {Object} - Structured roadmap data
 */
const processRoadmapResponse = (responseText, userData) => {
  // Default structure for roadmap
  const roadmapData = {
    title: `${userData.currentRole} to ${userData.targetRole} Roadmap`,
    description: `Career transition plan from ${userData.currentRole} to ${userData.targetRole} within ${userData.timeframe}`,
    skills: [],
    milestones: [],
    resources: []
  };

  try {
    // Extract skills section
    const skillsMatch = responseText.match(/Essential skills to acquire([\s\S]*?)(?=Learning milestones|Recommended resources|Practical projects|$)/i);
    if (skillsMatch && skillsMatch[1]) {
      const skillsText = skillsMatch[1].trim();
      // Extract skills - looking for list items with bullets, numbers, or dashes
      const skillsList = skillsText.split(/\n/).filter(line => 
        line.trim().match(/^[•\-\d\.\*]\s+(.+)/)
      );
      
      roadmapData.skills = skillsList.map(skill => {
        const cleanedSkill = skill.replace(/^[•\-\d\.\*]\s+/, '').trim();
        return {
          name: cleanedSkill,
          status: 'not-started'
        };
      });
    }

    // Extract milestones section
    const milestonesMatch = responseText.match(/Learning milestones([\s\S]*?)(?=Recommended resources|Practical projects|$)/i);
    if (milestonesMatch && milestonesMatch[1]) {
      const milestonesText = milestonesMatch[1].trim();
      // Extract milestones - looking for list items with bullets, numbers, or dashes
      const milestonesList = milestonesText.split(/\n/).filter(line => 
        line.trim().match(/^[•\-\d\.\*]\s+(.+)/)
      );
      
      roadmapData.milestones = milestonesList.map((milestone, index) => {
        const cleanedMilestone = milestone.replace(/^[•\-\d\.\*]\s+/, '').trim();
        // Try to extract timeline if available
        const timelineMatch = cleanedMilestone.match(/(Month \d+|Week \d+|Q\d|Year \d+|Quarter \d+):/i);
        const timeline = timelineMatch ? timelineMatch[1] : `Month ${Math.floor(index / 2) + 1}`;
        const description = timelineMatch ? 
          cleanedMilestone.replace(timelineMatch[0], '').trim() : 
          cleanedMilestone;
        
        return {
          title: `Milestone ${index + 1}`,
          description: description,
          timeline: timeline,
          status: 'not-started'
        };
      });
    }

    // Extract resources section
    const resourcesMatch = responseText.match(/Recommended resources([\s\S]*?)(?=Practical projects|Networking strategies|$)/i);
    if (resourcesMatch && resourcesMatch[1]) {
      const resourcesText = resourcesMatch[1].trim();
      // Extract resources - looking for list items
      const resourcesList = resourcesText.split(/\n/).filter(line => 
        line.trim().match(/^[•\-\d\.\*]\s+(.+)/)
      );
      
      roadmapData.resources = resourcesList.map(resource => {
        const cleanedResource = resource.replace(/^[•\-\d\.\*]\s+/, '').trim();
        
        // Try to identify resource type
        let type = 'other';
        if (cleanedResource.toLowerCase().includes('course') || 
            cleanedResource.toLowerCase().includes('udemy') || 
            cleanedResource.toLowerCase().includes('coursera')) {
          type = 'course';
        } else if (cleanedResource.toLowerCase().includes('book')) {
          type = 'book';
        } else if (cleanedResource.toLowerCase().includes('tutorial')) {
          type = 'tutorial';
        } else if (cleanedResource.toLowerCase().includes('project')) {
          type = 'project';
        } else if (cleanedResource.toLowerCase().includes('video') || 
                  cleanedResource.toLowerCase().includes('youtube')) {
          type = 'video';
        } else if (cleanedResource.toLowerCase().includes('article') || 
                  cleanedResource.toLowerCase().includes('blog')) {
          type = 'article';
        }
        
        return {
          title: cleanedResource,
          type: type,
          completed: false
        };
      });
    }

    // Extract projects section separately if available
    const projectsMatch = responseText.match(/Practical projects([\s\S]*?)(?=Industry certifications|Networking strategies|$)/i);
    if (projectsMatch && projectsMatch[1]) {
      const projectsText = projectsMatch[1].trim();
      const projectsList = projectsText.split(/\n/).filter(line => 
        line.trim().match(/^[•\-\d\.\*]\s+(.+)/)
      );
      
      projectsList.forEach(project => {
        const cleanedProject = project.replace(/^[•\-\d\.\*]\s+/, '').trim();
        roadmapData.resources.push({
          title: cleanedProject,
          type: 'project',
          completed: false
        });
      });
    }

    return roadmapData;
  } catch (error) {
    console.error('Error processing roadmap response:', error);
    // Return a simplified version if parsing fails
    return {
      title: `${userData.currentRole} to ${userData.targetRole} Roadmap`,
      description: responseText.substring(0, 200) + '...',
      skills: [],
      milestones: [],
      resources: []
    };
  }
};

module.exports = {
  generateRoadmap
};