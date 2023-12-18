import React, { useState } from 'react';
import '../styles/ImageBox.css';
import Pagination from './Pagination';

const ImageBox = ({ initialImages, perPage }) => {
  const [images, setImages] = useState(initialImages); // State to hold images
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastImage = currentPage * perPage;
  const indexOfFirstImage = indexOfLastImage - perPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handleDelete = (indexToDelete) => {
    const actualIndex = indexOfFirstImage + indexToDelete;
    const filteredImages = images.filter((_, index) => index !== actualIndex);
    setImages(filteredImages);

    if (currentPage > 1 && filteredImages.length <= indexOfFirstImage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='image-box'>
      <div className="image-grid">
        {currentImages.map((image, index) => (
          <div key={index} className="image-item">
            <button 
              className="image-item-button" 
              onClick={() => handleDelete(index)} // Use the index within the currentImages array
            >
              Delete
            </button>
            <img src={image.src} alt={image.filename} style={{ width: '200px', height: '200px' }} />
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
