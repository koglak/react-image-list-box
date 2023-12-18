import React, { useState } from 'react';
import '../styles/ImageBox.css';
import Pagination from './Pagination';

const ImageBox = ({ initialImages, perPage, imageWidth, imageHeight, boxWidth, boxHeight }) => {
  const [images, setImages] = useState(initialImages);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for the current page's images
  const indexOfLastImage = currentPage * perPage;
  const indexOfFirstImage = indexOfLastImage - perPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Handler for deleting an image
  const handleDelete = (indexToDelete) => {
    const actualIndex = indexOfFirstImage + indexToDelete;
    const filteredImages = images.filter((_, index) => index !== actualIndex);
    setImages(filteredImages);
    if (currentPage > 1 && filteredImages.length <= indexOfFirstImage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='image-box'  style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}>
      <div className="image-grid">
        {currentImages.map((image, index) => (
          <div key={index} className="image-item" >
            <button 
              className="image-item-button" 
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
            <img 
              src={image.src} 
              alt={image.filename} 
              style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }} 
            />
            <div>{image.filename}</div>
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
