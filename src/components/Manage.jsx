import React from "react";
import NewCard from "./NewCard";

const Manage = () => {
  const formData = {
    degree: "B.TECH",
  };

  const books = {
    "Cyber Security": [
      { title: "Cyber Security Basics", author: "Author A" },
      { title: "Advanced Network Security", author: "Author B" },
      { title: "Threat Analysis and Defense", author: "Author C" }
    ],
    React: [
      { title: "React Basics", author: "Author D" },
      { title: "Advanced React", author: "Author E" },
      { title: "React Hooks in Depth", author: "Author F" }
    ],
    "AI/ML": [
      { title: "Introduction to AI", author: "Author G" },
      { title: "Machine Learning Basics", author: "Author H" },
      { title: "Deep Learning Techniques", author: "Author I" }
    ]
  };

  const companiesUrl = "https://jsonplaceholder.typicode.com/photos";

  const subjects = ["Cyber Security", "React", "AI/ML"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>
      {subjects.map((subject, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{subject}</h2>
          <NewCard
            formData={formData}
            subject={subject}
            books={books[subject]}
            companiesUrl={companiesUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default Manage;
