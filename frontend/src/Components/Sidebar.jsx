import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Eye, Clock, CheckCircle, DollarSign, TrendingUp, Calendar, Users, Star, Activity } from 'lucide-react';
import PropTypes from 'prop-types';

// Sidebar Component
const Sidebar = ({ userData = {} }) => {
  const {
    name = "John Doe",
    email = "john.doe@example.com",
    totalSpent = 15750,
    rating = 4.8,
    totalRatings = 23,
    completedProjects = 12,
    activeProjects = 3
  } = userData;

  return (
    <div className="w-80 h-screen bg-gray-900/20 backdrop-blur-md border-r border-gray-700/30 p-6 flex flex-col">
      {/* Profile Section */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">{name}</h3>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-medium">{rating}</span>
          <span className="text-gray-400 text-sm">({totalRatings} reviews)</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="space-y-4 mb-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Spent</p>
              <p className="text-white text-xl font-bold">${totalSpent.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-white text-xl font-bold">{completedProjects}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Projects</p>
              <p className="text-white text-xl font-bold">{activeProjects}</p>
            </div>
            <Activity className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-800/30 text-white hover:bg-gray-700/30 transition-colors">
          <Users className="w-5 h-5" />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800/30 hover:text-white transition-colors">
          <Calendar className="w-5 h-5" />
          <span>My Projects</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800/30 hover:text-white transition-colors">
          <DollarSign className="w-5 h-5" />
          <span>Payments</span>
        </a>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    totalSpent: PropTypes.number,
    rating: PropTypes.number,
    totalRatings: PropTypes.number,
    completedProjects: PropTypes.number,
    activeProjects: PropTypes.number
  })
};

export default Sidebar;