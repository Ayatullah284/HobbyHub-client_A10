import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-base-100 dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300"
            >
              HobbyHub
            </Link>
          </div>

          {/* Center - Nav Links (desktop) */}
          <div className="hidden lg:flex space-x-6 text-lg">
            <Link to="/" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/allGroups" className="hover:text-primary dark:hover:text-blue-400 transition-colors">All Groups</Link>
            {user && (
              <>
                <Link to="/create-group" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Create Group</Link>
                <Link to="/my-groups" className="hover:text-primary dark:hover:text-blue-400 transition-colors">My Groups</Link>
              </>
            )}
          </div>

          {/* Right - User / Mobile menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Desktop User */}
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <div className="tooltip tooltip-left" data-tip={user.displayName}>
                  <img src={user.photoURL} alt="user" className="w-10 h-10 rounded-full cursor-pointer" />
                </div>
                <button onClick={handleLogout} className="btn btn-sm bg-blue-500 text-white dark:bg-blue-600 dark:text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/register" className="btn hidden lg:inline bg-blue-500 text-white dark:bg-blue-600 dark:text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">Register/LogIn</Link>
            )}

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-2xl justify-center items-center text-blue-900 dark:text-white transition-colors">
                {isOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-base-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/allGroups" onClick={() => setIsOpen(false)} className="hover:text-primary dark:hover:text-blue-400 transition-colors">All Groups</Link>
            {user && (
              <>
                <Link to="/create-group" onClick={() => setIsOpen(false)} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Create Group</Link>
                <Link to="/my-groups" onClick={() => setIsOpen(false)} className="hover:text-primary dark:hover:text-blue-400 transition-colors">My Groups</Link>
              </>
            )}
            {!user && <Link to="/register" onClick={() => setIsOpen(false)} className="btn w-full bg-green-500 text-white dark:bg-green-600 dark:text-white hover:bg-green-600 dark:hover:bg-green-700 transition-colors">Register/LogIn</Link>}
            {user && (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="btn w-full bg-green-500 text-white dark:bg-green-600 dark:text-white hover:bg-green-600 dark:hover:bg-green-700 transition-colors">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
