import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components'

const Container = styled.div``;

const PassStyle = styled.div`
    position: relative;
    border: ${({ click }) => (click ? '1.5px solid #ac0464' : '1px solid rgb(114, 117, 128)')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    

    input{
        border: none;
        outline: none;
        width: 100%;
       
    }

    button{
        position: absolute;
        right: 0;
        padding-right: 0.4rem;
        border-style: none;
        width: fit-content;
        background: none;
        &:hover{
            color: #fff;
        }
        

    }
`;


const Input = ({id, name, type, onChange, value}) => {
    const [passClick, setPassClick] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);

 
    const handlePassClick = () => {
        setPassClick(!passClick)
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    


  return (
    <Container>
        {
            id !== 'password' && <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required
            />
        }

{
            id === 'password' && (
                <PassStyle click={passClick ? passClick : undefined} >

                    <input
                        type={passwordVisible ? 'text' : type}
                        placeholder={'Password'}
                        id={id}
                        name={name}
                        value={value}
                        onClick={handlePassClick}
                        onChange={onChange}
                        required
                    />
                    <button onClick={togglePasswordVisibility}>
                        {passwordVisible ? <FaEyeSlash style={{color: '#023e8a'}} /> : <FaEye />}
                    </button>
                </PassStyle>
            
        )
        }
        
    </Container>
  )
}

export default Input
