import React from 'react';
import image from "../../../Asset/AcadElevate7_enhanced.jpg";

export default function CTASection() {
  return (
    <section className="bg-gray-950 py-16 px-6" id="cta" data-aos="fade-up">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center text-white gap-10">

        {/* Text Section */}
        <div className="w-full md:w-3/4 text-center md:text-left flex-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold pb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Ready to Elevate Your Academic Journey?
          </h2>

          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto md:mx-0">
            Join hundreds of faculties and administrators who trust AcadElevate to manage, track, and grow their academic performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/signup"
              className="bg-[#d92152] px-6 sm:px-8 py-3 hover:bg-transparent transition
              text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
              rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
            >
              Join Now
            </a>
            <a
              href="#features"
              className="bg-transparent px-6 sm:px-8 py-3 hover:bg-[#d92152] transition
              text-[#d92152] border-2 border-[#d92152] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
              rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/4 flex justify-center">
          <img 
            src={image} 
            alt="Academic Growth" 
            className="w-3/4 sm:w-2/3 md:w-full max-w-xs md:max-w-full rounded-xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
