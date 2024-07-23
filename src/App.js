import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Card from './components/Card';
import RegistrationForm from './components/Registration';
import Success from './components/Sucess';


function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "PCTE Group of Institutes",
    degree: "",
    courseId: "",
  });

  const [degrees] = useState([
    "BCA",
    "B.TECH",
    "MBA",
    "MCA",
    "BBA",
  ]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Navigate to /pagetwo with form data
    navigate('/pagetwo', { state: { formData } });
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <RegistrationForm
            formData={formData}
            degrees={degrees}
            error={error}
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}
          />
        }
      />
      <Route
        path='/pagetwo'
        element={
          <Card formData={formData} setFormData={setFormData} />
        }
      />
      <Route path='/success' element={<Success />} />

    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
