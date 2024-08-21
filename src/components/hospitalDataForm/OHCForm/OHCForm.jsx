import React, { useState, useEffect } from "react";
import styles from "./OHCForm.module.css";
import axios from "axios";

const OHCForm = () => {
  const [formData, setFormData] = useState({
    userid: "",
    date: "",
    doctor: "",
    prescription: "",
  });
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch employee details
  const fetchEmployeeDetails = async (userid) => {
    if (!userid) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/HR/${userid}`
      );
      if (response.data.information) {
        setEmployeeDetails(response.data.information);
      } else {
        setEmployeeDetails(null);
        setError("Employee not found.");
      }
    } catch (err) {
      setError("Failed to fetch employee details. Please try again.");
      setEmployeeDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Trigger API call when Employee code changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formData.userid.trim()) {
        fetchEmployeeDetails(formData.userid);
      } else {
        setEmployeeDetails(null); // Clear details if input is empty
        setError("");
      }
    }, 500); // Adding debounce to avoid multiple API calls during typing

    return () => clearTimeout(delayDebounceFn);
  }, [formData.userid]);

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        return false;
      }
    }
    return file !== null;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setResponseMessage("Please fill out all fields and upload a file.");
      return;
    }

    const data = new FormData();
    data.append("userid", formData.userid);
    data.append("date", formData.date);
    data.append("doctor", formData.doctor);
    data.append("prescription", formData.prescription);
    data.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/OHC/${formData.userid}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseMessage("Data submitted successfully!");
      setFormData({
        userid: "",
        date: "",
        doctor: "",
        prescription: "",
      });
      setFile(null);
      setEmployeeDetails(null); // Clear employee details after submission
    } catch (error) {
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Employee code:
        <input
          className={styles.input}
          type="text"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
        />
      </label>

      {/* Display loading spinner, error, or employee details */}
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {employeeDetails && employeeDetails.name && (
        <div className={styles.employeeDetails}>
          <p>
            <strong>Name:</strong> {employeeDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {employeeDetails.email}
          </p>
        </div>
      )}

      {!loading && !error && !employeeDetails && formData.userid && (
        <p className={styles.placeholder}>
          No details available for this Employee ID.
        </p>
      )}

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
      <label className={styles.label}>
        Prescription image or PDF:
        <input
          className={styles.input}
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleImageChange}
        />
      </label>

      <button className={styles.button} type="submit">
        Submit
      </button>
      {responseMessage && (
        <p className={styles.responseMessage}>{responseMessage}</p>
      )}
    </form>
  );
};

export default OHCForm;
