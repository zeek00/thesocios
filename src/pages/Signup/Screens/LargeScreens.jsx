import React, { useState } from 'react';
import classes from '../SignUp.module.css';
// import Fields from '../../../../components/UI/Form/Fields';
import styled from 'styled-components';
import config from '../../../config/Config';
import Fields from '../../../components/UI/Form/Fields';

const ValidateBox = styled.div`
  .help{
    font-size: 0.6rem;
    color: red;
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

    const [formErrors, setFormErrors] = useState({});

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value // Update other fields directly
        }));
        validateField(name, value);
    }

    const validateField = (name, value) => {
        let errors = { ...formErrors };

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
            default:
                break;
        }

        // Update formErrors state
        setFormErrors(errors);
    };


    const handleBirthdayChange = (field, value) => {
        setFormData({
        ...formData,
        birthday: {
            ...formData.birthday,
            [field]: value,
        },
        });
    };
    // Handler for gender fields
    const handleGenderChange = (gender) => {
        setFormData({ ...formData, gender });
    };

    const handleShowGenderChange = (showGender) => {
        setFormData({ ...formData, showGender });
    };

    // Optional: Submit data to parent
    const handleSubmit = async () => {
        setData(formData); // Pass data to the parent component (if needed)
    };


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
            </ValidateBox>
            {/* For Birthday, you could break it down into separate fields */}
            <ValidateBox>
            <Fields 
                type="birthday"
                label={'Date of Birth'}
                name="birthday"
                value={formData.birthday}
                onChange={handleBirthdayChange}
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
            {/* Add functionality for Interests and Hobbies */}

            <Fields 
                label={'Interests'} 
                value={formData.interests}
            />

            <Fields 
                label={'Hobbies'}
                value={formData.hobbies} 
            />
          </div>

          <div className={classes.imageContent}>
            <Fields 
              type="file" 
              label="Profile Photos" 
              name="photos"
              onChange={(e) => setFormData({ ...formData, photos: e.target.files[0] })}
            />
          </div>
        
        <div  className={classes.submitButton}> 
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
            
          
          
        </div>
      </div>
    </>
  );
};

export default LargeScreens;
