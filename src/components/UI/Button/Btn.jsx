import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'


const Container = styled.span`
    width: fit-content;
    height: fit-content;
    .btn{
        border-color: #f8f8f8;
        color: #fff;
        font-weight: 400;
        // border-radius: 0 0.8rem;
        &:hover{
            background-color: #023e8a;
            color: #fff;
            transition: 0.4s ease-in;

        }
    }.btn

`;

const Btn = ({label, link,}) => {
  return (
    <Container>
        <NavLink className='btn' to={link}>
            {label}
        </NavLink>
    </Container>
  )
}

export default Btn
