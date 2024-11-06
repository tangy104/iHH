import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../states/AuthContext";
import styles from "./ShopData.module.css";
import axios from "axios";

import ShopDataForm from "../../../components/plantDataForm/PlantDataForm";

const ShopData = () => {
  const { type } = useParams();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {type === "Environment" && <ShopDataForm />}
      {/* {type === "OPD" && <OPDForm />}
      {type === "IPD" && <IPDForm />}
      {type === "Medicine" && <MedicineForm />}
      {type === "Pathology" && <PathologyForm />} */}
    </div>
  );
};

export default ShopData;
