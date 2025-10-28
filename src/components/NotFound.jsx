import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-gray-100 text-center p-4">
      
      <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-red-500 mb-4">
        404
      </h1>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
        Oops! Page not found
      </h2>

      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 max-w-md">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন তা আমাদের সাইটে নেই।
      </p>

      <Link
        to="/"
        className="btn btn-primary px-6 py-3 rounded-lg text-white hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Go Back Home
      </Link>

    </div>
  );
};

export default NotFound;
