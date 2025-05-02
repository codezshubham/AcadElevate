import React from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className="bg-gray-950 pt-32 pb-5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-400 text-sm pb-20">
          {/* Brand */}
          <div>
            <p className="text-2xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300">
              AcadElevate
            </p>
            <p className="mt-2 text-xs">
              Empowering Academia through Digital Innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-2 text-xl">Quick Links</h4>
            <ul className="pt-2 space-y-1">
              <li><Link to={'/'} className="hover:text-white transition">Home</Link></li>
              <li><Link to={'/about'} className="hover:text-white transition">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition">Blog Posts</a></li>
              <li><a href="#" className="hover:text-white transition">User Guide</a></li>
              <li><Link to={'/contact'} className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-2 text-xl">Legal</h4>
            <ul className="pt-2 space-y-1">
              <li><Link to={'/privacy-policy'} className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to={'/privacy-policy'} className="hover:text-white transition">Terms & Services</Link></li>
              <li><a href="#" className="hover:text-white transition">Cookies Settings</a></li>
            </ul>
          </div>

          {/* Contact and Socials */}
          <div className='flex flex-col items-center'>
            <h4 className="text-white font-semibold mb-2 text-xl">Get in Touch</h4>
            <p className="flex items-center space-x-2 pt-2">
              <span>📧</span>
              <Link to={'/contact'} className="hover:text-white transition">Support@AcadElevate.in</Link>
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Twitter" className="text-[#1DA1F2] hover:text-white text-xl transition">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-[#0077B5] hover:text-white text-xl transition">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="GitHub" className="text-white hover:text-gray-300 text-xl transition">
                <FaGithub />
              </a>
              <a href="#" aria-label="Instagram" className="text-[#E1306C] hover:text-white text-xl transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <p className="text-gray-500 text-center text-sm">
          © 2025 AcadElevate. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
