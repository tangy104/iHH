import React, { useState, useEffect } from "react";
import styles from "../HRForm.module.css";
import axios from "axios";

const UpdateDetails = () => {
  const [formData, setFormData] = useState({
    userid: "",
    shopChanged: "", // This field will not be sent in the Axios request
    shopid: "shop1",
    distance: "0-5km",
    shift: "morning",
    grade: "A",
    joining_date: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userid.trim()) {
      setResponseMessage("Please enter your employee ID.");
      return;
    }

    // Create a copy of formData without the shopChanged field
    const { shopChanged, ...dataToSubmit } = formData;
    console.log("Updated data:", dataToSubmit);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/HR/${formData.userid}`,
        dataToSubmit
      );
      console.log("Server Response:", response.data);
      setResponseMessage("Data submitted successfully!");
      setFormData({
        userid: "",
        shopChanged: "",
        shopid: "shop1",
        distance: "0-5km",
        shift: "morning",
        grade: "A",
        joining_date: "",
      });
      setEmployeeDetails(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.h3}>Employee work details</h3>
        <div className={styles.formGroup}>
          <label className={styles.label}>Employee code:</label>
          <input
            className={styles.input}
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
          />
        </div>

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

        {/* <div className={styles.formGroup}>
            <label className={styles.label}>Has the shop changed?</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="shopChanged"
                  value="yes"
                  checked={formData.shopChanged === "yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="shopChanged"
                  value="no"
                  checked={formData.shopChanged === "no"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div> */}

        {/* Conditionally render additional fields if shopChanged is "yes" */}
        {/* {formData.shopChanged === "yes" && ( */}
        <>
          <div className={styles.formGroup}>
            <label className={styles.label}>New shop:</label>
            <select
              className={styles.input}
              name="shopid"
              value={formData.shopid}
              onChange={handleChange}
            >
              <option value="shop1">Shop1</option>
              <option value="shop2">Shop2</option>
              <option value="shop3">Shop3</option>
              <option value="shop4">Shop4</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Distance from residence:</label>
            <select
              className={styles.input}
              name="distance"
              value={formData.distance}
              onChange={handleChange}
            >
              <option value="0-5km">0-5 km</option>
              <option value="5-10km">5-10 km</option>
              <option value="10-20km">10-20 km</option>
              <option value="20-30km">20-30 km</option>
              <option value="30-40km">30-40 km</option>
              <option value="40-50km">40-50 km</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Shift:</label>
            <select
              className={styles.input}
              name="shift"
              value={formData.shift}
              onChange={handleChange}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Grade:</label>
            <select
              className={styles.input}
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Joining Date of new shop:</label>
            <input
              className={styles.input}
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
            />
          </div>
        </>
        {/* )} */}

        <button className={styles.button} type="submit">
          Submit
        </button>
        {responseMessage && (
          <p className={styles.responseMessage}>{responseMessage}</p>
        )}
      </form>
    </div>
  );
};

export default UpdateDetails;
