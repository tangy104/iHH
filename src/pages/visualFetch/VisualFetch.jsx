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
      {data.length > 0 ? (
        <>
          <h2>Shop Data</h2>
          <div className={styles.tableWrapper}>
            <table>
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
          </div>
        </>
      ) : null}
    </div>
  );

  const HRDataComponent = ({ data }) => (
    <div>
      {data ? (
        <>
          <h2>HR Data</h2>
          <h3>Personal Information</h3>
          <div className={styles.tableWrapper}>
            <table>
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
          </div>

          <h3>Working Information</h3>
          {data.working.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table>
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
                      <td>
                        {new Date(item.starting_date).toLocaleDateString()}
                      </td>
                      <td>{new Date(item.ending_date).toLocaleDateString()}</td>
                      <td>{item.shift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No working data available.</p>
          )}
        </>
      ) : // <p>No HR data available.</p>
      null}
    </div>
  );

  const OHCDataComponent = ({ data }) => (
    <div>
      {data.length > 0 ? (
        <>
          <h2>OHC Data</h2>
          <div className={styles.tableWrapper}>
            <table>
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
          </div>
        </>
      ) : null}
    </div>
  );

  return (
    <div className={styles.app}>
      <h1>Analytics</h1>
      <div className={styles.buttons}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            style={{ width: "200px" }}
          />
          <button onClick={fetchHRData}>Get HR Data</button>
        </div>
        <button onClick={() => fetchData("/api/shop", setPlantData)}>
          Get Shop Data
        </button>
        <button onClick={() => fetchData("/api/OHC", setOhcData)}>
          Get OHC Data
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={styles.dataContainer}>
        <HRDataComponent data={hrData} />
        <PlantDataComponent data={plantData} />
        <OHCDataComponent data={ohcData} />
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import { Table, Button, Input, Spin, Alert } from "antd";
// import styles from "./VisualFetch.module.css";

// const App = () => {
//   const [plantData, setPlantData] = useState([]);
//   const [hrData, setHrData] = useState(null);
//   const [ohcData, setOhcData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [error, setError] = useState("");

//   const fetchData = (endpoint, setData) => {
//     setLoading(true);
//     axios
//       .get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`)
//       .then((response) => {
//         setData(response.data);
//         setError("");
//       })
//       .catch((error) => {
//         setError(`Error fetching data from ${endpoint}`);
//         setData([]);
//         console.error(`Error fetching data from ${endpoint}:`, error);
//       })
//       .finally(() => setLoading(false));
//   };

//   const fetchHRData = () => {
//     if (!userId) {
//       setError("Please enter a User ID.");
//       return;
//     }
//     setLoading(true);
//     axios
//       .get(`${import.meta.env.VITE_API_BASE_URL}/api/HR/${userId}`)
//       .then((response) => {
//         setHrData(response.data);
//         setError("");
//       })
//       .catch((error) => {
//         setError("Error fetching HR data");
//         setHrData(null);
//         console.error("Error fetching HR data:", error);
//       })
//       .finally(() => setLoading(false));
//   };

//   const columns = {
//     plant: [
//       { title: "ID", dataIndex: "id", key: "id" },
//       { title: "Location", dataIndex: "location", key: "location" },
//       { title: "Name", dataIndex: "name", key: "name" },
//       { title: "Plant ID", dataIndex: "plantid", key: "plantid" },
//     ],
//     hrPersonal: [
//       { title: "ID", dataIndex: "id", key: "id" },
//       { title: "Name", dataIndex: "name", key: "name" },
//       { title: "Email", dataIndex: "email", key: "email" },
//       { title: "Gender", dataIndex: "gender", key: "gender" },
//       {
//         title: "Date of Birth",
//         dataIndex: "dob",
//         key: "dob",
//         render: (text) => new Date(text).toLocaleDateString(),
//       },
//       { title: "Phone", dataIndex: "phone", key: "phone" },
//       { title: "User ID", dataIndex: "userid", key: "userid" },
//     ],
//     hrWorking: [
//       { title: "ID", dataIndex: "id", key: "id" },
//       { title: "User ID", dataIndex: "userid", key: "userid" },
//       { title: "Plant ID", dataIndex: "plantid", key: "plantid" },
//       {
//         title: "Starting Date",
//         dataIndex: "starting_date",
//         key: "starting_date",
//         render: (text) => new Date(text).toLocaleDateString(),
//       },
//       {
//         title: "Ending Date",
//         dataIndex: "ending_date",
//         key: "ending_date",
//         render: (text) => new Date(text).toLocaleDateString(),
//       },
//       { title: "Shift", dataIndex: "shift", key: "shift" },
//     ],
//     ohc: [
//       { title: "ID", dataIndex: "id", key: "id" },
//       { title: "User ID", dataIndex: "userid", key: "userid" },
//       {
//         title: "Date",
//         dataIndex: "date",
//         key: "date",
//         render: (text) => new Date(text).toLocaleDateString(),
//       },
//       { title: "Doctor", dataIndex: "doctor", key: "doctor" },
//       { title: "Prescription", dataIndex: "prescription", key: "prescription" },
//     ],
//   };

//   return (
//     <div className={styles.app}>
//       <h1>Analytics</h1>
//       <div className={styles.buttons}>
//         <div>
//           <Input
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             placeholder="Enter User ID"
//             className={styles.input}
//           />
//           <Button
//             type="primary"
//             onClick={fetchHRData}
//             className={styles.button}
//           >
//             Get HR Data
//           </Button>
//         </div>
//         <Button
//           type="primary"
//           onClick={() => fetchData("/api/plant", setPlantData)}
//           className={styles.button}
//         >
//           Get Plant Data
//         </Button>
//         <Button
//           type="primary"
//           onClick={() => fetchData("/api/OHC", setOhcData)}
//           className={styles.button}
//         >
//           Get OHC Data
//         </Button>
//       </div>
//       {loading && <Spin />}
//       {error && <Alert message={error} type="error" />}
//       <div className={styles.dataContainer}>
//         {plantData.length > 0 && (
//           <Table columns={columns.plant} dataSource={plantData} rowKey="id" />
//         )}
//         {hrData && (
//           <>
//             <h2>HR Data</h2>
//             <h3>Personal Information</h3>
//             <Table
//               columns={columns.hrPersonal}
//               dataSource={[hrData.information]}
//               rowKey="id"
//             />
//             <h3>Working Information</h3>
//             {hrData.working.length > 0 ? (
//               <Table
//                 columns={columns.hrWorking}
//                 dataSource={hrData.working}
//                 rowKey="id"
//               />
//             ) : (
//               <p>No working data available.</p>
//             )}
//           </>
//         )}
//         {ohcData.length > 0 && (
//           <Table columns={columns.ohc} dataSource={ohcData} rowKey="id" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
