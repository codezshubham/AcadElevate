import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProjectById,
  updateProject,
} from '../../../Redux/Faculty/ProjectSlice';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const ViewProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, isLoading, error } = useSelector((state) => state.project);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    projectStatus: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      setForm({
        projectStatus: project.projectStatus || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    const updatedProject = {
      ...project,
      ...form,
    };
    dispatch(updateProject({ id, updatedProject }));
    dispatch(getProjectById(id));
    setEditMode(false);
  };

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!project) return <div className="text-center text-gray-600 mt-10">No data found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl">
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{project.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Duration: {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editMode ? 'Cancel' : 'Update'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-[15px]">
        <div>
          <span className="font-semibold">Description:</span>
          <p className="mt-1 text-gray-600">{project.description}</p>
        </div>

        <div>
          <span className="font-semibold">Publisher:</span>
          <p className="mt-1">{project.publisherName}</p>
        </div>

        <div>
          <span className="font-semibold">Technology:</span>
          <p className="mt-1">{project.technology}</p>
        </div>

        <div>
          <span className="font-semibold">Role:</span>
          <p className="mt-1">{project.role}</p>
        </div>

        <div>
          <span className="font-semibold">Funding Resource:</span>
          <p className="mt-1">{project.fundingResource}</p>
        </div>

        <div>
          <span className="font-semibold">Budget:</span>
          <p className="mt-1">{project.budget}</p>
        </div>

        <div>
          <span className="font-semibold">Project Status:</span>
          {editMode ? (
            <select
              name="projectStatus"
              value={form.projectStatus}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="">Select status</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="PLANNED">Planned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="APPROVED">Approved</option>
              <option value="UNDER_REVIEW">Under Review</option>
            </select>
          ) : (
            <p className="mt-1">{project.projectStatus}</p>
          )}
        </div>

        {project.urlReference && (
          <div className="md:col-span-2">
            <span className="font-semibold">Reference URL:</span>{' '}
            <a
              href={project.urlReference}
              className="text-blue-600 underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.urlReference}
            </a>
          </div>
        )}

        <div className="md:col-span-2">
          <span className="font-semibold">Goals:</span>
          <p className="mt-1">{project.goals}</p>
        </div>
      </div>

      {editMode && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewProject;
