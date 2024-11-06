import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../states/AuthContext";
import styles from "./SignIn.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const { role } = useParams();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {role === "employee" && <EmployeeSignIn />}
      {role === "doctor" && <EmployeeSignIn />}
      {role === "admin" && <EmployeeSignIn />}
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
    </div>
  );
};

const EmployeeSignIn = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { isAuthenticated, userRole, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!formData.userid) {
      toast.error("Please fill in your Employee ID.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signin/`,
        formData
      );
      toast.success("Signed in successfully!");
      setFormData({
        userid: "",
        password: "",
      });
      setIsLoading(false);
      login(response.data.role); // Ensure this is set up in your backend
      navigate("/analytics");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to sign in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.h3}>SignIn</h3>
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
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button className={styles.button} type="submit">
          {isLoading ? <div className={styles.spinner}></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
