import React from 'react';
import Navigationitems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import styled from 'styled-components';
import Btn from '../../UI/Button/Btn';
import Burger from '../SideDrawer/Burger';

const Container = styled.nav`
    display: flex;
    height: 4rem;
    align-items: center;
    background-color: ${({ type }) => type ? 'rgba(2, 62, 138, 0.9)' : 'transprent'};
    .burger{
        display: none;
    }
    @media only screen and (min-width: 1200px) {
        /* Styles for large desktops */
        .logo{
            width: 70%;
            padding-left: 0.8rem;
            font-family: "Pacifico", cursive;
            font-weight: 400;
            font-style: normal;
            color: #fff;
            span{
                color: ${({ type }) => type ? '#fff' : '#0077b6'};
    
            }
        }
        .btn-elements{
            width: 30%;
            display: flex;
            justify-content: end;
            padding-right: 1rem;
            gap: 1rem;
    
        }

    }
    @media only screen and (min-width: 768px) {
        /* Styles for tablets */
        .logo{
            width: 70%;
            padding-left: 0.8rem;
            font-family: "Pacifico", cursive;
            font-weight: 400;
            font-style: normal;
            color: #fff;
            span{
                color: ${({ type }) => type ? '#fff' : '#0077b6'};
    
            }
        }
        .btn-elements{
            width: 30%;
            display: flex;
            justify-content: end;
            padding-right: 1rem;
            gap: 1rem;
    
        }
    }

    @media only screen and (max-width: 576px) {
        /* Styles for small mobile screens */
        .logo{
            width: 70%;
            padding-left: 0.8rem;
            font-family: "Pacifico", cursive;
            font-size: 1rem;
            font-weight: 400;
            font-style: normal;
            color: #fff;
            span{
                color: ${({ type }) => type ? '#fff' : '#0077b6'};
    
            }
        }
        .btn-elements{
            display: none;
        }
        .burger{
            display: flex;
        }
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
           <h2 className='logo'><span>we</span>Connect <span>.</span></h2>

            <div className="btn-elements">
              {items.map((data, index)=><Btn label={data.label} link={data.link} index={index} />)}
            </div>
            <div className="burger">
                <Burger/>
            </div>
            {/* <button onClick={props.openDrawer} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <Navigationitems logout={props.logout} username={props.username} isVerify={props.isVerify}  isAuth={props.isAuth} /> */}
        </Container>
    )
}
export default Header;