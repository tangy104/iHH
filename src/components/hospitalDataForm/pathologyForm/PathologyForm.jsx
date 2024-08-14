import React, { useState } from "react";
import axios from "axios";

const PathologyForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    test: "",
    result: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Pathology Form Data:", formData);
    try {
      const response = await axios.post("/api/pathology", formData);
      console.log("Server Response:", response.data);
      setResponseMessage("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User Id:
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Test:
        <input
          type="text"
          name="test"
          value={formData.test}
          onChange={handleChange}
        />
      </label>
      <label>
        Result:
        <input
          type="text"
          name="result"
          value={formData.result}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default PathologyForm;
