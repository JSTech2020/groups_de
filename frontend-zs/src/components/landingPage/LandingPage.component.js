import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from "react-bootstrap";
import { authenticationService } from "../../services/authentication.service";
import { ReactComponent as Illustration } from "../../assets/reading.svg";
import successIllustration from "../../assets/signup_success.png";
import Modal from 'react-bootstrap/Modal';
import {userService} from "../../services/userService";

function LandingPage() {
  let history = useHistory()

  const ErrorModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Fehler!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            { props.bodyText }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const LoginModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Anmelden
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Adresse</Form.Label>
              <Form.Control type="email" placeholder="Email Adresse" name="loginEmail"
                            onChange={ e => loginEmail = e.target.value }/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Passwort</Form.Label>
              <Form.Control type="password" name="loginPassword" placeholder="Passwort"
                            onChange={ e => loginPassword = e.target.value }/>
            </Form.Group>
            <p> Passwort vergessen?</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">Schließen</Button>
          <Button variant="primary" onClick={handleLogin}>Anmelden</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function SignupModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Registrieren
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Adresse</Form.Label>
              <Form.Control type="email" placeholder="Email Adresse" name="loginEmail"
                            onChange={ e => signupEmail = e.target.value }/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Passwort</Form.Label>
              <Form.Control type="password" name="loginPassword" placeholder="Passwort"
                            onChange={ e => signupPassword = e.target.value }/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">Schließen</Button>
          <Button variant="primary" onClick={handleSignup}>Registrieren</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function SuccessModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img src={successIllustration} style={{width: "300px"}}  alt={"Success Illustration"}/>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Vielen Dank für deine Anmeldung!<br/>
            Verifiziere deine Email, indem du auf den Link in deiner Email klickst.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onHide}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  let loginEmail = '';
  let loginPassword = '';

  let signupEmail = '';
  let signupPassword = '';

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setshowSignupModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setShowLoginModal(false);
      const response = await authenticationService.login(loginEmail, loginPassword);
      if (response.status === 200) {
        history.push('/registrationStepTwo');
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        setShowErrorModal(true);
        setErrorModalText('Das von dir eingebeben Passwort ist falsch!');
      }
    }
  };

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      const signupCredentials = {
        email: signupEmail,
        password: signupPassword
      };
      setshowSignupModal(false);
      const response = await userService.signUp(signupCredentials);
      if (response.status === 200) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      if (error.status === 406) {
        setShowErrorModal(true);
        setErrorModalText('Die von dir angegebene Email Adresse wird bereits verwendet!');
      }
    }
  }

  const headline = {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "8px",
    lineHeight: "1.1em",
    fontWeight: "700"
  };

  return(
    <Container>
        <Illustration style={{ width: "500px", height: "400px", margin: "auto", display: "block" }} />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 style={ headline }> Willkommen bei Zukunftschreiben! </h1>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <p style={{ textAlign: "center" }}>
              Bitte deine Eltern darum, dir einen Account bei Zukunftschreiben zu erstellen!
            </p>
            <div style={{ textAlign: "center" }}>
              <Button style={{ marginRight: "25px" }} onClick={() => setshowSignupModal(true)} variant="primary">Registrieren</Button>
              <Button variant="outline-primary" onClick={() => setShowLoginModal(true)}>Anmelden</Button>
            </div>
          </Col>
        </Row>
        <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)}/>
        <SignupModal show={showSignupModal} onHide={() => setshowSignupModal(false)}/>
        <SuccessModal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} />
        <ErrorModal show={showErrorModal} bodyText={errorModalText} onHide={() => setShowErrorModal(false)} />
      </Container>
    );
}


export default LandingPage;
