import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // এখানে context থেকে আনবে (demo হিসেবে {})

  const handleLogout = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 fixed top-0 left-0 w-full z-50 ">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold">HobbyHub</Link>
      </div>

      {/* Center - Nav Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allGroups">All Groups</Link></li>
          {user && (
            <>
              <li><Link to="/create-group">Create Group</Link></li>
              <li><Link to="/my-groups">My Groups</Link></li>
            </>
          )}
        </ul>
      </div>

      

      {/* Right - User / Login */}
      <div className="navbar-end ">

        
        
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar tooltip tooltip-left" data-tip={user?.displayName}>
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="user" />
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="px-3 py-2 text-center font-semibold">{user?.displayName}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/register" className="btn">Register/LogIn</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
