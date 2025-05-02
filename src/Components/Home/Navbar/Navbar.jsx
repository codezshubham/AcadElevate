import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { FaChevronDown } from 'react-icons/fa';
import { RiBox2Fill } from 'react-icons/ri';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Home as HomeIcon, Info as InfoIcon, ContactMail as ContactMailIcon, ExitToApp as ExitToAppIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Snackbar,
  Divider,
} from "@mui/material";
import { Logout, Dashboard, AccountCircle } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";
import { getUserProfile } from '../../../Redux/Faculty/UserSlice';
import { logout } from '../../../Redux/Auth/AuthSlice';
import PanelLinks from './PanelLink';

const Navbar = () => {
  const panelRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenUserMenu(true);
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    setSnackbarMessage('Logged out successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    handleCloseUserMenu();

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
    navigate('/');
  };

  const handleDashboardClick = () => {
    handleCloseUserMenu();
    if (user?.role === "ROLE_ADMIN") navigate(`/${user?.firstName}${user?.lastName}/admin`);
    else {
      navigate(`/${user?.firstName}${user?.lastName}/${user?.id}`);
    }
  };

  return (
    <nav className="p-4 bg-gray-950 fixed w-full h-auto top-0 left-0 z-50 border-b border-gray-800">
      <div className="flex justify-between items-center relative">

        {/* Mobile Menu Button */}
        <div className="inline-block md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-white focus:outline-none"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            <div className="w-2/3 max-w-xs bg-[#0f172a] p-6 transform transition-all ease-in-out duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-2xl font-semibold tracking-wide">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-400">
                  <XMarkIcon className="h-7 w-7" />
                </button>
              </div>

              <ul className="space-y-6">
                <li>
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-white hover:text-[#d92152] transition-colors duration-200">
                    <HomeIcon className="h-6 w-6" />
                    <span className="text-base">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-white hover:text-[#d92152] transition-colors duration-200">
                    <InfoIcon className="h-6 w-6" />
                    <span className="text-base">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-white hover:text-[#d92152] transition-colors duration-200">
                    <ContactMailIcon className="h-6 w-6" />
                    <span className="text-base">Contact Us</span>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 border-t border-gray-700 pt-4">
                {user && user.firstName &&(
                  <div className="text-white">
                    <p className="mb-4 text-lg font-medium">Hello, {user.firstName}</p>
                    <button onClick={handleDashboardClick} className="flex items-center space-x-3 text-blue-400 text-md mb-4">
                      <DashboardIcon className="h-5 w-5" />
                      <span>Dashboard</span>
                    </button>
                    <button onClick={handleLogout} className="flex items-center space-x-3 text-red-400 text-md">
                      <ExitToAppIcon className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMenuOpen(false)}></div>
          </div>
        )}


        {/* Desktop Nav Links */}
        <div className="flex justify-center flex-1">
          <ul className="gap-2 hidden md:flex space-x-6 items-center">
            <li><Link to="/" className="text-md text-white relative pb-1 transition-all duration-300 hover:text-blue-400
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
            <li><Link to="/about" className="text-md text-white relative pb-1 transition-all duration-300 hover:text-blue-400
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">About Us</Link></li>
            <li><Link to="/contact" className="text-md text-white relative pb-1 transition-all duration-300 hover:text-blue-400
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link></li>

            <li
              className="relative"
              ref={panelRef}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="nav-link flex items-center text-md text-white relative transition-all duration-300 hover:text-blue-400
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
                More Links <FaChevronDown className="ml-2" />
              </button>
              {showDropdown && <PanelLinks user={user} />}
            </li>
          </ul>
        </div>

        {/* Auth Section */}
        <div className="absolute right-2 inline-block lg:flex lg:items-center">
          {user && user.firstName ? (
            <div className="relative">
              <Avatar
                className="cursor-pointer transition-transform transform hover:scale-105 shadow-md"
                onClick={handleUserClick}
                aria-controls={openUserMenu ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openUserMenu ? "true" : undefined}
                src={user.profileImage ? `data:image/jpeg;base64,${user.profileImage}` : undefined}
                sx={{
                  bgcolor: deepPurple[500],
                  color: "white",
                  fontWeight: "bold",
                  border: '3px solid #d92152',
                  boxShadow: '0 0 8px #d92152',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 0 15px #d92152',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {!user.profileImage && user.firstName?.[0]?.toUpperCase()}
              </Avatar>


              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 180,
                    bgcolor: "#1F2937",
                    color: "#FFFFFF",
                  },
                }}
              >
                <Typography className="px-4 pt-2 font-semibold text-white">Hello, {user.firstName}</Typography>
                <Divider className="py-1" />
                <MenuItem onClick={handleDashboardClick}>
                  <ListItemIcon>
                    {user.role === "ROLE_ADMIN" ? <Dashboard fontSize="small" /> : <AccountCircle fontSize="small" />}
                  </ListItemIcon>
                  {user.role === "ROLE_ADMIN" ? "Admin Dashboard" : "My Profile"}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/signup">
                <button className="text-xs md:text-md px-2 md:px-4 py-1 bg-[#d92152] hover:bg-transparent transition
              text-white border-2 border-[#d92152] hover:text-[#d92152] font-medium rounded-lg">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </nav>
  );
};

export default Navbar;
