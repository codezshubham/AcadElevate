import React, { useState } from "react";
import image from '../../Asset/sign-up.jpg';
import { Link, useNavigate } from "react-router-dom";
import { signup } from '../../Redux/Auth/AuthSlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import OtpDialog from './OTP';
import { useDispatch } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FaArrowLeft } from 'react-icons/fa'; 

function SignUp() {
  const [formData, setFormData] = useState({
    role: 'ROLE_USER',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: "",
    adminKey: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setAgreedToPrivacy(!agreedToPrivacy);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await dispatch(signup(formData)).unwrap();
  
      if (response) {
        setOpenOtpDialog(true); // Open OTP Dialog after successful signup
      } else {
        setSnackbarMessage('Signup failed. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setSnackbarMessage('Signup failed. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleOtpValidationSuccess = () => {
    setSnackbarMessage('Signup successful! Redirecting to login...');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  
    setOpenOtpDialog(false);
  };
  
  const handleOtpValidationFailure = () => {
    setSnackbarMessage('OTP validation failed. Please try again.');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
    setOpenOtpDialog(false);
  };
  

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 absolute top-5 left-5"
        title="Back"
      >
        <FaArrowLeft className="text-base" />
      </button>
      {/* Left side - Signup Form */}
      <div className="p-6 md:p-12 mt-10 flex flex-col justify-center w-full md:w-1/2">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Join the millions learning to automate appraisals <span className="text-blue-400">AcadElevate</span> for free
        </h1>
        <p className="text-sm text-gray-400 italic mb-8">
          Build skills for today, tomorrow, and beyond. <span className="text-blue-300">Education to future-proof your career.</span>
        </p>

        <div className="flex space-x-3 mb-6 bg-[#1f1f1f] rounded-full p-1 w-fit">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "ROLE_USER" })}
            className={`px-4 py-2 rounded-full font-medium transition-all ${formData.role === "ROLE_USER" ? "bg-white text-black" : "text-white"
              }`}
          >
            Faculty
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "ROLE_ADMIN" })}
            className={`px-4 py-2 rounded-full font-medium transition-all ${formData.role === "ROLE_ADMIN" ? "bg-white text-black" : "text-white"
              }`}
          >
            Admin
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm mb-1 block">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm mb-1 block">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full bg-[#1f1f1f] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative w-1/2">
              <label className="text-sm mb-1 block">
                Create Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
                required
              />
              <span
                className="absolute top-8 right-3 text-gray-400 cursor-pointer hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>

            <div className="w-1/2">
              <label className="text-sm mb-1 block">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
                required
              />
            </div>
          </div>

          {formData.role === 'ROLE_ADMIN' && (
            <div>
              <label className="text-sm mb-1 block">
                Admin Key <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="adminKey"
                value={formData.adminKey}
                onChange={handleChange}
                placeholder="Enter admin key"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agreedToPrivacy}
              onChange={handleCheckboxChange}
              className="accent-purple-600"
              required
            />
            <span>
              I agree to the{" "}
              <Link to={'/privacy-policy'} className="text-purple-600 hover:underline">
                Privacy Policy & Terms
              </Link>
            </span>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-[#d92152] hover:bg-transparent transition
              text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
              rounded-lg"
          >
            Create Account
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <button
            type="button"
            className="w-full border border-gray-600 text-white flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-800"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Icon"
              className="w-5 h-5"
            />
            Sign Up with Google
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <img
          src={image}
          alt="Signup"
          className="z-10 w-[55%] h-auto object-cover rounded-2xl border hover:shadow-emerald-600
               shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110" />
      </div>

      <OtpDialog
        open={openOtpDialog}
        onClose={() => setOpenOtpDialog(false)}
        email={formData.email}
        onSuccess={handleOtpValidationSuccess}
        onFailure={handleOtpValidationFailure}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default SignUp;
