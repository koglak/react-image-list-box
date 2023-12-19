import React from 'react';
import '../styles/Settings.css'
import { IoImagesOutline } from "react-icons/io5";
import ClassificationPopUp from './ClassificationPopUp';
import ImageContext from '../context/ImageContext';
import '../styles/ClassificationPopUp.css';
import { FaSearch } from "react-icons/fa";

function Settings() {
    const [isClassVisible, setIsClassVisible] = React.useState(false)

    const { selectedImages, images, setFilteredImages } = React.useContext(ImageContext);


    const search = (searchInput) => {
        searchInput !== "" ?  setFilteredImages(images.filter(item => item.filename.includes(searchInput))) : setFilteredImages(images)
    }

    return (

        <div className='settings-box'>
            <div className='settings-title'>
                <IoImagesOutline size={20} /> <h2>Images</h2>
            </div>

            <div className='d-flex align-items-center justify-content-end'>
                <span>{selectedImages.length} Images Selected</span>
                <button disabled={selectedImages.length === 0} className='btn btn-dark ms-1' onClick={() => setIsClassVisible(true)}>Assign Tags</button>
            </div>

            <ClassificationPopUp setIsClassVisible={setIsClassVisible} isClassVisible={isClassVisible} />


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