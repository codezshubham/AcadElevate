import React from 'react';
import {
    Filter,
    User,
    MapPin,
    Calendar,
    FileText,
    Layers,
    SortAsc
} from 'lucide-react';

const EventFilter = ({
    organizer,
    location,
    eventType,
    eventStatus,
    year,
    sortOption,
    onFilterChange,
    onSortChange,
}) => {
    return (
        <div className="bg-gray-900 border border-gray-700 p-5 mt-5 rounded-2xl shadow-lg mb-6 text-white">
            <div className="flex items-center gap-2 mb-5">
                <Filter size={20} className="text-green-500" />
                <h2 className="text-lg font-semibold">Filter & Sort Events</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {/* Organizer */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <User size={16} /> Organizer
                    </label>
                    <input
                        type="text"
                        value={organizer}
                        onChange={(e) => onFilterChange('organizer', e.target.value)}
                        placeholder="Enter organizer name"
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <MapPin size={16} /> Location
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => onFilterChange('location', e.target.value)}
                        placeholder="Enter location"
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Event Type */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Layers size={16} /> Event Type
                    </label>
                    <input
                        type="text"
                        value={eventType}
                        onChange={(e) => onFilterChange('eventType', e.target.value)}
                        placeholder="Enter event type"
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Year */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Calendar size={16} /> Year
                    </label>
                    <select
                        value={year}
                        onChange={(e) => onFilterChange('year', e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">All</option>
                        {Array.from({ length: 8 }, (_, i) => {
                            const y = new Date().getFullYear() - i;
                            return <option key={y} value={y}>{y}</option>;
                        })}
                    </select>
                </div>

                {/* Event Status */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <FileText size={16} /> Status
                    </label>
                    <select
                        value={eventStatus}
                        onChange={(e) => onFilterChange('eventStatus', e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">All</option>
                        <option value="PLANNED">Planned</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="POSTPONED">Postponed</option>
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
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">All</option>
                        <option value="recent">Most Recent</option>
                        <option value="nameAsc">Name (A-Z)</option>
                        <option value="nameDesc">Name (Z-A)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default EventFilter;
