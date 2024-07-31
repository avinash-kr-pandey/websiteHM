import React from "react";

const RegistrationForm = ({
  formData,
  degrees,
  error,
  onFormChange,
  onFormSubmit,
}) => {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-r from-green-500 via-green-400 to-green-300 bg-size-200 bg-pos-0 animate-background-pan">
      <div className="w-full bg-white">
        <a
          href="https://hopingminds.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="./hm.png"
            alt="Logo"
            className="object-contain w-[300px] h-[100px] cursor-pointer"
          />
        </a>
      </div>

      <form
        className="bg-white mt-9 p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-lg"
        onSubmit={onFormSubmit}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Registration
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-3 sm:mb-4">
          <label className="block text-gray-700 text-sm sm:text-base">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
            required
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
            required
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
            required
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

        <div className="mb-3 sm:mb-4">
          <label className="block text-gray-700 text-sm sm:text-base">Year Of Passing</label>
          <select
            name="yearOfPassing"
            value={formData.yearOfPassing}
            onChange={onFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Passing Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 font-bold sm:px-6 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
