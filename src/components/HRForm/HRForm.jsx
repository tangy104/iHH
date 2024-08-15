import React, { useState } from "react";
import styles from "./HRForm.module.css";
import axios from "axios";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    join_date: "",
    leaving_date: "",
    // "Date of joining company": "",
    // "Date of leaving company(if left)": "",
    // division: "",
    // grade: "",
    // shopId: "",
    // location: "",
    // shift: "",
    // grade: "",
    // "Date of joining shop": "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // // Validation function to check if all fields are filled
  // const validateForm = () => {
  //   for (const key in formData) {
  //     if (formData[key].trim() === "") {
  //       return false; // If any field is empty, return false
  //     }
  //   }
  //   return true; // All fields are filled
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!formData.userid) {
      setResponseMessage("Please fill id no.");
      return;
    }
    console.log("Employee Data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/HR/`,
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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.h3}>Employee Details</h3>
        {/* {Object.keys(formData).map((key) => (
          <div key={key} className={styles.formGroup}>
            <label className={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              className={styles.input}
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))} */}
        <div className={styles.formGroup}>
          <label className={styles.label}>User Id:</label>
          <input
            className={styles.input}
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date of Birth:</label>
          <input
            className={styles.input}
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        {/* <div className={styles.formGroup}>
          <label className={styles.label}>Gender:</label>
          <select
            className={styles.input} // reuse the input styling for consistency
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div> */}
        <div
          style={{ display: "flex", marginTop: "1rem", marginBottom: "0.6rem" }}
        >
          <label className={styles.label} style={{ marginRight: 10 }}>
            Gender:
          </label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === "Others"}
                onChange={handleChange}
              />
              Others
            </label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone:</label>
          <input
            className={styles.input}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Joining Date:</label>
          <input
            className={styles.input}
            type="date"
            name="join_date"
            value={formData.join_date}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Leaving Date:</label>
          <input
            className={styles.input}
            type="date"
            name="leaving_date"
            value={formData.leaving_date}
            onChange={handleChange}
          />
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default EmployeeForm;
