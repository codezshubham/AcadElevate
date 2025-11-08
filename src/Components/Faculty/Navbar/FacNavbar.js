import React, { useState } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const FacNavbar = () => {
  const { username, id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '' },
    { name: 'Research', path: 'research' },
    { name: 'Projects', path: 'project' },
    { name: 'Events', path: 'event' },
    { name: 'Lectures', path: 'lecture' },
    { name: 'Career', path: 'career' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-950 h-14 w-full flex justify-between items-center px-6 fixed top-0 z-20 shadow-md border-b border-gray-800">
        {/* Left: Profile */}
        <Link to="/" className="flex items-center space-x-2">
          <Button
            variant="contained"
            className="!bg-rose-600 !text-white flex items-center hover:!bg-rose-700 transition"
          >
            Back
          </Button>

        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-white">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={`/${username}/${id}/${path}`}
              className="text-md relative pb-1 transition-all duration-300 hover:text-blue-400
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Right: Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(!drawerOpen)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Drawer (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 sm:w-1/2 bg-gray-900 shadow-md z-30 transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col px-6 py-4 space-y-4">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={`/${username}/${id}/${path}`}
              onClick={() => setDrawerOpen(false)}
              className="text-white text-md hover:text-blue-400"
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default FacNavbar;
