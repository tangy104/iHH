import React, { useState } from "react";
import styles from "./PlantDataForm.module.css";
import axios from "axios";

const UpdateShop = () => {
  const [formData, setFormData] = useState({
    shopid: "",
    date: "",
    temperature: "",
    co2_level: "",
    humidity: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/shop/${formData.shopid}`,
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
        <h3 className={styles.h3}>Plant Data Details</h3>
        {Object.keys(formData).map((key) => (
          <div key={key} className={styles.formGroup}>
            <label className={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              className={styles.input}
              type={key === "date" ? "date" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className={styles.button} type="submit">
          Submit
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};
const AddShop = () => {
  const [formData, setFormData] = useState({
    shopid: "",
    location: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "shopid" ? parseInt(value, 10) || "" : value, // Convert to integer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    console.log("Shop Data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/shop`,
        formData
      );
      console.log("Server Response:", response.data);
      if (response.data.message === "shopid already exist") {
        setResponseMessage("Shop ID already exists. Please try again.");
        return;
      }
      setResponseMessage("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.h3}>New Shop Details</h3>
        {Object.keys(formData).map((key) => (
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
        ))}
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? <div className={styles.spinner}></div> : "Submit"}
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};

const PlantDataForm = () => {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        margin: "1rem",
        marginTop: "1rem",
        width: "80%",
        maxWidth: "700px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#f4f4f4",
        }}
      >
        <label
          style={{ margin: "5px", alignSelf: "center" }}
          htmlFor="plantDataType"
        >
          Select Shop Data Type:
        </label>
        <select
          id="plantDataType"
          value={selectedType}
          onChange={handleTypeChange}
          style={{ margin: 5, padding: "0.1rem" }}
        >
          <option value="">Select</option>
          <option value="addShop">Add new shop</option>
          <option value="updateShop">Daily shop update</option>
        </select>
      </div>

      {selectedType === "addShop" && <AddShop />}
      {selectedType === "updateShop" && <UpdateShop />}
    </div>
  );
};

export default PlantDataForm;
