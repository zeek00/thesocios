import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  width: fit-content;
  border: 1px solid silver;
  padding: 0.2rem;
  border-radius: 0.4rem;
  color: ${({ isSelected }) => (isSelected ? '#fff' : 'silver')};
  background-color: ${({ isSelected }) => (isSelected ? '#023e8a' : 'transparent')};
  cursor: pointer;
`;

const Activities = ({ activitiesData, selectedActivities, onSelectActivity, type }) => {
  const handleClick = (item) => {
    onSelectActivity(item, type); // Call parent function to manage selection
  };


  return (
    <Container>
      <Items>
        {activitiesData.map((item, index) => (
          <Button
            key={item}
            onClick={() => handleClick(item)}
            isSelected={selectedActivities.includes(index)}
            isDisabled={selectedActivities.length >= 4 && !selectedActivities.includes(index)}
          >
            {item.data}
          </Button>
        ))}
      </Items>
    </Container>
  );
};

export default Activities;
