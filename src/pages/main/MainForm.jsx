import React, { useState } from "react";
import styles from "./MainForm.module.css";
import PlantDataForm from "../../components/plantDataForm/PlantDataForm";
import EmployeeForm from "../../components/HRForm/HRForm";
import HospitalDataForm from "../../components/hospitalDataForm/HospitalDataForm";

const MainForm = () => {
  const [selectedForm, setSelectedForm] = useState("PlantData");

  const renderForm = () => {
    switch (selectedForm) {
      case "PlantData":
        return <PlantDataForm />;
      case "EmployeeData":
        return <EmployeeForm />;
      case "HospitalData":
        return <HospitalDataForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1>Data Entry Form</h1>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li
            className={selectedForm === "PlantData" ? styles.active : ""}
            onClick={() => setSelectedForm("PlantData")}
          >
            Shop Data
          </li>
          <li
            className={selectedForm === "EmployeeData" ? styles.active : ""}
            onClick={() => setSelectedForm("EmployeeData")}
          >
            Employee Data
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
