import React, { useState } from 'react';

import Pagination from './Pagination';
import Settings from './Settings'
import ImageGrid from './ImageGrid';

import ImageContext from '../context/ImageContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const ImageBox = ({ images, setImages, filteredImages, setFilteredImages, imageTypes, onSearch, perPage, imageWidth, imageHeight,
  boxWidth, boxHeight, enableCheckBox, enableDelete, enableTagAssignment, onClickPage, selectedImgObj, setSelectedImgObj, rootStyle, buttonStyle, 
  badgeStyle, checkboxStyle, inputStyle, dropdownStyle }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showOnClickPage, setShowOnClickPage] = React.useState(false)

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
    enableTagAssignment,
    selectedImages,
    setSelectedImages,
    filteredImages,
    setFilteredImages,
    onSearch,
    onClickPage,
    imageTypes,
    setShowOnClickPage,
    selectedImgObj,
    setSelectedImgObj,
    buttonStyle,
    badgeStyle,
    checkboxStyle,
    inputStyle,
    dropdownStyle
  };


  return (
    <ImageContext.Provider value={contextValue}>
      <div className='image-box' style={{ width: `${boxWidth}px`, height: `${boxHeight}px`, ...rootStyle }}>

        <Settings />

        <ImageGrid />

        <Pagination />
        
        {showOnClickPage && onClickPage && onClickPage(showOnClickPage, setShowOnClickPage, selectedImgObj)}

      </div>
    </ImageContext.Provider>

  );
};

export default ImageBox;
