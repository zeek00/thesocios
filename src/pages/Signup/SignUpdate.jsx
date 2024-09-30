import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './SignUp.module.css';
import { ApiEndpoints } from '../../config/Config';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from "../../store/actions";
import { SERVER_REQUEST } from '../../shared/Backend';
import SmallScreens from './Screens/SmallScreens';
import Header from '../../components/Navigation/Header/Header';
import LargeScreens from './Screens/LargeScreens';

const SignUp = (props) => {
    const dispatch = useDispatch();

    const {
        error, loading, isAuth, registerSuccess
    } = useSelector(state => ({
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        registerSuccess: state.auth.registerSuccess
    }));

    // State to handle user form data
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        userName: '',
        email: '',
        phone: '',
        password: '',
        birthday: { day: '', month: '', year: '' },
        gender: '',
        showGender: false,
        interests: [],
        hobbies: [],
        photos: []
    });

    // Redirect if user is authenticated
    useEffect(() => {
        if (isAuth && !loading) {
            props.history.push("/dashboard");
        }
    }, [isAuth, loading, props.history]);

    // Handle successful registration
    useEffect(() => {
        if (registerSuccess) {
            // Handle post-registration steps if needed
        }
    }, [registerSuccess]);




    // Function to register the user
    const registerUser = (formData) => {
        console.log("user data = !!!!!!!!!!", formData)
        SERVER_REQUEST(ApiEndpoints.USER_REGISTER, 'post', formData)
            .then((data) => {
                if (data.error == null && !data.error) {
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Handle input changes and update userData state
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedUserData = {
            ...userData,
            [inputIdentifier]: event.target.value
        };
        setUserData(updatedUserData);
    };

    // Handle form submission
    const signUpHandler = (event) => {
        event.preventDefault();
    
        // Prepare form data
        const formData = new FormData();
        formData.append('firstname', userData.firstname);
        formData.append('lastname', userData.lastname);
        formData.append('userName', userData.userName);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('password', userData.password);
        formData.append('birthday', JSON.stringify(userData.birthday));
        formData.append('gender', userData.gender);
        formData.append('showGender', userData.showGender);
        formData.append('interests', userData.interests);
        formData.append('hobbies', userData.hobbies);
    
       
        console.log("check condition = " , userData.photos)
        // Append files if there are any photos
        if (userData.photos && userData.photos.length > 0) {
            console.log("check condition = " , userData.photos && userData.photos.length > 0)
            userData.photos.forEach((photo, index) => {
                formData.append(`photos[${index}]`, photo);
            });
        }
        formData.append('photos', userData.photos)
    
        // Debugging
        console.log("User data being submitted: ", formData);
    
        // Dispatch signup action
        dispatch(actions.signUp(formData));
        
        // Call registerUser with formData
        registerUser(formData);
    };


    return (
        <>
            <Header type="signup" />
            
            {/* Small Screen View */}
            <div className={classes.smallDisplay}>
                <SmallScreens setData={setUserData} />
            </div>

            {/* Large Screen View */}
            <div className={classes.largeDisplay}>
                <LargeScreens setData={setUserData} />
                <Button btnType="btnFull" clicked={signUpHandler}>Submit</Button>
            </div>
        </>
    );
};

export default SignUp;
