import React from 'react';
import { IoMdClose } from "react-icons/io";

function ImageSettings({ showOnClickPage, setShowOnClickPage, selectedImgObj }) {
    return (
        <div className='w-100 h-100 bg-white' style={{ position: 'absolute', top: "0px", left: "0px", opacity: "1",  zIndex: 1000 }}>
            <div
                className='bg-light w-100 d-flex justify-content-between p-3'
                style={{ cursor: "pointer" }}
                onClick={() => setShowOnClickPage(false)}>

                <h4>{selectedImgObj.filename}</h4>
                <IoMdClose size={32} />

            </div>

            <div className='container-fluid border-top'>
                <div className='row'>
                    <div className='col-sm-3 border'>
                            <div className='container-fluid bg-light h-100 w-100'>
                                <div className='row'>
                                    <h5>Annotations</h5>
                                </div>

                                <div className='row'>
                                    <h5>Tags</h5>
                                </div>
                            </div>
                    </div>
                    <div className='col-sm-9 d-flex justify-content-center align-items-center'>
                        <img
                            src={selectedImgObj.src}
                            alt={selectedImgObj.filename}

                        />
                    </div>
                </div>
            </div>

        </div>);
}

export default ImageSettings;