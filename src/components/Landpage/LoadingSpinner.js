import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute w-full h-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 rounded-full animate-spin"></div>
        <div 
          className="absolute w-6 h-6 top-1 left-1 border-4 border-transparent border-t-blue-500 border-l-cyan-400 rounded-full animate-spin" 
          style={{animationDirection: 'reverse', animationDuration: '0.6s'}}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
