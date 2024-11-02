import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../states/AuthContext";
import styles from "./HospitalData.module.css";
import axios from "axios";

import OHCForm from "../../../components/hospitalDataForm/OHCForm/OHCForm";
import OPDForm from "../../../components/hospitalDataForm/OPDForm/OPDForm";
import IPDForm from "../../../components/hospitalDataForm/IPDForm/IPDForm";
import MedicineForm from "../../../components/hospitalDataForm/medicineForm/MedicineForm";
import PathologyForm from "../../../components/hospitalDataForm/pathologyForm/PathologyForm";

const HospitalData = () => {
  const { type } = useParams();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {type === "OHC" && <OHCForm />}
      {type === "OPD" && <OPDForm />}
      {type === "IPD" && <IPDForm />}
      {type === "Medicine" && <MedicineForm />}
      {type === "Pathology" && <PathologyForm />}
    </div>
  );
};

export default HospitalData;
