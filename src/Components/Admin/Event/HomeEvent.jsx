import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../Redux/Faculty/EventSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2, Users, Upload, SlidersHorizontal } from 'lucide-react';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';
import EventFilter from './EventFilter';
import EventStatsCards from './EventStats';

const HomeEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, isLoading, error } = useSelector((state) => state.event);
  const { username } = useParams();

  const [filters, setFilters] = useState({
    organizer: '',
    location: '',
    eventType: '',
    eventStatus: '',
    year: '',
  });

  const [sortOption, setSortOption] = useState('recent');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleUpdate = (event) => {
    navigate(`/${username}/admin/update-event`, { state: { event } });
  };

  const handleDelete = (id) => {
    alert(`🗑 Delete event with ID: ${id}`);
    // dispatch(deleteEvent(id));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const filteredEvents = events
    ?.filter((event) => {
      const eventYear = new Date(event.eventDate).getFullYear().toString();
      return (
        (!filters.organizer || event.organizer?.toLowerCase().includes(filters.organizer.toLowerCase())) &&
        (!filters.location || event.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.eventType || event.eventType?.toLowerCase() === filters.eventType.toLowerCase()) &&
        (!filters.eventStatus || event.eventStatus?.toLowerCase() === filters.eventStatus.toLowerCase()) &&
        (!filters.year || eventYear === filters.year)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'nameAsc') return a.eventName.localeCompare(b.eventName);
      if (sortOption === 'nameDesc') return b.eventName.localeCompare(a.eventName);
      if (sortOption === 'recent') return new Date(b.eventDate) - new Date(a.eventDate);
      return 0;
    });

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/${username}/admin/upload-event`)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow transition"
        >
          <Upload size={18} /> Upload Event
        </button>

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl transition"
        >
          <SlidersHorizontal size={16} />
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Stats Cards */}
      <EventStatsCards />

      {/* Filter Section */}
      {showFilter && (
        <div className="mb-6">
          <EventFilter
            organizer={filters.organizer}
            location={filters.location}
            eventType={filters.eventType}
            eventStatus={filters.eventStatus}
            year={filters.year}
            sortOption={sortOption}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      )}

      {/* Loader & Error */}
      {isLoading && <FullScreenLoader />}
      {error && <div className="text-red-500 text-center mb-4">Error: {error}</div>}

      <h1 className="text-5xl font-bold mb-8 text-center text-blue-300 pt-6">🎯All Events</h1>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents?.map((event) => (
          <div
            key={event.id}
            className="bg-white text-black rounded-2xl shadow-lg border hover:shadow-xl transition-all flex flex-col overflow-hidden"
          >
            {event.eventPoster && (
              <img
                src={`data:image/jpeg;base64,${event.eventPoster}`}
                alt={event.eventName}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold text-blue-800">{event.eventName}</h2>
                <div className="flex gap-2">
                  <Pencil
                    size={18}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleUpdate(event)}
                  />
                  <Trash2
                    size={18}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(event.id)}
                  />
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3">{event.eventDescription}</p>

              <div className="text-sm text-gray-700 mb-4 space-y-1">
                <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location || 'N/A'}</p>
                <p><strong>Organizer:</strong> {event.organizer || 'N/A'}</p>
              </div>

              <button
                onClick={() => navigate(`view/${event.id}`)}
                className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm rounded-xl transition"
              >
                <Users size={16} /> View Participants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeEvent;
