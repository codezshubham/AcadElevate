import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../Redux/Auth/ForgetPasswordSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import image from '../../Asset/reset-password.jpg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FaArrowLeft } from 'react-icons/fa'; 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleSubmit = () => {
    if (!agreeTerms) {
      setSnackbarMessage('Please agree to the terms and conditions.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbarMessage('Passwords do not match.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    dispatch(resetPassword({ email, newPassword }))
      .then(() => {
        setSnackbarMessage('Password changed successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(() => {
        setSnackbarMessage('Something went wrong!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 absolute top-5 left-5"
        title="Back"
      >
        <FaArrowLeft className="text-base" />
      </button>
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center bg-transparent rounded-xl shadow-xl">

        {/* Left Side - Reset Password Form */}
        <div className="w-full md:w-1/2 px-4 md:px-16 md:pt-0 pt-10">
          <h2 className="text-3xl md:text-5xl pb-2 font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-2">
            Reset your password
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Your new password must be different from previously used passwords.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-300 border border-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="relative mb-4">
            <label className="block text-sm font-medium text-white mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              I agree to AcadElevate’s{' '}
              <Link to={'/privacy-policy'} className="text-blue-400 hover:underline">Terms of Use</Link> and{' '}
              <Link to={'/privacy-policy'} className="text-blue-400 hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#d92152] hover:bg-blue-700 font-semibold py-2  hover:bg-transparent transition
              text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152]  
              rounded-lg"
          >
            Reset Password
          </button>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
          <img
            src={image}
            alt="Reset Password Illustration"
            className="z-10 w-[55%] h-auto object-cover rounded-2xl border hover:shadow-emerald-600
              shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      </div>


      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPasswordForm;
