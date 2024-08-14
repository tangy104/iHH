import React, { useState } from "react";
import styles from "./PathologyForm.module.css";
import axios from "axios";

const PathologyForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    test: "",
    result: "",
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
    console.log("Pathology Form Data:", formData);
    try {
      const response = await axios.post("/api/pathology", formData);
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
        Test:
        <input
          className={styles.input}
          type="text"
          name="test"
          value={formData.test}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Result:
        <input
          className={styles.input}
          type="text"
          name="result"
          value={formData.result}
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

export default PathologyForm;
