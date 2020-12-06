import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { apiUrls } from '../../services/apiURLS';
import { putAjaxCall } from "../../services/AjaxCall";


const ModalForSelectedTeam = (props) => {

    const [show, setShow] = useState(false);
    const [result, setResult] = useState({
        final: 'Choose...',
        error: '',
    })
    const [team, setTeam] = useState({
        name: 'Choose...',
        error: '',
    })

    const teams = props.rows;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        if (name === 'team') {
            setTeam((prev) => ({ ...prev, name: value, error: '' }))
        }
        if (name === 'result') {
            setResult((prev) => ({ ...prev, final: value, error: '' }))
        }
    }
    const handleSubmit = () => {
        if (team.name === 'Choose...') {
            setTeam(prev =>({...prev,name:'Choose...',error:'Please Select Team'}))
        } else if (result.final === 'Choose...') {
            setResult(prev =>({...prev,final:'Choose...',error:'Please Select Result'}))
        } else{
            setTeam(prev => ({ ...prev, error: '' }));
            setResult(prev => ({ ...prev, error: '' }));
            let teamName = team.name;
            let finalResult = result.final;
            const reqBody = {
                team_name: teamName,
                finalResult,
                teams,
            }
            const apiAuth = apiUrls.team;
            putAjaxCall(apiAuth, reqBody, callback => {
                console.log(callback.data)
                handleClose();
            });
        }
    }
    return (
        <>
            <Fab color="primary" aria-label="add" onClick={handleShow}>
                <AddIcon />
            </Fab>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>MATCH RESULT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Select Result</Form.Label>
                        <Form.Control name="result" as="select" defaultValue="Choose..." onChange={handleChange}>
                            <option>Choose...</option>
                            <option>Win</option>
                            <option>Lose</option>
                            <option>Tie</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Select Team</Form.Label>
                        <Form.Control name="team" as="select" defaultValue="Choose..." onChange={handleChange}>
                            <option>Choose...</option>
                            <option>{teams[0].name}</option>
                            <option>{teams[1].name}</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalForSelectedTeam
