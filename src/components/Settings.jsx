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

            <p>{numSelectedImages} Images Selected</p>
            <button className='btn btn-primary' onClick={()=>setIsClassVisible(true)}>Assign Class</button>

            <ClassificationPopUp setIsClassVisible={setIsClassVisible} isClassVisible={isClassVisible}/>

        </div>);
}

export default Settings;