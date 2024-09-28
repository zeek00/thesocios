import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: 0 0 5px 0;
    button{
        border-style: none;
        border-radius: 1rem;
        border: 1px solid #ccc;
        width: fit-content;
        padding: 0.375rem 0.75rem; 
        text-align: center; 
    }
    div{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.4rem;
        margin: 0 0 9px 0;
        input{
            width: 20px; /* Adjust width as needed */
            height: 20px;
            appearance: none;
            outline: none;
            cursor: pointer;
            border: 1px solid #ccc;
            color: #fff;
            position: relative;
            border-radius: 7px;
            &:checked{
                background-color: #023e8a!important;
            }
            &:checked::after {
                content: '✓';
                font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                color: white; /* Color of the checkmark */
                position: absolute;
                top: -4px;
                left: 3.5px;
            }
        }
    }

`;

const Interests = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState(null); // State to keep track of selected box

    const handleClick = (item) => {
        // Only allow setting the selected box if no box is selected yet
        if (selected === null) {
            setSelected(item); // Update the selected state
        }
      };

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  return (
    <Container isSelected={selected !== null}>
        {[
            { data: 'Men'},
            { data: 'Women'},
            { data: 'Everyone'},
            ].map((item, index) => (
            <button
                key={item}
                onClick={() => handleClick(item)} // Pass the index to the click handler
                isSelected={selected === index} // Pass whether this box is selected or not
                isDisabled={selected !== null && selected !== index} // Disable other boxes if one is selected
                style={{
                backgroundColor: selected === index ? '#023e8a' : 'transparent',
                color: selected === index ? '#fff' : '#000'
                }}
            >{item.data}</button>
        ))}
      
    </Container>
  )
}

export default Interests
