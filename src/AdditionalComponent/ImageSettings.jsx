import React from 'react';
import { IoMdClose } from "react-icons/io";

function ImageSettings({ showOnClickPage, setShowOnClickPage, selectedImgObj }) {
    return (
        <div className='w-100 h-100 bg-white' style={{ position: 'absolute', top: "0px", left: "0px", opacity: "1" }}>
            <div 
            className='bg-light w-100 d-flex justify-content-between p-3'
            style={{cursor: "pointer"}}
            onClick={() => setShowOnClickPage(false)}>

                <h4>{selectedImgObj.filename}</h4>
                <IoMdClose size={32}/>

            </div>
            <img
                src={selectedImgObj.src}
                alt={selectedImgObj.filename}

            />

        </div>);
}

export default ImageSettings;