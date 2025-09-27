import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChatProvider } from './contexts/ChatContext'
import JobListings from './Components/JobListings'
import GigCampusLanding from './Pages/landingPage'
import ChatPage from './Pages/ChatPage'
import ChatTestLinks from './Pages/ChatTestLinks'
import FirebaseTest from './Pages/FirebaseTest'
import Navigation from './Components/Navigation'
import routes from './utils/routes'
import StudentDashboard from './Pages/StudentDashboard'
import './App.css'

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing Page - Default route */}
            <Route path={routes.HOME} element={<GigCampusLanding />} />
            
            {/* Marketplace/Job Listings */}
            <Route path={routes.MARKETPLACE} element={<JobListings />} />

            <Route path="/dashboard" element={<StudentDashboard />} />
            
            {/* Chat Page - Now with Firebase integration */}
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:partnerId" element={<ChatPage />} />
            
            {/* Firebase Test Page */}
            <Route path="/firebase-test" element={<FirebaseTest />} />
            
            {/* Chat Test Links Page */}
            <Route path="/chat-test" element={<ChatTestLinks />} />
            
            {/* Student Dashboard */}
            <Route path="/StudentProfile" element={<StudentDashboard />} />
            
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
    </ChatProvider>
  )
}

export default App
