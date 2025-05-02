import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPublication } from '../../../Redux/Faculty/ResearchSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UploadResearchPublication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: facultyId, username } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    publicationType: '',
    publicationDate: '',
    publisherName : '',
    journalName: '',
    publicationStatus: '',
    language: '',
    impactFactor: '',
    author: '',
    url: '',
    doi: '',
    remarks: '',
  });

  const [file, setFile] = useState(null);
  const { isLoading, error } = useSelector((state) => state.publication);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a PDF file.');
      return;
    }

    const fullForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fullForm.append(key, value);
    });
    fullForm.append('file', file);
    fullForm.append('facultyId', facultyId);

    const resultAction = await dispatch(createPublication(fullForm));
    if (createPublication.fulfilled.match(resultAction)) {
      navigate(`/${username}/${facultyId}/research`);
    }
  };

  const fields = [
    { name: 'title', label: '📌 Title', type: 'text', placeholder: 'Enter publication title' },
    { name: 'description', label: '📝 Description', type: 'textarea', placeholder: 'Brief description of the research' },
    { name: 'publicationType', label: '📘 Type', type: 'select', options: ['Journal', 'Conference', 'Book Chapter', 'Workshop'],},
    { name: 'publicationDate', label: '📅 Publication Date', type: 'date' },
    { name: 'publisherName', label: '🏛️ Your Name', type: 'text', placeholder: 'Enter Your Name' },
    { name: 'journalName', label: '🏛️ Journal Name', type: 'text', placeholder: 'E.g., IEEE Transactions' },
    { name: 'language', label: '🗣️ Language', type: 'select', options: ['English', 'Hindi', 'French', 'Spanish', 'Other'],},
    { name: 'author', label: '👥 Authors', type: 'text', placeholder: 'E.g., John Doe, Jane Smith' },
    { name: 'url', label: '🔗 URL', type: 'text', placeholder: 'https://example.com' },
    { name: 'doi', label: '📎 DOI', type: 'text', placeholder: 'E.g., 10.1000/xyz123' },
    { name: 'remarks', label: '🗒️ Remarks', type: 'text', placeholder: 'Optional notes or comments' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-10 my-20 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">📤 Upload Research Publication</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ name, label, type = 'text', options = [], placeholder = '' }) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>

            {type === 'textarea' ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={3}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : type === 'select' ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">Select {label.split(' ')[1]}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>
        ))}

        {/* PDF Upload */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">📁 Upload PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200"
          >
            {isLoading ? 'Uploading...' : '🚀 Submit Publication'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadResearchPublication;
