import { Button, Container, Row, Col, Image, Form, Card, Carousel, Modal } from 'react-bootstrap';
import zsLogo from '../../../ZF_logo_orange.png';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { authenticationService } from '../../../services/authentication.service';

export default function ProjectParticipation(props) {
    let history = useHistory();

    const [images, setImages] = useState({})

    const [project, setProject] = useState({})

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [information, setInformation] = useState("")
    const [contact, setContact] = useState("")

    const [modalShow, setModalShow] = useState(false)

    function VerticalModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Erfolg</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bitte bestätige deine Teilnahme, indem du auf den Bestätigungslink in der E-Mail klickst.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={props.onHide}
                        style={{ backgroundColor: '#F5B063', color: '#323838', borderColor: '#F5B063' }}
                    >
                        Schließen
                     </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            let binaryImages = {}
            for (let img of props.location.state.participationInfo.media) {
                const fetchImage = await Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/media/' + img,
                    { responseType: 'arraybuffer' },
                )
                const imgBinary = "data:;base64," + btoa(
                    new Uint8Array(fetchImage.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''),
                );
                binaryImages[img] = imgBinary
            }
            setImages(binaryImages)
        }
        fetchData()
    }, [])

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
        Axios.put(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/participate/' + props.location.state.project_id,
            body)
            .then(_ => { setModalShow(true); })
            .catch(function (error) { console.log(error.message) });
    }

    function closeAndRedirect() {
        setModalShow(false);
        history.push('/projects');
    }

    return (
        <div>
            <Container className="zs-style mt-3 justify-content-center mb-4">
                <Row>
                    <Col className="mb-2"><h4><strong>{props.location.state.title}</strong></h4></Col>
                </Row>
                <Row className="justify-content-between">
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
                            {props.location.state.participationInfo?.moreInformation}
                        </Card.Text>
                        <Carousel className="align-items-center" slide={false}>
                            {props.location.state.participationInfo.media?.map(img => {
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
                    <Link to={"/projects/" + props.location.state.project_id}>
                        <Button variant="primary"
                            style={{ backgroundColor: '#F5B063', color: '#323838', borderColor: '#F5B063' }}
                            className="mr-3"
                        >
                            <strong>Zurück</strong>
                        </Button >
                    </Link>
                    <Button variant="primary"
                        style={{ backgroundColor: '#F38F1F', color: '#323838', borderColor: '#F38F1F' }}
                        onClick={handeParticipationSubmit}
                    >
                        <strong>Teilnahme einreichen</strong>
                    </Button>
                </Row>
            </Container>
            <VerticalModal show={modalShow} onHide={() => closeAndRedirect()} />
        </div >
    )
}