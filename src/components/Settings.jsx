import React from 'react';
import '../styles/Settings.css'
import { IoImagesOutline } from "react-icons/io5";
import ClassificationPopUp from './ClassificationPopUp';
import ImageContext from '../context/ImageContext';
import '../styles/ClassificationPopUp.css';
import { FaSearch } from "react-icons/fa";
import DropdownComponent from './DropdownComponent';

function Settings() {
    const [isClassVisible, setIsClassVisible] = React.useState(false)
    const [tagList, setTagList] = React.useState([])

    const { selectedImages, setSelectedImages, onSearch, images, filteredImages, setImages, setFilteredImages, imageTypes, enableCheckBox, enableTagAssignment } = React.useContext(ImageContext);


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
                {enableTagAssignment && <button disabled={selectedImages.length === 0} className='btn btn-dark ms-1' onClick={() => setIsClassVisible(true)}>Assign Tags</button>}
                {
                    Array.isArray(imageTypes) && imageTypes.map((type, index) => (
                        <button
                            disabled={selectedImages.length === 0}
                            className='btn btn-dark ms-1'
                            onClick={() => assignType(type.name)}
                            key={index}>
                            Set {type.name}
                        </button>))
                }

                <button className='btn btn-dark ms-1' disabled={selectedImages.length === filteredImages.length} onClick={() => setSelectedImages(filteredImages.map(img => img.filename))}>Select All</button>
                <button className='btn btn-dark ms-1' disabled={selectedImages.length === 0} onClick={() => setSelectedImages([])}>De-Select</button>

            </div>}
            {enableCheckBox && <div className='text-end m-1' style={{ fontSize: "12px" }}>
                <span>{selectedImages.length} Images Selected</span>
            </div>}

            <ClassificationPopUp setIsClassVisible={setIsClassVisible} isClassVisible={isClassVisible} tagList={tagList} />



            <div className='d-flex align-items-center'>
                <div className="input-group w-25" >
                    <input type="text"
                        className="text-input"
                        placeholder="Search"
                        onChange={(e) => {
                            search(e.currentTarget.value)
                        }}
                    />
                    <button className="add-btn" ><FaSearch /></button>
                </div>

                <DropdownComponent title="Tag" options={tagList} keyName="categories" />
                <DropdownComponent title="Type" options={imageTypes.map(t=>t.name)} keyName="type" />

            </div>

        </div>);
}

export default Settings;