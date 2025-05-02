import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventParticipants } from '../../../Redux/Faculty/EventSlice';

const ViewEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { participants, isLoading, error } = useSelector((state) => state.event);

  useEffect(() => {
    if (id) {
      dispatch(getEventParticipants(id));
    }
  }, [dispatch, id]);

  const handleGenerateTicket = (participant) => {
    // This function would ideally generate a ticket PDF or redirect to a ticket page
    console.log('Generating ticket for:', participant.firstName, participant.lastName);
    alert(`Ticket generated for ${participant.firstName} ${participant.lastName}`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-sm rounded shadow"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">🎉 Event Participants</h1>

      {isLoading && <p className="text-blue-600 animate-pulse text-center">Loading participants...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {participants?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-white rounded-2xl shadow-lg border p-6 transition-all hover:scale-[1.01]"
            >
              <h2 className="text-xl font-bold text-blue-900 mb-2">
                {participant.firstName} {participant.lastName}
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Email:</strong> {participant.email}</p>
                <p><strong>Phone:</strong> {participant.phoneNumber}</p>
                <p><strong>Gender:</strong> {participant.gender}</p>
                <p><strong>Designation:</strong> {participant.designation}</p>
                <p><strong>Department:</strong> {participant.department}</p>
                <p><strong>Date of Joining:</strong> {participant.dateOfJoining}</p>
                <p><strong>Address:</strong> {participant.address}</p>
              </div>

              <button
                onClick={() => handleGenerateTicket(participant)}
                className="mt-4 w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl font-medium hover:from-green-500 hover:to-green-700 transition"
              >
                🎟️ Generate Ticket
              </button>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p className="text-sm text-gray-500 text-center">No participants found for this event.</p>
      )}
    </div>
  );
};

export default ViewEvent;
