import React, { useState } from 'react';
import classes from './Fields.module.css';
import ImageBox from '../Box/ImageBox';
import Modal from '../Modal/Modal';
import LookingForDetaiils from './LookingForDetails/LookingForDetails';
import SexualOrientation from './SexualOrientation/SexualOrientation';
import Interests from './Interests/Interests';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import styled from 'styled-components';
import Hobbies from './Interests/Hobbies';

const PassStyle = styled.div`
  position: relative;
  border: ${({ click }) => (click ? '1.5px solid #023e8a' : '1px solid rgb(114, 117, 128)')};
  display: flex;
  justify-content: space-between;

  input {
    border: none;
    width: 100%;
  }
  button {
    border-style: none;
    width: fit-content;
    outline: none;
    position: absolute;
    right: 0;
    background-color: none;
    padding-right: 0.4rem;
    &:hover {
      color: #fff;
    }
  }
`;

const Fields = ({ type, label, name, value, onChange, onGenderChange, showGender, onShowGenderChange }) => {
    const [modalDone, setModalDone] = useState(false);
    const genderOptions = ['Man', 'Woman', 'More >'];
  const [isChecked, setIsChecked] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [passClick, setPassClick] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePassClick = () => setPassClick(!passClick);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleCheckboxChange = (event) => {
    onShowGenderChange(event.target.checked);
    // Notify parent component about checkbox changes
  };

  const handleGenderSelect = (index) => {
    onGenderChange(genderOptions[index]); // Update parent component's state
  };


  const [showModal, setShowModal] = useState(false); // State to control Modal visibility

  const openModalHandler = (event) => {
    const value = event.target.value;
    if (['lookingfor', 'interests', 'hobbies'].includes(value)) {
      setClicked(value);
      setShowModal(true);
    } else {
      setClicked(null);
    }
  };

  const closeModalHandler = () => setShowModal(false);

  return (
    <>
        {label === 'First name' && (
            <div className={classes.contain}>
            <label htmlFor={name}>{label}</label>
            <input
                className={classes.input}
                type={type}
                id={name}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                required
            />
            </div>
        )}
        {label === 'Username' && (
            <div className={classes.contain}>
            <label htmlFor={name}>{label}</label>
            <input
                className={classes.input}
                type={type}
                id={name}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                required
            />
            </div>
        )}

        {label === 'Phone number' && (
            <div className={classes.contain}>
            <label htmlFor={name}>{label}</label>
            <input
                className={classes.input}
                type={type}
                id={name}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                required
            />
            </div>
        )}

        {label === 'Email' && (
            <div className={classes.contain}>
            <label htmlFor={name}>{label}</label>
            <input
                className={classes.input}
                type={type}
                id={name}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                required
            />
            </div>
        )}
        
      {label === 'Last name' && (
        <div className={classes.contain}>
          <label htmlFor={name}>{label}</label>
          <input
            className={classes.input}
            type={type}
            id={name}
            name={name}
            placeholder={label}
            value={value}
            onChange={onChange}
            required
          />
        </div>
      )}

      {/* Password Field with Visibility Toggle */}
      {label === 'Password' && (
        <div className={classes.contain}>
          <label htmlFor={name}>{label}</label>
          <PassStyle click={passClick}>
            <input
              className={classes.input}
              type={passwordVisible ? 'text' : 'password'}
              id={name}
              name={name}
              placeholder={label}
              onClick={handlePassClick}
              onChange={onChange}
              value={value}
              required
            />
            <button onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash style={{ color: '#023e8a' }} /> : <FaEye />}
            </button>
          </PassStyle>
        </div>
      )}

      {/* Date of Birth */}
      {
            label === 'Date of Birth' &&
            (
                <div className={classes.structure}>
                    
                    <label htmlFor={type}>{label}</label>
                    <div className={classes.birthdayContainer}>
                        <span className={classes.birthdaySpan}>
                            {/* Day Input  */}
                            <label htmlFor="day"></label>
                            <input 
                                type="number"
                                id={`birthday-day`}
                                name={`${name}-day`}
                                placeholder="DD"
                                min="1"
                                max="31"
                                value={value.day}
                                onChange={(e) => onChange('day', e.target.value)} 
                                className={classes.birthdayInput} 
                            />
                        </span>
                        
                        <span className={classes.birthdaySpan}>
                            
                            {/* Month Input */}
                            <label htmlFor="month"></label>
                            <input 
                                type="number"
                                id={`birthday-month`}
                                name={`${name}-month`}
                                placeholder="MM"
                                min="1"
                                max="12"
                                value={value.month}
                                onChange={(e) => onChange('month', e.target.value)}
                                className={classes.birthdayInput} 
                            />
                        </span>
                        
                        <span className={classes.birthdaySpan}>
                            {/* Year Input  */}
                            <label htmlFor="year"></label>
                            <input  
                                type="number"
                                id={`birthday-year`}
                                name={`${name}-year`}
                                placeholder="YYYY"
                                min="1900"
                                max="2024"
                                value={value.year}
                                onChange={(e) => onChange('year', e.target.value)}
                                className={classes.birthdayInput} 
                            />
                        </span>
                    </div>

                </div>            
            )
        }

      {/* Gender */}
      {label === 'Gender' && (
        <div className={classes.structure}>
          <div className={classes.labelContainer}>
            <label>{label}</label>
            <div className={classes.checkbox}>
                <input 
                    type="checkbox" 
                    checked={showGender}
                    onChange={handleCheckboxChange}
                />
              <p> Show my gender on my profile </p>
            </div>
          </div>
          <div className={classes.genderContainer}>
          {genderOptions.map((gender, index) => (
                <button
                key={gender}
                className={classes.gender}
                onClick={() => handleGenderSelect(index)}
                style={{
                    backgroundColor: value === gender ? '#023e8a' : 'transparent',
                    color: value === gender ? '#fff' : '#000',
                }}
                >
                {gender}
                </button>
            ))}

          </div>
        </div>
      )}

      {/* Interests and Hobbies */}
      {label === 'Interests' && (
        <div className={classes.structure}>
          <label>{label}</label>
          <button value="interests" className={classes.intent} onClick={openModalHandler}>
            + Interests
          </button>
          {modalDone && <p>✅</p>}
        </div>
      )}
      {label === 'Hobbies' && (
        <div className={classes.structure}>
          <label>{label}</label>
          <button value="hobbies" className={classes.intent} onClick={openModalHandler}>
            + Hobbies
          </button>
          {modalDone && <p>✅</p>}

        </div>
      )}

      {label === 'Profile Photos' && (
        <div className={classes.structure}>
          <label>{label}</label>
          <ImageBox amount={6} />
          <p className={classes.imageP}>
            Upload 2 photos to start. Add 4 more to make <br />
            your profile stand out{' '}
          </p>
        </div>
      )}

      <Modal show={showModal} modalClosed={closeModalHandler}>
        {clicked === 'lookingfor' && <LookingForDetaiils modalClosed={closeModalHandler} />}
        {clicked === 'interests' && <Interests selectedValues={value} setComplete={setModalDone} modalClosed={closeModalHandler} />}
        {clicked === 'hobbies' && <Hobbies selectedValues={value} setComplete={setModalDone} modalClosed={closeModalHandler} />}
      </Modal>
    </>
  );
};

export default Fields;
