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
            key={index}
            onClick={() => handleClick(item)}
            style={{
                backgroundColor: selectedActivities.includes(item.data) ? '#023e8a' : 'rgb(248,248,248, 0.8)',
                color: selectedActivities.includes(item.data) ? '#fff' : '#ccc'
            }}
          >
            {item.data}
          </Button>
        ))}
      </Items>
    </Container>
  );
};

export default Activities;
