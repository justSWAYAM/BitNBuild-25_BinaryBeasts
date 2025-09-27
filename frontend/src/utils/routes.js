// Route configuration for easy management and future expansion
export const routes = {
  // Main routes
  HOME: '/',
  MARKETPLACE: '/marketplace',
  CHAT: '/chat/:partnerId?',
  //DASHBOARD: '/dashboard',
  
  // Future routes - uncomment when needed
  // PROFILE: '/profile',
  // MESSAGES: '/messages', 
  // SETTINGS: '/settings',
  // JOB_DETAILS: '/job/:id',
  // CREATE_JOB: '/create-job',
  // FREELANCER_PROFILE: '/freelancer/:id',
  
  // Auth routes (future)
  // LOGIN: '/login',
  // REGISTER: '/register',
  // FORGOT_PASSWORD: '/forgot-password',
  
  // Admin routes (future)
  // ADMIN_DASHBOARD: '/admin',
  // ADMIN_USERS: '/admin/users',
  // ADMIN_JOBS: '/admin/jobs',
};

// Route metadata for navigation and SEO
export const routeConfig = {
  [routes.HOME]: {
    title: 'GigCampus - Student Freelance Platform',
    description: 'Connect with real projects, build your portfolio, and start earning from your dorm room.',
    requiresAuth: false,
    showInNavigation: true,
  },
  [routes.MARKETPLACE]: {
    title: 'Marketplace - GigCampus',
    description: 'Browse and apply for freelance opportunities designed for students.',
    requiresAuth: false,
    showInNavigation: true,
  },
  // Future route configurations...
};

export default routes;