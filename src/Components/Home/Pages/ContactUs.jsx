import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const ContactUs = () => {
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

      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-white tracking-wide animate-fade-in-up">
          Contact <span className="text-blue-500">Us</span>
        </h1>
        <p className="text-lg text-gray-300">
          Have any questions, feedback, or want to get in touch? We'd love to hear from you.
          Reach out using the form below or through our contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Contact Form */}
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-lg">
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="p-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6 justify-center text-gray-300">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-blue-400" />
            <span>contact@acadelevate.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-green-400" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-yellow-400" />
            <span>Indian Institute of Technology, India</span>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-white">Working Hours</h2>
            <p>Mon - Fri: 9 AM - 6 PM</p>
            <p>Sat - Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
