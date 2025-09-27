import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../utils/routes';
import JobCard from './JobCard';
import ApplyJobModal from './ApplyJobModal';
import CustomDropdown from './CustomDropdown';
import BudgetRangeDropdown from './BudgetRangeDropdown';
import { sampleJobs } from '../data/sampleJobs';

const JobListings = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [budgetRange, setBudgetRange] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Get unique categories for filter
  const categories = ['All', ...new Set(sampleJobs.map(job => job.category))];

  // Filter jobs based on search and filters
  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    
    let matchesBudget = true;
    if (budgetRange === 'under-10k') {
      matchesBudget = job.budget.max < 10000;
    } else if (budgetRange === '10k-25k') {
      matchesBudget = job.budget.min <= 25000 && job.budget.max >= 10000;
    } else if (budgetRange === '25k-50k') {
      matchesBudget = job.budget.min <= 50000 && job.budget.max >= 25000;
    } else if (budgetRange === '50k-plus') {
      matchesBudget = job.budget.min > 50000;
    }
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApplicationSubmit = (applicationData) => {
    console.log('Application submitted:', applicationData);
    // Here you would typically send the application data to your backend API
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setBudgetRange('');
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    // Clear user data, tokens, etc.
    // navigate(routes.HOME); // Redirect to home after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="relative z-50 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-400/25">
                <span className="text-slate-900 font-bold text-lg">G</span>
              </div>
              <span 
                onClick={() => navigate(routes.HOME)}
                className="text-xl font-bold text-white cursor-pointer hover:text-emerald-400 transition-colors drop-shadow-lg"
                title="Back to Landing"
              >
                GigCampus
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#jobs" className="text-slate-300 hover:text-emerald-400 transition-all hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                Find Jobs
              </a>
              <button 
              onClick={() => navigate(routes.DASHBOARD)}
              className="text-slate-300 hover:text-emerald-400 transition-all hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] bg-transparent border-none cursor-pointer">
              Dashboard
              </button>
              <a href="#home" className="text-slate-300 hover:text-emerald-400 transition-all hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                Home
              </a>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105"
                >
                  Logout
                </button>
              </div>
            </div>
            
            <button className="lg:hidden p-2 rounded-full hover:bg-emerald-500/20 transition-all">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <div className="relative z-40 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/40 p-8 shadow-2xl shadow-black/20">
            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className={`h-5 w-5 transition-colors duration-300 ${
                    searchFocused ? 'text-emerald-400' : 'text-slate-400'
                  }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <input
                  type="text"
                  placeholder="Search jobs, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <CustomDropdown
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Category"
                  className="min-w-[140px]"
                />
                <BudgetRangeDropdown
                  value={budgetRange}
                  onChange={setBudgetRange}
                  className="min-w-[140px]"
                />
                {(searchTerm || selectedCategory !== 'All' || budgetRange !== '') && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-slate-700/40 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
            
            {/* Job Count */}
            <div className="mt-6 pt-6 border-t border-slate-700/40">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1 drop-shadow-lg">{filteredJobs.length}</div>
                <div className="text-slate-300 font-medium">
                  job{filteredJobs.length !== 1 ? 's' : ''} available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/40 p-12 shadow-2xl shadow-black/20">
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl"></div>
                  </div>
                  <svg className="relative mx-auto h-16 w-16 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">No jobs found</h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">We couldn't find any jobs matching your criteria. Try adjusting your search or browse all available opportunities.</p>
                <button
                  onClick={clearFilters}
                  className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
                >
                  Show All Jobs
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <div 
                  key={job.id} 
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <JobCard 
                    job={job} 
                    onApplyClick={handleApplyClick} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply Job Modal */}
      <ApplyJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleApplicationSubmit}
      />

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/40 p-8 shadow-2xl shadow-black/20">
            <div className="text-center">
              <p className="text-slate-400">&copy; 2024 GigCampus. Connecting student talent with opportunities.</p>
              <p className="text-sm mt-2 text-emerald-400">Made with ❤️ for students, by students</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobListings;
