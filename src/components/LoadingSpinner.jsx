import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-primary-1">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-4"></div>
        <p className="mt-4 text-primary-2 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
