import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../api/api";

const NewCard = ({ formData, subject, title, author, companiesUrl }) => {
  const [courses, setCourses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const degree = formData?.degree || "B.TECH";

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getcoursesfordegree?degree=${degree}`
        );
        setCourses(response.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response ? error.response.data : error.message
        );
        toast.error(error?.response?.data?.message || "Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(companiesUrl);
        setCompanies(response.data.slice(0, 5));
      } catch (error) {
        console.error(
          "Error fetching companies:",
          error.response ? error.response.data : error.message
        );
        toast.error(
          error?.response?.data?.message || "Error fetching companies"
        );
      }
    };

    fetchCourses();
    fetchCompanies();
  }, [formData?.degree, companiesUrl]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books`);
        setBooks(response.data || []);
      } catch (error) {
        console.error(
          "Error fetching books:",
          error.response ? error.response.data : error.message
        );
        toast.error(error?.response?.data?.message || "Error fetching books");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      <Toaster position="top-center" />
      {loading ? (
        <div className="relative h-64">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-[url('https://loading.io/assets/mod/spinner/spinner/lg.gif')] bg-no-repeat bg-center"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center text-gray-500">No courses available.</div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`bg-blue-500 text-white p-4 rounded-lg cursor-pointer ${
                selectedCourse === course ? "bg-blue-700" : ""
              }`}
              onClick={() => setSelectedCourse(course)}
            >
              <h2 className="font-bold">{course.title}</h2>
              <p className="text-white font-semibold text-xl">
                Salary {course.packages.from}-{course.packages.to} LPA
              </p>
              <div className="flex justify-between items-center mt-2">
                <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
                  {course.percentage}%
                </div>
                <p>Seats Left {course.seats}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <div className="bg-blue-200 p-6 rounded-xl w-full">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Top Companies</h2>
              <div className="grid grid-cols-4 gap-3">
                {companies.map((company) => (
                  <div key={company.id} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                      <img
                        className="rounded-full"
                        src={company.thumbnailUrl}
                        alt={company.title}
                      />
                    </div>
                    <p>{company.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-xl font-bold mb-4">What You Will Learn</h2>
              {books.map((book, index) => (
                <div key={index} className="bg-white p-3 mb-2 shadow-xl rounded-xl">
                  <p className="font-bold">{book.title}</p>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCard;
