import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function VerifyParticipation(props) {
    let history = useHistory();

    const [isVerifying, setVerifying] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);

    const [modalTitle, setModalTitle] = React.useState('');
    const [modalBody, setModalBody] = React.useState('');

    function VerticalModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{modalBody}</p>
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
        try {
            const { id, token } = props.match.params
            async function verifyParticipation(id, token) {
                try {
                    const response = await axios.put(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/participate/verify/' + id + '/' + token);
                    console.log(response.data.success);
                    if (response.status === 200 && response.data.success) {
                        setVerifying(false);
                        setModalShow(true);
                        setModalTitle("Erfolg");
                        setModalBody('Deine Teilnahme wurde erfolgreich bestätigt!');
                    } else {
                        setVerifying(false);
                        setModalShow(true);
                        setModalTitle("Fehler");
                        setModalBody('Der Bestätigungslink ist ungültig oder ein Fehler ist aufgetreten...');
                    }
                } catch (e) {
                    console.log(e);
                    setVerifying(false);
                    setModalShow(true);
                    setModalTitle('Fehler');
                    setModalBody('Ein unvorhergesehener Fehler ist aufgetreten!');
                }
            }
            verifyParticipation(id, token);
        }
        catch (e) {
            console.log(e);
        }
    }, [])

    function closeAndRedirect() {
        setModalShow(false);
        history.push('/projects');
    }

    return (
        isVerifying ?
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            : <VerticalModal show={modalShow} onHide={() => closeAndRedirect()} />
    )
}

