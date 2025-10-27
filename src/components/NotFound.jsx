// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page not found</h2>
      <p className="text-gray-600 mb-6">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন তা আমাদের সাইটে নেই।
      </p>
      <Link
        to="/"
        className="btn btn-primary px-6 py-3 rounded-lg text-white hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
