import React from 'react';
import { Link } from 'react-router-dom';

const ResearchList = ({ publications }) => {
    return (
        <div>
            {/* Grid Header */}
            <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 bg-rose-600 text-white px-6 py-3 rounded-t-lg font-semibold shadow-lg">
                <p>Title</p>
                <p>Faculty Name</p>
                <p>Type</p>
                <p>Status</p>
                <p>Date</p>
                <p className="text-right">Action</p>
            </div>

            <div className="space-y-4 mt-2">
                {publications.length > 0 ? (
                    publications.map((pub) => (
                        <div
                            key={pub.id}
                            className="grid md:grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-4 bg-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 items-center"
                        >
                            <p className="text-sm font-medium text-gray-800">{pub.title}</p>
                            <p className="text-sm text-gray-700">{pub.publisherName}</p>
                            <p className="text-sm text-gray-700">{pub.publicationType}</p>
                            <p className="text-sm">
                                <span
                                    className={`font-bold ${pub.publicationStatus === 'Published'
                                        ? 'text-green-600'
                                        : pub.publicationStatus === 'In Review'
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                        }`}
                                >
                                    {pub.publicationStatus}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                {new Date(pub.publicationDate).toLocaleDateString()}
                            </p>
                            <div className="text-right">
                                <Link
                                    to={`view/${pub.id}`}
                                    className="inline-block bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-4 py-1.5 rounded-full text-sm shadow-md hover:scale-105 transition-transform"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-white text-lg font-light mt-6">
                        No research publications found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResearchList;
