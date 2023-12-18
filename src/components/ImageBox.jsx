import React, { useState } from 'react';
import '../styles/ImageBox.css';

import { RiDeleteBin5Line } from "react-icons/ri";

import Pagination from './Pagination';
import Settings from './Settings'

const ImageBox = ({ images, setImages, perPage, imageWidth, imageHeight, boxWidth, boxHeight, enableCheckBox, enableDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for the current page's images
  const indexOfLastImage = currentPage * perPage;
  const indexOfFirstImage = indexOfLastImage - perPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const [selectedImages, setSelectedImages] = useState([]);

  const toggleSelectImage = (imageName) => {
    setSelectedImages(prevSelectedImages => {
      if (prevSelectedImages.includes(imageName)) {
        return prevSelectedImages.filter(name => name !== imageName);
      } else {
        return [...prevSelectedImages, imageName];
      }
    });
  };

  const handleDelete = (indexToDelete) => {
    const actualIndex = indexOfFirstImage + indexToDelete;
    const filteredImages = images.filter((_, index) => index !== actualIndex);
    const imageNameToDelete = images[actualIndex].filename; // Get the name of the image to delete
  
    setImages(filteredImages);
  
    setSelectedImages(prevSelectedImages => 
      prevSelectedImages.filter(name => name !== imageNameToDelete)
    );
  
    if (currentPage > 1 && filteredImages.length <= indexOfFirstImage) {
      setCurrentPage(currentPage - 1);
    }
  };
  

  return (
    <div className='image-box' style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}>
      <Settings numSelectedImages={selectedImages.length} />

      <div className="image-grid">
        {currentImages.map((image, index) => (
          <div key={index} className="image-item" >
            {
              enableCheckBox && <input
                type="checkbox"
                className="image-checkbox"
                checked={selectedImages.includes(image.filename)}
                onChange={() => toggleSelectImage(image.filename)}
                id={`checkbox-${index}`}
              />
            }

            {enableDelete && <button
              className="image-item-button"
              onClick={() => handleDelete(index)}
              title="Delete Image"
            >
              <RiDeleteBin5Line size={20} />
            </button>}

            <img
              src={image.src}
              alt={image.filename}
              style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
            />
            <div className='image-label'>{image.filename}</div>
          </div>
        ))}
      </div>

      <Pagination
        numOfPage={Math.ceil(images.length / perPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ImageBox;
