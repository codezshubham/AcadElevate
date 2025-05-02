import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateEvent } from '../../../Redux/Faculty/EventSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UpdateEvent = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const event = state?.event;

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

    useEffect(() => {
        if (event) {
            setEventName(event.eventName || '');
            setEventDescription(event.eventDescription || '');
            setEventType(event.eventType || '');
            setEventDate(event.eventDate ? event.eventDate.substring(0, 10) : '');
            setLocation(event.location || '');
            setOrganizer(event.organizer || '');
            setIsVirtual(event.isVirtual || false);
            setUrl(event.url || '');
            if (event.posterUrl) {
                setPosterPreview(event.posterUrl);
            }
        }
    }, [event]);

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

        // Prepare the updated event data
        const updatedEvent = {
            eventName,
            eventDescription,
            eventType,
            eventDate,
            location,
            organizer,
            isVirtual,
            url
        };

        // Call the updateEvent thunk with the necessary data
        const posterFile = poster; // Use the poster file from the state

        try {
            await dispatch(updateEvent({ id: event.id, updatedEvent, posterFile })).unwrap();
            setSnackbarMessage('Event updated successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage(error?.message || 'Failed to update event.');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
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
                    Update Event
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Name</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Description</label>
                        <textarea
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Type</label>
                        <input
                            type="text"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Event Date</label>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Organizer</label>
                        <input
                            type="text"
                            value={organizer}
                            onChange={(e) => setOrganizer(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-1">Upload New Poster (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePosterChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-md"
                >
                    Update Event
                </button>
            </form>

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

export default UpdateEvent;
