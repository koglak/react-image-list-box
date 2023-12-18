import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ClassificationPopUp({ isClassVisible, setIsClassVisible }) {
    return (
        <Modal show={isClassVisible}
            onHide={() => setIsClassVisible(false)}
            size="lg"
            aria-labelledby="classification-pop-up">
            <Modal.Header closeButton>
                <Modal.Title id="classification-pop-up-title">
                    Assign Class To Images
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

            </Modal.Body>
        </Modal>
    );
}

export default ClassificationPopUp;