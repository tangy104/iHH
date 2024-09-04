import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./OHCForm.module.css";

import Modal from "../modal/MoreDetailsModal";

const OHCForm = () => {
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
  });
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      console.log("OHC:", response.data);
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

  const validateForm = () => {
    //All fields mandatory validation check
    // for (const key in formData) {
    //   if (formData[key].trim() === "") {
    //     return false;
    //   }
    // }
    // return file !== null;

    //validation check for only userid
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

    if (!validateForm()) {
      // setResponseMessage("Please fill out all fields and upload a file.");
      setResponseMessage("Please enter Employee code.");
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
        date: getTodayDate(),
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
          <button
            type="button"
            onClick={openModal}
            className={styles.moreDetailsButton}
          >
            more details &#8599;
          </button>
        </div>
      )}

      {!loading && !error && !employeeDetails && formData.userid && (
        <p className={styles.placeholder}>
          No details available for this Employee ID.
        </p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {employeeDetails && employeeDetails.information.name && (
          <>
            <h2>Employee Details</h2>
            <p>
              <strong>Name:</strong> {employeeDetails.information.name}
            </p>
            <p>
              <strong>Email:</strong> {employeeDetails.information.email}
            </p>
            <p>
              <strong>Phone:</strong> {employeeDetails.information.phone}
            </p>
            <p>
              <strong>Gender:</strong> {employeeDetails.information.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {formatDate(employeeDetails.information.dob)}
            </p>
            <p>
              <strong>Grade:</strong> {employeeDetails.working.grade}
            </p>
            <p>
              <strong>Shift:</strong> {employeeDetails.working.shift}
            </p>
            <p>
              <strong>Distance to Work:</strong>{" "}
              {employeeDetails.working.distance}
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {formatDate(employeeDetails.information.joining_date)}
            </p>
            <p>
              <strong>Leaving Date:</strong>
              {employeeDetails.information.leaving_date
                ? formatDate(employeeDetails.information.leaving_date)
                : "Still working"}
            </p>
          </>
        )}
      </Modal>

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
