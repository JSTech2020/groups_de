import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';
import {userService} from "../../services/userService";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

function VerifyAccount(props) {
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
          <Button variant="primary" onClick={props.onHide}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function closeAndRedirect() {
    setModalShow(false);
    history.push('/stories');
  }

  useEffect(()  => {
    try {
      const { token } = props.match.params
      async function verifyUser(token) {
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/signup/verify/` + token);
          console.log(response.data.success);
          if (response.status === 200 && response.data.success) {
            setVerifying(false);
            setModalShow(true);
            setModalTitle("Erfolg");
            setModalBody('Deine Email wurde erfolgreich bestätigt!');
          } else {
            setVerifying(false);
            setModalShow(true);
            setModalTitle("Fehler");
            setModalBody('Der Aktivierungslink ist ungültig oder abgelaufen!');
          }
        } catch (e) {
          console.log(e);
          setVerifying(false);
          setModalShow(true);
          setModalTitle('Fehler');
          setModalBody('Ein unvorhergesehener Fehler ist aufgetreten!');
        }
      }
      verifyUser(token);
    }
    catch (e) {
      console.log(e);
    }
  }, [])

  return(
      isVerifying ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
        : <VerticalModal show={modalShow} onHide={() => closeAndRedirect()} />
  )
}

export default VerifyAccount;
