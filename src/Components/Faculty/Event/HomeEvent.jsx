import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getParticipatedEvents } from '../../../Redux/Faculty/EventSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { SlidersHorizontal } from 'lucide-react';
import EventFilter from './EventFilter';  // Import the EventFilter component
import EventStats from './EventStats'; // Optional stats component for events
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const HomeEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, id } = useParams();
  const facultyId = Number(localStorage.getItem('userId'));

  const { events, participatedEvents, isLoading, error } = useSelector(state => state.event);

  const [filters, setFilters] = useState({
    lastUpdated: '',
    eventDate: '',
    eventType: '',
    isVirtual: '',
  });

  const [sortOption, setSortOption] = useState('recent');
  const [showFilters, setShowFilters] = useState(false); // Toggle filter visibility

  useEffect(() => {
    dispatch(getAllEvents());
    if (facultyId) dispatch(getParticipatedEvents(facultyId));
  }, [dispatch, facultyId]);

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
  const filteredEvents = events
    .filter((event) => {
      const formatDate = (date) => new Date(date).toISOString().split('T')[0]; // Only keep 'YYYY-MM-DD'

      const lastUpdatedValid = filters.lastUpdated
        ? formatDate(event.lastUpdated) === formatDate(filters.lastUpdated)
        : true;

      const eventDateValid = filters.eventDate
        ? formatDate(event.eventDate) === formatDate(filters.eventDate)
        : true;

      const eventTypeValid = filters.eventType
        ? event.eventType === filters.eventType
        : true;

      const isVirtualValid = filters.isVirtual !== ''
        ? event.isVirtual === (filters.isVirtual === 'true')
        : true;

      return lastUpdatedValid && eventDateValid && eventTypeValid && isVirtualValid;
    })
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.eventName.localeCompare(b.eventName);
      } else {
        return new Date(b.eventDate) - new Date(a.eventDate);
      }
    });

  const renderEventCard = (event, isParticipated = false) => (
    <div
      key={event.id}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
    >
      {event.eventPoster && (
        <img
          src={`data:image/jpeg;base64,${event.eventPoster}`}
          alt="Event Poster"
          className="w-full h-48 object-cover"
        />
      )}
      {isParticipated && (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          Participated
        </span>
      )}

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.eventName}</h2>
        <div className="text-sm text-gray-700 mb-2">
          <p><strong>Date:</strong> {event.eventDate}</p>
          <p><strong>Type:</strong> {event.eventType}</p>
          <p><strong>Venue:</strong> {event.location}</p>
          <p><strong>Organizer:</strong> {event.organizer}</p>
          <p>
            <strong>Virtual:</strong>{' '}
            {event.isVirtual ? (
              <span className="text-green-600 font-medium">Yes</span>
            ) : (
              <span className="text-red-500 font-medium">No</span>
            )}
          </p>
        </div>
        <button
          onClick={() => navigate(`/${username}/${id}/event/view/${event.id}`, { state: event })}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className=" max-w-7xl mx-auto px-4 py-10 mt-10">
      <div className=" flex justify-end items-center mb-6">
        <Button variant="contained" onClick={toggleFilters} className=" bg-gray-800 text-white flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filters
        </Button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="mb-6">
          <EventFilter
            lastUpdated={filters.lastUpdated}
            eventDate={filters.eventDate}
            eventType={filters.eventType}
            isVirtual={filters.isVirtual}
            sortOption={sortOption}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      )}

      {/* Events Display */}
      <h1 className="text-5xl font-bold text-start bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-10">All Upcoming Events</h1>
      {isLoading ? (
        <FullScreenLoader/>
      ) : filteredEvents.filter(event => new Date(event.eventDate) >= new Date()).length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No upcoming events found with selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents
            .filter(event => new Date(event.eventDate) >= new Date())
            .map(event => renderEventCard(event))}
        </div>
      )}

      {participatedEvents.length > 0 && (
        <div className="mt-20">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-start pb-8">
            My Participated Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {participatedEvents.map(event => renderEventCard(event, true))}
          </div>
        </div>
      )}

        <EventStats/>
    </div>
  );
};

export default HomeEvent;
