import React, { useState } from 'react';
import {interests} from './data';
import styled from 'styled-components';


const Details = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 1.7rem;
        font-weight: 500;
        text-align: center;
    }

    p{
        font-size: 0.8rem;
        color: silver;
        margin-bottom: 1rem;
        text-align: center;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }
`;

const SaveButton = styled.button`
  width: 100%;
  margin: 10px auto;
  padding: 0.5rem 1rem;
  background-color: ${({ isSelected }) => (isSelected ? '#023e8a' : '#ccc')};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  pointer-events: ${({ isSelected }) => (isSelected ? 'auto' : 'none')};
`;
const Items = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 10px;
`;

const Span = styled.span`
    width: fit-content;
    border: 1px solid rgb(114, 117, 128);
    padding: 0.2rem;
    border-radius: 0.4rem;
    cursor: pointer;
    color: ${({ isSelected }) => (isSelected ? '#fff' : 'silver')};
    background-color: ${({ isSelected }) => (isSelected ? '#023e8a' : 'none')};


`;

const Interests = ({modalClosed, setComplete, selectedValues}) => {
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]); 

    const handleClick = (item) => {
        if (selectedInterests.includes(item.data)) {
          // Deselect if already selected
          setSelectedInterests(selectedInterests.filter((i) => i !== item.data));
        } else if (selectedInterests.length < 5) {
          // Only allow adding if less than 5 are selected
          setCount(count+1)
          setSelectedInterests([...selectedInterests, item.data]);
        }
    };

    const handleSave = () => {
        // Handle the save action here
        selectedValues.push(...selectedInterests);
        setComplete(!done);
        modalClosed();
        // You can perform further actions like submitting the selected box data
    };
    
  return (
    <Details>
        <h1>What are you into?</h1>
        <p>Give us up to 5 of your interests, let's personalise things for you</p>

        <Items>
            {interests.map((item,index)=>
            (
                <Span 
                key={index}
                onClick={() => handleClick(item)}
                isSelected={selectedInterests.includes(item.data)}
                isDisabled={selectedInterests.length === 3 && !selectedInterests.includes(index)}
                >{item.data}</Span>
            )
        )}
        </Items>
        

        <SaveButton className="save-btn" onClick={handleSave} isSelected={selectedInterests.length === 5} >
            Save {`${count}/5`}
        </SaveButton>
      
    </Details>
  )
}

export default Interests
