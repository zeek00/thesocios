import React, { useState } from 'react';
import {hobbies} from './data';
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
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  
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
`;

const Hobbies = ({modalClosed, setComplete, selectedValues}) => {

    const [done, setDone] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]); 

    const handleClick = (item) => {
        if (selectedInterests.includes(item.data)) {
          // Deselect if already selected
          setSelectedInterests(selectedInterests.filter((i) => i !== item.data));
        } else if (selectedInterests.length < 5) {
            // Only allow adding if less than 5 are selected
            setSelectedInterests([...selectedInterests, item.data]);
        }
    
    };


    const handleSave = () => {
        // Handle the save action here
        selectedValues.push(...selectedInterests);
        setComplete(!done);
        setDone(done)
        modalClosed();
        // You can perform further actions like submitting the selected box data
    };
    
  return (
    <Details>
        <h1>What are you into?</h1>
        <p>Give us up to 5 of your hobbies, let's personalise things for you</p>

        <Items>
            {hobbies.map((item,index)=>
            (
                <Span 
                key={index}
                onClick={() => handleClick(item)}
                style={{backgroundColor: selectedInterests.includes(item.data) ? '#023e8a' : '#000', color: selectedInterests.includes(item.data) ? '#fff' : '#ccc'  }}
                >{item.data}</Span>
            )
        )}
        </Items>
        

        <SaveButton className="save-btn" 
        onClick={handleSave} 
        style={{
            backgroundColor: selectedInterests.length === 5 ? '#023e8a' : 'none', 
            color: selectedInterests.length === 5 ? '#fff' : '#ccc',
            opacity: selectedInterests.length === 5 ? '1' : '0.5',
            pointerEvents: selectedInterests.length === 5 ? 'auto' : 'none' 
        }}
        >
            Save {`${selectedInterests.length}/5`}
        </SaveButton>
      
    </Details>
  )
}

export default Hobbies
