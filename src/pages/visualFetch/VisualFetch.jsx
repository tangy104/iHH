import React, { useState } from "react";
import axios from "axios";
import styles from "./VisualFetch.module.css";

const App = () => {
  const [plantData, setPlantData] = useState([]);
  const [hrData, setHrData] = useState(null);
  const [ohcData, setOhcData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const fetchData = (endpoint, setData) => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`)
      .then((response) => {
        setData(response.data);
        setError("");
      })
      .catch((error) => {
        setError(`Error fetching data from ${endpoint}`);
        setData(null);
        console.error(`Error fetching data from ${endpoint}:`, error);
      })
      .finally(() => setLoading(false));
  };

  const fetchHRData = () => {
    if (!userId) {
      setError("Please enter a User ID.");
      return;
    }
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/HR/${userId}`)
      .then((response) => {
        setHrData(response.data);
        setError("");
      })
      .catch((error) => {
        setError("Error fetching HR data");
        setHrData(null);
        console.error("Error fetching HR data:", error);
      })
      .finally(() => setLoading(false));
  };

  const PlantDataComponent = ({ data }) => (
    <div>
      <h2>Plant Data</h2>
      {data.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Name</th>
              <th>Plant ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.location}</td>
                <td>{item.name}</td>
                <td>{item.plantid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );

  const HRDataComponent = ({ data }) => (
    <div>
      <h2>HR Data</h2>
      {data ? (
        <>
          <h3>Personal Information</h3>
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Phone</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              <tr key={data.information.id}>
                <td>{data.information.id}</td>
                <td>{data.information.name}</td>
                <td>{data.information.email}</td>
                <td>{data.information.gender}</td>
                <td>{new Date(data.information.dob).toLocaleDateString()}</td>
                <td>{data.information.phone}</td>
                <td>{data.information.userid}</td>
              </tr>
            </tbody>
          </table>

          <h3>Working Information</h3>
          {data.working.length > 0 ? (
            <table
              border="1"
              cellPadding="10"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Plant ID</th>
                  <th>Starting Date</th>
                  <th>Ending Date</th>
                  <th>Shift</th>
                </tr>
              </thead>
              <tbody>
                {data.working.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.userid}</td>
                    <td>{item.plantid}</td>
                    <td>{new Date(item.starting_date).toLocaleDateString()}</td>
                    <td>{new Date(item.ending_date).toLocaleDateString()}</td>
                    <td>{item.shift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No working data available.</p>
          )}
        </>
      ) : (
        <p>No HR data available.</p>
      )}
    </div>
  );

  const OHCDataComponent = ({ data }) => (
    <div>
      <h2>OHC Data</h2>
      {data.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userid}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.doctor}</td>
                <td>{item.prescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );

  return (
    <div className={styles.app}>
      <h1>Analytics</h1>
      <div className={styles.buttons}>
        <div>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            style={{ width: "200px" }}
          />
          <button onClick={fetchHRData}>Get HR Data</button>
        </div>
        <button onClick={() => fetchData("/api/plant", setPlantData)}>
          Get Plant Data
        </button>
        <button onClick={() => fetchData("/api/OHC", setOhcData)}>
          Get OHC Data
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={styles.dataContainer}>
        <PlantDataComponent data={plantData} />
        <HRDataComponent data={hrData} />
        <OHCDataComponent data={ohcData} />
      </div>
    </div>
  );
};

export default App;
