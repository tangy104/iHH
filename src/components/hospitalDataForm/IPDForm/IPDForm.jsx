import React, { useState, useEffect } from "react";
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
    // for (const key in formData) {
    //   if (formData[key].trim() === "") {
    //     return false;
    //   }
    // }
    // return file !== null;
    return formData.userid.trim() !== "";
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
      // setResponseMessage("Please fill out all fields and upload a file.");
      setResponseMessage("Please enter Employee code.");
      return;
    }
    // console.log("IPD Form Data:", formData);
    const data = new FormData();
    data.append("userid", formData.userid);
    data.append("admit_no", formData.admit_no);
    data.append("admission_date", formData.admission_date);
    data.append("discharge_date", formData.discharge_date);
    data.append("doctor", formData.doctor);
    data.append("prescription", formData.prescription);
    data.append("status", formData.status);
    data.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/IPD/${formData.userid}`,
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
        admit_no: "",
        admission_date: "",
        discharge_date: "",
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

export default IPDForm;
