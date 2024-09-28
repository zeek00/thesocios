import React from 'react';
import {  Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    transition: transform 0.3s ease-in-out;
    z-index: 39;

    
    nav{
      background-color: #fff;
      width: 95%;
      display: flex;
      flex-direction: column;
      align-content: center;
    }
    .items{
      display: flex;
      width: 95%;
      margin: 3rem auto;
      flex-direction: column;
      gap: 1rem;
    }
    .item{
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      .button{
        color: #0077b6;
        text-decoration-line: none;
        &:active{
          padding: 0.6rem;
          text-decoration: none;
          background-color: #023e8a;
          color: #fff;
          transition: 0.4s ease-in;
        }

      }
    
    }
    
   
  @media (min-width: 768px) {
    display: none;
  }

`;

const LeftNav = ({open, setOpen}) => {

  return (
    <Nav open={open}>
      <nav>
        <div className="items">

          <div className="item">
            <Link to="/" className='button'>
              Home
            </Link>   
          </div>

          <div className="item">
              <Link to="/login" className='button'>
                Login
              </Link>
          </div>
          

          <div className="item">
            <Link to="/sign-up" className='button'>
              Register
            </Link>
            
          </div>

        </div>
        
      </nav> 
   </Nav>
  );
};

export default LeftNav;
