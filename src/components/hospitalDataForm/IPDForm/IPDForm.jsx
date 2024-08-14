import React, { useState } from "react";
import axios from "axios";

const IPDForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    admitNo: "",
    admissionDate: "",
    dischargeDate: "",
    doctor: "",
    prescription: "",
    status: "",
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
    console.log("IPD Form Data:", formData);
    try {
      const response = await axios.post("/api/IPD", formData);
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
        Admit No:
        <input
          type="text"
          name="admitNo"
          value={formData.admitNo}
          onChange={handleChange}
        />
      </label>
      <label>
        Admission Date:
        <input
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Discharge Date:
        <input
          type="date"
          name="dischargeDate"
          value={formData.dischargeDate}
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
        Prescription:
        <input
          type="text"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default IPDForm;
