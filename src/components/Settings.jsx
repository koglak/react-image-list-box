import React from 'react';

import ClassificationPopUp from './ClassificationPopUp';
import DropdownComponent from './DropdownComponent';

import ImageContext from '../context/ImageContext';

import '../styles/ClassificationPopUp.css';
import '../styles/Settings.css'

import { FaSearch, FaCheck } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


function Settings() {
    const [isClassVisible, setIsClassVisible] = React.useState(false)
    const [tagList, setTagList] = React.useState([])

    const { selectedImages, setSelectedImages, onSearch, images, filteredImages, setImages,
        setFilteredImages, imageTypes, enableCheckBox, enableTagAssignment, buttonStyle, inputStyle } = React.useContext(ImageContext);


    const search = (searchInput) => {
        if (!onSearch) {
            searchInput !== "" ? setFilteredImages(images.filter(item => item.filename.includes(searchInput))) : setFilteredImages(images)
        }
        else {
            onSearch(searchInput)
        }
    }

    const assignType = (type) => {
        const updateImageType = (image) => {
            if (selectedImages.includes(image.filename)) {
                return { ...image, type: type };
            }
            return image;
        };

        setImages(images.map(updateImageType));
        setFilteredImages(filteredImages.map(updateImageType));
    }

    React.useEffect(() => {
        const uniqueCategories = [...new Set(images.reduce((acc, item) => [...acc, ...item.categories], []))];
        setTagList(uniqueCategories)
    }, [images]);

    return (

        <div className='settings-box'>
            <div className='settings-title'>
                <IoImagesOutline size={20} /> <h2>Images</h2>
            </div>

            {enableCheckBox && <div className='d-flex align-items-center justify-content-end'>
                {enableTagAssignment &&
                    <button disabled={selectedImages.length === 0}
                        className='btn btn-dark ms-1'
                        style={buttonStyle}
                        onClick={() => setIsClassVisible(true)}>Assign Tags</button>}
                {
                    Array.isArray(imageTypes) && imageTypes.map((type, index) => (
                        <button
                            disabled={selectedImages.length === 0}
                            className='btn btn-dark ms-1'
                            style={buttonStyle}
                            onClick={() => assignType(type.name)}
                            key={index}>
                            Set {type.name}
                        </button>))
                }


            </div>}


            {enableCheckBox && <div className='m-1 d-flex align-items-center ' style={{ fontSize: "12px" }}>
                <button className='select-tag-text'
                    disabled={selectedImages.length === filteredImages.length}
                    onClick={() => setSelectedImages(filteredImages.map(img => img.filename))}>
                    <FaCheck /> Select All
                </button>

                <div className={selectedImages.length > 0 ? 'number-selected-text-colored' : 'number-selected-text'}>{selectedImages.length} Images Selected</div>

                <button className="select-tag-text"
                    disabled={selectedImages.length === 0}
                    onClick={() => setSelectedImages([])}>
                    <IoMdClose />De-Select
                </button>

            </div>}

            <div className='d-flex align-items-center' style={{ height: "48px" }}>
                <div className="input-group w-25" style={inputStyle}>
                    <input type="text"
                        className="text-input"
                        placeholder="Search"
                        onChange={(e) => {
                            search(e.currentTarget.value)
                        }}
                    />
                    <button className="add-btn" style={{backgroundColor: inputStyle["borderColor"], borderLeft: inputStyle["borderColor"]}}><FaSearch /></button>
                </div>

                {enableCheckBox && <DropdownComponent title="Tag" options={tagList} keyName="categories" />}
                {enableCheckBox && <DropdownComponent title="Type" options={imageTypes.map(t => t.name)} keyName="type" />}

                <ClassificationPopUp setIsClassVisible={setIsClassVisible} isClassVisible={isClassVisible} tagList={tagList} />

            </div>

        </div>);
}

export default Settings;