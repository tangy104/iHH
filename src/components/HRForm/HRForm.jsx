import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    gender: "",
    DOB: "",
    phoneNumber: "",
    email: "",
    "Date of joining company": "",
    "Date of leaving company(if left)": "",
    // division: "",
    // grade: "",
    shopId: "",
    location: "",
    shift: "",
    grade: "",
    "Date of joining shop": "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Employee Data:", formData);
    try {
      const response = await axios.post("/api/employee", formData);
      console.log("Server Response:", response.data);
      setResponseMessage("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>HR Details</h3>
      {Object.keys(formData).map((key) => (
        <div key={key} className="form-group">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default EmployeeForm;
