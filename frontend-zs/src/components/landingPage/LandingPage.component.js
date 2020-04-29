import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { authenticationService } from "../../services/authentication.service";
import { ReactComponent as Illustration } from "../../assets/reading.svg";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const headline = {
      textAlign: "center",
      marginTop: "20px",
      marginBottom: "8px",
      lineHeight: "1.1em",
      fontWeight: "700"
    };

    return (
      <Container>
        <Illustration style={{width: "500px", height: "400px", margin: "auto", display: "block"}} />
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
          </Col>
        </Row>
      </Container>
    )
  }
}


export default LandingPage;
