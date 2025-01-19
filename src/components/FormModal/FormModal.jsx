import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormModal({ 
    show, 
    handleClose, 
    title, 
    children, 
    handleSubmit, 
    handleSaveAddMore 
}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Fechar </Button>
                <Button variant="primary" onClick={handleSubmit}> Salvar </Button>
                {handleSaveAddMore && ( <Button variant="primary" onClick={handleSaveAddMore}> Salvar e adicionar outro </Button> )}
            </Modal.Footer>
        </Modal>
    );
}

export default FormModal;
