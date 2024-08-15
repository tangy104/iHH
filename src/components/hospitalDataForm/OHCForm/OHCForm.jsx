import React, { useState } from "react";
import styles from "./OHCForm.module.css";
import axios from "axios";

const OHCForm = () => {
  const [formData, setFormData] = useState({
    userid: "",
    date: "",
    doctor: "",
    prescription: "",
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
    console.log("OHC Form Data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/OHC/${formData.userid}`,
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
        Date:
        <input
          className={styles.input}
          type="date"
          name="date"
          value={formData.date}
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
      <button className={styles.button} type="submit">
        Submit
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default OHCForm;
