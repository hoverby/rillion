import React from "react";
import { Rate } from "./types";
import "./RatesPopup.css";

interface RatesPopupProps {
  selectedRate: {
    code: string;
    rate: Rate;
  };
  onSave: (code: string, rate: Rate) => void;
  onClose: () => void;
}

export const RatesPopup: React.FC<RatesPopupProps> = ({ selectedRate, onSave, onClose }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedRate: Rate = {
      ...selectedRate.rate,
      value: parseFloat(formData.get('value') as string) || 0,
    };
    onSave(selectedRate.code, updatedRate);
  };

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Code</label>
            <div className="field-text">
              {selectedRate.code.toUpperCase()}
            </div>
          </div>
          <div className="form-group">
            <label>Value</label>
            <input 
              name="value"
              type="number"
              defaultValue={selectedRate.rate.value}
              step="any"
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};