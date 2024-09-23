import React, { useState } from 'react';
import Banner from '../components/Landing/Banner';
import classes from './Styles/Landing.module.css';
import {BannerImage} from '../config/Config';
import { NavLink, Link } from 'react-router-dom';
import Header from '../components/Navigation/Header/Header';
import styled from 'styled-components';
import Carousel from '../components/UI/Carousel/Carousel';

const Container = styled.div`
    background: linear-gradient(to bottom, rgba(1, 119, 182, 0.35), rgba(255, 255, 255, 1));
    .header{
        position: static;
    }
    .main-action{
        position absolute;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin: 5rem 0 2rem 0;
        h1{
            font-family: "Ubuntu", sans-serif;
            text-align: center;
            font-size: 3rem;

        }
        p{
            font-size: 0.8rem;
            color: rgba(0,0,0,0.6);

        }
        .action-btn{
            color: #fff;
            background: #0077b6;
            padding: .375rem .75rem;
            border-radius: 0.25rem;
            text-transform: none;
            &:hover{
                text-decoration: none;
                transition: 0.4s ease-in;
                background-color: #023e8a;


            }
        }
    }
    .sub-section{
        display: flex;
        justify-content: center;
        font-family: "Ubuntu", sans-serif;
        font-size: 3rem;
        align-items: center;
        height: 10rem;
        background-color: #fff;
        
    }

`;


const bgLeft = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${BannerImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%'
}

const Landing = (props) => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);
	const closeSideDrawerHandler = () => setShowSideDrawer(false);
	const openSideDrawerHandler = () => setShowSideDrawer(true);

    return(
        <Container>
            <div className="header">
             <Header openDrawer={openSideDrawerHandler} />

            </div>

			<div className="main-action">

                <h1>Explore ideas and <br/> connect with others </h1>
                <p>Join us today and enjoy the benefits of an active community</p>
                <Link className="action-btn" to='/sign-up'>Create an Account</Link>
                

            </div>

            <div className="slider">
                <Carousel/>
            </div>

            <div className="sub-section">
                data goes here !
            </div>
      
       

        </Container>

    )
}

export default Landing