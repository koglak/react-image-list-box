import React from 'react';
import Modal from 'react-bootstrap/Modal';
import randomColor from 'randomcolor'; // Import randomcolor
import '../styles/ClassificationPopUp.css';
import ImageContext from '../context/ImageContext';

function ClassificationPopUp({ isClassVisible, setIsClassVisible }) {
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [tagInput, setTagInput] = React.useState('');

    const { selectedImages, setImages, images } = React.useContext(ImageContext);

    const addTag = () => {
        if (tagInput && !selectedTags.some(tag => tag.value.toLowerCase() === tagInput.toLowerCase())) {
            const newTag = {
                value: tagInput,
                color: randomColor()
            };
    
            setSelectedTags([...selectedTags, newTag]);
    
            const updatedImages = images.map(image => {
                if (selectedImages.includes(image.filename)) {
                    if (!image.categories.includes(newTag.value)) {
                        return { ...image, categories: [...image.categories, newTag.value] };
                    }
                }
                return image;
            });
    
            setImages(updatedImages);
    
            setTagInput('');
        }
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
    };

    const tagExists = tagInput && selectedTags.some(tag => tag.value.toLowerCase() === tagInput.toLowerCase());

    const inputGroupStyle = {
        borderColor: tagExists ? 'red' : 'black'
    };

    return (
        <Modal show={isClassVisible} onHide={() => setIsClassVisible(false)} size="lg" aria-labelledby="classification-pop-up">
            <Modal.Header closeButton>
                <Modal.Title id="classification-pop-up-title">
                    Assign Class To Images
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
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ClassificationPopUp;
