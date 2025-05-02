import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, clearStatus } from '../../Redux/Auth/ForgetPasswordSlice';
import OtpDialog from './OTP';
import image from '../../Asset/forgot-password.jpg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FaArrowLeft } from 'react-icons/fa'; 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, otpSent } = useSelector((state) => state.forgetPassword);

  const handleSendOtp = () => {
    if (email) {
      dispatch(sendOtp(email));
    }
  };

  useEffect(() => {
    if (otpSent) {
      setSnackbarMessage('OTP sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setOtpDialogOpen(true);
    }
  }, [otpSent]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleOtpSuccess = () => {
    setOtpDialogOpen(false);
    setSnackbarMessage('OTP verified successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    dispatch(clearStatus());

    setTimeout(() => {
      navigate('/reset-password', { state: { email } });
    }, 2000); // show snackbar for 1s before navigating
  };

  const handleOtpFailure = () => {
    setSnackbarMessage('OTP verification failed. Please try again.');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  useEffect(() => {
    return () => {
      dispatch(clearStatus()); // Clear status when component unmounts
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 absolute top-5 left-5"
        title="Back"
      >
        <FaArrowLeft className="text-base" />
      </button>
      <div className="max-w-6xl w-full flex flex-col md:flex-row md:mt-0 mt-10 items-center justify-center bg-transparent rounded-xl shadow-xl">
        <div className="w-full md:w-1/2 px-8 md:px-16">
          <h1 className="text-3xl md:text-4xl pb-2 font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-2">
            Forget Your Password
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Enter your email address and we’ll send you an OTP to reset your password.
          </p>

          <div className="mb-4">
            <label className="text-white text-sm font-medium">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#161D2F] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d92152]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className={`w-full py-2 bg-[#d92152] text-white rounded-lg border-2 border-[#d92152] transition 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-transparent hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152]'}`}
          >
            {loading ? 'Sending OTP...' : 'Reset Password'}
          </button>

          <OtpDialog
            open={otpDialogOpen}
            onClose={() => {
              setOtpDialogOpen(false);
              dispatch(clearStatus());
            }}
            email={email}
            onSuccess={handleOtpSuccess}
            onFailure={handleOtpFailure}
          />

          <p className="mt-4 text-sm text-gray-400">
            Remember your password? <a href="/login" className="text-purple-400 hover:underline">Login here</a>
          </p>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
          <img
            src={image}
            alt="Reset Password Illustration"
            className="z-10 w-[55%] h-auto object-cover rounded-2xl border hover:shadow-emerald-600
            shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      </div>

      {/* Snackbar Component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
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

export default ForgetPasswordPage;
