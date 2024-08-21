import React, { useState } from "react";
import styles from "./MainForm.module.css";
import PlantDataForm from "../../components/plantDataForm/PlantDataForm";
import HRRegistration from "../../components/HRForm/HRRegistration/HRRegistration";
import HRDetails from "../../components/HRForm/HRDetails/HRDetails";
import HospitalDataForm from "../../components/hospitalDataForm/HospitalDataForm";

const MainForm = () => {
  const [selectedForm, setSelectedForm] = useState("HRRegistration");

  const renderForm = () => {
    switch (selectedForm) {
      case "HRRegistration":
        return <HRRegistration />;
      case "HRDetails":
        return <HRDetails />;
      case "PlantData":
        return <PlantDataForm />;
      case "HospitalData":
        return <HospitalDataForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* <h1>Data Entry Form</h1> */}
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li
            className={selectedForm === "HRRegistration" ? styles.active : ""}
            onClick={() => setSelectedForm("HRRegistration")}
          >
            Employee Registration
          </li>
          <li
            className={selectedForm === "HRDetails" ? styles.active : ""}
            onClick={() => setSelectedForm("HRDetails")}
          >
            Employee Work Details
          </li>
          <li
            className={selectedForm === "PlantData" ? styles.active : ""}
            onClick={() => setSelectedForm("PlantData")}
          >
            Shop Data
          </li>
          <li
            className={selectedForm === "HospitalData" ? styles.active : ""}
            onClick={() => setSelectedForm("HospitalData")}
          >
            Hospital Data
          </li>
          {/* Add more options here if needed */}
        </ul>
      </nav>
      <div className={styles.formContainer}>{renderForm()}</div>
    </div>
  );
};

export default MainForm;
