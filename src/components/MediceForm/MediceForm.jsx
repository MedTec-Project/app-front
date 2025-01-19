import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormModal from '../FormModal/FormModal';
import './styles.css';

function MediceForm() {
    const [showModal, setShowModal] = useState(false);


    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = () => {

        console.log('Medicamento salvo!');
        handleCloseModal();
    };

    const handleSaveAddMore = () => {

        console.log('Medicamento salvo! Adicionar outro...');
    };

    return (
        <>

            <Button variant="primary" onClick={handleOpenModal}>
                Cadastrar Medicamento
            </Button>


            <FormModal
                show={showModal}
                handleClose={handleCloseModal}
                title="Cadastrar Medicamento"
                handleSubmit={handleSubmit}
                handleSaveAddMore={handleSaveAddMore}
            >

                <Form>
                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Nome *</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome" required />
                            </Form.Group>
                        </div>


                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Dosagem *</Form.Label>
                                <Form.Control type="text" placeholder="Ex: 500mg" required />
                                <small className="text-danger">Esse campo é obrigatório</small>
                            </Form.Group>
                        </div>


                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Sintomas</Form.Label>
                                <Form.Select>
                                    <option>Selecione</option>
                                    <option>Febre</option>
                                    <option>Inflamação</option>
                                </Form.Select>
                            </Form.Group>
                        </div>


                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Fabricante</Form.Label>
                                <Form.Select>
                                    <option>MedTec</option>
                                    <option>PharmaCo</option>
                                </Form.Select>
                            </Form.Group>
                        </div>


                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select>
                                    <option>Antibiótico</option>
                                    <option>Analgésico</option>
                                </Form.Select>
                            </Form.Group>
                        </div>


                        <div className="col-md-6 mb-3">
                            <Form.Group>
                                <Form.Label>Número de Registro</Form.Label>
                                <Form.Control type="text" placeholder="Digite o número" />
                            </Form.Group>
                        </div>


                        <div className="col-12 mb-3">
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Digite uma descrição" />
                            </Form.Group>
                        </div>


                        <div className="col-12 mb-3">
                            <Form.Group>
                                <Form.Label>Imagem</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Button variant="outline-secondary">Upload</Button>
                                    <div className="ms-3">
                                        <img
                                            src="https://via.placeholder.com/100"
                                            alt="Preview"
                                            className="img-thumbnail"
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </FormModal>
        </>
    );
}

export default MediceForm;
