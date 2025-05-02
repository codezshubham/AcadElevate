import React from "react";
import { Users, Target, Rocket, Star } from "lucide-react";
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 absolute top-5 left-5"
        title="Back"
      >
        <FaArrowLeft className="text-base" />
      </button>

      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-white tracking-wide animate-fade-in-up">
          About <span className="text-blue-500">AcadElevate</span>
        </h1>
        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          AcadElevate is a platform built to simplify and streamline the career advancement process
          for higher education faculties. Our goal is to enable universities and educators to
          seamlessly manage research publications, events, lectures, and self-appraisals with a paperless,
          efficient, and user-centric approach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 max-w-6xl w-full">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <h3 className="text-xl font-bold">Our Team</h3>
          </div>
          <p className="text-gray-300">
            A passionate group of developers and educators committed to revolutionizing how faculties
            manage and track academic growth using modern technologies.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-8 h-8 text-green-400" />
            <h3 className="text-xl font-bold">Our Mission</h3>
          </div>
          <p className="text-gray-300">
            To empower faculties and administrators by providing a transparent, reliable,
            and secure digital ecosystem to support academic excellence.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <div className="flex items-center gap-4 mb-4">
            <Rocket className="w-8 h-8 text-purple-400" />
            <h3 className="text-xl font-bold">Our Vision</h3>
          </div>
          <p className="text-gray-300">
            We envision a future where faculties focus on impactful teaching and research
            while technology handles the tracking, reporting, and validation seamlessly.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <div className="flex items-center gap-4 mb-4">
            <Star className="w-8 h-8 text-yellow-400" />
            <h3 className="text-xl font-bold">Why Choose Us?</h3>
          </div>
          <p className="text-gray-300">
            Trusted by institutions, loved by faculty, and designed with user-first principles — 
            we bring clarity, automation, and innovation to the appraisal process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
