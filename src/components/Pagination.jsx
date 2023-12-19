import React from 'react';
import '../styles/Pagination.css'
import ImageContext from '../context/ImageContext'

function Pagination() {

    const { filteredImages, perPage, currentPage, setCurrentPage } = React.useContext(ImageContext);

    const numOfPage = Math.ceil(filteredImages.length / perPage)

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < numOfPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageSelect = (event) => {
        setCurrentPage(Number(event.target.value));
    };

    return (
        <div className='pagination-box'>
            <button onClick={handlePrevClick} disabled={currentPage === 1}>&lt;&lt; Prev</button>

            {/* Dropdown for selecting the current page */}
            <select
                value={currentPage}
                onChange={handlePageSelect}
                className="current-page-dropdown"
            >
                {Array.from({ length: numOfPage }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            of {numOfPage}

            <button onClick={handleNextClick} disabled={currentPage === numOfPage}>Next &gt;&gt;</button>
        </div>
    );
}




export default Pagination;