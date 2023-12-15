import React, { useState } from 'react';
import '../styles/ImageBox.css';
import Pagination from './Pagination';

const ImageBox = ({ images, perPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last image on the current page
  const indexOfLastImage = currentPage * perPage;
  const indexOfFirstImage = indexOfLastImage - perPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div className='image-box'>
      <div className="image-grid">
        {currentImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.src} alt={image.filename} style={{ width: '100px', height: '100px' }} />
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
