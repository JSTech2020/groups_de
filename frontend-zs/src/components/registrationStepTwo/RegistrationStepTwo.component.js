import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import { Formik, Field, ErrorMessage } from 'formik';
import { userService } from "../../services/userService";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const avatar1 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar1.png"
const avatar2 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar2.png"
const avatar3 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar3.png"
const avatar4 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar4.png"
const avatar5 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar5.png"
const avatar6 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar6.png"

const RegistrationStepTwo = () => {
  const schema = yup.object({
    firstName: yup.string()
      .max(15)
      .matches(/^[\u00C0-\u017Fa-zA-Z-']+$/i, 'Invalid first name')
      .required('Required'),
    city: yup.string()
      .max(100, 'Invalid city name')
      .matches(/^[\u00C0-\u017Fa-zA-Z-' ]+$/i, 'Invalid city name')
      .required('Required'),
    country: yup.string()
      .max(60, 'Invalid country name')
      .matches(/^[\u00C0-\u017Fa-zA-Z-' ]+$/i, 'Invalid country name')
      .required('Required'),
    birthdate: yup.date()
      .max(new Date(), 'Invalid Birthdate')
      .required('Required')
  });

  const handleRegistration = async (values, { setSubmitting }) => {
    const body = {
      firstname: values.firstName,
      birthdate: values.birthdate,
      city: values.city,
      country: values.country,
      registrationComplete: true,
      avatar: avatar
    };

    const response = await userService.updateUser(body);
    if (response.status === 200) {
      //need to redirect here!
      this.history.push('/stories')
    }
    setSubmitting(false);
  };

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [avatar, setAvatar] = useState(null);

  const onPickImage = (avatar) => {
    setAvatar(avatar.src);
  }

  const headline = {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "8px",
    lineHeight: "1.1em",
    fontWeight: "700"
  };

  return (
    <Container fluid="lg">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Formik
            validationSchema={schema}
            onSubmit={handleRegistration}
            initialValues={{
              firstName: '',
              birthdate: '',
              city: '',
              country: '',
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
            }) => (
            <>
            <Container>
              <Row>
                <Col>
                  <h1 style={ headline }> Fast geschafft! </h1>
                  <p style={{ textAlign: 'center' }}> Vervollständige jetzt deine Informationen, um
                    Zukunftschreiben verwenden zu können! </p>
                </Col>
              </Row>
            </Container>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="firstName">Vorname</Form.Label>
                <Field className="form-control" placeholder="Vorname" name="firstName" type="text" />
                <ErrorMessage name="firstName" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="city">Stadt</Form.Label>
                <Field className="form-control" placeholder="Stadt" name="city" type="text" />
                <ErrorMessage name="city" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="country">Land</Form.Label>
                <Field className="form-control" placeholder="Land" name="country" type="text" />
                <ErrorMessage name="country" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="birthdate">Geburtsdatum</Form.Label>
                <Field className="form-control" placeholder="Gerburtsdatuzm" name="birthdate" type="date" />
                <ErrorMessage name="birthdate" />
              </Form.Group>
              <p>
                Wähle deinen Avatar
              </p>
              <ImagePicker
                images={avatars.map((image, i) => ({src: image, value: i}))}
                onPick={onPickImage.bind(this)}
              />
              <Button variant="primary" type="submit" onSubmit={handleSubmit}>Speichern</Button>
            </Form>
            </>
          )}
        </Formik>
      </Col>
    </Row>
  </Container>
  );
};

export default RegistrationStepTwo;
