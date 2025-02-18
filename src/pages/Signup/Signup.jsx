import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import classes from './styles/SignUp.module.css';
// import { SignUpBg, ApiEndpoints } from '../../config/Config';
// import { SERVER_REQUEST } from '../../shared/Backend';
import SmallScreens from './Screens/SmallScreens';
import Header from '../../components/Navigation/Header/Header';
import LargeScreens from './Screens/LargeScreens';


const SignUp = (props) => {
    const [authData, setAuthData] = useState([]);
    console.log(authData);
   

    return (
        <>

            <Header type="signup" />

            <div className={classes.smallDisplay}>
                <SmallScreens setData={setAuthData} />
            </div>


            <div className={classes.largeDisplay}>
                <LargeScreens setData={setAuthData} />
            </div>
           




        </>
    );
};

export default SignUp;