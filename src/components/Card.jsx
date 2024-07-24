import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (formData?.degree) {
      setLoading(true);
      axios
        .get(`https://api.hopingminds.com/api/getcoursesfordegree?degree=${formData.degree}`)
        .then((response) => {
          setCourses(response.data.data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error.response ? error.response.data : error.message);
          setLoading(false);
        });
    }
  }, [formData?.degree]);

  const handleRadioChange = (course) => {
    setSelectedCourse(course);
    setFormData({ ...formData, courseId: course.course._id });
  };

  const handleSendClick = () => {
    if (selectedCourse) {
      setSending(true); // Show spinner while sending data
      axios
        .post("https://api.hopingminds.com/api/registeruserform", formData)
        .then((response) => {
          // Navigate to the success page after successful submission
          setTimeout(() => {
            navigate("/success");
          }, 1000); // Optional delay for spinner visibility
        })
        .catch((error) => {
          console.error("Error registering course:", error.response ? error.response.data : error.message);
        })
        .finally(() => {
          setSending(false); // Hide spinner when request completes
        });
    } else {
      console.log("No course selected");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {loading ? (
        <div className="relative h-64">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-[url('https://loading.io/assets/mod/spinner/spinner/lg.gif')] bg-no-repeat bg-center"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center text-gray-500">No courses available.</div>
      ) : (
        <>
          {courses.map((course, index) => (
            <div key={index} className="mb-4 shadow-md p-4 border rounded-lg w-full max-w-4xl">
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
                <div className="p-4 border rounded-lg shadow-md bg-green-600 hover:bg-green-700 cursor-pointer flex flex-col items-center">
                  <h3 className="text-lg text-black font-semibold">COURSE NAME</h3>
                  <p className="mt-2 text-white font-semibold text-lg">{course.course.title}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-md bg-green-600 hover:bg-green-700 cursor-pointer flex flex-col items-center">
                  <h3 className="text-lg text-black font-semibold">SEATS AVAILABLE</h3>
                  <p className="mt-2 text-white font-bold text-2xl px-7">{course.seats}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-md bg-green-600 hover:bg-green-700 cursor-pointer flex flex-col items-center">
                  <h3 className="text-lg font-semibold">PACKAGES</h3>
                  <div className="flex flex-row text-white px-2 py-4">
                    <p className="text-white font-semibold text-xl">From: {course.packages.from} LPA,</p>
                    <p className="text-white font-semibold text-xl">To: {course.packages.to} LPA</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleSendClick}
            className="bg-green-600 text-green-800 rounded-xl w-[150px] h-[5vh] hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-all duration-200"
          >
            {sending ? (
              <div className="flex justify-center items-center">
                <div className="w-[24px] h-[24px] border-4 border-t-transparent border-red-800 border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
