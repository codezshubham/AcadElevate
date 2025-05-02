import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllLectures,
  rsvpLecture,
  withdrawLecture,
  getParticipatedLectures,
} from '../../../Redux/Faculty/LectureSlice';
import { BadgeCheck, BookmarkPlus, Loader2, SlidersHorizontal } from 'lucide-react';
import { toast } from 'react-toastify';
import LectureStats from './LectureStats';
import LectureFilter from './LectureFilter';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const HomeLecture = () => {
  const dispatch = useDispatch();
  const { lectures, participatedLectures, isLoading, error } = useSelector((state) => state.lecture);
  const { user } = useSelector((state) => state.user);
  const facultyId = Number(localStorage.getItem('userId'));

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    lectureDate: '',
    lectureType: '',
    mode: '',
    courseLevel: '',
  });
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    dispatch(getAllLectures());
    if (facultyId) {
      dispatch(getParticipatedLectures(facultyId));
    }
  }, [dispatch, facultyId]);

  const handleToggleRSVP = async (lecture) => {
    if (!facultyId) {
      toast.error('You must be logged in to RSVP.');
      return;
    }

    const isParticipant = lecture.participants?.some((p) => p.id === facultyId);

    try {
      if (isParticipant) {
        await dispatch(withdrawLecture(lecture.id)).unwrap();
        toast.success('You have withdrawn from this lecture.');
      } else {
        await dispatch(rsvpLecture(lecture.id)).unwrap();
        toast.success('You have RSVPed to this lecture.');
      }
      dispatch(getAllLectures());
      dispatch(getParticipatedLectures(facultyId));
    } catch (err) {
      toast.error(err);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const applyFiltersAndSort = (data) => {
    let filtered = [...data];

    if (filters.lectureDate) {
      filtered = filtered.filter((lec) => lec.lectureDate === filters.lectureDate);
    }
    if (filters.lectureType) {
      filtered = filtered.filter((lec) => lec.lectureType === filters.lectureType);
    }
    if (filters.mode) {
      filtered = filtered.filter((lec) => lec.mode === filters.mode);
    }
    if (filters.courseLevel) {
      filtered = filtered.filter((lec) => lec.courseLevel === filters.courseLevel);
    }

    switch (sortOption) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.lectureDate) - new Date(a.lectureDate));
        break;
      case 'name':
        filtered.sort((a, b) => a.lectureTitle.localeCompare(b.lectureTitle));
        break;
      case 'dateAsc':
        filtered.sort((a, b) => new Date(a.lectureDate) - new Date(b.lectureDate));
        break;
      case 'dateDesc':
        filtered.sort((a, b) => new Date(b.lectureDate) - new Date(a.lectureDate));
        break;
      default:
        break;
    }

    return filtered;
  };

  const renderLectureCard = (lecture) => {
    const isParticipant = lecture.participants?.some((p) => p.id === facultyId);

    return (
      <div
        key={lecture.id}
        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out relative group"
      >
        <h3 className="text-2xl font-bold text-blue-700 mb-2">{lecture.lectureTitle}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{lecture.lectureDescription}</p>

        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-center gap-2">
            <span className="font-semibold">📅 Date:</span> {lecture.lectureDate}
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold">🎓 Course Level:</span> {lecture.courseLevel}
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold">🏫 Institution:</span> {lecture.institution}
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold">📚 Type:</span> {lecture.lectureType}
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold">💻 Mode:</span> {lecture.mode}
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold">⏱ Duration:</span> {lecture.duration}
          </li>
        </ul>

        {lecture.lectureLink && (
          <a
            href={lecture.lectureLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            🎥 See Lecture
          </a>
        )}

        <button
          onClick={() => handleToggleRSVP(lecture)}
          className="absolute top-4 right-4 rounded-full p-1.5 bg-white shadow-md hover:shadow-xl transition"
          title={isParticipant ? 'Withdraw RSVP' : 'RSVP to Lecture'}
        >
          {isParticipant ? (
            <BadgeCheck className="text-green-600 w-6 h-6" />
          ) : (
            <BookmarkPlus className="text-gray-400 hover:text-blue-600 w-6 h-6" />
          )}
        </button>
      </div>

    );
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  const filteredLectures = applyFiltersAndSort(lectures);

  return (
    <div className="p-6 md:p-10 mt-6 space-y-12">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <SlidersHorizontal size={18} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <LectureFilter
          lectureDate={filters.lectureDate}
          lectureType={filters.lectureType}
          mode={filters.mode}
          courseLevel={filters.courseLevel}
          sortOption={sortOption}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      )}

      {/* All Lectures */}
      <section>
        <h2 className="text-5xl font-bold text-start bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-10">
          Newly Uploaded Lectures
        </h2>

        {isLoading ? (
          <FullScreenLoader />
        ) : filteredLectures?.length === 0 ? (
          <p className="text-center text-gray-400">No lectures available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLectures.map(renderLectureCard)}
          </div>
        )}
      </section>


      {/* Participated Lectures */}
      <section>
        <h2 className="text-5xl font-bold text-start bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-10">Lectures You Participated In</h2>
        {isLoading ? (
          <FullScreenLoader />
        ) : participatedLectures?.length === 0 ? (
          <p className="text-center text-gray-400">You haven’t participated in any lectures yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participatedLectures.map(renderLectureCard)}
          </div>
        )}
      </section>

      <LectureStats />
    </div>
  );
};

export default HomeLecture;
