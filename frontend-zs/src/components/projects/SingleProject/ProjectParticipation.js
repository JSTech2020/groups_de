import { Button, Container, Row, Col, Image, Form, Card, Carousel, Modal } from 'react-bootstrap';
import zsLogo from '../../../ZF_logo_orange.png';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { authenticationService } from '../../../services/authentication.service';

export default function ProjectParticipation(props) {

    let history = useHistory();
    const [project, setProject] = useState({})
    const [images, setImages] = useState({})
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [information, setInformation] = useState("")
    const [contact, setContact] = useState("")
    const [show, setShow] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchProject = await Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/' + props.computedMatch.params.id)
            for (let img of fetchProject.data.participationInfo.media) {
                const fetchImage = await Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/media/' + img,
                    { responseType: 'arraybuffer' },
                )
                const imgBinary = "data:;base64," + btoa(
                    new Uint8Array(fetchImage.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''),
                );
                images[img] = imgBinary
                setImages(images)
            }
            setProject(fetchProject.data)
        }
        fetchData()
    }, [props.computedMatch.params.id, images])

    function handleFirstNameChange(event) {
        setFirstName(event.target.value)
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value)
    }

    function handleInformationChange(event) {
        setInformation(event.target.value)
    }

    function handleContactChange(event) {
        setContact(event.target.value)
    }

    function handeParticipationSubmit() {
        let body = {
            userEmail: authenticationService.currentUserValue.email,
            participant: {
                user: authenticationService.currentUserValue._id,
                name: firstName + " " + lastName,
                information: information,
                contact: contact,
                confirmationToken: ''
            }
        }
        Axios.put(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/participate/' + project._id,
            body)
            .then(_ => { handleShow(); })
            .catch(function (error) { console.log(error.message) });
    }

    function handleClose() {
        setShow(false);
        history.push('/projects');
    }

    function handleShow() {
        setShow(true);
    }

    return (
        <Container className="zs-style mt-3 justify-content-center mb-4">
            <Row>
                <Col className="mb-2"><h4><strong>{project.info?.title}</strong></h4></Col>
            </Row>
            <Row className="justify-content-between ml-3">
                <Col>
                    <label><strong>Teilnehmername</strong></label>
                    <Row>
                        <Col >
                            <Form.Control
                                placeholder="Vorname"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                className="mb-3"
                            />
                        </Col>
                        <Col >
                            <Form.Control
                                placeholder="Nachname"
                                value={lastName}
                                onChange={handleLastNameChange}
                                className="mb-3"
                            />
                        </Col>
                    </Row>

                    <label><strong>Informationen über dich</strong></label>
                    <Form.Control
                        as="textarea"
                        placeholder="Bitte teile uns einige Informationen über dich mit"
                        rows='5'
                        value={information}
                        onChange={handleInformationChange}
                        className="mb-3"
                    />

                    <label><strong>Kontaktinformationen</strong></label>
                    <Form.Control
                        as="textarea"
                        placeholder="Bitte füge deine Kontaktinformationen hinzu (z.B. Telefonnummer)"
                        rows='2'
                        value={contact}
                        onChange={handleContactChange}
                        className="mb-3"
                    />
                </Col>
                <Col className="col-auto mr-4 mt-4">
                    <Image
                        className="mb-2"
                        src={zsLogo}
                        width="130"
                    />
                </Col>
            </Row>
            <Card className="my-3 mr-4" >
                <Card.Body >
                    <Card.Title>Zusätzliche Informationen zu diesem Projekt</Card.Title>
                    <Card.Text>
                        {project.participationInfo?.moreInformation}
                    </Card.Text>
                    <Carousel className="align-items-center" slide={false}>
                        {project.participationInfo?.media?.map(img => {
                            return <Carousel.Item key={img} >
                                <Image
                                    alt="media inside post"
                                    height='250'
                                    style={{ display: 'block', margin: 'auto' }}
                                    src={images[img]} />
                            </Carousel.Item>
                        })}
                    </Carousel>
                </Card.Body>
            </Card>

            <Row className="justify-content-end mr-4">
                <Link to={"/projects/" + project._id}>
                    <Button style={{ backgroundColor: '#F5B063', color: '#323838', borderColor: '#F5B063' }}
                        className="mr-3">
                        <strong>Zurück</strong>
                    </Button >
                </Link>
                <Button style={{ backgroundColor: '#F38F1F', color: '#323838', borderColor: '#F38F1F' }} onClick={handeParticipationSubmit}>
                    <strong>Teilnahme einreichen</strong>
                </Button>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Erfolg</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bitte bestätige deine Teilnahme, indem du auf den Link in der E-Mail klickst.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Schließen
                </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}