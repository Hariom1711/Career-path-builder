/**
 * Predefined career roadmap templates for different tech roles
 */
const roadmapTemplates = {
    "frontend-developer": {
      title: "Frontend Developer Roadmap",
      description: "A comprehensive path to becoming a professional frontend developer",
      careerGoal: "Frontend Developer",
      estimatedTimeInMonths: 12,
      skills: [
        {
          name: "HTML & CSS Fundamentals",
          description: "Master the basics of web structure and styling",
          priority: "high",
          completed: false,
          timeEstimate: "4 weeks",
          resources: [
            {
              type: "course",
              title: "HTML & CSS Crash Course",
              url: "https://example.com/html-css",
              description: "Comprehensive introduction to HTML5 and CSS3"
            },
            {
              type: "project",
              title: "Personal Portfolio Website",
              description: "Build a responsive portfolio showcasing your work"
            }
          ]
        },
        {
          name: "JavaScript Essentials",
          description: "Learn core JavaScript concepts and DOM manipulation",
          priority: "high",
          completed: false,
          timeEstimate: "8 weeks",
          resources: [
            {
              type: "course",
              title: "Modern JavaScript From The Beginning",
              url: "https://example.com/js-course",
              description: "Complete guide to JavaScript fundamentals and advanced concepts"
            },
            {
              type: "book",
              title: "Eloquent JavaScript",
              url: "https://eloquentjavascript.net/",
              description: "A modern introduction to programming"
            }
          ]
        },
        {
          name: "Frontend Framework",
          description: "Master a frontend framework like React, Vue or Angular",
          priority: "high",
          completed: false,
          timeEstimate: "10 weeks",
          resources: [
            {
              type: "course",
              title: "React - The Complete Guide",
              url: "https://example.com/react-course",
              description: "Comprehensive course on React, Hooks, Redux, and more"
            },
            {
              type: "project",
              title: "Task Management App",
              description: "Build a full-featured task management application"
            }
          ]
        },
        {
          name: "State Management",
          description: "Learn state management solutions like Redux or Context API",
          priority: "medium",
          completed: false,
          timeEstimate: "4 weeks",
          resources: [
            {
              type: "tutorial",
              title: "Redux Toolkit Tutorial",
              url: "https://example.com/redux-toolkit",
              description: "Modern state management with Redux Toolkit"
            }
          ]
        },
        {
          name: "Testing",
          description: "Learn testing frameworks and methodologies",
          priority: "medium",
          completed: false,
          timeEstimate: "3 weeks",
          resources: [
            {
              type: "course",
              title: "JavaScript Testing with Jest",
              url: "https://example.com/jest-course",
              description: "Learn to test JavaScript applications"
            }
          ]
        }
      ],
      milestones: [
        {
          title: "Basic Frontend Projects",
          description: "Complete 3 basic projects using HTML, CSS and vanilla JavaScript",
          completed: false,
          targetDate: "3 months"
        },
        {
          title: "Framework Mastery",
          description: "Build a complex application using a frontend framework",
          completed: false,
          targetDate: "8 months"
        },
        {
          title: "Portfolio Development",
          description: "Create a professional portfolio with multiple projects",
          completed: false,
          targetDate: "12 months"
        }
      ]
    },
    
    "backend-developer": {
      title: "Backend Developer Roadmap",
      description: "A structured path to becoming a proficient backend developer",
      careerGoal: "Backend Developer",
      estimatedTimeInMonths: 12,
      skills: [
        {
          name: "Programming Fundamentals",
          description: "Master a backend language (Node.js, Python, Java, etc.)",
          priority: "high",
          completed: false,
          timeEstimate: "8 weeks",
          resources: [
            {
              type: "course",
              title: "Node.js Complete Guide",
              url: "https://example.com/nodejs-course",
              description: "Comprehensive introduction to Node.js development"
            },
            {
              type: "book",
              title: "Eloquent JavaScript",
              url: "https://eloquentjavascript.net/",
              description: "A solid foundation in JavaScript"
            }
          ]
        },
        {
          name: "Databases",
          description: "Learn SQL and NoSQL database systems",
          priority: "high",
          completed: false,
          timeEstimate: "6 weeks",
          resources: [
            {
              type: "course",
              title: "MongoDB - The Complete Developer's Guide",
              url: "https://example.com/mongodb-course",
              description: "Learn NoSQL database design and operations"
            },
            {
              type: "course",
              title: "SQL Masterclass",
              url: "https://example.com/sql-course",
              description: "Master relational database concepts"
            }
          ]
        },
        {
          name: "API Development",
          description: "Learn to build RESTful and GraphQL APIs",
          priority: "high",
          completed: false,
          timeEstimate: "5 weeks",
          resources: [
            {
              type: "tutorial",
              title: "RESTful API Design",
              url: "https://example.com/rest-api",
              description: "Best practices for API design"
            },
            {
              type: "project",
              title: "E-Commerce API",
              description: "Build a complete API for an e-commerce platform"
            }
          ]
        },
        {
          name: "Authentication & Security",
          description: "Implement secure authentication and authorization",
          priority: "high",
          completed: false,
          timeEstimate: "4 weeks",
          resources: [
            {
              type: "course",
              title: "Web Security Fundamentals",
              url: "https://example.com/web-security",
              description: "Learn to protect applications from common vulnerabilities"
            }
          ]
        },
        {
          name: "Testing & Deployment",
          description: "Learn backend testing and CI/CD pipelines",
          priority: "medium",
          completed: false,
          timeEstimate: "4 weeks",
          resources: [
            {
              type: "tutorial",
              title: "Backend Testing with Jest",
              url: "https://example.com/backend-testing",
              description: "Complete testing guide for Node.js applications"
            },
            {
              type: "course",
              title: "Docker for Developers",
              url: "https://example.com/docker-course",
              description: "Learn containerization for application deployment"
            }
          ]
        }
      ],
      milestones: [
        {
          title: "Basic API Project",
          description: "Build a basic CRUD API with authentication",
          completed: false,
          targetDate: "3 months"
        },
        {
          title: "Database Mastery",
          description: "Implement a project with complex database relationships",
          completed: false,
          targetDate: "7 months"
        },
        {
          title: "Production-Ready Application",
          description: "Deploy a fully tested application with CI/CD",
          completed: false,
          targetDate: "12 months"
        }
      ]
    },
    
    "fullstack-developer": {
      title: "Full Stack Developer Roadmap",
      description: "Comprehensive path to becoming a full stack developer",
      careerGoal: "Full Stack Developer",
      estimatedTimeInMonths: 15,
      skills: [
        {
          name: "Frontend Fundamentals",
          description: "Master HTML, CSS, JavaScript and a frontend framework",
          priority: "high",
          completed: false,
          timeEstimate: "12 weeks",
          resources: [
            {
              type: "course",
              title: "The Web Developer Bootcamp",
              url: "https://example.com/web-dev-bootcamp",
              description: "Complete front-end development course"
            },
            {
              type: "project",
              title: "Interactive Dashboard",
              description: "Build a responsive dashboard with data visualization"
            }
          ]
        },
        {
          name: "Backend Development",
          description: "Learn server-side programming and API development",
          priority: "high",
          completed: false,
          timeEstimate: "10 weeks",
          resources: [
            {
              type: "course",
              title: "Complete Node.js Developer Course",
              url: "https://example.com/nodejs-complete",
              description: "Learn to build and deploy Node.js applications"
            },
            {
              type: "project",
              title: "RESTful API",
              description: "Create a full-featured API with authentication"
            }
          ]
        },
        {
          name: "Database Design",
          description: "Master both SQL and NoSQL databases",
          priority: "high",
          completed: false,
          timeEstimate: "6 weeks",
          resources: [
            {
              type: "course",
              title: "Database Design & Management",
              url: "https://example.com/database-design",
              description: "Learn database modeling and implementation"
            }
          ]
        },
        {
          name: "DevOps Basics",
          description: "Learn deployment, CI/CD, and container basics",
          priority: "medium",
          completed: false,
          timeEstimate: "5 weeks",
          resources: [
            {
              type: "tutorial",
              title: "DevOps for Developers",
              url: "https://example.com/devops-basics",
              description: "Introduction to DevOps practices"
            },
            {
              type: "course",
              title: "Docker & Kubernetes",
              url: "https://example.com/docker-k8s",
              description: "Container orchestration for applications"
            }
          ]
        },
        {
          name: "Full Stack Projects",
          description: "Build comprehensive applications from frontend to backend",
          priority: "high",
          completed: false,
          timeEstimate: "10 weeks",
          resources: [
            {
              type: "project",
              title: "E-Commerce Platform",
              description: "Build a complete online store with payment processing"
            },
            {
              type: "project",
              title: "Social Media Application",
              description: "Create a feature-rich social platform"
            }
          ]
        }
      ],
      milestones: [
        {
          title: "Frontend Portfolio",
          description: "Complete 3 frontend projects showcasing UI/UX skills",
          completed: false,
          targetDate: "4 months"
        },
        {
          title: "Backend Mastery",
          description: "Build a comprehensive API with complex business logic",
          completed: false,
          targetDate: "8 months"
        },
        {
          title: "Full Stack Application",
          description: "Deploy a production-ready full stack application",
          completed: false,
          targetDate: "12 months"
        },
        {
          title: "Professional Portfolio",
          description: "Develop a portfolio with 3+ full stack projects",
          completed: false,
          targetDate: "15 months"
        }
      ]
    },
    
    "devops-engineer": {
      title: "DevOps Engineer Roadmap",
      description: "A structured path to becoming a DevOps engineer",
      careerGoal: "DevOps Engineer",
      estimatedTimeInMonths: 12,
      skills: [
        {
          name: "Linux Fundamentals",
          description: "Master Linux command line and system administration",
          priority: "high",
          completed: false,
          timeEstimate: "6 weeks",
          resources: [
            {
              type: "course",
              title: "Linux Administration Bootcamp",
              url: "https://example.com/linux-admin",
              description: "Learn Linux administration from basics to advanced"
            },
            {
              type: "book",
              title: "How Linux Works",
              url: "https://example.com/linux-book",
              description: "Understanding the Linux operating system"
            }
          ]
        },
        {
          name: "Networking",
          description: "Understand networking concepts and implementation",
          priority: "medium",
          completed: false,
          timeEstimate: "4 weeks",
          resources: [
            {
              type: "course",
              title: "Computer Networking Fundamentals",
              url: "https://example.com/networking",
              description: "Learn networking protocols and architecture"
            }
          ]
        },
        {
          name: "Containerization & Orchestration",
          description: "Master Docker and Kubernetes",
          priority: "high",
          completed: false,
          timeEstimate: "8 weeks",
          resources: [
            {
              type: "course",
              title: "Docker & Kubernetes: The Complete Guide",
              url: "https://example.com/docker-k8s-complete",
              description: "Master containerization and orchestration"
            },
            {
              type: "project",
              title: "Microservices Deployment",
              description: "Deploy a microservices application using Docker and Kubernetes"
            }
          ]
        },
        {
          name: "Infrastructure as Code",
          description: "Learn Terraform, CloudFormation, or Ansible",
          priority: "high",
          completed: false,
          timeEstimate: "6 weeks",
          resources: [
            {
              type: "course",
              title: "Terraform Masterclass",
              url: "https://example.com/terraform",
              description: "Infrastructure as code with Terraform"
            },
            {
              type: "project",
              title: "Automated Infrastructure",
              description: "Create infrastructure provisioning templates"
            }
          ]
        },
        {
          name: "CI/CD Pipelines",
          description: "Set up continuous integration and deployment",
          priority: "high",
          completed: false,
          timeEstimate: "5 weeks",
          resources: [
            {
              type: "course",
              title: "Jenkins Complete Guide",
              url: "https://example.com/jenkins",
              description: "Learn to build CI/CD pipelines with Jenkins"
            },
            {
              type: "tutorial",
              title: "GitHub Actions Fundamentals",
              url: "https://example.com/github-actions",
              description: "CI/CD with GitHub Actions"
            }
          ]
        },
        {
          name: "Monitoring & Logging",
          description: "Implement monitoring, alerting and logging solutions",
          priority: "medium",
          completed: false,
          timeEstimate: "4 weeks",
          resources: [
            {
              type: "course",
              title: "Prometheus & Grafana",
              url: "https://example.com/monitoring",
              description: "Modern monitoring and alerting"
            },
            {
              type: "tutorial",
              title: "ELK Stack Implementation",
              url: "https://example.com/elk-stack",
              description: "Learn the Elasticsearch, Logstash and Kibana stack"
            }
          ]
        }
      ],
      milestones: [
        {
          title: "Containerization Project",
          description: "Containerize a multi-service application",
          completed: false,
          targetDate: "3 months"
        },
        {
          title: "CI/CD Implementation",
          description: "Set up a complete CI/CD pipeline for a project",
          completed: false,
          targetDate: "6 months"
        },
        {
          title: "Infrastructure Automation",
          description: "Create automated infrastructure provisioning",
          completed: false,
          targetDate: "9 months"
        },
        {
          title: "Production Environment",
          description: "Design and implement a production-ready environment",
          completed: false,
          targetDate: "12 months"
        }
      ]
    },
    
    "data-scientist": {
      title: "Data Scientist Roadmap",
      description: "Comprehensive path to becoming a data scientist",
      careerGoal: "Data Scientist",
      estimatedTimeInMonths: 15,
      skills: [
        {
          name: "Programming for Data Science",
          description: "Learn Python or R for data analysis",
          priority: "high",
          completed: false,
          timeEstimate: "8 weeks",
          resources: [
            {
              type: "course",
              title: "Python for Data Science",
              url: "https://example.com/python-data",
              description: "Complete Python programming for data analysis"
            },
            {
              type: "book",
              title: "Python Data Science Handbook",
              url: "https://example.com/python-ds-book",
              description: "Comprehensive guide to Python libraries for data science"
            }
          ]
        },
        {
          name: "Mathematics & Statistics",
          description: "Build strong foundation in statistics and linear algebra",
          priority: "high",
          completed: false,
          timeEstimate: "10 weeks",
          resources: [
            {
              type: "course",
              title: "Statistics for Data Science",
              url: "https://example.com/stats-course",
              description: "Statistical methods for data analysis"
            },
            {
              type: "course",
              title: "Linear Algebra Fundamentals",
              url: "https://example.com/linear-algebra",
              description: "Essential mathematics for machine learning"
            }
          ]
        },
        {
          name: "Data Wrangling & Visualization",
          description: "Learn to clean, process and visualize data",
          priority: "high",
          completed: false,
          timeEstimate: "6 weeks",
          resources: [
            {
              type: "course",
              title: "Data Cleaning with Pandas",
              url: "https://example.com/pandas-cleaning",
              description: "Master data preprocessing techniques"
            },
            {
              type: "tutorial",
              title: "Data Visualization with Matplotlib & Seaborn",
              url: "https://example.com/visualization",
              description: "Create insightful data visualizations"
            }
          ]
        },
        {
          name: "Machine Learning",
          description: "Master ML algorithms and implementation",
          priority: "high",
          completed: false,
          timeEstimate: "12 weeks",
          resources: [
            {
              type: "course",
              title: "Machine Learning A-Z",
              url: "https://example.com/ml-course",
              description: "Comprehensive introduction to machine learning"
            },
            {
              type: "project",
              title: "Predictive Modeling Project",
              description: "Build and evaluate prediction models"
            }
          ]
        },
        {
          name: "Deep Learning",
          description: "Learn neural networks and deep learning",
          priority: "medium",
          completed: false,
          timeEstimate: "10 weeks",
          resources: [
            {
              type: "course",
              title: "Deep Learning Specialization",
              url: "https://example.com/deep-learning",
              description: "In-depth training in neural networks"
            },
            {
              type: "project",
              title: "Computer Vision Project",
              description: "Implement image classification or object detection"
            }
          ]
        },
        {
          name: "Big Data Technologies",
          description: "Learn tools like Spark or Hadoop",
          priority: "medium",
          completed: false,
          timeEstimate: "6 weeks",
          resources: [
            {
              type: "course",
              title: "Apache Spark for Big Data",
              url: "https://example.com/spark-course",
              description: "Process big data with Spark"
            }
          ]
        }
      ],
      milestones: [
        {
          title: "Data Analysis Portfolio",
          description: "Complete 3 data analysis projects",
          completed: false,
          targetDate: "5 months"
        },
        {
          title: "Machine Learning Implementation",
          description: "Build and deploy ML models for real problems",
          completed: false,
          targetDate: "10 months"
        },
        {
          title: "Deep Learning Project",
          description: "Implement a complex neural network solution",
          completed: false,
          targetDate: "13 months"
        },
        {
          title: "End-to-End Data Science Project",
          description: "Develop a complete data science solution from collection to deployment",
          completed: false,
          targetDate: "15 months"
        }
      ]
    },
    "data-science-engineer": {
        title: "Data Scientist Roadmap",
        description: "Comprehensive path to becoming a data scientist",
        careerGoal: "Data Scientist",
        estimatedTimeInMonths: 15,
        skills: [
          {
            name: "Programming for Data Science",
            description: "Learn Python or R for data analysis",
            priority: "high",
            completed: false,
            timeEstimate: "8 weeks",
            resources: [
              {
                type: "course",
                title: "Python for Data Science",
                url: "https://example.com/python-data",
                description: "Complete Python programming for data analysis"
              },
              {
                type: "book",
                title: "Python Data Science Handbook",
                url: "https://example.com/python-ds-book",
                description: "Comprehensive guide to Python libraries for data science"
              }
            ]
          },
          {
            name: "Mathematics & Statistics",
            description: "Build strong foundation in statistics and linear algebra",
            priority: "high",
            completed: false,
            timeEstimate: "10 weeks",
            resources: [
              {
                type: "course",
                title: "Statistics for Data Science",
                url: "https://example.com/stats-course",
                description: "Statistical methods for data analysis"
              },
              {
                type: "course",
                title: "Linear Algebra Fundamentals",
                url: "https://example.com/linear-algebra",
                description: "Essential mathematics for machine learning"
              }
            ]
          },
          {
            name: "Data Wrangling & Visualization",
            description: "Learn to clean, process and visualize data",
            priority: "high",
            completed: false,
            timeEstimate: "6 weeks",
            resources: [
              {
                type: "course",
                title: "Data Cleaning with Pandas",
                url: "https://example.com/pandas-cleaning",
                description: "Master data preprocessing techniques"
              },
              {
                type: "tutorial",
                title: "Data Visualization with Matplotlib & Seaborn",
                url: "https://example.com/visualization",
                description: "Create insightful data visualizations"
              }
            ]
          },
          {
            name: "Machine Learning",
            description: "Master ML algorithms and implementation",
            priority: "high",
            completed: false,
            timeEstimate: "12 weeks",
            resources: [
              {
                type: "course",
                title: "Machine Learning A-Z",
                url: "https://example.com/ml-course",
                description: "Comprehensive introduction to machine learning"
              },
              {
                type: "project",
                title: "Predictive Modeling Project",
                description: "Build and evaluate prediction models"
              }
            ]
          },
          {
            name: "Deep Learning",
            description: "Learn neural networks and deep learning",
            priority: "medium",
            completed: false,
            timeEstimate: "10 weeks",
            resources: [
              {
                type: "course",
                title: "Deep Learning Specialization",
                url: "https://example.com/deep-learning",
                description: "In-depth training in neural networks"
              },
              {
                type: "project",
                title: "Computer Vision Project",
                description: "Implement image classification or object detection"
              }
            ]
          },
          {
            name: "Big Data Technologies",
            description: "Learn tools like Spark or Hadoop",
            priority: "medium",
            completed: false,
            timeEstimate: "6 weeks",
            resources: [
              {
                type: "course",
                title: "Apache Spark for Big Data",
                url: "https://example.com/spark-course",
                description: "Process big data with Spark"
              }
            ]
          }
        ],
        milestones: [
          {
            title: "Data Analysis Portfolio",
            description: "Complete 3 data analysis projects",
            completed: false,
            targetDate: "5 months"
          },
          {
            title: "Machine Learning Implementation",
            description: "Build and deploy ML models for real problems",
            completed: false,
            targetDate: "10 months"
          },
          {
            title: "Deep Learning Project",
            description: "Implement a complex neural network solution",
            completed: false,
            targetDate: "13 months"
          },
          {
            title: "End-to-End Data Science Project",
            description: "Develop a complete data science solution from collection to deployment",
            completed: false,
            targetDate: "15 months"
          }
        ]
      }
  };
  
  module.exports = roadmapTemplates;