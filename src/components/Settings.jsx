import React from 'react';
import '../styles/Settings.css'
import { IoImagesOutline } from "react-icons/io5";

function Settings({ numSelectedImages }) {
    return (

        <div className='settings-box'>
            <div className='settings-title'>
                <IoImagesOutline size={20} /> <h2>Images</h2>
            </div>

            <p>{numSelectedImages} Images Selected</p>

        </div>);
}

export default Settings;