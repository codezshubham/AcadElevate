import React from 'react';
import bgImage from '../../../Asset/bgimg.jpg';

export default function TrialSection() {
  return (
    <section
      className=" bg-gray-950 relative bg-cover bg-center bg-no-repeat py-20 mt-20 px-10"
      style={{ backgroundImage: `url(${bgImage})` }}
      id="trial" data-aos="zoom-out"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Experience AcadElevate Firsthand
        </h2>

        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Take a live tour or try a free trial today. Discover how AcadElevate simplifies faculty evaluation, record management, and digital submissions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="bg-[#d92152] px-6 sm:px-8 py-3 hover:bg-transparent transition
                      text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
                      rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
          >
            Try Live Demo
          </a>
          <a
            href="/signup"
            className="bg-transparent px-6 sm:px-8 py-3 hover:bg-[#d92152] transition
                    text-[#d92152] border-2 border-[#d92152] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
                    rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}

