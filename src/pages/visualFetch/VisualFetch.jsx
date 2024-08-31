// import React, { useState } from "react";
// import axios from "axios";
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
//         setData(null);
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

//   const PlantDataComponent = ({ data }) => (
//     <div>
//       {data.length > 0 ? (
//         <>
//           <h2>Shop Data</h2>
//           <div className={styles.tableWrapper}>
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Location</th>
//                   <th>Name</th>
//                   <th>Plant ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.location}</td>
//                     <td>{item.name}</td>
//                     <td>{item.plantid}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );

//   const HRDataComponent = ({ data }) => (
//     <div>
//       {data ? (
//         <>
//           <h2>HR Data</h2>
//           <h3>Personal Information</h3>
//           <div className={styles.tableWrapper}>
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Gender</th>
//                   <th>Date of Birth</th>
//                   <th>Phone</th>
//                   <th>User ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr key={data.information.id}>
//                   <td>{data.information.id}</td>
//                   <td>{data.information.name}</td>
//                   <td>{data.information.email}</td>
//                   <td>{data.information.gender}</td>
//                   <td>{new Date(data.information.dob).toLocaleDateString()}</td>
//                   <td>{data.information.phone}</td>
//                   <td>{data.information.userid}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <h3>Working Information</h3>
//           {data.working.length > 0 ? (
//             <div className={styles.tableWrapper}>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>User ID</th>
//                     <th>Plant ID</th>
//                     <th>Starting Date</th>
//                     <th>Ending Date</th>
//                     <th>Shift</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.working.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.id}</td>
//                       <td>{item.userid}</td>
//                       <td>{item.plantid}</td>
//                       <td>
//                         {new Date(item.starting_date).toLocaleDateString()}
//                       </td>
//                       <td>{new Date(item.ending_date).toLocaleDateString()}</td>
//                       <td>{item.shift}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No working data available.</p>
//           )}
//         </>
//       ) : // <p>No HR data available.</p>
//       null}
//     </div>
//   );

//   const OHCDataComponent = ({ data }) => (
//     <div>
//       {data.length > 0 ? (
//         <>
//           <h2>OHC Data</h2>
//           <div className={styles.tableWrapper}>
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>User ID</th>
//                   <th>Date</th>
//                   <th>Doctor</th>
//                   <th>Prescription</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.userid}</td>
//                     <td>{new Date(item.date).toLocaleDateString()}</td>
//                     <td>{item.doctor}</td>
//                     <td>{item.prescription}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );

//   return (
//     <div className={styles.app}>
//       <h1>Analytics</h1>
//       <div className={styles.buttons}>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <input
//             type="text"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             placeholder="Enter User ID"
//             style={{ width: "200px" }}
//           />
//           <button onClick={fetchHRData}>Get HR Data</button>
//         </div>
//         <button onClick={() => fetchData("/api/shop", setPlantData)}>
//           Get Shop Data
//         </button>
//         <button onClick={() => fetchData("/api/OHC", setOhcData)}>
//           Get OHC Data
//         </button>
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <div className={styles.dataContainer}>
//         <HRDataComponent data={hrData} />
//         <PlantDataComponent data={plantData} />
//         <OHCDataComponent data={ohcData} />
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./VisualFetch.module.css";

const VisualFetch = () => {
  const [userId, setUserId] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [data, setData] = useState(null);

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  const fetchData = async () => {
    if (!userId) {
      alert("Please enter a User ID.");
      return;
    }

    let endDate = dayjs().format("YYYY-MM-DD");
    let startDate = "";

    switch (timeRange) {
      case "past 10 days":
        startDate = dayjs().subtract(10, "day").format("YYYY-MM-DD");
        break;
      case "past month":
        startDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
        break;
      case "past 6 months":
        startDate = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        break;
      case "past 1 year":
        startDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
        break;
      case "past 2 years":
        startDate = dayjs().subtract(2, "year").format("YYYY-MM-DD");
        break;
      case "all time":
        startDate = "";
        break;
      default:
        break;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/Analytics/`,
        {
          params: {
            userid: userId,
            starting_date: startDate,
            ending_date: endDate,
          },
        }
      );
      console.log("Data fetched successfully:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTableSection = (title, data, fields) => {
    // Handle cases where the data is undefined or null
    if (!data.userDetails) {
      return null;
    }
    return (
      <div className={styles.tableSection}>
        <h3>{title}</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {fields.map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) ? (
                data.map((item, index) => (
                  <tr key={index}>
                    {fields.map((field, fieldIndex) => (
                      <td key={fieldIndex}>
                        {field === "date" ||
                        field === "admit_date" ||
                        field === "discharge_date" ||
                        (field === "joining_date" && item[field])
                          ? formatDate(item[field])
                          : item[field] || "N/A"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  {fields.map((field, index) => (
                    <td key={index}>
                      {field === "date" || (field === "dob" && data[field])
                        ? formatDate(data[field])
                        : data[field] || "N/A"}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Analytics</h1>

      <div className={styles.formGroup}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter Employee code"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <select
          className={styles.inputField}
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="">Select Time Range</option>
          <option value="past 10 days">Past 10 Days</option>
          <option value="past month">Past Month</option>
          <option value="past 6 months">Past 6 Months</option>
          <option value="past 1 year">Past 1 Year</option>
          <option value="past 2 years">Past 2 Years</option>
          <option value="all time">All Time</option>
        </select>

        <button className={styles.button} onClick={fetchData}>
          Fetch Data
        </button>
      </div>

      {data &&
        (data.userDetails ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            Employee code does not exists.
          </div>
        ) : (
          <div className={styles.dataContainer}>
            {renderTableSection("User Details", data.userDetails, [
              "userid",
              "name",
              "email",
              "phone",
              "gender",
              "dob",
            ])}
            {renderTableSection("Current Shop", data.currentShop, [
              "shopid",
              "location",
            ])}
            {renderTableSection("User Medical - IPD", data.userMedical?.ipd, [
              "admit_no",
              "admit_date",
              "discharge_date",
              "doctor",
              "prescription",
            ])}
            {renderTableSection("User Medical - OHC", data.userMedical?.ohc, [
              "date",
              "doctor",
              "prescription",
            ])}
            {renderTableSection("User Medical - OPD", data.userMedical?.opd, [
              "date",
              "doctor",
              "prescription",
              "status",
            ])}
            {renderTableSection("Pathology", data.userMedical?.pathology, [
              "test",
              "result",
              "date",
            ])}
            {renderTableSection("Medicine", data.userMedical?.medicine, [
              "medicine",
              "doctor",
              "date",
            ])}
            {renderTableSection("User Work Details", data.userWork, [
              "shopid",
              "joining_date",
              "shift",
              "grade",
              "distance",
            ])}
            {renderTableSection("Shop Environment", data.shopEnvironment, [
              "shopid",
              "date",
              "temperature",
              "humidity",
              "co2_label",
            ])}
          </div>
        ))}
    </div>
  );
};

export default VisualFetch;
