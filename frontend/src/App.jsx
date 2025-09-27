import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JobListings from './Components/JobListings'
import GigCampusLanding from './Pages/landingPage'
import ChatPage from './Pages/ChatPage'
import Navigation from './Components/Navigation'
import routes from './utils/routes'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page - Default route */}
          <Route path={routes.HOME} element={<GigCampusLanding />} />
          
          {/* Marketplace/Job Listings */}
          <Route path={routes.MARKETPLACE} element={<JobListings />} />
          
          {/* Chat Page */}
          <Route path={routes.CHAT} element={<ChatPage />} />
          
          {/* Future routes can be added here */}
          {/* <Route path={routes.PROFILE} element={<UserProfile />} /> */}
          {/* <Route path={routes.MESSAGES} element={<Messages />} /> */}
          {/* <Route path={routes.SETTINGS} element={<Settings />} /> */}
          {/* <Route path={routes.JOB_DETAILS} element={<JobDetails />} /> */}
          
          {/* 404 fallback - redirects to landing */}
          <Route path="*" element={<GigCampusLanding />} />
        </Routes>
        
        {/* Global Navigation Component */}
        <Navigation />
      </div>
    </Router>
  )
}

export default App
