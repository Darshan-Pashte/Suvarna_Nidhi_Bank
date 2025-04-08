import React, { useState } from 'react';

const ExpiryDateField = () => {
  const [expiryDate, setExpiryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formatString = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters

    // Prevent input if the first two characters exceed "12"
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      if (parseInt(month, 10) > 12) {
        return; // Prevent further input
      }
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Insert slash after MM
    }

    setExpiryDate(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && expiryDate.length > 0) {
      e.preventDefault();
      let value = expiryDate.replace(/\D/g, ''); // Remove all non-digit characters
      value = value.slice(0, -1); // Remove the last character

      // Prevent input if the first two characters exceed "12"
      if (value.length >= 2) {
        const month = value.slice(0, 2);
        if (parseInt(month, 10) > 12) {
          return; // Prevent further input
        }
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Insert slash after MM
      }

      setExpiryDate(value);
    } else if (expiryDate.replace(/\D/g, '').length >= 4 && !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expiryDate) {
      setErrorMessage('Expiry date is required');
    } else {
      setErrorMessage('');
      // Proceed with form submission or other logic
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        style={{
            marginTop: "4px",
            paddingLeft: "14px",
            padding: "5px",
            borderRadius: "6px",
            fontSize: "14px",
            border:"0.5px solid gray",
           
          }}
          maxLength="5"
          placeholder="MM/YY"
          type="text"
          value={expiryDate}
          onChange={formatString}
          onKeyDown={handleKeyDown}
        />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
       
      </form>
    </div>
  );
};

export default ExpiryDateField;
