import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Navbar from '../Faculty/Navbar/FacNavbar';
import UserProfile from '../Faculty/Dashboard/UserProfile';
import HomeResearch from '../Faculty/Research/HomeResearch';
import UploadResearch from '../Faculty/Research/UploadResearch';
import UpdateResearch from '../Faculty/Research/UpdateResearch';
import HomeProject from '../Faculty/Project/HomeProject';
import UploadProject from '../Faculty/Project/UploadProject';
import UpdateProject from '../Faculty/Project/UpdateProject';
import HomeEvent from '../Faculty/Event/HomeEvent';
import ViewEvent from '../Faculty/Event/ViewEvent';
import HomeLecture from '../Faculty/Lecture/HomeLecture';
import FacFooter from '../Faculty/Footer/FacFooter';

const FacultyPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4">
        <Routes>
          <Route index element={<UserProfile />} />
          <Route path="research" element={<HomeResearch />} />
          <Route path="upload-research" element={<UploadResearch />} />
          <Route path="update-research" element={<UpdateResearch />} />
          <Route path="project" element={<HomeProject />} />
          <Route path="upload-project" element={<UploadProject />} />
          <Route path="update-project" element={<UpdateProject />} />
          <Route path="event" element={<HomeEvent />} />
          <Route path="event/view/:eventId" element={<ViewEvent />} />
          <Route path="lecture" element={<HomeLecture />} />
        </Routes>
        <Outlet /> {/* This will render any child route in this page */}
      </div>
      <FacFooter />
    </>
  );
};

export default FacultyPage;
