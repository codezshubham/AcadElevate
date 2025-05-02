import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateOTP, validateOTP, clearError, clearSuccess } from '../../Redux/Auth/OtpSlice';
import { Dialog, Snackbar, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OtpDialog = ({ open, onClose, email, onSuccess, onFailure }) => {
  const dispatch = useDispatch();
  const { validationSuccess, error, isLoading } = useSelector((state) => state.otp);

  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    dispatch(clearError());
    dispatch(clearSuccess());
  };

  // Generate OTP when modal opens
  useEffect(() => {
    if (open) {
      dispatch(generateOTP(email));
      setOtpArray(['', '', '', '']); // Reset OTP fields
    }
  }, [dispatch, email, open]);

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    // Move focus to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData('text').slice(0, 4); // Ensure only first 4 digits are used
    const newOtp = pastedOtp.split('');
    setOtpArray(newOtp);
    inputRefs.current[3]?.focus(); // Focus on the last input box after paste
  };

  const handleValidateOtp = () => {
    const fullOtp = otpArray.join('');
    dispatch(validateOTP({ email, otp: fullOtp }));
  };

  useEffect(() => {
    if (validationSuccess) {
      setSnackbarMessage('OTP validation successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      onSuccess();
    } else if (error) {
      setSnackbarMessage('Invalid OTP. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      onFailure();
    }
  }, [validationSuccess, error, onSuccess, onFailure]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" color='transparent'>
      <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 absolute top-5 left-5"
          title="Back"
        >
          <FaArrowLeft className="text-base" />
        </button>
      <div className="bg-gray-900 px-8 py-8 text-center shadow-md md:pt-0 pt-12">
        <h2 className=" text-3xl md:text-5xl p-2 font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-2">OTP Verification</h2>
        <p className="text-md text-white pb-6">
          Enter the code we sent to your email <br />
          <span className="font-medium text-gray-400 pt-4">
            {email.replace(/(.{1})(.*)(?=@)/,
              (_, firstChar, rest) => `${firstChar}${'*'.repeat(rest.length)}`)}
          </span>
          <br />
          <span className="text-red-500">Be careful not to share the code with anyone</span>
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {otpArray.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-12 text-xl text-center border rounded-md focus:outline-none focus:ring-4 focus:ring-[#d92152] bg-gray-800 text-white placeholder-gray-500"
            />
          ))}
        </div>

        <button
          onClick={handleValidateOtp}
          className="w-full p-2 bg-[#d92152] hover:bg-transparent transition
              text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
              rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify email'}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          Cancel
        </button>
      </div>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Dialog>
  );
};

export default OtpDialog;
