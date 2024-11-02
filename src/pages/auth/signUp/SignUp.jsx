import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../states/AuthContext";
import styles from "./SignUp.module.css";
import axios from "axios";

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
  const navigate = useNavigate();
  const { role } = useParams();
  const { isAuthenticated, userRole, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    password: "",
    phone: "",
    email: "",
    role: role,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!formData.userid) {
      setResponseMessage("Please fill id no.");
      return;
    }

    console.log("Employee Data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signup/`,
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
        role: "employee",
      });
      setIsLoading(false);
      login(role);
      navigate("/analytics");
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
      setIsLoading(false);
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
        {/* <div className={styles.spinner}></div> */}
        <button className={styles.button} type="submit">
          {isLoading ? <div className={styles.spinner}></div> : "Submit"}
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default SignUp;
