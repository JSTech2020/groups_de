import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import EditProfile from "../editProfile/EditProfile.component";

import axios from 'axios';

import { userService } from '../../services/userService';


class Example extends React.Component {

    constructor(props) {
        super(props);
        //this.handleAvatarChange = this.handleAvatarChange.bind(this);
        //this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailConfirmationChange = this.handleEmailConfirmationChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            // avatar:'',
            //username: '',
            email: '',
            emailConfirmation: '',
            password: '',
            passwordConfirmation: '',
            currentPassword:'',
            show: false
            /*pin: '',
            kidCanPost: false*/
        };
    }



    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleEmailConfirmationChange(event) {
        this.setState({ emailConfirmation: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleCurrentPasswordChange(event) {
        this.setState({ currentPassword: event.target.value });
    }

    handleNewEmail = async (event) => {
        try {
            event.preventDefault()
            await userService.changeEmail({ ...this.state });
            this.handleClose();
        } catch (e) {
            // hier müsste zb dialogfenster aufpoppen oder text anzeigen, dass es ein fehler gibt
            console.log(e);
        }
    };


    handleClose() {
        this.setState({ show: false, emailConfirmation: '', email: '' });
    }

    handleShow() {
        this.setState({ show: true });
    }
    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>Editing via Modal TBD</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Email Change</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleNewEmail}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="col-sm-2">Current Email</Form.Label>
                                <Form.Control type="email" value={this.state.emailConfirmation} onChange={this.handleEmailConfirmationChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="col-sm-2">New Email</Form.Label>
                                <Form.Control type="email" value={this.state.email} onChange={this.handleEmailChange} /*placeholder={this.state.email}*/ />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="col-sm-2">Current Password</Form.Label>
                                <Form.Control type="password" value={this.state.currentPassword} onChange={this.handleCurrentPasswordChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleNewEmail} type="submit">
                            Save Changes </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}

export default Example;