import React, { useState, useEffect } from 'react';
import { Activity, DollarSign, TrendingUp } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { 
  getClientProfile, 
  createClientProfile, 
  postProject, 
  getClientProjects 
} from '../services/clientService';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import Sidebar from '../Components/Sidebar';
import ProjectForm from '../Components/ProjectForm';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }
  }, [user, loading, navigate]);

  // Fetch client data when user is available
  useEffect(() => {
    if (user && !loading) {
      initializeClientData();
    }
  }, [user, loading]);

  const initializeClientData = async () => {
    try {
      setIsLoading(true);
      
      // Try to get existing client profile
      let client;
      try {
        client = await getClientProfile(user.uid);
      } catch (err) {
        // If client doesn't exist, create one
        if (err.message === 'Client profile not found') {
          await createClientProfile(user.uid, {
            name: user.displayName || 'Client User',
            email: user.email,
            role: 'client'
          });
          client = await getClientProfile(user.uid);
        } else {
          throw err;
        }
      }

      setClientData(client);

      // Get client's projects
      const clientProjects = await getClientProjects(user.uid);
      setProjects(clientProjects);
      
    } catch (error) {
      console.error('Error initializing client data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectSubmit = async (projectData) => {
    try {
      if (!user?.uid) throw new Error('No user logged in');

      const projectId = await postProject(user.uid, projectData);
      
      // Refresh client data to get updated stats
      await initializeClientData();

      alert('Project posted successfully!');
    } catch (error) {
      console.error('Error posting project:', error);
      alert('Error posting project. Please try again.');
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Error loading dashboard: {error.message}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Setting up your client profile...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Calculate stats for display
  const statsData = {
    activeProjects: clientData?.activePostings?.length || 0,
    totalSpent: clientData?.completedPostings?.reduce((acc, project) => acc + (project.budget || 0), 0) || 0,
    successRate: clientData?.totalPostings ? 
      ((clientData.completedPostings?.length / clientData.totalPostings) * 100).toFixed(0) : 
      0
  };

  // Format spending data for chart
  const spendingData = clientData?.completedPostings?.reduce((acc, project) => {
    const month = new Date(project.createdAt.toDate()).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(item => item.month === month);
    if (existingMonth) {
      existingMonth.amount += project.budget;
    } else {
      acc.push({ month, amount: project.budget });
    }
    return acc;
  }, []) || [];

  // Format status data for pie chart
  const statusData = [
    { 
      name: 'Active', 
      value: clientData?.activePostings?.length || 0, 
      color: '#10B981' 
    },
    { 
      name: 'Completed', 
      value: clientData?.completedPostings?.length || 0, 
      color: '#3B82F6' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
        {/* Sidebar */}
        <Sidebar 
          userData={{
            name: user?.displayName || clientData.name || 'Client User',
            email: user?.email || clientData.email || '',
            totalSpent: clientData.totalSpent || 0,
            rating: clientData.rating || 0,
            totalRatings: clientData.totalRatings || 0,
            completedProjects: projects.filter(p => p.status === 'Completed').length,
            activeProjects: projects.filter(p => p.status === 'Active').length
          }}
        />      <div className="flex-1 p-8">
        <div className="grid grid-cols-5 gap-8 h-full">
          {/* Left section - Project Form (40% width) */}
          <div className="col-span-2">
            <ProjectForm onSubmit={handleProjectSubmit} />
          </div>

          {/* Right section - Status and Analytics (60% width) */}
          <div className="col-span-3 space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Projects</p>
                    <p className="text-white text-2xl font-bold">{statsData.activeProjects}</p>
                    <p className="text-green-400 text-xs">+2 this month</p>
                  </div>
                  <Activity className="w-10 h-10 text-green-400" />
                </div>
              </div>

              <div className="bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-white text-2xl font-bold">${statsData.totalSpent.toFixed(2)}</p>
                    <p className="text-blue-400 text-xs">+$3.2k this month</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-blue-400" />
                </div>
              </div>

              <div className="bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Success Rate</p>
                    <p className="text-white text-2xl font-bold">{statsData.successRate}%</p>
                    <p className="text-purple-400 text-xs">Above average</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Current Projects */}
            <div className="bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-6">Current Projects</h3>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-gray-700/30 rounded-xl p-4 backdrop-blur-sm border border-gray-600/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">{project.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>Budget: ${project.budget}</span>
                      <span>Due: {project.deadline}</span>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-600/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {project.freelancer && (
                      <p className="text-xs text-gray-400">Freelancer: {project.freelancer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Monthly Spending</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Project Status</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-400 text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;