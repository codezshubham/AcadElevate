import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaLightbulb } from "react-icons/fa";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a file first");
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch("http://localhost:7070/api/resume/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed: " + res.statusText);

      const data = await res.json();
      const rec = data.recommendation || data;

      setResult({
        recommendedRole: rec.recommendedRole || "N/A",
        strengths: Array.isArray(rec.strengths) ? rec.strengths : [rec.strengths].filter(Boolean),
        weaknesses: Array.isArray(rec.weaknesses) ? rec.weaknesses : [rec.weaknesses].filter(Boolean),
        skillsToDevelop: Array.isArray(rec.skillsToDevelop) ? rec.skillsToDevelop : [rec.skillsToDevelop].filter(Boolean),
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className=" mx-auto mt-20">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Faculty Career Recommendation
        </h1>

        <div className="bg-gray-900 rounded-xl p-10 shadow-2xl max-w-3xl mx-auto mb-12 border border-gray-700">
  <h2 className="text-2xl font-bold text-white text-center mb-6">
    Upload Your Resume
  </h2>
  <p className="text-gray-400 text-center mb-6">
    Generate a detailed faculty career roadmap and personalized recommendations.
  </p>

  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-300 bg-gray-800">
    {/* Modern document upload SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 text-blue-500 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0l-3 3m3-3l3 3M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7m16-4l-7-7-7 7h14z" />
    </svg>

    <span className="text-gray-400 font-medium text-lg">
      Click to select a file or drag it here
    </span>
    <input
      type="file"
      onChange={handleChange}
      accept=".pdf,.doc,.docx,.txt"
      className="hidden"
    />
  </label>

  <button
    onClick={handleUpload}
    disabled={loading}
    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? "Analyzing..." : "Upload & Generate Report"}
  </button>
</div>



        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-10">
            {/* Recommended Role */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-4">Recommended Role</h2>
              <p className="text-gray-200 text-lg">{result.recommendedRole}</p>
            </div>

            {/* Strengths */}
            {result.strengths?.length > 0 && (
              <div className="bg-green-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
                  <FaCheckCircle className="mr-2" /> Strengths
                </h2>
                <ul className="list-disc list-inside text-gray-200 space-y-2">
                  {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {result.weaknesses?.length > 0 && (
              <div className="bg-red-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
                  <FaExclamationCircle className="mr-2" /> Weaknesses
                </h2>
                <ul className="list-disc list-inside text-gray-200 space-y-2">
                  {result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}

            {/* Skills To Develop */}
            {result.skillsToDevelop?.length > 0 && (
              <div className="bg-blue-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
                  <FaLightbulb className="mr-2" /> Skills To Develop
                </h2>
                <ul className="list-disc list-inside text-gray-200 space-y-2">
                  {result.skillsToDevelop.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
