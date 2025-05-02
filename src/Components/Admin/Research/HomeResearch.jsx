import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPublications } from '../../../Redux/Faculty/ResearchSlice';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';
import { useParams } from 'react-router-dom';
import ResearchFilter from './ResearchFilter';
import ResearchList from './ResearchList';
import { SlidersHorizontal } from 'lucide-react';
import ResearchStatsCards from './ResearchStats';

const HomeResearch = () => {
    const dispatch = useDispatch();
    const { publications, isLoading, error } = useSelector((state) => state.publication);
    const { username } = useParams();

    const [filters, setFilters] = useState({
        publisherName: '',
        year: '',
        type: '',
        status: ''
    });

    const [sortOption, setSortOption] = useState('title');
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const publicationsPerPage = 6;

    useEffect(() => {
        dispatch(getAllPublications());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortOption]);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    // Filtering + Sorting
    const filteredPubs = publications
        .filter((pub) => {
            const pubYear = new Date(pub.publicationDate).getFullYear().toString();
            return (
                (!filters.publisherName || pub.publisherName?.toLowerCase().includes(filters.publisherName.toLowerCase())) &&
                (!filters.year || pubYear === filters.year) &&
                (!filters.type || pub.publicationType === filters.type) &&
                (!filters.status || pub.publicationStatus === filters.status)
            );
        })
        .sort((a, b) => {
            if (sortOption === 'titleAsc') return a.title.localeCompare(b.title);
            if (sortOption === 'titleDesc') return b.title.localeCompare(a.title);
            if (sortOption === 'recent') return new Date(b.publicationDate) - new Date(a.publicationDate);
            return 0;
        });

    const indexOfLastPub = currentPage * publicationsPerPage;
    const indexOfFirstPub = indexOfLastPub - publicationsPerPage;
    const currentPublications = filteredPubs.slice(indexOfFirstPub, indexOfLastPub);
    const totalPages = Math.ceil(filteredPubs.length / publicationsPerPage);

    return (
        <div className="p-6 min-h-screen bg-gray-950">
            <ResearchStatsCards />
            {/* Toggle Filter Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {showFilter && (
                <ResearchFilter
                    publisherName={filters.publisherName}
                    year={filters.year}
                    type={filters.type}
                    status={filters.status}
                    sortOption={sortOption}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />
            )}

            {isLoading && <FullScreenLoader />}
            {error && (
                <div className="text-red-400 text-center font-semibold bg-red-100 p-3 rounded mb-6 shadow-md">
                    {error}
                </div>
            )}

            <h2 className="text-5xl font-extrabold mb-6 text-white text-center drop-shadow-lg">
                📚 Listed Research Publications
            </h2>

            <ResearchList publications={currentPublications} />

            {filteredPubs.length > publicationsPerPage && (
                <div className="flex justify-center mt-8 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
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

export default HomeResearch;
