import React, { useState } from "react";
import OHCForm from "./OHCForm/OHCForm";
import OPDForm from "./OPDForm/OPDForm";
import IPDForm from "./IPDForm/IPDForm";
import MedicineForm from "./medicineForm/MedicineForm";
import PathologyForm from "./pathologyForm/PathologyForm";

const HospitalForm = () => {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div style={{padding:"30px"}}>
      <label htmlFor="hospitalDataType">Select Hospital Data Type:</label>
      <select
        id="hospitalDataType"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">Select</option>
        <option value="OHC">OHC</option>
        <option value="OPD">OPD</option>
        <option value="IPD">IPD</option>
        <option value="Medicine">Medicine</option>
        <option value="Pathology">Pathology</option>
      </select>

      {selectedType === "OHC" && <OHCForm />}
      {selectedType === "OPD" && <OPDForm />}
      {selectedType === "IPD" && <IPDForm />}
      {selectedType === "Medicine" && <MedicineForm />}
      {selectedType === "Pathology" && <PathologyForm />}
    </div>
  );
};

export default HospitalForm;
