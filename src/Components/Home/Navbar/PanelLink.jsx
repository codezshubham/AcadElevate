import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBookOpen,
  FaProjectDiagram,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaUserGraduate
} from 'react-icons/fa';

const PanelLinks = ({ user }) => {
  const navigate = useNavigate();

  const explore = [
    {
      label: 'Research Publications',
      description: 'Explore, manage, and publish faculty research contributions.',
      path: '/research',
      icon: <FaBookOpen className="text-indigo-400" />
    },
    {
      label: 'Academic Projects',
      description: 'View and contribute to innovative academic and research projects.',
      path: '/project',
      icon: <FaProjectDiagram className="text-green-400" />
    },
    {
      label: 'Events & Participation',
      description: 'RSVP to academic events and view participation history.',
      path: '/event',
      icon: <FaCalendarCheck className="text-yellow-400" />
    },
    {
      label: 'Lectures & Teaching',
      description: 'Manage your lectures and share teaching engagements.',
      path: '/lecture',
      icon: <FaChalkboardTeacher className="text-pink-400" />
    },
    {
  label: 'Career Recommendation',
  description: 'Upload your resume and generate a detailed faculty career roadmap.',
  path: '/career',
  icon: <FaUserGraduate className="text-green-400" />
}

  ];

  const handleClick = (path) => {
    if (user) {
      if (user.role === 'ROLE_USER') {
        navigate(`/${user.firstName}${user.lastName}/${user.id}${path}`);
      } else if (user.role === 'ROLE_ADMIN') {
        navigate(`/${user.firstName}${user.lastName}/admin${path}`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="absolute top-6 bg-gray-800 z-50 p-3 w-80 rounded-xl shadow-xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-300">
      <ul className="space-y-3">
        {explore.map((link, idx) => (
          <li
            key={idx}
            onClick={() => handleClick(link.path)}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700/40 cursor-pointer transition duration-200 group"
          >
            <div className="text-lg">{link.icon}</div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white group-hover:text-blue-400">
                {link.label}
              </span>
              <span className="text-xs text-gray-300 leading-snug">{link.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelLinks;
