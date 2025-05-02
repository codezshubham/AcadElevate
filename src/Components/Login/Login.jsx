import React, { useState, useEffect } from "react";
import image from '../../Asset/login.jpg';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../Redux/Auth/AuthSlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import OtpDialog from './OTP';
import { useDispatch } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FaArrowLeft } from 'react-icons/fa'; 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'ROLE_USER',
    adminKey: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedRole = localStorage.getItem('role');
    if (savedEmail && savedRole) {
      setFormData({ ...formData, email: savedEmail, role: savedRole });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (rememberMe) {
      localStorage.setItem('email', formData.email);
      localStorage.setItem('role', formData.role);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('role');
    }

    try {
      const response = await dispatch(login(formData)).unwrap();

      if (response) {
        setOpenOtpDialog(true); // Show OTP dialog only if login success
      } else {
        setSnackbarMessage('Invalid login credentials. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }

    } catch (err) {
      console.error('Login error:', err);
      setSnackbarMessage('Invalid login credentials. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setSnackbarMessage('Login successful! Redirecting to HomePage...');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    setTimeout(() => {
      navigate('/');
    }, 2000);

    setOpenOtpDialog(false);
  };

  const handleOtpFailure = () => {
    setSnackbarMessage('OTP validation failed. Please try again.');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
    setOpenOtpDialog(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 absolute top-5 left-5"
        title="Back"
      >
        <FaArrowLeft className="text-base" />
      </button>
      <div className="w-full max-w-md text-white p-6 mt-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-gray-400 mb-6">
          Build skills for today, tomorrow, and beyond.
          <span className="italic text-blue-400"> Education to future-proof your career.</span>
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
          <div>
            <label className="text-sm font-medium">Email Address<span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-md bg-[#161B22] text-white border border-[#30363D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password<span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-md bg-[#161B22] text-white border border-[#30363D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
                placeholder="Enter Password"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
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
                className="w-full p-3 mt-1 rounded-md bg-[#161B22] text-white border border-[#30363D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
                required
              />
            </div>
          )}

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              className="form-checkbox text-purple-500"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <p className="text-gray-500 text-sm">Remember me</p>
          </div>

          <div className="text-right mt-1">
            <a href="/forget-password" className="text-sm text-blue-400 hover:underline">Forgot Password?</a>
          </div>

          <button
            className="w-full font-semibold py-3 bg-[#d92152] hover:bg-transparent transition
              text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152]  
              rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="mx-4 text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 bg-[#161B22] hover:bg-[#21262D] border border-[#30363D] text-white py-3 rounded-md transition duration-200"
            type="button"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Sign Up with Google</span>
          </button>
        </form>

        <div className="text-center mt-6 text-gray-500">
          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sm text-purple-600 hover:underline">Sign Up here</Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 items-center justify-center pl-16">
        <img
          src={image}
          alt="Signup"
          className="z-10 w-[55%] h-auto object-cover rounded-2xl border hover:shadow-emerald-600
          shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      <OtpDialog
        open={openOtpDialog}
        onClose={() => setOpenOtpDialog(false)}
        email={formData.email}
        onSuccess={handleOtpSuccess}
        onFailure={handleOtpFailure}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
