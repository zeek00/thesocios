import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

  span {
    display: flex;
    flex-direction: column;
    min-width: 0;

    input {
      border: 1px solid rgb(114, 117, 128);
      width: 100%;
      text-align: center;
      padding: 0.4rem;
    }
  }
`;

const Birthday = ({ id, name, value, handleBirthdayChange }) => {
  return (
    <Container>
      <span>
        {/* Day Input */}
        <input
          type="number"
          id={`${id}-day`}
          name={`${name}-day`}
          placeholder="DD"
          min="1"
          max="31"
          value={value.day}
          onChange={(e) => handleBirthdayChange('day', e.target.value)}
          onBlur={(e) => {
            const day = Math.max(1, Math.min(31, e.target.value)); 
            handleBirthdayChange('day', day);
        }}  
        />
      </span>

      <span>
        {/* Month Input */}
        <input
          type="number"
          id={`${id}-month`}
          name={`${name}-month`}
          placeholder="MM"
          min="1"
          max="12"
          value={value.month}
          onChange={(e) => handleBirthdayChange('month', e.target.value)}
          onBlur={(e) => {
            const month = Math.max(1, Math.min(12, e.target.value)); // Enforce min/max
            handleBirthdayChange('month', month);
          }}        />
      </span>

      <span>
        {/* Year Input */}
        <input
          type="number"
          id={`${id}-year`}
          name={`${name}-year`}
          placeholder="YYYY"
          min="1900"
          max="2024"
          value={value.year}
          onChange={(e) => handleBirthdayChange('year', e.target.value)}
          onBlur={(e) => {
            const year = Math.max(1900, Math.min(2024, e.target.value)); // Enforce min/max
            handleBirthdayChange('year', year);
          }}          />
      </span>
    </Container>
  );
};

export default Birthday;
