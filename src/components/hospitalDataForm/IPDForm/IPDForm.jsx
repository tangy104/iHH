import React, { useState } from "react";
import styles from "./IPDForm.module.css";
import axios from "axios";

const IPDForm = () => {
  const [formData, setFormData] = useState({
    userid: "",
    admit_no: "",
    admission_date: "",
    discharge_date: "",
    doctor: "",
    prescription: "",
    status: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Validation function to check if all fields are filled
  const validateForm = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        return false; // If any field is empty, return false
      }
    }
    return true; // All fields are filled
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate the form before submitting
    if (!validateForm()) {
      setResponseMessage("Please fill out all fields.");
      return;
    }
    console.log("IPD Form Data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/IPD/${formData.userid}`,
        formData
      );
      console.log("Server Response:", response.data);
      setResponseMessage("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        User Id:
        <input
          className={styles.input}
          type="text"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Admit No:
        <input
          className={styles.input}
          type="text"
          name="admit_no"
          value={formData.admit_no}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Admission Date:
        <input
          className={styles.input}
          type="date"
          name="admission_date"
          value={formData.admission_date}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Discharge Date:
        <input
          className={styles.input}
          type="date"
          name="discharge_date"
          value={formData.discharge_date}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Doctor:
        <input
          className={styles.input}
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Prescription:
        <input
          className={styles.input}
          type="text"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Status:
        <input
          className={styles.input}
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </label>
      <button className={styles.button} type="submit">
        Submit
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default IPDForm;
