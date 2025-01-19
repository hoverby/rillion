import React, { useState } from "react";
import "./RatesTable.css";
import { ratesData } from "./data";
import { RatesPopup } from "./RatesPopup";
import { Rate, Rates } from "./types";

const RatesTable: React.FC = () => {
  const [data, setData] = useState<Rates>(ratesData);
  const [selectedRate, setSelectedRate] = useState<{ code: string; rate: Rate } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (code: string, updatedRate: Rate) => {
    setData((prevData: Rates): Rates => ({
      ...prevData,
      rates: {
        ...prevData.rates,
        [code]: updatedRate
      }
    }));
    setIsEditing(false);
    setSelectedRate(null);
  };

  return (
    <div className="rates-table-div">
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Value</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.rates).map(([code, rate]) => (
            <tr 
              key={code}
              onClick={() => {
                setSelectedRate({ code, rate });
                setIsEditing(true);
              }}
              className="clickable-row"
            >
              <td>{code.toUpperCase()}</td>
              <td>{rate.name}</td>
              <td>{rate.unit}</td>
              <td>{rate.value}</td>
              <td>{rate.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && selectedRate && (
        <RatesPopup 
          selectedRate={selectedRate}
          onSave={handleSave}
          onClose={() => {
            setIsEditing(false);
            setSelectedRate(null);
          }}
        />
      )}
    </div>
  );
};

export default RatesTable;