// components/Navbar/FacNavbar.jsx
import React from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaProjectDiagram,
  FaCalendarAlt,
  FaBook,
  FaUserGraduate,
  FaEllipsisH,
  FaArrowLeft,
} from 'react-icons/fa';

const FacNavbar = ({ collapsed, setCollapsed }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '', icon: <FaHome /> },
    { name: 'Research', path: 'research', icon: <FaBook /> },
    { name: 'Projects', path: 'project', icon: <FaProjectDiagram /> },
    { name: 'Events', path: 'event', icon: <FaCalendarAlt /> },
    { name: 'Lectures', path: 'lecture', icon: <FaUserGraduate /> },
    { name: 'Others', path: 'others', icon: <FaEllipsisH /> },
  ];

  return (
    <>
      {/* Top Bar */}
      <nav className="bg-gray-900 h-14 w-full fixed top-0 left-0 z-30 flex items-center justify-between px-4">
        {/* Left: Hamburger */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white focus:outline-none ml-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right: Back Button */}


        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Back"
        >
          <FaArrowLeft className="text-base" />
        </button>
      </nav>

      {/* Sidebar */}
      {!collapsed && <div
        className={`fixed top-0 left-0 h-full bg-gray-900 pt-14 z-20 shadow-lg transition-all duration-300 ${collapsed ? 'w-20' : 'w-52'
          }`}
      >
        <div className="flex flex-col px-4 py-6 space-y-4">
          {navItems.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={`/${username}/admin/${path}`}
              className={({ isActive }) =>
                `flex items-center space-x-4 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${isActive ? 'bg-gray-800' : ''
                }`
              }
              title={collapsed ? name : ''}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-md">{name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      }
    </>
  );
};

export default FacNavbar;
