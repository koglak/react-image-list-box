import React from 'react';
import Modal from 'react-bootstrap/Modal';
import randomColor from 'randomcolor'; // Import randomcolor
import '../styles/ClassificationPopUp.css';
import ImageContext from '../context/ImageContext';
import { FaRegCircleQuestion } from "react-icons/fa6";

function ClassificationPopUp({ isClassVisible, setIsClassVisible, tagList }) {
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [tagInput, setTagInput] = React.useState('');

    const { selectedImages, setImages, images, filteredImages, setFilteredImages } = React.useContext(ImageContext);

    const addTag = () => {
        if (!tagInput) return;

        const tagInputLower = tagInput.toLowerCase();
        if (selectedTags.some(tag => tag.value.toLowerCase() === tagInputLower)) {
            return; // Tag already exists, no need to add
        }

        const newTag = {
            value: tagInput,
            color: randomColor()
        };

        setSelectedTags([...selectedTags, newTag]);

        const updateImageCategories = (image) => {
            if (selectedImages.includes(image.filename) && !image.categories.includes(newTag.value)) {
                return { ...image, categories: [...image.categories, newTag.value] };
            }
            return image;
        };

        setImages(images.map(updateImageCategories));
        setFilteredImages(filteredImages.map(updateImageCategories));

        setTagInput('');
    };


    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const handleInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const removeTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter(tag => tag.value !== tagToRemove));

        const updateImageCategories = (image) => {
            if (selectedImages.includes(image.filename)) {
                const updatedCategories = image.categories.filter(category => category !== tagToRemove);
                return { ...image, categories: updatedCategories };
            }
            return image;
        };

        setImages(images.map(updateImageCategories));
        setFilteredImages(filteredImages.map(updateImageCategories));
    }

    const tagExists = tagInput && selectedTags.some(tag => tag.value.toLowerCase() === tagInput.toLowerCase());

    const inputGroupStyle = {
        borderColor: tagExists ? 'red' : 'black'
    };

    return (
        <Modal
            show={isClassVisible}
            onHide={() => {
                setIsClassVisible(false)
                setSelectedTags([])
            }}
            size="lg"
            aria-labelledby="classification-pop-up">
            <Modal.Header closeButton>
                <Modal.Title id="classification-pop-up-title">
                    Assign Tags To Images
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <b>Selected Tags:</b>
                    <div className="tags-container">
                        {selectedTags.length === 0 ?
                            <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
                                <p>No Tags Applied</p>
                                <p><em>Type and select tags below to add them to the image.</em></p>
                            </div> : <div className='d-flex flex-wrap'>
                                {selectedTags.map((tag, index) => (
                                    <div key={index} className="tag-badge d-flex align-items-center">
                                        <span className="color-circle" style={{ backgroundColor: tag.color }}></span>
                                        {tag.value}
                                        <button className="tag-delete-btn" onClick={() => removeTag(tag.value)}>x</button>
                                    </div>
                                ))}
                            </div>}
                    </div>

                    <div className="input-group mt-2" style={inputGroupStyle}>
                        <input type="text"
                            className="text-input"
                            placeholder="Tag name"
                            value={tagInput}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown} />
                        <button className="add-btn" onClick={addTag}>+ Add Tag</button>
                    </div>

                    <span className='mt-2'>
                        <FaRegCircleQuestion />
                        <em> Already used tags for other images: {tagList.join(", ")}</em>
                    </span>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ClassificationPopUp;
