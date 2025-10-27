import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50">
      <div className="flex flex-col items-center space-y-4 p-4 sm:p-6">
        {/* Custom Gradient SVG Spinner */}
        <svg
          className="animate-spin h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
          viewBox="0 0 50 50"
        >
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
          <circle
            className="opacity-25"
            cx="25"
            cy="25"
            r="20"
            stroke="url(#grad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Animated Loading Text */}
        <p className="text-base sm:text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse text-center">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
