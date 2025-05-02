import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../../Redux/Faculty/ProjectSlice';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';
import { Briefcase, SlidersHorizontal } from 'lucide-react';
import ProjectList from './ProjectList';
import ProjectFilter from './ProjectFilter';
import ProjectStatsCards from './ProjectStats';

const HomeProject = () => {
    const dispatch = useDispatch();
    const { projects, isLoading, error } = useSelector((state) => state.project);

    const [filters, setFilters] = useState({
        publisherName: '',
        technology: '',
        fundingResource: '',
        projectStatus: '',
        year: ''
    });

    const [sortOption, setSortOption] = useState('title');
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 4;

    useEffect(() => {
        dispatch(getAllProjects());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1); // Reset pagination on filter/sort change
    }, [filters, sortOption]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    // Filter + Sort logic
    const filteredProjects = projects
        .filter((proj) => {
            const projectYear = new Date(proj.startDate).getFullYear().toString();
            return (
                (!filters.publisherName || proj.publisherName?.toLowerCase().includes(filters.publisherName.toLowerCase())) &&
                (!filters.technology || proj.technology?.toLowerCase().includes(filters.technology.toLowerCase())) &&
                (!filters.fundingResource || proj.fundingResource === filters.fundingResource) &&
                (!filters.projectStatus || proj.projectStatus === filters.projectStatus) &&
                (!filters.year || projectYear === filters.year)
            );
        })
        .sort((a, b) => {
            if (sortOption === 'titleAsc') return a.title.localeCompare(b.title);
            if (sortOption === 'titleDesc') return b.title.localeCompare(a.title);
            if (sortOption === 'recent') return new Date(b.startDate) - new Date(a.startDate);
            return 0;
        });

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    return (
        <div className="p-6 min-h-screen bg-gray-950 text-white">
            <ProjectStatsCards />

            {/* Toggle Filter Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowFilter(prev => !prev)}
                    className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* Filter UI */}
            {showFilter && (
                <ProjectFilter
                    publisherName={filters.publisherName}
                    technology={filters.technology}
                    fundingResource={filters.fundingResource}
                    projectStatus={filters.projectStatus}
                    year={filters.year}
                    sortOption={sortOption}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />
            )}

            {/* Loading & Error States */}
            {isLoading && <FullScreenLoader />}
            {error && (
                <div className="text-red-400 text-center font-semibold bg-red-100 p-3 rounded mb-6 shadow-md">
                    {error}
                </div>
            )}

            {/* Title */}
            <h2 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
                <Briefcase className="inline-block w-10 h-10 mr-2 text-rose-500" />
                All Faculty Projects
            </h2>
            {/* Project List */}
            <ProjectList projects={currentProjects} />

            {/* Pagination */}
            {filteredProjects.length > projectsPerPage && (
                <div className="flex justify-center mt-8 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-300 
                                ${currentPage === number
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeProject;
