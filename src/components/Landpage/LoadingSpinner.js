import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute w-full h-full border-4 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full animate-spin shadow-[0_0_15px_rgba(0,191,255,0.5)]"></div>
        <div 
          className="absolute w-6 h-6 top-1 left-1 border-4 border-transparent border-t-blue-400 border-l-cyan-400 rounded-full animate-spin shadow-[0_0_10px_rgba(0,150,255,0.5)]" 
          style={{ animationDirection: 'reverse', animationDuration: '0.6s' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
