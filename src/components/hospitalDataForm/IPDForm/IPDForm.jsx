import React, { useState } from "react";
import styles from "./IPDForm.module.css";
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        User Id:
        <input
          className={styles.input}
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Admit No:
        <input
          className={styles.input}
          type="text"
          name="admitNo"
          value={formData.admitNo}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Admission Date:
        <input
          className={styles.input}
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Discharge Date:
        <input
          className={styles.input}
          type="date"
          name="dischargeDate"
          value={formData.dischargeDate}
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
