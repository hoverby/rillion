import React, { useState, KeyboardEvent } from "react";
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>, code: string, rate: Rate) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedRate({ code, rate });
      setIsEditing(true);
    }
  };

  return (
    <div className="rates-table-div">
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Unit</th>
            <th scope="col">Value</th>
            <th scope="col">Type</th>
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
              onKeyDown={(e) => handleKeyDown(e, code, rate)}
              className="clickable-row"
              tabIndex={0}
              role="row"
              aria-label={`${code.toUpperCase()} ${rate.name} ${rate.unit} ${rate.value} ${rate.type}`}
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