import React, { useState } from "react";
import axios from "axios";

const MedicineForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    doctor: "",
    medicine: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Medicine Form Data:", formData);
    try {
      const response = await axios.post("/api/medicine", formData);
      console.log("Server Response:", response.data);
      setResponseMessage("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User Id:
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Doctor:
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
        />
      </label>
      <label>
        Medicine prescribed:
        <input
          type="text"
          name="medicine"
          value={formData.medicine}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default MedicineForm;
