import React, { useState } from "react";
import styles from "./MainForm.module.css";
import PlantDataForm from "../../components/plantDataForm/PlantDataForm";
import EmployeeForm from "../../components/HRForm/HRForm";
import HospitalDataForm from "../../components/hospitalDataForm/HospitalDataForm";

const MainForm = () => {
  return (
    <div className={styles.container}>
      <h1>Data Entry Form</h1>
      <PlantDataForm />
      <EmployeeForm />
      <HospitalDataForm />
    </div>
  );
};

export default MainForm;
