import React from 'react';
import {
  Filter,
  FileText,
  School,
  Building2,
  Layers,
  Calendar,
  SortAsc
} from 'lucide-react';

const LectureFilter = ({
  lectureTitle,
  institution,
  courseLevel,
  lectureType,
  year,
  sortOption,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="bg-gray-900 border border-gray-700 p-5 mt-5 rounded-2xl shadow-lg mb-6 text-white">
      <div className="flex items-center gap-2 mb-5">
        <Filter size={20} className="text-blue-400" />
        <h2 className="text-lg font-semibold">Filter & Sort Lectures</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Lecture Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <FileText size={16} /> Lecture Title
          </label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => onFilterChange('lectureTitle', e.target.value)}
            placeholder="Enter lecture title"
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Institution */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Building2 size={16} /> Institution
          </label>
          <input
            type="text"
            value={institution}
            onChange={(e) => onFilterChange('institution', e.target.value)}
            placeholder="Enter institution name"
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Course Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <School size={16} /> Course Level
          </label>
          <select
            value={courseLevel}
            onChange={(e) => onFilterChange('courseLevel', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="PHD">PhD</option>
          </select>
        </div>

        {/* Lecture Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Layers size={16} /> Lecture Type
          </label>
          <select
            value={lectureType}
            onChange={(e) => onFilterChange('lectureType', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Guest Lecture">Guest Lecture</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Calendar size={16} /> Year
          </label>
          <select
            value={year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {Array.from({ length: 8 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
        </div>

        {/* Sort Option */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <SortAsc size={16} /> Sort by
          </label>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="recent">Most Recent</option>
            <option value="titleAsc">Title (A-Z)</option>
            <option value="titleDesc">Title (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LectureFilter;
