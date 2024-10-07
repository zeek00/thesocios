import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fieldData } from '../data';
import Birthday from './UI/Birthday';
import Gender from './UI/Gender';
import Orientation from './UI/Orientation';
import Activities from './UI/Activities';
import Photos from './UI/Photos/Photos';
import Input from './UI/Input';
import {hobbies, interests } from '../../../components/UI/Form/Interests/data';
import {toast, ToastContainer} from "react-toastify";
import validator from "validator";


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
      font-size: 1.6rem;
      font-weight: 400;
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
    background-color: ${({ iscomplete, disabled }) => {
      if (disabled) return 'rgb(114, 117, 128)';
      if (iscomplete) return '#023e8a';
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
        birthday: '',
        gender: '',
        showGender: false,
        interests: [],
        hobbies: [],
        photos: []

    });
    const formFields = [

        { name: 'firstname', label: fieldData.firstname.title, type: 'name', description: fieldData.firstname.info },
        { name: 'lastname', label: fieldData.lastname.title, type: 'name', description: fieldData.lastname.info },
        { name: 'username', label: fieldData.username.title, type: 'name', description: fieldData.username.info },
        { name: 'email', label: fieldData.email.title, type: 'email', description: fieldData.email.info },
        { name: 'phone', label: fieldData.phone.title, type: 'phone', description: fieldData.phone.info },
        { name: 'password', label: fieldData.password.title, type: 'password', description: fieldData.password.info },
        { name: 'birthday', label: fieldData.birthday.title, description: fieldData.birthday.info },
        { name: 'gender', label: fieldData.gender.title, description: fieldData.gender.info },
        { name: 'interests', label: fieldData.interests.title, description: fieldData.interests.info },
        { name: 'hobbies', label: fieldData.hobbies.title, description: fieldData.hobbies.info },
        { name: 'photos', label: fieldData.photos.title, description: fieldData.photos.info }
    ];
    const [formIsValid, setFormIsValid] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [birthday, setBirthday] = useState({birthday:''});
    const [currentFieldName, setCurrentFieldName] = useState(null);
    const showToastError = (message) => {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    };
    const validateFields = (name, value) => {
        let errors = { ...formErrors };

        switch (name) {
            case 'firstname':
                if (validator.isEmpty(value, { min: 1 })) {
                    errors.firstname = 'First name is required';
                } else if (!validator.isLength(value, { min: 3 }) || !validator.isAlpha(value)) {
                    errors.firstname = 'First name must be at least 3 characters and contain only letters';
                } else {
                    errors.firstname = '';
                }
                break;

            case 'lastname':
                if (validator.isEmpty(value, { min: 1 })) {
                    errors.lastname = 'Last name is required';
                } else if (!validator.isLength(value, { min: 3 }) || !validator.isAlpha(value)) {
                    errors.lastname = 'Last name must be at least 3 characters and contain only letters';
                } else {
                    errors.lastname = '';
                }
                break;

            case 'email':
                if (validator.isEmpty(value, { min: 1 })) {
                    errors.email = 'Email is required';
                } else if (!validator.isEmail(value)) {
                    errors.email = `Invalid email format (example: 'something@gmail.com')`;
                } else {
                    errors.email = '';
                }
                break;

            case 'username':
                if (validator.isEmpty(value, { min: 1 })) {
                    errors.username = 'User name is required';
                } else if (!validator.isLength(value, { min: 5 })) {
                    errors.username = 'Username must be at least 5 characters long and can only contain letters, numbers, or underscores';
                } else {
                    errors.username = '';
                }
                break;

            case 'password':
                if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                    errors.password = 'Password must be 8 characters long and contain a lowercase, uppercase, number and special character';
                } else {
                    errors.password = '';
                }
                break;

            case 'phone':
                if (validator.isEmpty(value, { min: 1 })) {
                    errors.phone = 'Phone number is required';
                } else if (!validator.isMobilePhone(value, 'any', { strictMode: true })) {
                    errors.phone = 'Phone number must be between 7 and 15 digits, including country code';
                } else {
                    errors.phone = '';
                }
                break;

            case 'birthday':
                const [day, month, year] = formData.birthday.split('/');
                if (!day || !month || !year || !validator.isDate(formData.birthday, { format: 'DD/MM/YYYY', strictMode: true })) {
                    errors.birthday = 'Please enter a complete and valid birthday (DD/MM/YYYY)';
                } else {
                    errors.birthday = '';
                }
                break;

            case 'gender':
                if (!validator.isLength(formData.gender, { min: 3 })) {
                    errors.gender = 'Gender is required';
                } else {
                    errors.gender = '';
                }
                break;

            case 'interests':
                if (formData.interests.length < 5) {
                    errors.interests = 'Please select at least 5 interests';
                } else {
                    errors.interests = '';
                }
                break;

            case 'hobbies':
                if (formData.hobbies.length < 5) {
                    errors.hobbies = 'Please select at least 5 hobbies';
                } else {
                    errors.hobbies = '';
                }
                break;

            case 'photos':
                if (value.length < 2) {
                    errors.photos = 'Please select at least 2 photos';
                } else {
                    errors.photos = '';
                }
                break;

            default:
                break;
        }

        setFormErrors(errors);
        setCurrentFieldName(name);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler for birthday fields
    const handleBirthdayChange = (field, value) => {
        const updatedBirthday = {
            ...birthday.birthday,
            [field]: value,
        };

        setBirthday({ birthday: updatedBirthday });

        const { day, month, year } = updatedBirthday;

        // Only format the birthday when all parts are filled (day, month, year)
        if (day && month && year) {
            formData.birthday = `${day}/${month}/${year}`;

        }
    };

    // Handler for gender fields
    const handleGenderChange = (gender) => {
        setFormData({ ...formData, gender });
    };

    const handleShowGenderChange = (showGender) => {
        setFormData({ ...formData, showGender });
    };

    const handleActivitiesChange = (item, type) => {
      if (type === 'interests') {
        setFormData((prevFormData) => {
          const isSelected = prevFormData.interests.includes(item.data);
          let updatedActivities;
    
          if (isSelected) {
            updatedActivities = prevFormData.interests.filter((i) => i !== item.data);
          } 
          else if (prevFormData.interests.length < 5) {
            updatedActivities = [...prevFormData.interests, item.data];
          } 
          else {
            updatedActivities = prevFormData.interests;
          }
    
          return { ...prevFormData, interests: updatedActivities };
        });
      }
    
      if (type === 'hobbies') {
        setFormData((prevFormData) => {
          const isSelected = prevFormData.hobbies.includes(item.data);
          let updatedActivities;
    
          if (isSelected) {
            updatedActivities = prevFormData.hobbies.filter((i) => i !== item.data);
          } else if (prevFormData.hobbies.length < 5) {
            updatedActivities = [...prevFormData.hobbies, item.data];
          } else {
            updatedActivities = prevFormData.hobbies;
          }
    
          return { ...prevFormData, hobbies: updatedActivities };
        });
      }
    };



    const handleNext = () => {
        const currentField = formFields[step].name;
        const currentFieldValue = formData[currentField];
        validateFields(currentField, currentFieldValue);
    };

    useEffect(() => {
        if (currentFieldName) {
            const currentError = formErrors[currentFieldName];
            if(currentError !== ''){
                toast.error(currentError)

            }
            if (!currentError) {
                if (step < formFields.length - 1) {
                    setStep(step + 1);
                } else {
                    setData(formData)
                }
            } else {
                toast.error(`Please fix the errors before proceeding.`, { position: 'top-right' });
            }
        }
    }, [formErrors, currentFieldName]); // Re-run whenever formErrors or currentFieldName changes


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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleNext();
                        }
                    }}
                    required
                    />}

                    {currentField.name === 'birthday' && 
                    <Birthday
                    id={currentField.name}
                    name={currentField.name}
                    value={formData.birthday}  
                    handleBirthdayChange={handleBirthdayChange}
                    onBlur={() => validateFields('birthday', formData.birthday)}
                    required
                    />}

                    {currentField.name === 'gender' && 
                    <Gender
                    selectedGender={formData.gender}
                    onGenderChange={handleGenderChange}
                    showGender={formData.showGender}
                    onShowGenderChange={handleShowGenderChange}
                    required
                    />}

                    {currentField.name === 'interests' && 
                    <Activities
                    type='interests'
                    activitiesData={interests}
                    selectedActivities={formData.interests}
                    onSelectActivity={handleActivitiesChange}
                    />}



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
                    selected={formData[currentField.name]}
                    onChange={handleChange}
                    />}


                    {currentField.description && <p>{currentField.description}</p>}
                </div>

            </ContentWrapper>
            
           

            <Button
              onClick={handleNext}
              iscomplete={step === formFields.length - 1 ? 'true' : undefined} // Omit when false
            >
              {step < formFields.length - 1 ? 'Next' : 'Submit'}
            </Button>
        </Container>
        <ToastContainer toastStyle={{
            backgroundColor: '#dc3545',
            color: '#fff'
        }}/>
        

      
    </>
  )
}

export default SmallScreens
