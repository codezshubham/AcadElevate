import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPublicationsByFacultyId,
    downloadPublicationFile,
    deletePublication,
} from '../../../Redux/Faculty/ResearchSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Download, SlidersHorizontal } from 'lucide-react';
import ResearchFilter from './ResearchFilter';
import ResearchStats from './ResearchStats';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const HomeResearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, id } = useParams();
    const { publications, isLoading } = useSelector(state => state.publication);

    const [filters, setFilters] = useState({
        year: '',
        type: '',
        status: '',
    });

    const [sortOption, setSortOption] = useState('recent');
    const [showFilters, setShowFilters] = useState(false); // Toggle filter visibility

    useEffect(() => {
        dispatch(getPublicationsByFacultyId(id));
    }, [dispatch, id]);

    const handleDownload = (pubId) => {
        dispatch(downloadPublicationFile(pubId));
    };

    const handleDelete = (pubId) => {
        if (window.confirm('Are you sure you want to delete this publication?')) {
            dispatch(deletePublication(pubId));
        }
    };

    const handleEdit = (publication) => {
        navigate(`/${username}/${id}/update-research`, { state: { publication } });
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Apply filters and sorting
    const filteredPublications = publications
        .filter((pub) => {
            const pubYear = new Date(pub.publicationDate).getFullYear().toString();
            return (
                (!filters.year || pubYear === filters.year) &&
                (!filters.type || pub.publicationType === filters.type) &&
                (!filters.status || pub.publicationStatus === filters.status)
            );
        })
        .sort((a, b) => {
            if (sortOption === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortOption === 'impact') {
                return parseFloat(b.impactFactor || 0) - parseFloat(a.impactFactor || 0);
            } else {
                return new Date(b.publicationDate) - new Date(a.publicationDate);
            }
        });

    return (
        <div className="p-4 md:p-10 mt-20 md:mt-10 min-h-screen bg-gray-950">
            <div className="relative flex justify-between items-center mb-6">
                <div className=" flex items-center gap-4">
                    <Link
                        to={`/${username}/${id}/upload-research`}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded shadow transition-all"
                    >
                        ➕ Upload Research
                    </Link>
                    <button
                        onClick={toggleFilters}
                        className="absolute right-0 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition"
                    >
                        <SlidersHorizontal size={18} />
                        Filters
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {showFilters && (
                <div className="mb-6">
                    <ResearchFilter
                        year={filters.year}
                        type={filters.type}
                        status={filters.status}
                        sortOption={sortOption}
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                    />
                </div>
            )}

            <h1 className="text-5xl font-bold  bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-6"> My Research Publications</h1>
            {/* Content */}
            {isLoading ? (
                <FullScreenLoader/>
            ) : filteredPublications.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">No research publications found with selected filters.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPublications.map(pub => (
                        <div
                            key={pub.id}
                            className="bg-transparent rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between border-2 border-white"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">{pub.title}</h2>
                                <p className="text-sm text-gray-400 mb-1">👩‍🔬 <span className="font-medium">Authors:</span> {pub.author}</p>
                                <p className="text-sm text-gray-400 mb-1">🗓️ <span className="font-medium">Published on:</span> {pub.publicationDate}</p>
                                <p className="text-sm text-gray-400 mb-1">📘 <span className="font-medium">Journal:</span> {pub.journalName}</p>
                                <p className="text-sm text-gray-400 mb-1">📄 <span className="font-medium">Status:</span> {pub.publicationStatus}</p>
                                <p className="text-sm text-gray-400 mb-1">⭐ <span className="font-medium">Impact Factor:</span> {pub.impactFactor}</p>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleDownload(pub.id)}
                                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded transition"
                                >
                                    <Download size={16} /> Download
                                </button>

                                <div className="flex gap-3">
                                    <Pencil
                                        size={20}
                                        className="text-green-600 hover:text-green-800 cursor-pointer"
                                        onClick={() => handleEdit(pub)}
                                    />
                                    <Trash2
                                        size={20}
                                        className="text-red-600 hover:text-red-800 cursor-pointer"
                                        onClick={() => handleDelete(pub.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

               <ResearchStats publications={publications} />

        </div>
    );
};

export default HomeResearch;
