import React from 'react';
import '../styles/Settings.css'
import { IoImagesOutline } from "react-icons/io5";
import ClassificationPopUp from './ClassificationPopUp';
import ImageContext from '../context/ImageContext';
import '../styles/ClassificationPopUp.css';
import { FaSearch } from "react-icons/fa";

function Settings() {
    const [isClassVisible, setIsClassVisible] = React.useState(false)
    const [tagList, setTagList] = React.useState([])

    const { selectedImages, onSearch, images, filteredImages, setImages, setFilteredImages, imageTypes } = React.useContext(ImageContext);


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

            <div className='d-flex align-items-center justify-content-end'>
                <button disabled={selectedImages.length === 0} className='btn btn-dark ms-1' onClick={() => setIsClassVisible(true)}>Assign Tags</button>
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
            </div>
            <div className='text-end m-1' style={{fontSize: "12px"}}>
                <span>{selectedImages.length} Images Selected</span>
            </div>

            <ClassificationPopUp setIsClassVisible={setIsClassVisible} isClassVisible={isClassVisible} tagList={tagList} />


            <div className="input-group mt-2 w-25" >
                <input type="text"
                    className="text-input"
                    placeholder="Search"
                    onChange={(e) => {
                        search(e.currentTarget.value)
                    }}
                />
                <button className="add-btn" ><FaSearch /></button>
            </div>

        </div>);
}

export default Settings;