import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'


const Container = styled.span`
    width: fit-content;
    height: fit-content;
    .btn{
        background-color: #0077b6;
        color: #fff;
        &:hover{
            background-color: #023e8a;
            transition: 0.4s ease-in;

        }
    }

`;

const Btn = ({label, link}) => {
  return (
    <Container>
        <NavLink className='btn' to={link}>
            {label}
        </NavLink>
    </Container>
  )
}

export default Btn
