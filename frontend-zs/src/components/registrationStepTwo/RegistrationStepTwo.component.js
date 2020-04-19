import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import { Formik, Field, ErrorMessage } from 'formik';
import {userService} from "../../services/userService";

import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

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
      .required('Required'),
    parentPin: yup.string()
      .max(4, 'Invalid pin. Must be 4 digits')
      .matches(/^[0-9]{4}$/, 'Invalid pin. Must be 4 digits')
      .required('Required'),
  });

  const handleRegistration = async (values, { setSubmitting }) => {
    const body = {
      firstname: values.firstName,
      birthdate: values.birthdate,
      city: values.city,
      country: values.country,
      parentPin: values.parentPin,
      registrationComplete: true,
      avatar: avatar
    };

    // const response = await axios.post('http://localhost:3001/api/registration', body);
    const response = await userService.updateUser(body);
    //let history = useHistory()
    /*if (response.status === 200) {
      //need to redirect here!
      this.history.push('/stories')
    } else {
      this.history.push('/login')
    }*/

    setSubmitting(false);

  };

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [avatar, setAvatar] = useState(null);

  const onPickImage = (avatar) => {
    setAvatar(avatar.src);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleRegistration}
      initialValues={{
        firstName: 'test',
        birthdate: '2020-04-01',
        city: 'test',
        country: 'test',
        parentPin: '1111',
      }}
    >
      {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="firstName">First Name</Form.Label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="city">City Name</Form.Label>
            <Field name="city" type="text" />
            <ErrorMessage name="city" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="country">Country Name</Form.Label>
            <Field name="country" type="text" />
            <ErrorMessage name="country" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="birthdate">Date of Birth</Form.Label>
            <Field name="birthdate" type="date" />
            <ErrorMessage name="birthdate" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="parentPin">Pin</Form.Label>
            <Field name="parentPin" type="text" />
            <ErrorMessage name="parentPin" />
          </Form.Group>
          <ImagePicker
            images={avatars.map((image, i) => ({src: image, value: i}))}
            onPick={onPickImage.bind(this)}
          />
          <Button variant="primary" type="submit" onSubmit={handleSubmit}>Submit</Button>
        </Form>
      )}
    </Formik>
  );

};

export default RegistrationStepTwo;
