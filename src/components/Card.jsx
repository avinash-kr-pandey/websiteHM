import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Card = ({ formData, setFormData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (formData?.degree) {
      axios
        .get(
          `https://api.hopingminds.com/api/getcoursesfordegree?degree=${formData.degree}`
        )
        .then((response) => {
          const courseData = response.data.data || [];
          setCourses(courseData);
          console.log(courseData);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the courses:",
            error.response ? error.response.data : error.message
          );
        });
    }
  }, [formData?.degree]);

  const handleRadioChange = (course) => {
    setSelectedCourse(course);
    console.log(course.course._id)
    setFormData({ ...formData, courseId: course.course._id });
  };

  const handleSendClick = () => {
    if (selectedCourse) {
      // Ensure formData includes courseId
  
      // console.log(dataToSend); // Log to verify the data structure
  
      axios
        .post("https://api.hopingminds.com/api/registeruserform", formData)
        .then((response) => {
          // Navigate to Success page
          navigate("/success");
        })
        .catch((error) => {
          console.error(
            "There was an error registering the course:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      console.log("No course selected");
    }
  };
  

  return (
    <div className="p-4 flex flex-col items-center">
      {courses.map((course, index) => (
        <div
          key={index}
          className="mb-4 shadow-md p-4 border rounded-lg w-full max-w-4xl"
        >
          <div className="flex flex-row items-center mb-2">
            <input
              type="radio"
              name="group-selection"
              className="mr-4 scale-150 rounded-full border-gray-300 text-blue-600 shadow-md focus:ring focus:ring-blue-200 cursor-pointer"
              checked={selectedCourse === course}
              onChange={() => handleRadioChange(course)}
            />
            <span>Select this Course</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {/* Card 3: Course Title */}
             <div className="p-4 border rounded-lg shadow-md bg-green-600 hover:bg-green-700 cursor-pointer flex flex-col items-center">
              <h3 className="text-lg text-black font-semibold">COURSE NAME</h3>
              <p className="mt-2 text-white font-semibold text-lg">{course.course.title}</p>
            </div>
            {/* Card 1: Seats */}
            <div className="p-4 border rounded-lg shadow-md bg-green-600 hover:bg-green-700 cursor-pointer flex flex-col items-center">
              <h3 className="text-lg text-black font-semibold">SEATS AVAILABLE</h3>
              <p className="mt-2 text-white font-bold text-2xl px-7">{course.seats}</p>
            </div>

            {/* Card 2: Packages */}
            <div className="p-4 border rounded-lg shadow-md bg-green-600 hover:bg-green-700 cursor-pointer flex flex-col items-center">
              <h3 className="text-lg font-semibold">PACKAGES</h3>
              <div className="flex flex-row text-white px-2 py-4">
                <p className="text-white font-semibold text-xl ">
                  From: {course.packages.from} LPA,
                </p>
                <p className="text-white font-semibold text-xl ">
                  To: {course.packages.to} LPA
                </p>
              </div>
            </div>

           
          </div>
        </div>
      ))}
      <button
        onClick={handleSendClick}
        className="bg-green-600 text-green-800 rounded-xl w-[10vw] h-[5vh] hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-all duration-200"
      >
        Send
      </button>
    </div>
  );
};

export default Card;
