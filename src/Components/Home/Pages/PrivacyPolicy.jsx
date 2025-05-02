import React from "react";
import { ShieldCheck, UserCheck, Lock, Globe, FileText, Mail, BookOpen, Ban, Upload, Info } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa"; // Import the FaArrowLeft icon
import { useNavigate } from "react-router-dom"; 
const PrivacyTermsPage = () => {

  const navigate = useNavigate(); 
  return (
    <div className="bg-gray-950 text-gray-300 px-4 py-12 max-w-5xl mx-auto relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back on click
        className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 absolute top-5 left-5"
        title="Back"
      >
        <FaArrowLeft className="text-base" />
      </button>

      <h1 className="text-4xl font-bold text-white text-center mb-4 md:pt-0 pt-6">Privacy Policy & Terms of Use</h1>
      <p className="text-center text-sm text-gray-500 mb-10">Last Updated: April 30, 2025</p>

      {/* Privacy Policy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-500" />
          1. Privacy Policy
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-400" />
              1.1 Information We Collect
            </h3>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>Personal data (name, email, password, role)</li>
              <li>Academic data (research, lectures, events)</li>
              <li>System metadata (browser, device, login IPs)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              1.2 How We Use Your Information
            </h3>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>To register and authenticate users</li>
              <li>To manage and evaluate academic submissions</li>
              <li>To generate reports and analytics</li>
              <li>To improve your user experience</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-400" />
              1.3 Data Security
            </h3>
            <p className="ml-4 text-gray-400">
              We use industry-standard practices like encryption, hashed passwords, and secure APIs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-yellow-400" />
              1.4 Third-Party Disclosure
            </h3>
            <p className="ml-4 text-gray-400">
              We do not share your data with third parties unless required by law or explicit user consent.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-400" />
              1.5 Cookies & Tracking
            </h3>
            <p className="ml-4 text-gray-400">
              Cookies are used for session management and user experience enhancements.
            </p>
          </div>
        </div>
      </section>

      {/* Terms of Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
          <FileText className="w-6 h-6 text-cyan-500" />
          2. Terms of Use
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              2.1 Acceptable Use
            </h3>
            <p className="ml-4 text-gray-400">
              Use AcadElevate only for authorized academic activities. Misuse may lead to account suspension.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-400" />
              2.2 Role-Based Access
            </h3>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li><strong>Faculty:</strong> Submit/manage academic contributions</li>
              <li><strong>Admins:</strong> Review, verify, and analyze data</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-400" />
              2.3 Account Termination
            </h3>
            <p className="ml-4 text-gray-400">
              Violation of terms may result in account deactivation without prior notice.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              2.4 Intellectual Property
            </h3>
            <p className="ml-4 text-gray-400">
              You retain ownership of your work. The platform has rights to review/use content for academic purposes only.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-400" />
              2.5 Changes to This Policy
            </h3>
            <p className="ml-4 text-gray-400">
              We may update our policy. Continued use signifies acceptance of revised terms.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
          <Mail className="w-6 h-6 text-pink-400" />
          3. Contact Us
        </h2>
        <ul className="ml-4 text-gray-400 space-y-1">
          <li><strong>Email:</strong> support@acadelevate.edu.in</li>
          <li><strong>Website:</strong> www.acadelevate.edu.in</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyTermsPage;
