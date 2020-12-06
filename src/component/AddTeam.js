import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { apiUrls } from '../services/apiURLS';
import { postAjaxCall } from "../services/AjaxCall";


const AddTeam = () => {
    const [show, setShow] = useState(false);
    const [team, setTeamName] = useState({
        name : '',
        error : ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        if (name === 'teamName') {
            setTeamName((prev) => ({ ...prev, name : value, error: '' }))
        }
    }
    const handleSubmit = () => {
        if (team.name.length > 0) {
            setTeamName(prev => ({ ...prev, error: ''}));
           
           let teamName = team.name;
            const reqBody = {
                team_name : teamName,
            }
            const apiAuth = apiUrls.team;
            postAjaxCall(apiAuth, reqBody, callback => {
                if (Object.keys(callback.data).length !== 0) {
                    let name = callback.data.team_name;
                    alert(`${name} is added`)

                    handleClose();
                } else {
                   
                }
            });
        }else{
            setTeamName( prev => ({...prev, name : '', error : 'Please Enter Here a Team Name!!!'}))
        }
        
    }

    return (
        <>
            <Fab color="primary" style={{textAlign:"left"}} aria-label="add" onClick={handleShow}>
                <AddIcon />
            </Fab>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter Team Name</Form.Label>
                        <Form.Control type="text" placeholder="Please Enter Team Name" name="teamName" value={team.name} onChange={handleChange} required />
                        {team.error !== '' && <span style={{ color: '#ff0000', font: '8px' }}>{team.error}</span>}
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
    );
}

export default AddTeam