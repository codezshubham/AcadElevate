import React from 'react';
import {
    Filter,
    Zap,
    DollarSign,
    FileText,
    SortAsc,
    Calendar,
    Building
} from 'lucide-react';

const ProjectFilter = ({
    publisherName,
    technology,
    fundingResource,
    projectStatus,
    year,
    sortOption,
    onFilterChange,
    onSortChange,
}) => {
    return (
        <div className="bg-gray-900 border border-gray-700 p-5 mt-5 rounded-2xl shadow-lg mb-6 text-white">
            <div className="flex items-center gap-2 mb-5">
                <Filter size={20} className="text-green-500" />
                <h2 className="text-lg font-semibold">Filter & Sort Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {/* Publisher Name */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Building size={16} /> Publisher
                    </label>
                    <input
                        type="text"
                        value={publisherName}
                        onChange={(e) => onFilterChange('publisherName', e.target.value)}
                        placeholder="Enter publisher name"
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Technology */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Zap size={16} /> Technology
                    </label>
                    <input
                        type="text"
                        value={technology}
                        onChange={(e) => onFilterChange('technology', e.target.value)}
                        placeholder="Enter technology"
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Funding Resource */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <DollarSign size={16} /> Funding Resource
                    </label>
                    <input
                        type="text"
                        value={fundingResource}
                        onChange={(e) => onFilterChange('fundingResource', e.target.value)}
                        placeholder="Enter funding source"
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

                {/* Status */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <FileText size={16} /> Status
                    </label>
                    <select
                        value={projectStatus}
                        onChange={(e) => onFilterChange('projectStatus', e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">All</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="PLANNED">Planned</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="ON_HOLD">On Hold</option>
                        <option value="APPROVED">Approved</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                    </select>
                </div>

                {/* Sort by Title */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <SortAsc size={16} /> Sort by Title
                    </label>
                    <select
                        value={sortOption}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default ProjectFilter;
