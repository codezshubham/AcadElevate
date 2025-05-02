import React from 'react';
import {
  FaUniversity,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaStar,
  FaChartBar,
  FaCalendarCheck,
  FaLaptopCode
} from 'react-icons/fa';

const FacultyDashboardFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-sm ml-2 md:ml-10">

        {/* Left: About */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <FaUniversity className="text-blue-400" /> About the Dashboard
          </h2>
          <p className="leading-relaxed text-gray-400">
            Designed to empower faculty with tools to manage academic contributions like research, projects, events, lectures, and self-appraisals — all in one intuitive platform.
          </p>
        </div>

        {/* Middle: Portal Highlights */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Portal Highlights
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2"><FaChartBar className="text-pink-400" /> Insightful Charts & Stats</li>
            <li className="flex items-center gap-2"><FaLaptopCode className="text-green-400" /> Faculty Self-Appraisal System</li>
            <li className="flex items-center gap-2"><FaCalendarCheck className="text-indigo-400" /> Event & Lecture Tracking</li>
            <li className="flex items-center gap-2"><FaStar className="text-yellow-400" /> Secure, Role-Based Access</li>
          </ul>
        </div>

        {/* Right: Contact */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            📬 Contact & Social
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2"><FaEnvelope className="text-blue-400" /> support@university.edu</li>
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-green-400" /> +91-9876543210</li>
            <li className="flex items-center gap-2">
              <FaLinkedin className="text-blue-500" />
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition duration-300"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaGithub className="text-gray-400" />
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition duration-300"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-12 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Faculty Dashboard — Designed with ❤️ by Shubham Kumar
      </div>
    </footer>
  );
};

export default FacultyDashboardFooter;
