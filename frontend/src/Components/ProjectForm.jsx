import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const ProjectForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    budget: '',
    timeline: '',
    category: '',
    priority: 'medium',
    requirements: []
  });

  const [newTech, setNewTech] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'DevOps',
    'Marketing',
    'Writing & Content',
    'Other'
  ];

  const addTech = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (formData.title && formData.description && formData.budget && formData.timeline && formData.category) {
      onSubmit({
        ...formData,
        available: true,
        status: 'open'
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 border border-gray-700/30 h-fit">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Post New Project</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-3">Project Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 backdrop-blur-sm"
            placeholder="Enter your project title..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 backdrop-blur-sm"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 backdrop-blur-sm"
            >
              <option value="low" className="bg-gray-800">Low</option>
              <option value="medium" className="bg-gray-800">Medium</option>
              <option value="high" className="bg-gray-800">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-3">Project Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 backdrop-blur-sm"
            placeholder="Describe your project in detail..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">Budget ($)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 backdrop-blur-sm"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">Timeline</label>
            <input
              type="text"
              value={formData.timeline}
              onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 backdrop-blur-sm"
              placeholder="e.g., 2 weeks"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            Post Project
          </button>
        </div>
      </div>
    </div>
  );
};

ProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ProjectForm;