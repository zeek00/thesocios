import React, { useState } from 'react';
import classes from '../SignUp.module.css';
import Fields from '../../../components/UI/Form/Fields';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
        birthday: { day: '', month: '', year: '' },
        gender: '',
        showGender: false,
        interests: [],
        hobbies: [],
        photos: []
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const [formErrors, setFormErrors] = useState({});

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        validateFields(name, value);
    }

    const validateFields = (name, value) => {
        let errors = { ...formErrors };
        let isValid = true;

        // Simple regex patterns for validation
        const namePattern = /^[A-Za-z]{3,}$/; // Only allows letters
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        const usernamePattern = /^[a-zA-Z0-9_]{3,}$/; // Alphanumeric with underscores, at least 3 characters
        const passwordPattern = /^.{6,}$/; // At least 6 characters
        const phonePattern = /^\d{7,15}$/; // Allows between 7 and 15 digits
        // Validation rules for each field

        switch (name) {
            case 'firstname':
                errors.firstname = namePattern.test(value) ? '' : 'First name must be at least 3 characters and contain only letters';
                break;
            case 'lastname':
                errors.lastname = namePattern.test(value) ? '' : 'Last name must be at least 3 characters and contain only letters';
                break;
            case 'email':
                errors.email = emailPattern.test(value) ? '' : `Invalid email format example 'something@gmail.com'`;
                break;
            case 'username':
                errors.username = usernamePattern.test(value) ? '' : 'Username must be at least 3 characters long and can only contain letters, numbers, or underscores';
                break;
            case 'password':
                errors.password = passwordPattern.test(value) ? '' : 'Password must be at least 6 characters long';
                break;
            case 'phone':
              errors.phone = phonePattern.test(value) ? '' : 'Phone allows between 7 and 15 digits including country code';
              break;
            case 'birthday':
              const { day, month, year } = formData.birthday;

              if (!day || !month || !year) {
                  errors.birthday = 'Birthday must include day, month, and year';
              } else {
                  errors.birthday = '✅';
              }
              break;
            case 'gender':
              if (formData.gender.length === "") {
                errors.gender = 'Gender is required';
            } else {
                errors.gender = '✅';
            }
              break;
            case 'interests':
              errors.interests = Array.isArray(value) && value.length >= 5 ? '✅' : 'Please select at least 5 interests';
              break;
            case 'hobbies':
              errors.hobbies = Array.isArray(value) && value.length >= 5 ? '✅' : 'Please select at least 5 hobbies';
              break;
            case 'photos':
              errors.hobbies = Array.isArray(value) && value.length >= 2 ? '✅' : 'Please select at least 2 photos';
              break;
            default:
                break;
        }
      // Update formErrors state
      setFormErrors(errors);
      validateForm();

      // Update formIsValid based on whether all fields are valid
    };
    
    const validateForm = () => {
      const { firstname, lastname, username, email, phone, password, birthday, gender, interests, hobbies, photos } = formData;
      const { day, month, year } = birthday;

      const isFormValid = 
          firstname && /^[A-Za-z]{3,}$/.test(firstname) &&
          lastname && /^[A-Za-z]{3,}$/.test(lastname) &&
          email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
          username && /^[a-zA-Z0-9_]{3,}$/.test(username) &&
          password && password.length >= 6 &&
          phone && /^\d{7,15}$/.test(phone) &&
          day && month && year &&
          gender &&
          Array.isArray(interests) && interests.length >= 5 &&
          Array.isArray(hobbies) && hobbies.length >= 5 &&
          Array.isArray(photos) && photos.length >= 2;

      setFormIsValid(isFormValid);
  };


    const handleBirthdayChange = (field, value) => {
        setFormData({
        ...formData,
        birthday: {
            ...formData.birthday,
            [field]: value,
        },
        });
        validateFields("birthday", formData.birthday);

    };
    // Handler for gender fields
    const handleGenderChange = (gender) => {
        setFormData({ ...formData, gender });
        validateFields("gender", formData.gender);

    };

    const handleShowGenderChange = (showGender) => {
        setFormData({ ...formData, showGender });
    };

    // Optional: Submit data to parent
    const handleSubmit = () => {
        setData(formData); // Pass data to the parent component (if needed)
    };

    console.log(formData);

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
              {formErrors.firstname && <p className="help">{formErrors.firstname}</p>}
            </ValidateBox>
            
            <ValidateBox>            
              <Fields 
                type="text" 
                label="Last name" 
                name="lastname" 
                value={formData.lastname}
                onChange={handleChange}
              />
                {formErrors.lastname && <p className="help">{formErrors.lastname}</p>}
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="text" 
                label="Username" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
              />
                {formErrors.username && <p className="help">{formErrors.username}</p>}
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="email" 
                label="Email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
              />
                {formErrors.email && <p className="help">{formErrors.email}</p>}
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="phone" 
                label="Phone number" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
              />
                {formErrors.phone && <p className="help">{formErrors.phone}</p>}
            </ValidateBox>

            <ValidateBox>
              <Fields 
                type="password" 
                label="Password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && <p className="help">{formErrors.password}</p>}

            </ValidateBox>
            
            <ValidateBox>
              <Fields 
                  type="birthday"
                  label={'Date of Birth'}
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleBirthdayChange}
              />
              {formErrors.birthday && <p className="help">{formErrors.birthday}</p>}

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
              {formErrors.gender && <p className="help">{formErrors.gender}</p>}

            </ValidateBox>

            <ValidateBox>
              <Fields 
                  label={'Interests'} 
                  name={"interests"}
                  value={formData.interests}
              />
              {formErrors.interests && <p className="help">{formErrors.interests}</p>}

            </ValidateBox>

            <ValidateBox>
              <Fields 
                label={'Hobbies'}
                name={"hobbies"}
                value={formData.hobbies} 
              />
              {formErrors.hobbies && <p className="help">{formErrors.hobbies}</p>}

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
            {formErrors.photos && <p className="help">{formErrors.photos}</p>}

          </ValidateBox>

          </div>
          
        </div>
        <Button>
          <Link onClick={handleSubmit} disabled={!formIsValid} style={{backgroundColor: formIsValid ? '#023e8a' : '#e9ebee', color: formIsValid? '#fff' : '#ccc' }}>
            Next
          </Link>

        </Button>
        
      </div>
    </>
  );
};

export default LargeScreens;
