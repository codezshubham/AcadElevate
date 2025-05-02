import React from 'react';
import { Filter, Calendar, FileText, Tag, SortAsc } from 'lucide-react';

const ProjectFilter = ({
    startDate,
    endDate,
    type,
    status,
    sortOption,
    onFilterChange,
    onSortChange,
}) => {
    return (
        <div className="bg-gray-900 border border-gray-700 p-5 mt-5 rounded-2xl shadow-lg mb-6 text-white">
            <div className="flex items-center gap-2 mb-5">
                <Filter size={20} className="text-green-500" />
                <h2 className="text-lg font-semibold">Filter & Sort Options</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Start Date */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Calendar size={16} /> Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onFilterChange('startDate', e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Calendar size={16} /> End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onFilterChange('endDate', e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Type */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Tag size={16} /> Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => onFilterChange('type', e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">All</option>
                        <option value="Research">Research</option>
                        <option value="Development">Development</option>
                        <option value="Innovation">Innovation</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <FileText size={16} /> Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">All</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Sort Option */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <SortAsc size={16} /> Sort
                    </label>
                    <select
                        value={sortOption}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="title">Title (A-Z)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProjectFilter;
