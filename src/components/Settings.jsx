import React from 'react';
import '../styles/Settings.css'
import { IoImagesOutline } from "react-icons/io5";
import ClassificationPopUp from './ClassificationPopUp';
import ImageContext from '../context/ImageContext';

function Settings() {
    const [isClassVisible, setIsClassVisible] = React.useState(false)
    const { selectedImages } = React.useContext(ImageContext);

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

        </div>);
}

export default Settings;