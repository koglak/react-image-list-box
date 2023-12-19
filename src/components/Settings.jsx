import React from 'react';
import '../styles/Settings.css'
import { IoImagesOutline } from "react-icons/io5";
import ClassificationPopUp from './ClassificationPopUp';

function Settings({ numSelectedImages }) {
    const [isClassVisible, setIsClassVisible] = React.useState(false)


    return (

        <div className='settings-box'>
            <div className='settings-title'>
                <IoImagesOutline size={20} /> <h2>Images</h2>
            </div>

            <div className='d-flex align-items-center justify-content-end'>
                <span>{numSelectedImages} Images Selected</span>
                <button disabled={numSelectedImages === 0} className='btn btn-dark ms-1' onClick={() => setIsClassVisible(true)}>Assign Class</button>
            </div>

            <ClassificationPopUp setIsClassVisible={setIsClassVisible} isClassVisible={isClassVisible} />

        </div>);
}

export default Settings;