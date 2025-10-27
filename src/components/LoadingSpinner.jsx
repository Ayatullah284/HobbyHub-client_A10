import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Custom Gradient SVG Spinner */}
        <svg
          className="animate-spin h-16 w-16"
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
        <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
