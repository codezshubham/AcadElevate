import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ShieldOff, LockKeyhole, LogIn } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ShieldOff className="w-20 h-20 text-red-500 drop-shadow-lg animate-pulse" />
            <AlertTriangle className="absolute -top-3 -right-3 w-7 h-7 text-yellow-400 animate-bounce" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-wide">
          Access Denied
        </h1>
        <p className="text-gray-300 text-md md:text-lg mb-6 leading-relaxed">
          <span className="inline-flex items-center gap-2">
            <LockKeyhole className="w-5 h-5 text-red-400" />
            You don’t have permission to view this page.
          </span>
          <br />
          <span className="inline-flex items-center gap-2 mt-2">
            <ShieldOff className="w-5 h-5 text-red-400" />
            This area is protected and requires authentication.
          </span>
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl text-md transition duration-300 ease-in-out shadow-md"
        >
          <LogIn className="w-5 h-5" />
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
