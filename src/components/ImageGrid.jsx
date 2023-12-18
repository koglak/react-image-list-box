import React from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import '../styles/ImageGrid.css'

const ImageGrid = ({ images, setImages, perPage, currentPage, setCurrentPage, imageWidth, imageHeight, enableCheckBox, enableDelete, selectedImages, setSelectedImages }) => {

    const indexOfLastImage = currentPage * perPage;
    const indexOfFirstImage = indexOfLastImage - perPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    const toggleSelectImage = (imageName) => {
        setSelectedImages(prevSelectedImages => {
            if (prevSelectedImages.includes(imageName)) {
                return prevSelectedImages.filter(name => name !== imageName);
            } else {
                return [...prevSelectedImages, imageName];
            }
        });
    };

    const handleDelete = (imageNameToDelete) => {
        const filteredImages = images.filter(image => image.filename !== imageNameToDelete);
        setImages(filteredImages);
        setSelectedImages(prevSelectedImages =>
            prevSelectedImages.filter(name => name !== imageNameToDelete)
        );

        const totalNumberOfPages = Math.ceil(filteredImages.length / perPage);
        if (currentPage > totalNumberOfPages) {
            setCurrentPage(totalNumberOfPages);
        }
    };

    return (
        <div className="image-grid">
            {currentImages.slice(0, perPage).map((image, index) => (
                <div key={index} className="image-item">
                    {enableCheckBox && (
                        <input
                            type="checkbox"
                            className="image-checkbox"
                            checked={selectedImages.includes(image.filename)}
                            onChange={() => toggleSelectImage(image.filename)}
                            id={`checkbox-${index}`}
                        />
                    )}

                    {enableDelete && (
                        <button
                            className="image-item-button"
                            onClick={() => handleDelete(image.filename)}
                            title="Delete Image"
                        >
                            <RiDeleteBin5Line size={20} />
                        </button>
                    )}

                    <img
                        src={image.src}
                        alt={image.filename}
                        style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
                    />
                    <div className='image-label'>{image.filename}</div>
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;
