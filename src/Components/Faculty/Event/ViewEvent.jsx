import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEventById,
  rsvpEvent,
  withdrawEvent,
  getParticipatedEvents,
} from '../../../Redux/Faculty/EventSlice';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';

const ViewEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const passedEvent = location.state;
  const facultyId = Number(localStorage.getItem('userId'));

  const { singleEvent, participatedEvents, isLoading, error } = useSelector(state => state.event);
  const [hasJoined, setHasJoined] = useState(false);

  const event = passedEvent || singleEvent;

  useEffect(() => {
    if (!passedEvent) dispatch(getEventById(id));
    if (facultyId) dispatch(getParticipatedEvents(facultyId));
    window.scrollTo(0, 0);
  }, [dispatch, id, passedEvent, facultyId]);

  useEffect(() => {
    if (participatedEvents && event) {
      const isParticipated = participatedEvents.some(ev => ev.id === event.id);
      setHasJoined(isParticipated);
    }
  }, [participatedEvents, event]);

  const handleJoin = () => {
    dispatch(rsvpEvent(event.id)).then(() => {
      dispatch(getParticipatedEvents(facultyId));
    });
  };

  const handleWithdraw = () => {
    dispatch(withdrawEvent(event.id)).then(() => {
      dispatch(getParticipatedEvents(facultyId));
    });
  };

  if (isLoading || !event) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <div className="text-center mt-20 text-lg text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-20 bg-white rounded-2xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        {event.eventName}
      </h1>

      {event.eventPoster && (
        <img
          src={`data:image/jpeg;base64,${event.eventPoster}`}
          alt="Event Poster"
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
        <p><strong>Description:</strong> {event.eventDescription}</p>
        <p><strong>Type:</strong> {event.eventType}</p>
        <p><strong>Last Updated:</strong> {event.lastUpdated?.substring(0, 10)}</p>
        <p><strong>Venue:</strong> {event.location || event.eventVenue}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Event Date:</strong> {event.eventDate}</p>
        <p>
          <strong>Virtual:</strong>{' '}
          {event.isVirtual ? (
            <span className="text-green-600 font-medium">Yes</span>
          ) : (
            <span className="text-red-500 font-medium">No</span>
          )}
        </p>
        {event.url && (
          <p>
            <strong>Event Link:</strong>{' '}
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {event.url}
            </a>
          </p>
        )}
      </div>

      <div className="mt-10 text-center">
        {hasJoined ? (
          <button
            onClick={handleWithdraw}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg transition-colors"
          >
            Withdraw
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg transition-colors"
          >
            Join Event
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewEvent;
