import React, { useState } from 'react';
import '../styles/ImageBox.css'
import Pagination from './Pagination';

const ImageBox = ({ images }) => {

  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <div className='image-box'>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.src} alt={image.filename} style={{ width: '100px', height: '100px' }} />
            <div>{image.filename}</div>
          </div>
        ))}
      </div>

      <Pagination numOfPage={5} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default ImageBox;
