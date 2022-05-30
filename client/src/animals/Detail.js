import React, { useEffect, useState } from "react";
import { Alert, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, Button, Table, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { useParams } from "react-router-dom";

import axios from "../axiosInstance";

import AnimalNotes from "./Notes";

const AnimalDetail = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const { id: animalID } = useParams();
    const [ animal, setAnimal ] = useState({});
    useEffect(() => {
        axios.get(`/animals/${animalID}/`).then((response) => {
            setAnimal(response.data);
            setIsLoading(false);
        });
    }, [animalID]);


    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ formValue, setFormValue ] = useState(0.0);
    const [ formError, setFormError ] = useState(null);
    const addWeight = () => {
        const date = new Date()
        const formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
        const weights = animal.weights;
        weights.push({"weight": formValue, "date": formatedDate})
        axios.patch(`/animals/${animalID}/`, {weights}).then((response) => {
            setIsModalOpen(false);
        });
    }

    const updateWeight = (value) => {
        if (value < 0) {
            setFormError("Weights must be positive values");
        } else {
            setFormError(null);
        }
        setFormValue(value);
    };

    if (isLoading) {
        return (
            <Alert color="info">Loading...</Alert>
        );
    }

    return (
        <Card>
            <CardHeader>{animal.name} - Primary Caregiver: {animal.primary_caretaker.username}</CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <h3>Info</h3>
                        <Table>
                            <tbody>
                                <tr>
                                    <th>Birth Date</th>
                                    <td>{animal.birthdate}</td>
                                </tr>
                                {animal.deathdate &&
                                    <tr>
                                        <th>Death Date</th>
                                        <td>{animal.deathdate}</td>
                                    </tr>
                                }
                                <tr>
                                    <th>Additional Caregivers</th>
                                    <td>N/A</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <AnimalNotes animalID={animal.id} />
                    </Col>
                </Row>
                <Row>
                    <h3>Weights</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Weight (grams)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animal.weights.map((weight) => (
                                <tr key={weight.id}>
                                    <td>{weight.date}</td>
                                    <td>{weight.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button size="sm" onClick={() => setIsModalOpen(true)}>Add Weight</Button>

                    <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
                        <ModalHeader>Add Weight</ModalHeader>
                        <ModalBody>
                            <p>Add new weight for this animal</p>
                            { formError &&
                                <Alert color="danger">{formError}</Alert>
                            }
                            <Form>
                                <FormGroup>
                                    <Label>Weight (grams):</Label>
                                    <Input name="weight" type="number" min="0" value={formValue} onChange={(e) => updateWeight(e.target.value)} />
                                </FormGroup>
                                <Button disabled={formError} onClick={addWeight}>Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Row>
            </CardBody>
        </Card>
    );

};

export default AnimalDetail;
