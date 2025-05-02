// Layout.jsx
import React, { useState } from 'react';
import Navbar from '../Navbar/AdminNavbar'; // Your sidebar

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Content Area */}
      <div
        className={`transition-all duration-300 pt-14 ${
          collapsed ? 'ml-0' : 'ml-52'
        } w-full px-4`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
