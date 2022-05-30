import React, { useEffect, useState } from "react";
import { Alert, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "../axiosInstance";


const AnimalNotes = ({animalID}) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ notes, setNotes ] = useState([]);
    useEffect(() => {
        axios.get(`/animals/${animalID}/notes/`).then((response) => {
            setNotes(response.data);
            setIsLoading(false);
        });
    }, [animalID, isLoading]);

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ formError, setFormError ] = useState(null);
    const [ formValue, setFormValue ] = useState("");
    const addNote = () => {
        if (!formValue) {
            setFormError("You must have content in the note");
            return false;
        }
        const date = new Date()
        const formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
        const data = {
            "content": formValue, "date": formatedDate,
            "animal": animalID
        }
        axios.post(`/animals/${animalID}/notes/`, data).then((response) => {
            setIsModalOpen(false);
            setIsLoading(true);
        });
    }

    return (
        <>
            <h3>Notes</h3>
            {isLoading &&
                <Alert color="info">Loading...</Alert>
            }

            {notes.map((note) => {
                return (
                    <div>
                        <p>{note.content} - {note.date}</p>
                    </div>
                );
            })}

            <Button size="sm" onClick={() => setIsModalOpen(true)}>Add Note</Button>
            <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
                <ModalHeader>Add Note</ModalHeader>
                <ModalBody>
                    <p>Add new note for this animal</p>
                    { formError &&
                        <Alert color="danger">{formError}</Alert>
                    }
                    <Form>
                        <FormGroup>
                            <Label>Note:</Label>
                            <Input name="note" type="textarea" value={formValue} onChange={(e) => {setFormError(null); setFormValue(e.target.value)}} />
                        </FormGroup>
                        <Button disabled={formError} onClick={addNote}>Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
};


export default AnimalNotes;
