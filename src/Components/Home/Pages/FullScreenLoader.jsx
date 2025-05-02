import React from 'react';
import loader3 from '../../../Asset/loader3.gif';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 animate-pulse flex items-center justify-center">
      <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-10 shadow-2xl flex flex-col items-center space-y-4 animate-fadeIn">
        <img
          src={loader3}
          alt="Loading..."
          className="w-20 h-20 animate-spin-slow rounded-2xl"
        />
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Please wait, loading content...
        </p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
