import React from 'react';
import '../styles/ImageGrid.css'

import ImageContext from '../context/ImageContext';

import { IoMdPricetags } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

const ImageGrid = () => {

    const { images, setImages, filteredImages, setFilteredImages, perPage, currentPage, imageWidth, imageHeight, enableCheckBox,
        enableDelete, setCurrentPage, selectedImages, setSelectedImages, imageTypes, setShowOnClickPage, setSelectedImgObj } = React.useContext(ImageContext);

    const indexOfLastImage = currentPage * perPage;
    const indexOfFirstImage = indexOfLastImage - perPage;
    const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

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
        const updatedImages = images.filter(image => image.filename !== imageNameToDelete)
        const updatedImages_filtered = filteredImages.filter(image => image.filename !== imageNameToDelete)
        setImages(updatedImages);
        setFilteredImages(updatedImages_filtered)

        setSelectedImages(prevSelectedImages =>
            prevSelectedImages.filter(name => name !== imageNameToDelete)
        );

        const totalNumberOfPages = Math.ceil(updatedImages.length / perPage);
        if (currentPage > totalNumberOfPages) {
            setCurrentPage(totalNumberOfPages);
        }
    };


    return (
        <div className="image-grid">

            {currentImages.length > 0  ? currentImages.slice(0, perPage).map((image, index) => (
                <div key={index} 
                className="image-item" 
                onClick={(event) => {
                    if (event.target.type === 'checkbox') {
                        return;
                    }
            
                    setSelectedImgObj(image);
                    setShowOnClickPage(true);
                }}>
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
                            onClick={(event) => {
                                event.stopPropagation(); // Prevents the event from bubbling up
                                handleDelete(image.filename);
                            }}                            
                            title="Delete Image"
                        >
                            <RiDeleteBin5Line size={20} />
                        </button>
                    )}

                    {enableCheckBox && image.categories.length > 0 && (
                        <div className="category-badge-container-left">
                            <div className="category-badge">
                                <IoMdPricetags className='category-icon' />
                                <span className="badge-text">Tag Assigned</span>
                            </div>
                        </div>
                    )}

                    {enableCheckBox && image.type !== "" && (
                        <div className="category-badge-container-right">
                            <div className="category-badge">
                                {imageTypes.find(item => item.name === image.type).icon}
                                <span className="badge-text">{image.type}</span>
                            </div>
                        </div>
                    )}


                    <img
                        src={image.src}
                        alt={image.filename}
                        style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
                    />
                    <div className='image-label'>{image.filename}</div>
                </div>
            )): <h5><em>The search returned 0 results...</em></h5>}
        </div>
    );
};

export default ImageGrid;
