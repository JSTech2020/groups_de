import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
//import { Form } from 'formik';
import { Formik, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { authHeader } from '../../helpers/authHeader';

const schema = yup.object({
    firstname: yup.string()
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
    try {
        const body = {
            firstname: values.firstname,
            birthdate: values.birthdate,
            city: values.city,
            country: values.country,
            parentPin: values.parentPin
        };
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3001/api/registrationStepTwo',
            headers: authHeader(),
            data: body
        });
        console.log(response);
    } catch (e) {
        console.log(e);
    }
};

const RegistrationStepTwo = () => {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleRegistration}
            initialValues={{
                firstName: '',
                birthdate: '',
                city: '',
                country: '',
                parentPin: '',
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                    <Form noValidate onSubmit={handleRegistration}>
                        <h3> Account Information</h3>
                        <Form.Group>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <ErrorMessage name="firstName" />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="city">City Name</label>
                            <Field name="city" type="text" />
                            <ErrorMessage name="city" />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="country">Country Name</label>
                            <Field name="country" type="text" />
                            <ErrorMessage name="country" />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="birthdate">Date of Birth</label>
                            <Field name="birthdate" type="date" />
                            <ErrorMessage name="birthdate" />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="pparentPinin">Pin</label>
                            <Field name="parentPin" type="text" />
                            <ErrorMessage name="parentPin" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onSubmit={handleRegistration}>Submit</Button>
                    </Form>
                )}
        </Formik>

    );

};

export default RegistrationStepTwo;