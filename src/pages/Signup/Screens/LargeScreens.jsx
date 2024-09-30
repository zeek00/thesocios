import React, { useEffect, useState, useCallback } from 'react';

import classes from '../SignUp.module.css';
import Fields from '../../../components/UI/Form/Fields';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';

const ValidateBox = styled.div`
  .help{
    font-size: 0.6rem;
    color: red;
  }
`;

const Button = styled.div`
  border-style: none;
  width: 50%;
  margin: 0 auto;
  a{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.35rem 0.25rem;  
    background-color: ${({ disabled }) => (disabled ? '#023e8a' : '#e9ebee')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    color:${({ disabled }) => (disabled ? '#fff' : '#ccc')};
    &:hover{
      text-decoration: none;

    }

    }

  

`;



const LargeScreens = ({ setData }) => {
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    birthday: '',
    gender: '',
    showGender: false,
    interests: [],
    hobbies: [],
    photos: []
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [, setModalDone] = useState(false);
  const [birthday, setBirthday] = useState({birthday:''})


  const showToastError = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT });
  };




  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
      }));
      validateFields(name, value);
  }

  const handleBirthdayChange = (field, value) => {
    setBirthday({
    ...birthday,
    birthday: {
        ...birthday.birthday,
        [field]: value,
    },
    });
    const { day, month, year } = birthday.birthday;
    const formattedBirthday = `${day}/${month}/${year}`;
    formData.birthday = formattedBirthday
    validateFields("birthday", formattedBirthday);
  };
  
  const handleGenderChange = (gender) => {
      setFormData({ ...formData, gender });
      validateFields("gender", gender);

  };

  const handleShowGenderChange = (showGender) => {
      setFormData({ ...formData, showGender });
  };

    
  const handleSubmit = () => {
    validateAllFields();
  
    if (formIsValid) {
        setData(formData);
    } else {
        Object.values(formErrors).forEach((error) => {
            if (error) {
                showToastError(error);  
            }
        });

        showToastError("Please fill in all required fields correctly.");
    }
  };

  const validateAllFields = () => {
    const fieldsToValidate = [
        'firstname', 
        'lastname', 
        'username', 
        'email', 
        'phone', 
        'password', 
        'birthday', 
        'gender', 
        'interests', 
        'hobbies', 
        'photos'
    ];

    fieldsToValidate.forEach((field) => {
        validateFields(field, formData[field]);
    });
  };

  const validateFields = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case 'firstname':
        errors.firstname = validator.isEmpty(value, { min: 1 }) ? 'First name is required' 
        : validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
        ? '' 
        : 'First name must be at least 3 characters and contain only letters';
        break;
      case 'lastname':
        errors.lastname = validator.isEmpty(value, { min: 1 }) ? 'Last name is required' 
        : validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
        ? '' 
        : 'Last name must be at least 3 characters and contain only letters';
        break;
      case 'email':
        errors.email = validator.isEmpty(value, { min: 1 }) ? 'Email is required' 
        : validator.isEmail(value) 
        ? ''
        : `Invalid email format (example: 'something@gmail.com')`;
        break;
      case 'username':
        errors.username = validator.isEmpty(value, { min: 1 }) ? 'User name is required' 
        : validator.isLength(value, { min: 5})
        ? '' 
        : 'Username must be at least 5 characters long and can only contain letters, numbers, or underscores';
        break;
      case 'password':
        errors.phone = validator.isStrongPassword(value, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
        ? '' 
        : 'Password must be 8 characters long and contain a lowercase, uppercase, number and special character';
        break;
      case 'phone':
        errors.phone = validator.isEmpty(value, { min: 1 }) ? 'Phone number is required' 
        : validator.isMobilePhone(value, 'any', { strictMode: true })
        ? '' 
        : 'Phone number must be between 7 and 15 digits, including country code';
        break;
      case 'birthday':
        errors.birthday = validator.isDate(formData.birthday, {format: 'DD/MM/YYYY',strictMode: true})
        ? ''
        : 'Birthday must include day, month, and year';
        break;
      case 'gender':
        errors.gender = validator.isLength(formData.gender, { min: 3}) ?  'Gender is required' : '';
        break;
      case 'interests':
        errors.interests = formData.interests.length === 5 ? '' : 'Please select at least 5 interests';
        break;
      case 'hobbies':
        errors.hobbies = formData.hobbies.length === 5 ? '' : 'Please select at least 5 hobbies';
        break;
      case 'photos':
        errors.photos = value.length === 2 ? '' : 'Please select at least 2 photos';
        break;
      default:
          break;
    }

    setFormErrors(errors);
  };

  const validateForm = useCallback(() => {
    const {
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
      birthday,
      gender,
      interests,
      hobbies,
      photos,
    } = formData;

    const isFormValid =
      validator.isLength(firstname, { min: 3 }) &&
      validator.isAlpha(firstname) &&
      validator.isLength(lastname, { min: 3 }) &&
      validator.isAlpha(lastname) &&
      validator.isEmail(email) &&
      validator.isLength(username, { min: 5 }) &&
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }) &&
      validator.isMobilePhone(phone, 'any', { strictMode: true }) &&
      validator.isDate(birthday, { format: 'DD/MM/YYYY', strictMode: true }) &&
      validator.isLength(gender, { min: 3 }) &&
      interests.length === 5 &&
      hobbies.length === 5 &&
      photos.length === 2;

    return isFormValid;
  }, [formData]); 
  
  useEffect(() => {
    const isFormValid = validateForm(); 
    setFormIsValid(isFormValid);
  }, [formData, formErrors, validateForm]); 

  return (
    <>
      <h1 className={classes.h1}>Create account</h1>
      <div className={classes.container}>
        <div className={classes.topHalf}>
          <div className={classes.formContent}>
            <ValidateBox>
              <Fields 
                type="text" 
                label="First name" 
                name="firstname"
                value={formData.firstname}
                onChange={handleChange} 
              />
            </ValidateBox>
            
            <ValidateBox>            
              <Fields 
                type="text" 
                label="Last name" 
                name="lastname" 
                value={formData.lastname}
                onChange={handleChange}
              />
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="text" 
                label="Username" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
              />
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="email" 
                label="Email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
              />
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="phone" 
                label="Phone number" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
              />
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="password" 
                label="Password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

            </ValidateBox>
            
            <ValidateBox>
              <Fields 
                  type="birthday"
                  label={'Date of Birth'}
                  name="birthday"
                  value={formData.birthday}
                  handleBirthdayChange={handleBirthdayChange}
              />

            </ValidateBox>

            <ValidateBox>            
              <Fields 
                type="text" 
                label="Gender" 
                name="gender"
                value={formData.gender}
                onGenderChange={handleGenderChange}
                showGender={formData.showGender}
                onShowGenderChange={handleShowGenderChange}
              />

            </ValidateBox>

            <ValidateBox>
              <Fields 
                  label={'Interests'} 
                  name={"interests"}
                  value={formData.interests}
                  onModalChange={setModalDone}
              />

            </ValidateBox>

            <ValidateBox>
              <Fields 
                label={'Hobbies'}
                name={"hobbies"}
                value={formData.hobbies} 
                onModalChange={setModalDone}
              />

            </ValidateBox>
          </div>

          <div className={classes.imageContent}>
          <ValidateBox>
            <Fields 
              type="file" 
              label="Profile Photos" 
              name="photos"
              value={formData.photos}
            />
 
          </ValidateBox>

          </div>
          
        </div>
        <Button>
          <Link  onClick={handleSubmit} disabled={!formIsValid} style={{backgroundColor: formIsValid ? '#023e8a' : '#e9ebee', color: formIsValid ? '#fff' : '#ccc' }}>
            Next
          </Link>

        </Button>

        <ToastContainer />

        
      </div>
    </>
  );
};

export default LargeScreens;
