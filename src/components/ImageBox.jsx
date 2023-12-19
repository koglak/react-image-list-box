import React, { useState } from 'react';

import Pagination from './Pagination';
import Settings from './Settings'
import ImageGrid from './ImageGrid';

import ImageContext from '../context/ImageContext';

const ImageBox = ({ images, setImages, perPage, imageWidth, imageHeight, boxWidth, boxHeight, enableCheckBox, enableDelete, rootStyle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState(images)

  const contextValue = {
    images,
    setImages,
    perPage,
    currentPage,
    setCurrentPage,
    imageWidth,
    imageHeight,
    enableCheckBox,
    enableDelete,
    selectedImages,
    setSelectedImages,
    filteredImages,
    setFilteredImages
  };



  return (
    <ImageContext.Provider value={contextValue}>
      <div className='image-box' style={{ width: `${boxWidth}px`, height: `${boxHeight}px`, ...rootStyle }}>
        <Settings />

        <ImageGrid/>

        <Pagination/>
      </div>
    </ImageContext.Provider>

  );
};

export default ImageBox;
