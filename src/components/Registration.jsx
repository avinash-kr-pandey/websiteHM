import React from 'react';

const RegistrationForm = ({ formData, degrees, error, onFormChange, onFormSubmit }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-size-200 bg-pos-0 animate-background-pan">
      <form
        className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-lg"
        onSubmit={onFormSubmit}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">Registration</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-3 sm:mb-4">
          <label className="block text-gray-700 text-sm sm:text-base">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-gray-700 text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-gray-700 text-sm sm:text-base">Contact</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={onFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-gray-700 text-sm sm:text-base">College Name</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={onFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-gray-700 text-sm sm:text-base">Degree</label>
          <select
            name="degree"
            value={formData.degree}
            onChange={onFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Degree</option>
            {degrees.map((degree, index) => (
              <option key={index} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2  font-bold sm:px-6 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
