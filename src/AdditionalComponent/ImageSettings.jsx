import React from 'react';
import { IoMdClose } from "react-icons/io";
import randomColor from 'randomcolor';
import { FaRegCircleQuestion } from "react-icons/fa6";

function ImageSettings({ setShowOnClickPage, selectedImgObj }) {
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [tagInput, setTagInput] = React.useState('');


    return (
        <div className='w-100 h-100 bg-white' style={{ position: 'absolute', top: "0px", left: "0px", opacity: "1", zIndex: 1000 }}>
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
                                <b>Annotations:</b>
                            </div>

                            <div >
                                <b>Selected Tags:</b>
                                <div className="tags-container">
                                    {selectedTags.length === 0 ?
                                        <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
                                            <p>No Tags Applied</p>
                                            <p><em>Type and select tags below to add them to the image.</em></p>
                                        </div> : <div className='d-flex flex-wrap'>
                                            {selectedTags.map((tag, index) => (
                                                <div key={index} className="tag-badge d-flex align-items-center">
                                                    <span className="color-circle" style={{ backgroundColor: tag.color }}></span>
                                                    {tag.value}
                                                    <button className="tag-delete-btn">x</button>
                                                </div>
                                            ))}
                                        </div>}
                                </div>

                                <div className="input-group mt-2">
                                    <input type="text"
                                        className="text-input"
                                        placeholder="Tag name"
                                        value={tagInput}
                                    />
                                    <button className="add-btn" >+ Add Tag</button>
                                </div>

                                <span className='mt-2'>
                                    <FaRegCircleQuestion />
                                </span>
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