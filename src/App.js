import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Card from './components/Card';
import RegistrationForm from './components/Registration';
import Success from './components/Sucess';
import { BASE_URL } from './api/api';
import toast, { Toaster } from 'react-hot-toast';
import NewCard from './components/NewCard';
import Manage from './components/Manage';

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

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.degree) {
      setError("Please fill out all fields.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
      const data=await fetch(BASE_URL+'/validateuserfields?email='+formData?.email+'&phone='+formData?.phone)
      const response=await data?.json()
      if(!response.success){
        toast.error(response.message)
      }
      else{
    navigate('/pagetwo', { state: { formData } });
      }
      console.log(response);
      }
    } catch (error) {
      
    }

  };

  return (
    <>
    <Toaster position='top-center' toastOptions={{
      duration:500
    }}/>
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
          // <Card formData={formData} setFormData={setFormData} />
          // <NewCard formData={formData} setFormData={setFormData} />
          <Manage formData={formData} setFormData={setFormData} />
        }
      />
      <Route path='/success' element={<Success />} />
    </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}