import React from 'react';
import { Link } from 'react-router-dom';
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
            text-align: center;
            font-size: 3rem;
            @media only screen and (max-width: 576px) {
                /* Styles for small mobile screens */
                font-size: 1.5rem;
            }
            

        }
        p{
            font-size: 0.8rem;
            text-align: center;
            color: rgba(0,0,0,0.6);

        }
        .action-btn{
            color: #fff;
            background: #0077b6;
            padding: .375rem .75rem;
            border-radius: 0.25rem;
            text-transform: none;
            @media only screen and (max-width: 576px) {
                /* Styles for small mobile screens */
                padding: .275rem .65rem;
                font-size: 0.8rem;
            }
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
        @media only screen and (max-width: 576px) {
            /* Styles for small mobile screens */
            font-size: 1.5rem;
        }
        
    }

`;

const Landing = (props) => {
	

    return(
        <Container>
            <div className="header">
             <Header />

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