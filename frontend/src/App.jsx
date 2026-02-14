import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// User Pages
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import Tutorial from './pages/user/Tutorial';
import Dashboard from './pages/user/Dashboard';
import NewComplaint from './pages/user/NewComplaint';
import ComplaintStatus from './pages/user/ComplaintStatus';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Department Pages
import DepartmentLogin from './pages/department/DepartmentLogin';
import DepartmentDashboard from './pages/department/DepartmentDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tutorial" element={
            <PrivateRoute>
              <Tutorial />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/new-complaint" element={
            <PrivateRoute>
              <NewComplaint />
            </PrivateRoute>
          } />
          <Route path="/complaint-status/:id" element={
            <PrivateRoute>
              <ComplaintStatus />
            </PrivateRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          {/* Department Routes */}
          <Route path="/department/login" element={<DepartmentLogin />} />
          <Route path="/department/dashboard" element={
            <PrivateRoute role="department">
              <DepartmentDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;