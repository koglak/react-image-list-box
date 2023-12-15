import React, { useState } from 'react';

const ImageBox = ({ images }) => {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 8; // Set the number of images per page.



  // Calculate the number of pages needed.
  const pageCount = Math.ceil(images.length / imagesPerPage);

  // Get the images for the current page.
  const currentImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );



  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>

      <div className="image-grid">
        {currentImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.src} alt={image.filename} />
            <div>{image.filename}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
          <button key={number} onClick={() => goToPage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageBox;
