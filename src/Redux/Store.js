import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/AuthSlice' // Import the auth slice reducer
import userReducer from './Faculty/UserSlice'
import publicationReducer from './Faculty/ResearchSlice'
import projectReducer from './Faculty/ProjectSlice'
import lectureReducer from './Faculty/LectureSlice'
import eventReducer from './Faculty/EventSlice'
import documentReducer from './Faculty/DocumentSlice'
import appraisalReducer from './Faculty/AppraisalSlice'
import otpReducer from './Auth/OtpSlice'
import forgetPasswordReducer from './Auth/ForgetPasswordSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    publication: publicationReducer,
    project : projectReducer,
    lecture : lectureReducer,
    event : eventReducer,
    document : documentReducer,
    appraisal : appraisalReducer,
    otp : otpReducer,
    forgetPassword: forgetPasswordReducer,
  },
});

export default store;
