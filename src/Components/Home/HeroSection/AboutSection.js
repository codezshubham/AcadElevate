import React from 'react';
import { Link } from 'react-router-dom';
import image from "../../../Asset/AcadElevate6.jpg";

export default function AboutSection() {
  return (
    <section className="bg-gray-950 py-20 md:px-10" id="about" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-10">

        {/* Left Side Image or Illustration */}
        <div className="md:w-1/2 shadow-lg rounded-2xl overflow-hidden shadow-emerald-600">
          <img
            src={image} // Replace with actual image path
            alt="About AcadElevate"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Right Side Text Content */}
        <div className="md:w-1/2 sm:text-left text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-4" >
            Empowering Academic Excellence
          </h2>
          <p className="text-slate-300 text-md mb-6">
            <span className="font-semibold text-blue-600">AcadElevate</span> is an advanced web platform designed to streamline academic activity tracking for faculty members across institutions. It automates research documentation, event participation, self-appraisal generation, and more—all in a secure, role-based dashboard.
          </p>
          <p className="text-gray-600 text-sm">
            Whether you're a faculty member logging your achievements or an admin overseeing university-wide progress, AcadElevate helps maintain transparency, reduce paperwork, and align with modern education policies like NEP 2020.
          </p>

          <Link to="/about">
            <button className="mt-6 bg-[#d92152] px-6 sm:px-8 py-3 hover:bg-transparent transition
             text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
              rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
