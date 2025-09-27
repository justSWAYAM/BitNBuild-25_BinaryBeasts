import React, { useState } from 'react';

const ApplyJobModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    bidAmount: '',
    proposal: '',
    portfolioFile: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      portfolioFile: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate bid amount
    const bidAmount = parseFloat(formData.bidAmount);
    if (!formData.bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      newErrors.bidAmount = 'Please enter a valid positive amount';
    } else if (bidAmount < job.budget.min || bidAmount > job.budget.max) {
      newErrors.bidAmount = `Bid must be between ₹${job.budget.min.toLocaleString()} - ₹${job.budget.max.toLocaleString()}`;
    }

    // Validate proposal
    if (!formData.proposal.trim()) {
      newErrors.proposal = 'Proposal is required';
    } else if (formData.proposal.trim().length < 50) {
      newErrors.proposal = 'Proposal must be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call parent submit handler
      onSubmit({
        jobId: job.id,
        bidAmount: parseFloat(formData.bidAmount),
        proposal: formData.proposal.trim(),
        portfolioFile: formData.portfolioFile
      });

      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          bidAmount: '',
          proposal: '',
          portfolioFile: null
        });
        setShowSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      bidAmount: '',
      proposal: '',
      portfolioFile: null
    });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);
    onClose();
  };

  const formatBudget = (min, max) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div 
        className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto animate-slideUp my-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700/30">
          <h2 className="text-2xl font-bold text-white">Apply for Job</h2>
          <button
            onClick={handleClose}
            className="text-2xl font-bold focus:outline-none transition-all duration-300 text-slate-400 hover:text-emerald-400 p-2 rounded-xl hover:bg-slate-800/60"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {/* Job Summary */}
        <div 
          className="p-6 border-b border-slate-700/30 bg-slate-800/30" 
        >
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">{job?.title}</h3>
          <p className="mb-3 line-clamp-2 text-slate-300">{job?.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-slate-400">
              <strong>Budget:</strong> {job && formatBudget(job.budget.min, job.budget.max)}
            </span>
            <span className="text-slate-400">
              <strong>Deadline:</strong> {job && new Date(job.deadline).toLocaleDateString('en-IN')}
            </span>
            <span className="text-slate-400">
              <strong>Client:</strong> {job?.clientName}
            </span>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div 
            className="p-4 m-6 rounded-xl bg-cyan-900/30 border border-cyan-700/50 backdrop-blur-sm"
          >
            <div className="flex items-center">
              <div className="mr-3 text-accent">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-accent">Application Submitted Successfully!</h4>
                <p className="text-sm text-gray-300">The client will review your proposal and get back to you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Bid Amount */}
            <div>
              <label htmlFor="bidAmount" className="block text-sm font-medium mb-2 text-white">
                Your Bid Amount (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-emerald-400">₹</span>
                <input
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  value={formData.bidAmount}
                  onChange={handleInputChange}
                  className={`w-full pl-8 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:border-emerald-500/50 text-white placeholder-slate-400 transition-all duration-300 ${
                    errors.bidAmount ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your bid amount"
                  min="1"
                  disabled={isSubmitting}
                />
              </div>
              {errors.bidAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.bidAmount}</p>
              )}
              <p className="text-sm mt-1 text-slate-400">
                Budget range: {job && formatBudget(job.budget.min, job.budget.max)}
              </p>
            </div>

            {/* Proposal */}
            <div>
              <label htmlFor="proposal" className="block text-sm font-medium mb-2 text-white">
                Proposal / Cover Letter *
              </label>
              <textarea
                id="proposal"
                name="proposal"
                value={formData.proposal}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:border-emerald-500/50 resize-none text-white placeholder-slate-400 transition-all duration-300 ${
                  errors.proposal ? 'border-red-500' : ''
                }`}
                placeholder="Explain why you're the perfect fit for this job. Describe your experience, approach, and what makes you stand out..."
                disabled={isSubmitting}
              />
              {errors.proposal && (
                <p className="text-red-500 text-sm mt-1">{errors.proposal}</p>
              )}
              <p className="text-sm mt-1 text-gray-500">
                {formData.proposal.length}/50 characters minimum
              </p>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="portfolioFile" className="block text-sm font-medium mb-2 text-white">
                Portfolio / Work Samples (Optional)
              </label>
              <input
                type="file"
                id="portfolioFile"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:border-emerald-500/50 cursor-pointer text-white transition-all duration-300"
                disabled={isSubmitting}
              />
              <p className="text-xs mt-1 text-slate-500">
                Accepted formats: PDF, DOC, DOCX, JPG, PNG, GIF, ZIP (Max 10MB)
              </p>
              {formData.portfolioFile && (
                <p className="text-sm mt-1 text-emerald-400">
                  Selected: {formData.portfolioFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl font-medium transition-all duration-300 focus:outline-none text-slate-300 hover:text-white hover:bg-slate-800/70 hover:border-slate-600/50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;