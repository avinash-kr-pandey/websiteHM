import React from 'react';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img 
        src="https://i.gifer.com/7efs.gif" 
        alt="Success GIF" 
        className="w-204 h-204 mb-4"
      />
      <div className="text-center text-lg font-semibold">
        Your operation was successful!
        <p>Check Your Mail!</p>
      </div>
    </div>
  );
}

export default Success;
