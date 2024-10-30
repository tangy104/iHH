import React, { useState, useEffect } from "react";
import styles from "./PathologyForm.module.css";
import axios from "axios";

const PathologyForm = () => {
  // Function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Options for different tests
  const resultOptions = {
    sugar: [
      "Normal (70 - 100 mg/dL)",
      "Elevated (100 - 120 mg/dL)",
      "High (Greater than 120 mg/dL)",
      "Low (Less than 70 mg/dL)",
    ],
    pressure: [
      "Normal (80 - 120 mmHg)",
      "Elevated (120 - 140 mmHg)",
      "High (Greater than 140 mmHg)",
      "Low (Less than 80 mmHg)",
    ],
    temperature: [
      "Normal (80 - 120 mmHg)",
      "Elevated (120 - 140 mmHg)",
      "High (Greater than 140 mmHg)",
      "Low (Less than 80 mmHg)",
    ],
    heartRate: [
      "Normal (80 - 120 mmHg)",
      "Elevated (120 - 140 mmHg)",
      "High (Greater than 140 mmHg)",
      "Low (Less than 80 mmHg)",
    ],
  };

  const [formData, setFormData] = useState({
    userid: "",
    date: getTodayDate(),
    test: "sugar", // Default test
    result: resultOptions.sugar[0], // Default result for "sugar" test
  });

  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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

    // Handle test change and update result based on the new test
    if (name === "test") {
      setFormData({
        ...formData,
        test: value,
        result: resultOptions[value][0], // Set default result for the selected test
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    // Validate the form before submitting
    if (!validateForm()) {
      // setResponseMessage("Please fill out all fields and upload file.");
      setResponseMessage("Please enter Employee code.");
      return;
    }
    console.log("Pathology Form Data:", formData);
    const data = new FormData();
    data.append("userid", formData.userid);
    data.append("date", formData.date);
    data.append("test", formData.test);
    data.append("result", formData.result);
    data.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/pathology/${formData.userid}`,
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
        test: "sugar",
        result: resultOptions.sugar[0], // Reset to default result
      });
      setFile(null);
      setEmployeeDetails(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const getBackgroundColor = (option) => {
    switch (option) {
      case "Normal (70 - 100 mg/dL)":
        return "green";
      case "Elevated (100 - 120 mg/dL)":
        return "#FFA500";
      case "High (Greater than 120 mg/dL)":
        return "#FF0000";
      case "Low (Less than 70 mg/dL)":
        return "#0000FF";
      case "Normal (80 - 120 mmHg)":
        return "green";
      case "Elevated (120 - 140 mmHg)":
        return "#FFA500";
      case "High (Greater than 140 mmHg)":
        return "#FF0000";
      case "Low (Less than 80 mmHg)":
        return "#0000FF";
      default:
        return "#FFFFFF";
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
      <label className={styles.label}>Test:</label>
      <select
        className={styles.input}
        name="test"
        value={formData.test}
        onChange={handleChange}
      >
        <option value="sugar">Blood Sugar</option>
        <option value="pressure">Blood Pressure</option>
        <option value="heartRate">Heart Rate</option>
        <option value="temperature">Body Temperature</option>
        <option value="temperature">Haemoglobin</option>
        <option value="temperature">ECG</option>
        <option value="temperature">MRI</option>
      </select>

      <label className={styles.label}>Result:</label>
      <select
        // className={styles.inputResult}
        style={{
          backgroundColor: getBackgroundColor(formData.result),
          color: "white",
        }}
        name="result"
        value={formData.result}
        onChange={handleChange}
      >
        {resultOptions[formData.test]?.map((option) => (
          <option
            style={{
              backgroundColor: getBackgroundColor(option),
              color: "white",
            }}
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <label className={styles.label}>
        Result document/slip:
        <input
          className={styles.inputResult}
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleImageChange}
        />
      </label>
      <button
        className={submitLoading ? styles.spinner : styles.button}
        type="submit"
      >
        {submitLoading ? null : "Submit"}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default PathologyForm;
