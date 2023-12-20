import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import ImageContext from '../context/ImageContext';
import '../styles/DropdownComponent.css'; 

const DropdownComponent = ({ title, options, keyName }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { filteredImages, setFilteredImages, images, dropdownStyle } = React.useContext(ImageContext);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleCheckboxChange = (item) => {
        setSelectedItems((prev) => {
            if (prev.includes(item)) {
                return prev.filter((i) => i !== item);
            } else {
                return [...prev, item];
            }
        });
    };

    React.useEffect(() => {
        let filtering = images
        if (typeof (images[0][keyName]) === "string"  && selectedItems.length > 0) {
            filtering = filteredImages.filter(img =>
                selectedItems.some(item => img.type.includes(item))
            );

        }
        else if (Array.isArray(images[0][keyName]) && selectedItems.length > 0) {
            filtering = filteredImages.filter(img =>
                selectedItems.every(item => img.categories.includes(item))
            );
        }

        setFilteredImages(filtering)

    }, [selectedItems]);


    if(options.length > 0){
        return (
            <div className="dropdown-container">
                <button onClick={toggleDropdown} className="dropdown-button" style={dropdownStyle}>
                    Select {title} <FaChevronDown size={10} />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-content">
                        {options.map((item) => (
                            <label key={item} className="dropdown-item">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    checked={selectedItems.includes(item)}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        );
    }
    else{
        return
    }
   
};

export default DropdownComponent;
