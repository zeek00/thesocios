import React, { useEffect, useRef, useState } from 'react';
import classes from './ImageBox.module.css'; // Import the CSS for grid styles

const ImageBox = ({ amount, selected }) => {
    // State to store uploaded images
    const [images, setImages] = useState(Array(amount).fill(null));

    // Store refs to file inputs for each box
    const fileInputRefs = useRef([]);

    // Handle image upload and update the state
    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            
            // Create a URL for the image or base64 string
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages[index] = reader.result; // Store base64 data or URL
                setImages(newImages);

                // Add the image string to selected array
                selected.push(reader.result); // Update selected array with the clicked image as string
            };
            reader.readAsDataURL(file); // Read file as base64
        }
    };

    // Function to trigger the hidden file input when clicking the "+" symbol
    const handleClick = (index) => {
        fileInputRefs.current[index].click(); // Trigger the file input dialog
    };

    // Create an array with 'amount' number of boxes
    const boxes = Array.from({ length: amount }, (_, index) => (
        <div className={classes.box} key={index}>
            {images[index] ? (
                <img src={images[index]} alt={`Uploaded ${index + 1}`} className={classes.uploadedImage} />
            ) : (
                <span className={classes.uploadLabel} onClick={() => handleClick(index)}>
                    <p>+</p>
                </span>
            )}
            <input
                type="file"
                ref={(el) => (fileInputRefs.current[index] = el)} // Store ref for each file input
                style={{ display: 'none' }} // Hidden file input
                onChange={(e) => handleImageChange(e, index)} // Handle file selection
            />
        </div>
    ));

    return <div className={classes.imageBoxContainer}>{boxes}</div>;
};

export default ImageBox;
