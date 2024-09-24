import React, { useState } from 'react';
import classes from '../SignUp.module.css';
import Fields from '../../../../components/UI/Form/Fields';

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
        photos: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value // Update other fields directly
        }));
    }

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
            <Fields 
              type="text" 
              label="First name" 
              name="firstname"
              value={formData.firstname}
              onChange={handleChange} 
            />
            <Fields 
              type="text" 
              label="Last name" 
              name="lastname" 
              value={formData.lastname}
              onChange={handleChange}
            />
            <Fields 
              type="text" 
              label="Username" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
            />
            <Fields 
              type="email" 
              label="Email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
            />
            <Fields 
              type="phone" 
              label="Phone number" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
            />
            <Fields 
              type="password" 
              label="Password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* For Birthday, you could break it down into separate fields */}
            <Fields 
                type="birthday"
                label={'Date of Birth'}
                name="birthday"
                value={formData.birthday}
                onChange={handleBirthdayChange}
             />

            <Fields 
              type="text" 
              label="Gender" 
              name="gender"
              value={formData.gender}
              onGenderChange={handleGenderChange}
              showGender={formData.showGender}
              onShowGenderChange={handleShowGenderChange}
            />
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
        </div>
      </div>
    </>
  );
};

export default LargeScreens;
