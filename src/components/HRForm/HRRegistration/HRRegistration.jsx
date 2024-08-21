import React, { useState } from "react";
import styles from "../HRForm.module.css";
import axios from "axios";

const NewRegistration = () => {
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    grade: "A",
    shopid: "shop1",
    distance: "0-5km",
    shift: "morning",
    joining_date: "",
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
        dob: "",
        gender: "",
        phone: "",
        email: "",
        grade: "A",
        shopid: "shop1",
        distance: "0-5km",
        shift: "morning",
        joining_date: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.h3}>New Registration</h3>
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
          <label className={styles.label}>Date of Birth:</label>
          <input
            className={styles.input}
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
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
          <label className={styles.label}>Shop:</label>
          <select
            className={styles.input} // reuse the input styling for consistency
            name="shopid"
            value={formData.shopid}
            onChange={handleChange}
          >
            {/* <option value="select">Select</option> */}
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
            className={styles.input} // reuse the input styling for consistency
            name="shift"
            value={formData.shift}
            onChange={handleChange}
          >
            {/* <option value="select">Select</option> */}
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="night">Night</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Joining Date:</label>
          <input
            className={styles.input}
            type="date"
            name="joining_date"
            value={formData.joining_date}
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

export default NewRegistration;
