import React, { useState, useEffect } from "react";
import styles from "./OPDForm.module.css";
import axios from "axios";

const OPDForm = () => {
  // Function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    userid: "",
    date: getTodayDate(),
    doctor: "",
    prescription: "",
    status: "",
  });

  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };

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
        setEmployeeDetails(response.data);
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

  // Validation function to check if all fields are filled
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

    // Validate the form before submitting
    if (!validateForm()) {
      setResponseMessage("Please fill out all fields and upload a file.");
      return;
    }

    const data = new FormData();
    data.append("userid", formData.userid);
    data.append("date", formData.date);
    data.append("doctor", formData.doctor);
    data.append("prescription", formData.prescription);
    data.append("status", formData.status);
    data.append("file", file);

    // console.log("OPD Form Data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/OPD/${formData.userid}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Server Response:", response.data);
      setResponseMessage("Data submitted successfully!");
      setFormData({
        userid: "",
        date: getTodayDate(),
        doctor: "",
        prescription: "",
        status: "",
      });
      setFile(null);
      setEmployeeDetails(null);
    } catch (error) {
      console.error("Error submitting data:", error);
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
      {employeeDetails && employeeDetails.information.name && (
        <div className={styles.employeeDetails}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>
              <strong>Name:</strong> {employeeDetails.information.name}
            </p>
            <p>
              <strong>Shop:</strong> {employeeDetails.working.shopid}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>
              <strong>Email:</strong> {employeeDetails.information.email}
            </p>
            <p>
              <strong>Joining date:</strong>{" "}
              {formatDate(employeeDetails.information.joining_date)}
            </p>
          </div>
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

export default OPDForm;
