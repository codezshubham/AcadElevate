import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject } from '../../../Redux/Faculty/ProjectSlice';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const UploadProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: facultyId, username } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    publisherName: '',
    technology: '',
    startDate: '',
    endDate: '',
    role: '',
    fundingResource: '',
    budget: '',
    urlReference: '',
    projectStatus: '', 
    goals: '',
  });

  const { isLoading, error } = useSelector((state) => state.project);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      facultyId,
    };

    console.log("Sending payload:", payload);

    const resultAction = await dispatch(createProject(payload));
    if (createProject.fulfilled.match(resultAction)) {
      navigate(-1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10 my-20 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">📤 Upload Project</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'projectStatus') {
            // If the key is projectStatus, render a dropdown
            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Status</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="PLANNED">Planned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="ON_HOLD">On Hold</option>
                  <option value="APPROVED">Approved</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                </select>
              </div>
            );
          }
          // For other fields, render a regular input
          return (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
              <input
                type={key.includes('Date') ? 'date' : key === 'budget' ? 'number' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          );
        })}

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200"
          >
            {isLoading ? <FullScreenLoader/> : '🚀 Submit Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProject;
