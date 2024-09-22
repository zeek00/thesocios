import React, { useState, useEffect } from 'react';
import classes from './Login.module.css';
import { LoginBg } from '../../../config/Config';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { checkValidity } from '../../../shared/Method';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../../store/actions";
import { OverlaySpinner } from '../../../components/UI/Spinner/OverlaySpinner';
import { NavLink, useHistory } from 'react-router-dom';
import Header from '../../../components/Navigation/Header/Header';

const bgLeft = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${LoginBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
};

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: ''
            },
            label: 'Email Address',
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMsg: null
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: ''
            },
            label: 'Password',
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMsg: null
        }
    });
    
    const [formIsValid, setFormIsValid] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);
    const setOTP = useSelector(state => state.auth.setOTP);
    const message = useSelector(state => state.auth.message);
    const isAuth = useSelector(state => state.auth.token !== null);

    const onAuth = formData => dispatch(actions.auth(formData));
    const onUnload = () => dispatch(actions.onUnload());

    useEffect(() => {
        componentCheckAuth();
        return () => {
            onUnload();
        };
    }, [setOTP, isAuth, loading]);

    const componentCheckAuth = () => {
        if (setOTP && !loading) {
            history.push("/verify-otp");
        }

        if (isAuth && !loading) {
            history.push("/dashboard");
        }
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...loginForm
        };
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        const [errorMsg, isValid] = checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.errorMsg = errorMsg;
        updatedFormElement.valid = isValid;
        updatedFormElement.touched = true;

        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }

        setLoginForm(updatedLoginForm);
        setFormIsValid(formIsValid);
    };

    const loginHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            alert('All fields are important');
            return;
        }

        const formData = {};
        for (let key in loginForm) {
            formData[key] = loginForm[key].value;
        }

        onAuth(formData);
    };

    const formElementsArray = [];
    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key]
        });
    }

    let form = (
        <React.Fragment>
            <form onSubmit={loginHandler}>
                {formElementsArray.map(element => (
                    <React.Fragment key={element.id}>
                        <Input
                            label={element.config.label}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            invalid={!element.config.valid}
                            errorMsg={element.config.errorMsg}
                            shouldValidate={element.config.validation}
                            touched={element.config.touched}
                            changed={event => inputChangedHandler(event, element.id)}
                        />
                    </React.Fragment>
                ))}
                {message && message.type === "login" && <div className="app-error"><p style={{ color: 'red' }}>{message.msg}</p></div>}
                <Button btnType="btnFull" clicked={loginHandler} disabled={!formIsValid || loading}>Login</Button>
            </form>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Header />
            <div style={bgLeft} className={classes.Login}>
                <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-md-5">
                            <div className={classes.formArea}>
                                <div className={classes.formHeader}>
                                    <h3>Login</h3>
                                    <p>Welcome back!</p>
                                </div>
                                <div style={{ width: '100%', position: 'relative' }}>
                                    {form}
                                    <OverlaySpinner loading={loading} />
                                </div>
                                <div style={{ margin: '30px 0', textAlign: 'center' }}>
                                    <p>Don't have an account? <NavLink to="/sign-up">Create one</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
