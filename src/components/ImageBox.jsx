import React, { useState } from 'react';
import '../styles/ImageBox.css'

const ImageBox = ({ images }) => {

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
    </div>

  );
};

export default ImageBox;
