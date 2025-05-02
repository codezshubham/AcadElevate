import React from 'react';
import { Filter, Calendar, MapPin, Tag, SortAsc, Globe } from 'lucide-react';

const EventFilter = ({
  lastUpdated,
  eventDate,
  eventType,
  isVirtual,
  sortOption,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="bg-gray-900 border border-gray-700 p-5 mt-5 rounded-2xl shadow-lg mb-6 text-white">
      <div className="flex items-center gap-2 mb-5">
        <Filter size={20} className="text-blue-400" />
        <h2 className="text-lg font-semibold">Filter & Sort Events</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Upload Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Calendar size={16} /> Upload Date
          </label>
          <input
            type="date"
            value={lastUpdated}
            onChange={(e) => onFilterChange('lastUpdated', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Calendar size={16} /> Event Date
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => onFilterChange('eventDate', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Tag size={16} /> Event Type
          </label>
          <select
            value={eventType}
            onChange={(e) => onFilterChange('eventType', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="Webinar">Webinar</option>
          </select>
        </div>

        {/* Mode (Virtual or Offline) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Globe size={16} /> Mode
          </label>
          <select
            value={isVirtual}
            onChange={(e) => onFilterChange('isVirtual', e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="true">Virtual</option>
            <option value="false">Offline</option>
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
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Event Name (A-Z)</option>
            <option value="dateAsc">Event Date (Oldest First)</option>
            <option value="dateDesc">Event Date (Newest First)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
