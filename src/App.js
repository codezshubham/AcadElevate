import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Components/Routers/HomePage';
import SignUp from './Components/Login/Signup';
import Login from './Components/Login/Login';
import OtpPage from './Components/Login/OTP';
import ForgetPasswordPage from './Components/Login/ForgetPasswordPage';
import ResetPasswordForm from './Components/Login/ResetPasswordForm';
import FacultyPage from './Components/Routers/FacultyPage';
import AdminPage from './Components/Routers/AdminPage';
import Unauthorized from "./Components/Home/Pages/Unauthorised";
import AboutUs from './Components/Home/Pages/AboutUs';
import ContactUs from './Components/Home/Pages/ContactUs';
import FullScreenLoader from './Components/Home/Pages/FullScreenLoader';
import PrivacyPolicy from './Components/Home/Pages/PrivacyPolicy';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const role = decodedToken.authorities ? decodedToken.authorities[0] : null;
        setUserRole(role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children, role }) => {
    if (loading) {
      return <FullScreenLoader />;
    }
    return userRole === role ? children : <Navigate to="/unauthorized" />;
  };

  return (
    <Router>
      <ToastContainer />
      <div className="bg-gray-950 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verify" element={<OtpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />

          {/* Faculty Routes */}
          <Route
            path="/:username/:id/*"
            element={
              <ProtectedRoute role="ROLE_USER">
                <FacultyPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/:username/admin/*"
            element={
              <ProtectedRoute role="ROLE_ADMIN">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
