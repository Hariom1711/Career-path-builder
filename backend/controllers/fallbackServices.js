/**
 * Fallback service for generating roadmaps without AI API
 * Uses predefined templates based on common career paths
 */

// Sample templates for common tech career paths
const careerTemplates = {
  developer: {
    frontend: {
      title: "Frontend Developer Career Roadmap",
      description:
        "A structured path to becoming a professional frontend developer",
      skills: [
        { name: "HTML5", status: "not-started" },
        { name: "CSS3 & Responsive Design", status: "not-started" },
        { name: "JavaScript (ES6+)", status: "not-started" },
        { name: "React.js", status: "not-started" },
        { name: "State Management (Redux/Context)", status: "not-started" },
        { name: "TypeScript", status: "not-started" },
        {
          name: "Testing (Jest, React Testing Library)",
          status: "not-started",
        },
        { name: "Web Performance Optimization", status: "not-started" },
        { name: "Accessibility (WCAG)", status: "not-started" },
        { name: "Modern Build Tools (Webpack, Vite)", status: "not-started" },
      ],
      milestones: [
        {
          title: "Foundation",
          description: "Master HTML, CSS and basic JavaScript",
          timeline: "Month 1-2",
          status: "not-started",
        },
        {
          title: "JavaScript Proficiency",
          description: "Advanced JavaScript and ES6+ features",
          timeline: "Month 3-4",
          status: "not-started",
        },
        {
          title: "Framework Mastery",
          description: "Build projects with React.js",
          timeline: "Month 5-6",
          status: "not-started",
        },
        {
          title: "Professional Skills",
          description: "Testing, TypeScript and advanced state management",
          timeline: "Month 7-9",
          status: "not-started",
        },
        {
          title: "Portfolio Development",
          description: "Create showcase projects and prepare for job search",
          timeline: "Month 10-12",
          status: "not-started",
        },
      ],
      resources: [
        {
          title: "MDN Web Docs - HTML, CSS, JavaScript guides",
          type: "article",
          completed: false,
        },
        {
          title: "JavaScript.info - Modern JavaScript Tutorial",
          type: "tutorial",
          completed: false,
        },
        {
          title: "React Official Documentation",
          type: "article",
          completed: false,
        },
        {
          title: "React - The Complete Guide (Udemy)",
          type: "course",
          completed: false,
        },
        {
          title: "Build a Portfolio Website with React",
          type: "project",
          completed: false,
        },
        {
          title: "Create a Task Management Application",
          type: "project",
          completed: false,
        },
        {
          title: "TypeScript Handbook",
          type: "article",
          completed: false,
        },
        {
          title: "React Testing Library documentation",
          type: "article",
          completed: false,
        },
      ],
    },
    backend: {
      title: "Backend Developer Career Roadmap",
      description:
        "A structured path to becoming a professional backend developer",
      skills: [
        {
          name: "Programming Fundamentals (JavaScript/Python/Java)",
          status: "not-started",
        },
        { name: "Node.js/Express or Python/Django", status: "not-started" },
        { name: "RESTful API Design", status: "not-started" },
        { name: "Database Design (SQL/NoSQL)", status: "not-started" },
        { name: "Authentication & Authorization", status: "not-started" },
        { name: "Testing and Debugging", status: "not-started" },
        { name: "Server Management & Deployment", status: "not-started" },
        { name: "Containerization (Docker)", status: "not-started" },
        { name: "CI/CD Pipelines", status: "not-started" },
        { name: "Cloud Services (AWS/Azure/GCP)", status: "not-started" },
      ],
      milestones: [
        {
          title: "Programming Fundamentals",
          description:
            "Master a backend programming language and basic algorithms",
          timeline: "Month 1-2",
          status: "not-started",
        },
        {
          title: "Backend Framework",
          description: "Learn Node.js/Express or Python/Django",
          timeline: "Month 3-4",
          status: "not-started",
        },
        {
          title: "Database Mastery",
          description: "Work with SQL/NoSQL databases and design schemas",
          timeline: "Month 5-6",
          status: "not-started",
        },
        {
          title: "API Development",
          description: "Create secure RESTful APIs with authentication",
          timeline: "Month 7-8",
          status: "not-started",
        },
        {
          title: "DevOps Skills",
          description: "Learn deployment, Docker, and basic cloud services",
          timeline: "Month 9-12",
          status: "not-started",
        },
      ],
      resources: [
        {
          title: "The Node.js Documentation",
          type: "article",
          completed: false,
        },
        {
          title: "Express.js Documentation",
          type: "article",
          completed: false,
        },
        {
          title: "MongoDB University Free Courses",
          type: "course",
          completed: false,
        },
        {
          title: "RESTful Web Services Cookbook",
          type: "book",
          completed: false,
        },
        {
          title: "Build a Complete RESTful API",
          type: "project",
          completed: false,
        },
        {
          title: "Create an Authentication System",
          type: "project",
          completed: false,
        },
        {
          title: "Docker Documentation",
          type: "article",
          completed: false,
        },
        {
          title: "AWS Free Tier Introduction",
          type: "tutorial",
          completed: false,
        },
      ],
    },
    fullstack: {
      title: "Full Stack Developer Career Roadmap",
      description:
        "A structured path to becoming a professional full stack developer",
      skills: [
        { name: "HTML5/CSS3", status: "not-started" },
        { name: "JavaScript (ES6+)", status: "not-started" },
        {
          name: "Frontend Framework (React/Angular/Vue)",
          status: "not-started",
        },
        { name: "Backend Language & Framework", status: "not-started" },
        { name: "Database Management", status: "not-started" },
        { name: "RESTful API Design", status: "not-started" },
        { name: "Version Control (Git)", status: "not-started" },
        { name: "Testing (Frontend & Backend)", status: "not-started" },
        { name: "Deployment & DevOps Basics", status: "not-started" },
        { name: "Security Best Practices", status: "not-started" },
      ],
      milestones: [
        {
          title: "Frontend Foundation",
          description: "Learn HTML, CSS, and JavaScript fundamentals",
          timeline: "Month 1-3",
          status: "not-started",
        },
        {
          title: "Frontend Framework",
          description: "Master a modern frontend framework like React",
          timeline: "Month 4-6",
          status: "not-started",
        },
        {
          title: "Backend Development",
          description:
            "Learn a backend language and framework (Node.js/Express)",
          timeline: "Month 7-9",
          status: "not-started",
        },
        {
          title: "Database & API Integration",
          description: "Work with databases and connect frontend to backend",
          timeline: "Month 10-12",
          status: "not-started",
        },
        {
          title: "Full Stack Projects",
          description: "Build complete applications and prepare portfolio",
          timeline: "Month 13-15",
          status: "not-started",
        },
      ],
      resources: [
        {
          title: "The Odin Project - Full Stack JavaScript",
          type: "course",
          completed: false,
        },
        {
          title: "Full Stack Open by University of Helsinki",
          type: "course",
          completed: false,
        },
        {
          title: "MERN Stack Front To Back",
          type: "course",
          completed: false,
        },
        {
          title: "JavaScript: The Good Parts",
          type: "book",
          completed: false,
        },
        {
          title: "Build a Social Media Application",
          type: "project",
          completed: false,
        },
        {
          title: "Create an E-commerce Platform",
          type: "project",
          completed: false,
        },
        {
          title: "Git Workflow Documentation",
          type: "article",
          completed: false,
        },
        {
          title: "Web Security Fundamentals",
          type: "article",
          completed: false,
        },
      ],
    },
  },
  data: {
    analyst: {
      title: "Data Analyst Career Roadmap",
      description: "A structured path to becoming a professional data analyst",
      skills: [
        { name: "SQL", status: "not-started" },
        {
          name: "Excel/Google Sheets Advanced Features",
          status: "not-started",
        },
        { name: "Python/R Basics", status: "not-started" },
        { name: "Data Cleaning & Preprocessing", status: "not-started" },
        {
          name: "Data Visualization (Tableau/Power BI)",
          status: "not-started",
        },
        { name: "Statistical Analysis", status: "not-started" },
        { name: "Dashboard Creation", status: "not-started" },
        { name: "Reporting & Communication", status: "not-started" },
        { name: "Business Intelligence Concepts", status: "not-started" },
        { name: "Basic Machine Learning Understanding", status: "not-started" },
      ],
      milestones: [
        {
          title: "Data Foundation",
          description: "Learn SQL and Excel/Sheets advanced techniques",
          timeline: "Month 1-2",
          status: "not-started",
        },
        {
          title: "Analysis Tools",
          description: "Master Python/R for data manipulation (pandas/dplyr)",
          timeline: "Month 3-4",
          status: "not-started",
        },
        {
          title: "Visualization Skills",
          description: "Learn data visualization tools and techniques",
          timeline: "Month 5-6",
          status: "not-started",
        },
        {
          title: "Statistical Knowledge",
          description: "Understand statistical methods for data analysis",
          timeline: "Month 7-9",
          status: "not-started",
        },
        {
          title: "Portfolio Development",
          description: "Create analysis projects showcasing all skills",
          timeline: "Month 10-12",
          status: "not-started",
        },
      ],
      resources: [
        {
          title: "SQL for Data Science - Coursera",
          type: "course",
          completed: false,
        },
        {
          title: "Excel Tips for Data Analysis - YouTube Playlist",
          type: "video",
          completed: false,
        },
        {
          title: "Pandas Documentation",
          type: "article",
          completed: false,
        },
        {
          title: "R for Data Science - Book",
          type: "book",
          completed: false,
        },
        {
          title: "Tableau Public Tutorials",
          type: "tutorial",
          completed: false,
        },
        {
          title: "Power BI Guided Learning - Microsoft",
          type: "course",
          completed: false,
        },
        {
          title: "Khan Academy Statistics and Probability",
          type: "course",
          completed: false,
        },
        {
          title: "Build a Business Dashboard with Power BI",
          type: "project",
          completed: false,
        },
        {
          title: "Capstone: Data Analytics Portfolio Project",
          type: "project",
          completed: false,
        },
      ],
    },
  },
};
