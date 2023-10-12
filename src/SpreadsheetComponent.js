// src/SpreadsheetComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './SpreadsheetComponent.css'; // Import the CSS file
const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_API_KEY;


const SpreadsheetComponent = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}&majorDimension=ROWS`
      );

      const data = response.data.values;
      const row = data.find((row) => row[1] === name);

      if (row) {
        window.open(row[2], '_blank');
      } else {
        alert('Email not found in the DataBase');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="spreadsheet-container">
      <form onSubmit={handleSubmit}>
        <label className="label">
          Registered Email:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-button">
          Download
        </button>
      </form>
    </div>
  );
};

export default SpreadsheetComponent;
