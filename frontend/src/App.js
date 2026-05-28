/**
 * App Component
 * Main application entry point with routing and authentication
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BookListing from './pages/BookListing';
import AddBook from './pages/AddBook';
import MyBorrows from './pages/MyBorrows';
import Search from './pages/Search';

// Components
import Navbar from './components/Navbar';

// Services
import { logout, getCurrentUser, isAuthenticated } from './services/api';

/**
 * Protected Route Wrapper
 * Checks authentication before rendering protected routes
 */
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

/**
 * Main App Component
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    // Check if user has valid token and data in localStorage
    if (isAuthenticated()) {
      setIsLoggedIn(true);
      const user = getCurrentUser();
      setCurrentUser(user);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
    setLoading(false);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-blue/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-light-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-blue/10 to-primary-dark text-light-text">
        {/* Show navbar only for authenticated users */}
        {isLoggedIn && <Navbar onLogout={handleLogout} user={currentUser} />}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <main className={isLoggedIn ? 'container mx-auto px-4 py-8' : ''}>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  isLoggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Signup />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    element={<Dashboard />}
                    isAuthenticated={isLoggedIn}
                  />
                }
              />
              <Route
                path="/books"
                element={
                  <ProtectedRoute
                    element={<BookListing />}
                    isAuthenticated={isLoggedIn}
                  />
                }
              />
              <Route
  path="/my-borrows"
  element={
    <ProtectedRoute
      element={<MyBorrows />}
      isAuthenticated={isLoggedIn}
    />
  }
/>
              <Route
                path="/add-book"
                element={
                  <ProtectedRoute
                    element={<AddBook />}
                    isAuthenticated={isLoggedIn}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute
                    element={<Search />}
                    isAuthenticated={isLoggedIn}
                  />
                }
              />

              {/* Default Route */}
              <Route
                path="/"
                element={
                  <Navigate
                    to={isLoggedIn ? '/dashboard' : '/login'}
                    replace
                  />
                }
              />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </main>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
