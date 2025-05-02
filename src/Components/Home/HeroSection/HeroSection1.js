import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../../Asset/HomePage.png';

const HeroSection1 = () => {
  return (
    <div className="bg-gray-950 grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-[38rem] md:h-[38rem] px-4 relative py-16">

      {/* Overlay Text with Background Clip-Path */}
      <div className="relative text-center text-white space-y-4 px-4">
        {/* Background Shape */}
        <div
          className="absolute left-12 top-10 md:top-0 md:left-32 inset-0 bg-gradient-to-r from-orange-600 opacity-60 w-52 h-52 sm:w-80 sm:h-80"
          style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        ></div>

        {/* Foreground Content */}
        <h1 className="text-xl md:pt-0 pt-10 md:text-4xl font-bold drop-shadow-lg z-10 relative">
          Your Career, Your Contributions
        </h1>
        <h1 className="text-4xl md:text-7xl font-bold drop-shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text z-10 relative">
          Now Digitally Empowered
        </h1>
        <p className="text-white text-xs md:text-sm font-light pt-6 drop-shadow-md leading-relaxed z-10 relative">
          Our platform simplifies the research submission process, allowing faculty members to directly submit their
          research papers to universities. Experience an intuitive interface, secure document handling, and
          effortless progress tracking—all in one place.
        </p>
        <div className="z-10 relative pt-6">
          <Link to="/signup">
            <button className="bg-[#d92152] px-6 sm:px-8 py-3 hover:bg-transparent transition
        text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
        rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center sm:mt-0 mt-10">
        <img
          className="block max-w-[60%] md:max-w-[50%] lg:max-w-[60%] object-contain"
          src={image}
          alt="Platform"
        />
      </div>
    </div>
  );
};

export default HeroSection1;
