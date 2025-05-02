import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsByFacultyId, deleteProject } from '../../../Redux/Faculty/ProjectSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Pencil, Trash2, SlidersHorizontal } from 'lucide-react';
import ResearchFilter from './ProjectFilter';  // Import ResearchFilter
import ProjectStats from './ProjectStats';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const HomeProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, id } = useParams();
  const { projects, isLoading, error } = useSelector((state) => state.project);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: '',
    status: '',
  });

  const [sortOption, setSortOption] = useState('recent');
  const [showFilters, setShowFilters] = useState(false); // Toggle filter visibility

  useEffect(() => {
    console.log("Faculty ID:", id);
    dispatch(getProjectsByFacultyId(id));
  }, [dispatch, id]);

  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(projectId));
    }
  };

  const handleEdit = (project) => {
    navigate(`/${username}/${id}/update-project`, { state: { project } });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Apply filters and sorting
  const filteredProjects = projects
    .filter((project) => {
      const startDateValid = filters.startDate ? new Date(project.startDate) >= new Date(filters.startDate) : true;
      const endDateValid = filters.endDate ? new Date(project.endDate) <= new Date(filters.endDate) : true;
      
      return (
        startDateValid &&
        endDateValid &&
        (!filters.type || project.type === filters.type) &&
        (!filters.status || project.status === filters.status)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }  else {
        return new Date(b.projectDate) - new Date(a.projectDate);
      }
    });

  return (
    <div className="p-4 md:p-10 mt-20 md:mt-10 min-h-screen bg-gray-950">
      <div className="relative flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/${username}/${id}/upload-project`)}
          >
            ➕ Upload Project
          </Button>
          <button
            onClick={toggleFilters}
            className="absolute right-0 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="mb-6">
          <ResearchFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            type={filters.type}
            status={filters.status}
            sortOption={sortOption}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      )}

      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-6">My Projects</h1>

      {/* Content */}
      {isLoading ? (
        <FullScreenLoader />
      ) : filteredProjects.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No projects found with selected filters.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative bg-transparent rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between border-2 border-white"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-sm text-gray-400 mb-1">📄 <span className="font-medium">Description:</span> {project.description}</p>
                <p className="text-sm text-gray-400 mb-1">📅 <span className="font-medium">Start Date:</span> {project.startDate}</p>
                <p className="text-sm text-gray-400 mb-1">🗂️ <span className="font-medium">$ Budget:</span> {project.budget}</p>
                <p className="text-sm text-gray-400 mb-1">📌 <span className="font-medium">Status:</span> {project.projectStatus}</p>
                <p className="text-sm text-gray-400 mb-1">📌 <span className="font-medium">Funding Source:</span> {project.fundingResource}</p>
              </div>

              <div className="absolute flex gap-3 right-4 bottom-4">
                <Pencil
                  size={20}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                  onClick={() => handleEdit(project)}
                />
                <Trash2
                  size={20}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handleDelete(project.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectStats projects={projects}/>
    </div>
  );
};

export default HomeProject;
