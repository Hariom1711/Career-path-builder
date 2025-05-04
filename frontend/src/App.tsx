"use client"
// import React from 'react';
import React from 'react';

 import { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  LogOut, 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  Award, 
  PlusCircle,
  Check
} from 'lucide-react';

// Sample authentication state management
const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [currentRoadmap, setCurrentRoadmap] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);

  // Check for token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Toast message
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch user profile
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        setCurrentPage('home');
        fetchRoadmaps(token);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showToast('Error loading profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch roadmaps
  const fetchRoadmaps = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/roadmaps', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRoadmaps(data);
      }
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      showToast('Failed to load roadmaps', 'error');
    }
  };

  // Fetch roadmap details
// Fetch roadmap details
const fetchRoadmapDetails = async (id) => {
  try {
    const token = localStorage.getItem('token');
    
    // Fetch roadmap data
    const roadmapResponse = await fetch(`http://localhost:5000/api/roadmaps/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!roadmapResponse.ok) {
      throw new Error('Failed to fetch roadmap');
    }
    
    const roadmapData = await roadmapResponse.json();
    
    // Fetch progress data
    const progressData = await fetchProgressData(id);
    
    // Mark completed skills based on progress data
    if (progressData.length > 0 && roadmapData.skills) {
      // Extract all skill IDs from progress data
      const completedSkillIds = progressData.flatMap(entry => entry.skillsWorkedOn || []);
      
      // Update roadmap skills with completion status
      roadmapData.skills = roadmapData.skills.map(skill => ({
        ...skill,
        completed: completedSkillIds.includes(skill._id)
      }));
    }
    
    setCurrentRoadmap(roadmapData);
    setCurrentPage('roadmapDetail');
  } catch (error) {
    console.error('Error fetching roadmap details:', error);
    showToast('Failed to load roadmap details', 'error');
  }
};

  // Login handler
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setCurrentPage('home');
        showToast(`Welcome back, ${data.user.name}!`, 'success');
        fetchRoadmaps(data.token);
      } else {
        const error = await response.json();
        showToast(error.message || 'Login failed', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Connection error', 'error');
    }
  };

  // Register handler
  const handleRegister = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setCurrentPage('home');
        showToast('Registration successful!', 'success');
      } else {
        const error = await response.json();
        showToast(error.message || 'Registration failed', 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Connection error', 'error');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
    showToast('Logged out successfully', 'success');
  };

  // Generate roadmap
  const handleGenerateRoadmap = async (careerPath) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/roadmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ careerPath })
      });
      
      if (response.ok) {
        const data = await response.json();
        fetchRoadmaps(token);
        fetchRoadmapDetails(data._id);
        showToast('Roadmap generated successfully!', 'success');
      } else {
        const error = await response.json();
        showToast(error.message || 'Failed to generate roadmap', 'error');
      }
    } catch (error) {
      console.error('Error generating roadmap:', error);
      showToast('Connection error', 'error');
    }
  };

  // Fetch progress data
const fetchProgressData = async (roadmapId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/progress/${roadmapId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching progress data:', error);
    showToast('Failed to load progress data', 'error');
    return [];
  }
};
  // Update progress
  const updateProgress = async (roadmapId, progressData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/progress/${roadmapId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(progressData)
      });
      
      if (response.ok) {
        fetchRoadmapDetails(roadmapId);
        showToast('Progress updated successfully!', 'success');
      } else {
        const error = await response.json();
        showToast(error.message || 'Failed to update progress', 'error');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      showToast('Connection error', 'error');
    }
  };

  // Show toast message
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Navigation based on current page state
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={() => setCurrentPage('register')} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigate={() => setCurrentPage('login')} />;
      case 'home':
        return <HomePage 
          onGenerateClick={() => setCurrentPage('generateRoadmap')} 
          roadmaps={roadmaps}
          onViewRoadmap={fetchRoadmapDetails}
        />;
      case 'generateRoadmap':
        return <GenerateRoadmapPage onGenerate={handleGenerateRoadmap} />;
      case 'roadmapDetail':
        return currentRoadmap ? 
          <RoadmapDetailPage 
            roadmap={currentRoadmap}
            updateProgress={updateProgress}
            onTrackProgress={() => setCurrentPage('progressTracker')}
          /> : null;
      case 'progressTracker':
        return currentRoadmap ? 
          <ProgressTrackerPage 
            roadmap={currentRoadmap} 
            updateProgress={updateProgress}
          /> : null;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {isAuthenticated && (
        <Header 
          user={user} 
          onLogout={handleLogout}
          onHome={() => setCurrentPage('home')}
        />
      )}
      <div className="container mx-auto px-4 py-4">
        {renderPage()}
      </div>
      
      {/* Toast notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
          toast.type === 'error' ? 'bg-red-500' : 
          toast.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        } text-white`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default App;

// Dynamic Chart Component for visualizing progress
const ProgressChart = ({ data }) => {
  const [chartType, setChartType] = useState('line');
  const chartData = [
    { name: 'Week 1', hours: 5 },
    { name: 'Week 2', hours: 8 },
    { name: 'Week 3', hours: 12 },
    { name: 'Week 4', hours: 7 },
    { name: 'Week 5', hours: 10 }
  ];
  
  if (!data) {
    return null;
  }
  
  return (
    <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Progress Overview</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-xs rounded-md ${
              chartType === 'line' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
            onClick={() => setChartType('line')}
          >
            Line
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-md ${
              chartType === 'bar' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
            onClick={() => setChartType('bar')}
          >
            Bar
          </button>
        </div>
      </div>
      
      <div className="h-64 w-full">
        {chartType === 'line' ? (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 flex items-end justify-between px-6">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/6">
                  <div className="h-40 w-full relative">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t"
                      style={{ height: `${(item.hours / 12) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-2">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 flex items-end justify-between px-6">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/6">
                  <div className="h-40 w-full relative">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t"
                      style={{ height: `${(item.hours / 12) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-2">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Progress Tracker Page
const ProgressTrackerPage = ({ roadmap, updateProgress }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [hoursSpent, setHoursSpent] = useState(1);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('completed');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedSkill || !selectedMilestone) {
      return;
    }
    
    updateProgress(roadmap._id, {
      skillId: selectedSkill,
      milestoneId: selectedMilestone,
      status,
      hoursSpent: Number(hoursSpent),
      notes
    });
    
    // Reset form
    setNotes('');
    setHoursSpent(1);
  };
  
  return (
    <div className="mt-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Track your learning journey for {roadmap.title}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Update Progress</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Skill</label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                    required
                  >
                    <option value="">Choose a skill</option>
                    {roadmap.skills && roadmap.skills.map((skill) => (
                      <option key={skill._id} value={skill._id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Select Milestone</label>
                  <select
                    value={selectedMilestone}
                    onChange={(e) => setSelectedMilestone(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                    required
                  >
                    <option value="">Choose a milestone</option>
                    {roadmap.milestones && roadmap.milestones.map((milestone) => (
                      <option key={milestone._id} value={milestone._id}>
                        {milestone.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="stuck">Stuck</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Hours Spent</label>
                  <input
                    type="number"
                    min="1"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(Number(e.target.value))}
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent min-h-32"
                  placeholder="Share your learning experience, achievements, or challenges..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Update Progress
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Progress Stats</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Skills Completed</h3>
                  <span className="text-sm font-bold">
                    {roadmap.skills ? roadmap.skills.filter(s => s.completed).length : 0} / {roadmap.skills ? roadmap.skills.length : 0}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full" 
                    style={{ 
                      width: `${roadmap.skills ? 
                        Math.round((roadmap.skills.filter(s => s.completed).length / roadmap.skills.length) * 100) : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Milestones Reached</h3>
                  <span className="text-sm font-bold">
                    {roadmap.milestones ? roadmap.milestones.filter(m => m.completed).length : 0} / {roadmap.milestones ? roadmap.milestones.length : 0}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" 
                    style={{ 
                      width: `${roadmap.milestones ? 
                        Math.round((roadmap.milestones.filter(m => m.completed).length / roadmap.milestones.length) * 100) : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Estimated Timeline</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        Start
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {roadmap.estimatedTimeInMonths} months
                      </span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 mb-4">
                    <div 
                      className="h-1 bg-gradient-to-r from-green-500 to-green-600" 
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <h3 className="text-sm font-medium mb-3">Quick Tips</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 text-green-500 mr-2">•</div>
                    Set a regular schedule for your learning sessions
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 text-green-500 mr-2">•</div>
                    Complete one skill before moving to the next
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 text-green-500 mr-2">•</div>
                    Create projects to practice what you've learned
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ user, onLogout, onHome }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div 
              className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              onClick={onHome}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                PathBuilder
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-blue-500 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg z-10">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <button 
                      className="flex items-center space-x-2 w-full p-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                      onClick={() => {
                        setShowDropdown(false);
                        onLogout();
                      }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Login Page
const LoginPage = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
            PathBuilder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Your personal career development companion
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome back</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                onClick={onNavigate}
                className="text-blue-500 hover:underline font-medium"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Register Page
const RegisterPage = ({ onRegister, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email, password);
  };
  
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
            PathBuilder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Start your professional development journey
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create an account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium"
            >
              Sign Up
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <button
                onClick={onNavigate}
                className="text-blue-500 hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page
const HomePage = ({ onGenerateClick, roadmaps, onViewRoadmap }) => {
  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Career Journey</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track your progress and growth</p>
        </div>
        
        <button
          onClick={onGenerateClick}
          className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Generate Roadmap
        </button>
      </div>
      
      {roadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {roadmaps.map((roadmap, index) => (
            <div 
              key={roadmap._id || index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewRoadmap(roadmap._id)}
            >
              <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{roadmap.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  {roadmap.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart3 size={18} className="text-blue-500 mr-2" />
                    <span className="text-sm">{roadmap.estimatedTimeInMonths} months</span>
                  </div>
                  
                  <div className="flex items-center text-blue-500">
                    <span className="text-sm font-medium mr-1">View details</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No roadmaps yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Generate your first career roadmap to start tracking your progress
          </p>
          <button
            onClick={onGenerateClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Generate New Roadmap
          </button>
        </div>
      )}
    </div>
  );
};

// Generate Roadmap Page
const GenerateRoadmapPage = ({ onGenerate }) => {
  const careerOptions = [
    {
      id: 'fullstack_developer',
      title: 'Full Stack Developer',
      icon: <BarChart3 size={24} className="text-blue-500" />,
      description: 'Master both frontend and backend technologies to build complete web applications'
    },
    {
      id: 'frontend_developer',
      title: 'Frontend Developer',
      icon: <TrendingUp size={24} className="text-purple-500" />,
      description: 'Specialize in creating intuitive and responsive user interfaces'
    },
    {
      id: 'backend_developer',
      title: 'Backend Developer',
      icon: <Award size={24} className="text-green-500" />,
      description: 'Focus on server-side logic, databases, and API development'
    },
    {
      id: 'data_science_engineer',
      title: 'Data Science Engineer',
      icon: <BarChart3 size={24} className="text-orange-500" />,
      description: 'Combine programming, statistics, and domain expertise to extract insights from data'
    }
  ];

  return (
    <div className="mt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Generate Your Roadmap</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Select a career path to get a personalized development plan
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerOptions.map((option) => (
          <div 
            key={option.id}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
            onClick={() => onGenerate(option.id)}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold">{option.title}</h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400">
              {option.description}
            </p>
            
            <div className="mt-4 flex justify-end">
              <button 
                className="text-blue-500 flex items-center font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerate(option.id);
                }}
              >
                <span className="mr-1">Generate</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Roadmap Detail Page
const RoadmapDetailPage = ({ roadmap, updateProgress, onTrackProgress }) => {
  const [activeSection, setActiveSection] = useState('skills');
  
  // Calculate progress
  const calculateProgress = () => {
    if (!roadmap.skills) return 0;
    const completed = roadmap.skills.filter(skill => skill.completed).length;
    return Math.round((completed / roadmap.skills.length) * 100);
  };

  // Calculate milestone progress
  const calculateMilestoneProgress = () => {
    if (!roadmap.milestones) return 0;
    const completed = roadmap.milestones.filter(milestone => milestone.completed).length;
    return Math.round((completed / roadmap.milestones.length) * 100);
  };
  const handleSkillToggle = (skillId) => {
    // Find the most relevant milestone for this skill
    const relatedMilestone = roadmap.milestones && roadmap.milestones.length > 0 
      ? roadmap.milestones[0]._id 
      : null;
    
    // First update the API
    updateProgress(roadmap._id, {
      skillId,
      milestoneId: relatedMilestone,
      status: "completed",
      hoursSpent: 8,
      notes: "Completed this skill"
    });
    
    // Then update local state to show immediate feedback
    const updatedSkills = roadmap.skills.map(skill => 
      skill._id === skillId ? { ...skill, completed: !skill.completed } : skill
    );
    
    setCurrentRoadmap({ ...roadmap, skills: updatedSkills });
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">{roadmap.title}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{roadmap.description}</p>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <BarChart3 size={18} className="text-blue-500 mr-2" />
              <span>{roadmap.estimatedTimeInMonths} months</span>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {roadmap.userExperience || "Beginner"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Overall Progress</h3>
            <span className="text-sm font-medium">{calculateProgress()}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === 'skills' 
                ? 'text-blue-600 border-b-2 border-blue-500' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
            onClick={() => setActiveSection('skills')}
          >
            Skills
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === 'milestones' 
                ? 'text-blue-600 border-b-2 border-blue-500' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
            onClick={() => setActiveSection('milestones')}
          >
            Milestones
          </button>
        </div>
        
        {activeSection === 'skills' && (
          <div className="space-y-4">
            {roadmap.skills && roadmap.skills.map((skill) => (
              <div 
                key={skill._id} 
                className="bg-white dark:bg-slate-800 rounded-lg shadow p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{skill.description}</p>
                  </div>
                  <div 
                    className={`h-6 w-6 rounded-full flex items-center justify-center cursor-pointer ${
                      skill.completed 
                        ? 'bg-green-500' 
                        : 'border-2 border-slate-300 dark:border-slate-600'
                    }`}
                    onClick={() => handleSkillToggle(skill._id)}
                  >
                    {skill.completed && <Check size={14} className="text-white" />}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      skill.priority === 'high' 
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {skill.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                    </span>
                  </div>
                  <div>{skill.timeEstimate}</div>
                </div>
                
                {skill.resources && skill.resources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-medium mb-2">Resources</h4>
                    <div className="space-y-2">
                      {skill.resources.map((resource) => (
                        <div key={resource._id} className="bg-slate-50 dark:bg-slate-700 p-3 rounded-md">
                          <div className="flex justify-between">
                            <h5 className="font-medium text-sm">{resource.title}</h5>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                              {resource.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{resource.description}</p>
                          {resource.url && (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 mt-1 block">
                              View Resource
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeSection === 'milestones' && (
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Milestone Progress</h3>
                <span className="text-sm font-medium">{calculateMilestoneProgress()}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full" 
                  style={{ width: `${calculateMilestoneProgress()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {roadmap.milestones && roadmap.milestones.map((milestone) => (
                <div 
                  key={milestone._id} 
                  className="bg-white dark:bg-slate-800 rounded-lg shadow p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{milestone.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{milestone.description}</p>
                    </div>
                    <div 
                      className={`h-6 w-6 rounded-full flex items-center justify-center cursor-pointer ${
                        milestone.completed 
                          ? 'bg-green-500' 
                          : 'border-2 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {milestone.completed && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div>Target: {milestone.targetDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function setCurrentRoadmap(arg0: any) {
  throw new Error('Function not implemented.');
}
