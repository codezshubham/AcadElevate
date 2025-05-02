import React from 'react';
import {
  Filter,
  Calendar,
  SortAsc,
  Presentation,
  Globe,
  GraduationCap,
} from 'lucide-react';

const LectureFilter = ({
  lectureDate,
  lectureType,
  mode,
  courseLevel,
  sortOption,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="bg-gray-900 border border-gray-700 p-5 mt-5 rounded-2xl shadow-lg mb-6 text-white">
      <div className="flex items-center gap-2 mb-5">
        <Filter size={20} className="text-purple-400" />
        <h2 className="text-lg font-semibold">Filter & Sort Lectures</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Lecture Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Calendar size={16} /> Lecture Date
          </label>
          <input
            type="date"
            value={lectureDate}
            onChange={(e) => onFilterChange('lectureDate', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Lecture Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Presentation size={16} /> Lecture Type
          </label>
          <select
            value={lectureType}
            onChange={(e) => onFilterChange('lectureType', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All</option>
            <option value="Class">Class</option>
            <option value="Guest Lecture">Guest Lecture</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
          </select>
        </div>

        {/* Mode */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Globe size={16} /> Mode
          </label>
          <select
            value={mode}
            onChange={(e) => onFilterChange('mode', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All</option>
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Course Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <GraduationCap size={16} /> Course Level
          </label>
          <select
            value={courseLevel}
            onChange={(e) => onFilterChange('courseLevel', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>

        {/* Sort Option */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <SortAsc size={16} /> Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Lecture Name (A-Z)</option>
            <option value="dateAsc">Lecture Date (Oldest First)</option>
            <option value="dateDesc">Lecture Date (Newest First)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LectureFilter;
