{/* Footer.jsx */}
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10">
      <div className="grid grid-cols-4 footer p-10 text-base-content max-w-6xl mx-auto">
        
        <aside>
          <div className="text-3xl font-bold">HobbyHub</div>
          <p className="text-sm mt-2">
            Discover, Connect & Enjoy with your favorite local hobby groups.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">About</h6>
          <a className="link link-hover">Our Vision</a>
          <a className="link link-hover">How It Works</a>
          <a className="link link-hover">Community Guidelines</a>
        </nav>

        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">All Groups</a>
          <a className="link link-hover">Create Group</a>
          <a className="link link-hover">My Groups</a>
        </nav>

        <nav>
          <h6 className="footer-title">Support</h6>
          <a className="link link-hover">Help Center</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms & Conditions</a>
        </nav>
      </div>

      <div className="border-t border-base-300"></div>

      <div className="p-6 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <p className="text-sm">© 2025 HobbyHub. All Rights Reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0 text-xl">
          <a className="hover:text-primary"><FaFacebookF /></a>
          <a className="hover:text-primary"><FaTwitter /></a>
          <a className="hover:text-primary"><FaInstagram /></a>
          <a className="hover:text-primary"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
