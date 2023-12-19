import React, { useState } from 'react';

import Pagination from './Pagination';
import Settings from './Settings'
import ImageGrid from './ImageGrid';

import ImageContext from '../context/ImageContext';

const ImageBox = ({ images, setImages, filteredImages, setFilteredImages, imageTypes, onSearch, perPage, imageWidth, imageHeight, boxWidth, boxHeight, enableCheckBox, enableDelete, rootStyle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);

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
    setFilteredImages,
    onSearch,
    imageTypes
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
