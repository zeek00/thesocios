import React, { useState } from 'react'
import styled from 'styled-components'
import { formOne } from '../data';
import Birthday from './UI/Birthday';
import Gender from './UI/Gender';
import Orientation from './UI/Orientation';
import Activities from './UI/Activities';
import Photos from './UI/Photos/Photos';
import Input from './UI/Input';
import {hobbies, interests } from '../../../../components/UI/Form/Interests/data';


const ProgressTracker = styled.div`
    background: linear-gradient(to right, rgba(0, 119, 182, 0.9), rgba(2, 62, 138, 0.9));
    height: 15px;
    width:  ${({ width }) => width}%;

`;



const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 120px); /* Adjust the height to fit the screen */
    justify-content: space-between; /* Ensures button is at the bottom */
    padding-bottom: 1rem; /* Add some padding at the bottom */

    .cancel{
      border-style: none;
      width: fit-content;
      background: none;
      font-size: 1.8rem;
      font-weight: 600;
      color: rgb(114, 117, 128);
      outline: none;
    }
    h2{
        font-size: 1.7rem;
    }
    input{
        width: 100%;
        border: 1px solid rgb(114, 117, 128);
        padding: 0.4rem;
    }
    input:focus{
      border: 1.5px solid #023e8a;
    }
    p{
        margin: 0.8rem 0;
        font-size: small;
    }

`;

const ContentWrapper = styled.div`
  flex-grow: 1; /* Allows this section to grow and take available space */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align the content to the top */
  margin-top: 1rem; /* Add some margin from the top */
 
`;

const Button = styled.button`
    align-items: flex-end;
    width: 100%;
    margin: 10px auto;
    padding: 0.5rem 1rem;
    background-color: ${({ isComplete, disabled }) => {
      if (disabled) return 'rgb(114, 117, 128)';
      if (isComplete) return '#023e8a';
      return 'rgb(114, 117, 128)';
    }};
    color: white;
    border: none;
    cursor: pointer;
    &:focus{
        outline: none
`;

const SmallScreens = ({setData}) => {
    const [step, setStep] = useState(0);
    
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

    const formFields = [
        { name: 'firstname', label: formOne.firstname.title, type: 'name', description: formOne.firstname.info },
        { name: 'lastname', label: formOne.lastname.title, type: 'name', description: formOne.lastname.info },
        { name: 'username', label: formOne.username.title, type: 'name', description: formOne.username.info },
        { name: 'email', label: formOne.email.title, type: 'email', description: formOne.email.info },
        { name: 'phone', label: formOne.phone.title, type: 'phone', description: formOne.phone.info },
        { name: 'password', label: formOne.password.title, type: 'password', description: formOne.password.info },
        { name: 'birthday', label: formOne.birthday.title, description: formOne.birthday.info },
        { name: 'gender', label: formOne.gender.title, description: formOne.gender.info },
        // { name: 'orientation', label: formOne.orientation.title, description: formOne.orientation.info },
        { name: 'interests', label: formOne.interests.title, description: formOne.interests.info },
        // { name: 'lookingfor', label: formOne.lookingfor.title, description: formOne.lookingfor.info },
        { name: 'hobbies', label: formOne.hobbies.title, description: formOne.hobbies.info },
        { name: 'photos', label: formOne.photos.title, description: formOne.photos.info },

    ];

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };

    // Handler for birthday fields
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

    const handleActivitiesChange = (index, type) => {
      if (type === 'interests') {
        setFormData((prevFormData) => {
          const isSelected = prevFormData.interests.includes(index);
          let updatedActivities;
    
          if (isSelected) {
            updatedActivities = prevFormData.interests.filter((i) => i !== index);
          } 
          else if (prevFormData.interests.length < 5) {
            updatedActivities = [...prevFormData.interests, index];
          } 
          else {
            updatedActivities = prevFormData.interests;
          }
    
          return { ...prevFormData, interests: updatedActivities };
        });
      }
    
      if (type === 'hobbies') {
        setFormData((prevFormData) => {
          const isSelected = prevFormData.hobbies.includes(index);
          let updatedActivities;
    
          if (isSelected) {
            updatedActivities = prevFormData.hobbies.filter((i) => i !== index);
          } else if (prevFormData.hobbies.length < 5) {
            updatedActivities = [...prevFormData.hobbies, index];
          } else {
            updatedActivities = prevFormData.hobbies;
          }
    
          return { ...prevFormData, hobbies: updatedActivities };
        });
      }
    };
    
    

    const handleNext = () => {
        if (!formData[currentField.name]) {
            alert(`Please fill in the ${currentField.label}.`);
            return;
          }
          
          if (step < formFields.length - 1) {
            setStep(step + 1);
          } else {
            alert('Form Submitted');
          }
    };

    const handlePrevious = () => {
        if (step > 0) {
          setStep(step - 1);
        }
    };

    const currentField = formFields[step];
    const progressPercentage = ((step + 1) / formFields.length) * 100;
    const isCurrentFieldEmpty = !formData[currentField.name]; // Check if the current field is empty

    
  return (
    <>
           
        <ProgressTracker width={progressPercentage}  />
        <Container>
            <button className='cancel' onClick={step > 0 ? handlePrevious : null}>
            {step > 0 ? '<' : 'X'}
            </button>
            <ContentWrapper>
                <div>
                    <h2 htmlFor={currentField.name}>{currentField.label}</h2>
                    {currentField.type && <Input
                    id={currentField.name}
                    name={currentField.name}
                    type={currentField.type}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    required
                    />}
                    {currentField.name === 'birthday' && 
                    <Birthday
                    id={currentField.name}
                    name={currentField.name}
                    value={formData.birthday}  
                    onChange={handleBirthdayChange} 

                    />}

                    {currentField.name === 'gender' && 
                    <Gender
                    selectedGender={formData.gender}
                    onGenderChange={handleGenderChange}
                    showGender={formData.showGender}
                    onShowGenderChange={handleShowGenderChange}

                    />}

                    {currentField.name === 'orientation' && 
                    <Orientation
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}

                    />}

                    {currentField.name === 'interests' && 
                    <Activities
                    type='interests'
                    activitiesData={interests}
                    selectedActivities={formData.interests}
                    onSelectActivity={handleActivitiesChange}
                    />}

                    {/* {currentField.name === 'lookingfor' && 
                    <LookingFor
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    />} */}

                    {currentField.name === 'hobbies' && 
                    <Activities
                    type='hobbies'
                    activitiesData={hobbies}
                    selectedActivities={formData.hobbies}
                    onSelectActivity={handleActivitiesChange}
                    />}

                    {currentField.name === 'photos' && 
                    <Photos 
                    amount={6}
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    />}


                    {currentField.description && <p>{currentField.description}</p>}
                </div>

            </ContentWrapper>
            
           

            <Button onClick={handleNext} isComplete={step === formFields.length - 1}  disabled={isCurrentFieldEmpty} >
                {step < formFields.length - 1 ? 'Next' : 'Submit'}
            </Button>

        </Container>
        

      
    </>
  )
}

export default SmallScreens
