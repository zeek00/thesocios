import React from 'react';
import Navigationitems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import styled from 'styled-components';
import Btn from '../../UI/Button/Btn';

const Container = styled.nav`
    display: grid;
    height: 4rem;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: space-between;
    background-color: ${({ type }) => type ? 'rgba(2, 62, 138, 0.9)' : 'transprent'};
    .logo{
        padding-left: 0.8rem;
        font-family: "Pacifico", cursive;
        font-weight: 400;
        font-style: normal;
        color: #fff;
        span{
            color: #0077b6;

        }
    }
    .btn-elements{
        display: grid;
        padding: 0.8rem;
        grid-template-columns: repeat(3, 1fr);
        justify-self: end;
    }


`;

const items = [
    {label:"Home", link: "/"}, 
    {label:"Login", link: "/login"}, 
    {label:"Register", link: "/sign-up"}
];

const Header = (props) => {

    return(
        <Container type={props.type} >
           <h2 className='logo'><span>we</span>Connect.</h2>

            <div className="btn-elements">
              {items.map((data, index)=><Btn label={data.label} link={data.link} index={index} />)}
            </div>
            {/* <button onClick={props.openDrawer} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <Navigationitems logout={props.logout} username={props.username} isVerify={props.isVerify}  isAuth={props.isAuth} /> */}
        </Container>
    )
}
export default Header;