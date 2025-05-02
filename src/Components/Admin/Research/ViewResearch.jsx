import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePublication, updatePublication, downloadPublicationFile } from '../../../Redux/Faculty/ResearchSlice';
import FullScreenLoader from '../../Home/Pages/FullScreenLoader';
const ViewResearch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { publication, isLoading, error } = useSelector((state) => state.publication);
  const [file, setFile] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    publicationStatus: '',
    impactFactor: '',
    doi: '',
    remarks: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(getSinglePublication(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (publication) {
      setForm({
        publicationStatus: publication.publicationStatus || '',
        impactFactor: publication.impactFactor || '',
        doi: publication.doi || '',
        remarks: publication.remarks || '',
      });
    }
  }, [publication]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    const updatedPublication = {
      ...publication,
      ...form
    };
    dispatch(updatePublication({ id, updatedPublication, file }));
    dispatch(getSinglePublication(id)); // <-- Refetch updated data
    setEditMode(false);
  };

  if (isLoading) return <FullScreenLoader />
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!publication) return <div className="text-center text-gray-600 mt-10">No data found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl">
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{publication.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Published on {new Date(publication.publicationDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-4">
          {publication.fileData && (
              <button
                onClick={() => dispatch(downloadPublicationFile(id))}
                className="bg-rose-600 text-white text-sm p-2 rounded-lg flex items-center gap-2"
                title="Download PDF"
              >
                Download PDF
              </button>
          )}

          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editMode ? 'Cancel' : 'Update'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-[15px]">
        <div>
          <span className="font-semibold">Description:</span>
          <p className="mt-1 text-gray-600">{publication.description}</p>
        </div>

        <div>
          <span className="font-semibold">Faculty:</span>
          <p className="mt-1">{publication.publisherName}</p>
        </div>

        <div>
          <span className="font-semibold">Authors:</span>
          <p className="mt-1">{publication.author}</p>
        </div>

        <div>
          <span className="font-semibold">Type:</span>
          <p className="mt-1">{publication.publicationType}</p>
        </div>

        <div>
          <span className="font-semibold">Status:</span>
          {editMode ? (
            <select
              name="publicationStatus"
              value={form.publicationStatus}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="">Select status</option>
              <option value="Published">Published</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          ) : (
            <p className="mt-1">{publication.publicationStatus}</p>
          )}
        </div>

        <div>
          <span className="font-semibold">Impact Factor:</span>
          {editMode ? (
            <input
              type="number"
              name="impactFactor"
              value={form.impactFactor}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              step="0.01"
            />
          ) : (
            <p className="mt-1">{publication.impactFactor}</p>
          )}
        </div>

        <div>
          <span className="font-semibold">Language:</span>
          <p className="mt-1">{publication.language}</p>
        </div>

        <div>
          <span className="font-semibold">DOI:</span>
          {editMode ? (
            <input
              type="text"
              name="doi"
              value={form.doi}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            />
          ) : (
            <p className="mt-1">{publication.doi}</p>
          )}
        </div>

        <div>
          <span className="font-semibold">Journal Name:</span>
          <p className="mt-1">{publication.journalName}</p>
        </div>

          {publication.url && (
            <div className="md:col-span-2">
              <span className="font-semibold">URL:</span>{' '}
              <a
                href={publication.url}
                className="text-blue-600 underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {publication.url}
              </a>
            </div>
          )}
        <div className="md:col-span-2">
          <span className="font-semibold">Remarks:</span>
          {editMode ? (
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              rows="3"
            />
          ) : (
            <p className="mt-1">{publication.remarks}</p>
          )}
        </div>

      </div>

      {editMode && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewResearch;
