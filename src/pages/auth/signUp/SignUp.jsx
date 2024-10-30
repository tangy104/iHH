import { useParams } from "react-router-dom";
import React, { useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";

// import EmployeeSignUp from "./EmployeeSignUp";
// import DoctorSignUp from "./DoctorSignUp";
// import AdminSignUp from "./AdminSignUp";

const SignUp = () => {
  const { role } = useParams();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {role === "employee" && <EmployeeSignUp />}
      {role === "doctor" && <EmployeeSignUp />}
      {role === "admin" && <EmployeeSignUp />}
      {/* {role === "doctor" && <DoctorSignUp />}
      {role === "admin" && <AdminSignUp />} */}
    </div>
  );
};

const EmployeeSignUp = () => {
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    password: "",
    phone: "",
    email: "",
    role: "employee",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setFormData({
        userid: "",
        name: "",
        password: "",
        phone: "",
        email: "",
        role: role,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.h3}>SignUp</h3>
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
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
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

        <button className={styles.button} type="submit">
          Submit
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default SignUp;
