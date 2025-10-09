import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute w-full h-full border-4 border-transparent border-t-cyber-cyan border-r-electric-blue rounded-full animate-spin shadow-[0_0_15px_var(--cyber-cyan)]"></div>
        <div 
          className="absolute w-6 h-6 top-1 left-1 border-4 border-transparent border-t-electric-blue border-l-cyber-cyan rounded-full animate-spin shadow-[0_0_10px_var(--electric-blue)]" 
          style={{ animationDirection: 'reverse', animationDuration: '0.6s' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
