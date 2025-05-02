import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../../Redux/Faculty/EventSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UploadEvent = ({ onClose }) => {
    const dispatch = useDispatch();

    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [isVirtual, setIsVirtual] = useState(false);
    const [url, setUrl] = useState('');
    const [poster, setPoster] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPoster(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPosterPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('eventName', eventName);
        formData.append('eventDescription', eventDescription);
        formData.append('eventType', eventType);
        formData.append('eventDate', eventDate);
        formData.append('location', location);
        formData.append('organizer', organizer);
        formData.append('isVirtual', isVirtual);
        formData.append('url', url);
        if (poster) formData.append('poster', poster);

        try {
            await dispatch(createEvent(formData)).unwrap();
            setSnackbarMessage('Event uploaded successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Failed to upload event.');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
            if (onClose) onClose();
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl p-10 rounded-3xl shadow-2xl bg-white space-y-8 border border-blue-100"
                encType="multipart/form-data"
            >
                <h2 className="text-4xl font-bold text-center text-blue-600 mb-4">
                    Upload New Event
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Name</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Ex: International Seminar on AI"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Event Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Description</label>
                        <textarea
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            placeholder="Brief about the event..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            rows="3"
                            required
                        />
                    </div>

                    {/* Type & Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Type</label>
                        <input
                            type="text"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            placeholder="Seminar, Workshop, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Date</label>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Location & Organizer */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Campus, Building, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Organizer</label>
                        <input
                            type="text"
                            value={organizer}
                            onChange={(e) => setOrganizer(e.target.value)}
                            placeholder="Organizer's Name/Department"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Virtual & URL */}
                    <div className="flex items-center mt-3 gap-3">
                        <input
                            type="checkbox"
                            checked={isVirtual}
                            onChange={(e) => setIsVirtual(e.target.checked)}
                            className="w-5 h-5 text-blue-600"
                        />
                        <label className="text-gray-700 font-medium">This is a virtual event</label>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event URL</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Poster Upload */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-1">Upload Poster</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePosterChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        {posterPreview && (
                            <div className="mt-4 text-center">
                                <img
                                    src={posterPreview}
                                    alt="Poster Preview"
                                    className="w-auto max-h-72 mx-auto rounded-lg border shadow-md"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-md"
                >
                    Upload Event
                </button>
            </form>

            {/* Snackbar Alert */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default UploadEvent;
