import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLectures, deleteLecture } from '../../../Redux/Faculty/LectureSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2, Users, Upload, SlidersHorizontal } from 'lucide-react';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';
import LectureFilter from './LectureFilter';
import LectureStatsCards from './LectureStats'; // Optional if you're planning stats

const HomeLecture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const { lectures, isLoading, error } = useSelector((state) => state.lecture);

  const [filters, setFilters] = useState({
    lectureTitle: '',
    institution: '',
    courseLevel: '',
    lectureType: '',
    year: '',
  });
  const [sortOption, setSortOption] = useState('recent');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(getAllLectures());
  }, [dispatch]);

  const handleUpdate = (lecture) => {
    navigate(`/${username}/admin/update-lecture`, { state: { lecture } });
  };

  const handleDelete = (id) => {
    // Show a confirmation alert
    const confirmDelete = window.confirm(`Are you sure you want to delete lecture`);

    if (confirmDelete) {
      dispatch(deleteLecture(id))
        .unwrap()
        .then(() => {
          // Optional: You can show a success message or take other actions
          alert(`Lecture with ID: ${id} has been deleted successfully.`);
          dispatch(getAllLectures()); // Refresh the list after deletion
        })
        .catch((error) => {
          // Handle errors here
          alert(`Error deleting lecture: ${error.message || error}`);
        });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const filteredLectures = lectures
    ?.filter((lecture) => {
      const lectureYear = new Date(lecture.lectureDate).getFullYear().toString();
      return (
        (!filters.lectureTitle || lecture.lectureTitle?.toLowerCase().includes(filters.lectureTitle.toLowerCase())) &&
        (!filters.institution || lecture.institution?.toLowerCase().includes(filters.institution.toLowerCase())) &&
        (!filters.courseLevel || lecture.courseLevel === filters.courseLevel) &&
        (!filters.lectureType || lecture.lectureType === filters.lectureType) &&
        (!filters.year || lectureYear === filters.year)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'titleAsc') return a.lectureTitle.localeCompare(b.lectureTitle);
      if (sortOption === 'titleDesc') return b.lectureTitle.localeCompare(a.lectureTitle);
      if (sortOption === 'recent') return new Date(b.lectureDate) - new Date(a.lectureDate);
      return 0;
    });

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/${username}/admin/upload-lecture`)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow transition"
        >
          <Upload size={18} /> Upload Lecture
        </button>

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl transition"
        >
          <SlidersHorizontal size={16} />
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>


      {/* Filter Section */}
      {showFilter && (
        <div className="mb-6">
          <LectureFilter
            lectureTitle={filters.lectureTitle}
            institution={filters.institution}
            courseLevel={filters.courseLevel}
            lectureType={filters.lectureType}
            year={filters.year}
            sortOption={sortOption}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      )}

      {/* Stats Cards - Optional */}
      <LectureStatsCards />
      
      {/* Loader & Error */}
      {isLoading && <FullScreenLoader />}
      {error && <div className="text-red-500 text-center mb-4">Error: {error}</div>}

      <h1 className="text-5xl font-bold mb-8 text-center text-blue-300 pt-6">📘 All Lectures</h1>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLectures?.map((lecture) => (
          <div
            key={lecture.id}
            className="bg-white text-black rounded-2xl shadow-lg border hover:shadow-xl transition-all flex flex-col overflow-hidden"
          >
            <div className="p-5 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold text-blue-800">{lecture.lectureTitle}</h2>
                <div className="flex gap-2">
                  <Pencil
                    size={18}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleUpdate(lecture)}
                  />
                  <Trash2
                    size={18}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(lecture.id)}
                  />
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3">{lecture.lectureDescription}</p>

              <div className="text-sm text-gray-700 mb-4 space-y-1">
                <p><strong>Date:</strong> {new Date(lecture.lectureDate).toLocaleDateString()}</p>
                <p><strong>Institution:</strong> {lecture.institution || 'N/A'}</p>
                <p><strong>Course Level:</strong> {lecture.courseLevel}</p>
                <p><strong>Type:</strong> {lecture.lectureType}</p>
              </div>

              <button
                onClick={() => navigate(`view/${lecture.id}`)}
                className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm rounded-xl transition"
              >
                <Users size={16} /> View Participants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLecture;
