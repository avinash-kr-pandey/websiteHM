import React from 'react';

// SmallCard Component
const SmallCard = ({ title, color, category, Price }) => {
  return (
    <div className={`border rounded-lg  shadow-md p-4 ${color} bg-white dark:bg-green-600 dark:border-green-700`}>
      <div className="flex items-center mb-2">
      
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-green-900 dark:text-white">{title}</h4>
          <p className="text-sm text-white-600 dark:text-white-400">{Price}</p>
      
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-300">{category}</p>
        </div>
      </div>
    </div>
  );
};

export default SmallCard
