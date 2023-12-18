import React, { useState } from 'react';

import Pagination from './Pagination';
import Settings from './Settings'
import ImageGrid from './ImageGrid';

const ImageBox = ({ images, setImages, perPage, imageWidth, imageHeight, boxWidth, boxHeight, enableCheckBox, enableDelete, rootStyle   }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <div className='image-box' style={{ width: `${boxWidth}px`, height: `${boxHeight}px`, ...rootStyle }}>
      <Settings numSelectedImages={selectedImages.length} />

      <ImageGrid
        images={images}
        setImages={setImages}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        enableCheckBox={enableCheckBox}
        enableDelete={enableDelete}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />

      <Pagination
        numOfPage={Math.ceil(images.length / perPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ImageBox;
