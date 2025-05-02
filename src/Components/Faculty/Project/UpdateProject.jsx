import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../../Redux/Faculty/ProjectSlice';

const UpdateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, id } = useParams();
  const { state } = useLocation();
  const project = state?.project;

  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    publisherName: project?.publisherName || '',
    technology: project?.technology || '',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    role: project?.role || '',
    fundingResource: project?.fundingResource || '',
    budget: project?.budget || '',
    urlReference: project?.urlReference || '',
    projectStatus: project?.projectStatus || '',
    goals: project?.goals || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = { ...formData };

    const result = await dispatch(updateProject({
      id: project.id,
      updatedProject,
    }));

    if (updateProject.fulfilled.match(result)) {
      navigate(-1);
    } else {
      console.error("Update failed:", result.payload);
    }
  };

  if (!project) {
    return <div className="text-center mt-10 text-gray-500">Loading project data...</div>;
  }

  const fields = [
    { name: 'title', label: '📌 Title', type: 'text', placeholder: 'Enter project title' },
    { name: 'description', label: '📝 Description', type: 'textarea', placeholder: 'Brief description of the project' },
    { name: 'publisherName', label: '👤 Publisher Name', type: 'text', placeholder: 'Enter Your Name'},
    { name: 'technology', label: '🛠️ Technology', type: 'text', placeholder: 'Technology Used'}, 
    { name: 'startDate', label: '📅 Start Date', type: 'date' },
    { name: 'endDate', label: '📅 End Date', type: 'date' },
    { name: 'role', label: '🎯 Role', type: 'text', placeholder: 'Enter your role in the project' },
    { name: 'fundingResource', label: '💸 Funding Source', type: 'text', placeholder: 'E.g., Government, Private' },
    { name: 'budget', label: '💰 Budget', type: 'number', placeholder: 'Enter project budget' },
    { name: 'urlReference', label: '🔗 URL Reference', type: 'text', placeholder: 'Enter project reference URL' },
    {
      name: 'projectStatus',
      label: '📊 Status',
      type: 'select',
      options: [
        'CANCELLED', 'PLANNED', 'IN_PROGRESS', 'COMPLETED',
        'REJECTED', 'ON_HOLD', 'APPROVED', 'UNDER_REVIEW'
      ]
    },
    { name: 'goals', label: '🎯 Goals', type: 'textarea', placeholder: 'Enter project goals and objectives' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-10 my-16 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🛠️ Update Project</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ name, label, type = 'text', options = [], placeholder = '' }) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>

            {type === 'textarea' ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={3}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : type === 'select' ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">Select Status</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-3 rounded-lg shadow-lg transition-all duration-200"
          >
            💾 Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
