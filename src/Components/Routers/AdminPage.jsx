import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProfile from '../Admin/Dashboard/UserProfile';
import Layout from '../Admin/Pages/Layout'; // Use Layout instead of directly rendering Navbar
import HomeResearch from '../Admin/Research/HomeResearch';
import ViewResearch from '../Admin/Research/ViewResearch';
import HomeProject from '../Admin/Project/HomeProject';
import ViewProject from '../Admin/Project/ViewProject';
import HomeEvent from '../Admin/Event/HomeEvent';
import ViewEvent from '../Admin/Event/ViewEvent'; 
import UploadEvent from '../Admin/Event/UploadEvent';
import UpdateEvent from '../Admin/Event/UpdateEvent';
import HomeLecture from '../Admin/Lecture/HomeLecture';
import UploadLecture from '../Admin/Lecture/UploadLecture';
import ViewLecture from '../Admin/Lecture/ViewLecture';
import UpdateLecture from '../Admin/Lecture/UpdateLecture';

const AdminPage = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<UserProfile />} />
        <Route path='research' element={<HomeResearch />} />
        <Route path="research/view/:id" element={<ViewResearch />} />
        <Route path="project" element={<HomeProject />} />
        <Route path="project/view/:id" element={<ViewProject />} />
        <Route path="event" element={<HomeEvent />} />
        <Route path="event/view/:id" element={<ViewEvent />} />
        <Route path="upload-event" element={<UploadEvent />} />
        <Route path="update-event" element={<UpdateEvent />} />
        <Route path="lecture" element={<HomeLecture />} />
        <Route path="lecture/view/:id" element={<ViewLecture />} />
        <Route path="upload-lecture" element={<UploadLecture />} />
        <Route path="update-lecture" element={<UpdateLecture />} />
      </Routes>
    </Layout>
  );
};

export default AdminPage;
