import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
//import { Form } from 'formik';
import { Formik, Field, ErrorMessage } from 'formik';

const schema = yup.object({
    firstName: yup.string()
        .max(15)
        .matches(/^[a-z]$/i, 'Invalid first name')
        .required('Required'),
    dateOfBirth: yup.date()
        .max(new Date(), 'Invalid Birthdate')
        .required('Required'),
    pin: yup.string()
        .max(4, 'Invalid pin. Must be 4 digits')
        .matches(/^[0-9]{4}$/, 'Invalid pin. Must be 4 digits')
        .required('Required'),
});

const RegistrationStepTwo = () => {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
            initialValues={{
                firstName: '',
                dateOfBirth: '',
                pin: '',
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
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group>
                            <h3> Account Information</h3>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <ErrorMessage name="firstName" />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <Field name="dateOfBirth" type="date" />
                            <ErrorMessage name="dateOfBirth" />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="pin">Pin</label>
                            <Field name="pin" type="text" />
                            <ErrorMessage name="pin" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                )}
        </Formik>

    );

};

export default RegistrationStepTwo;