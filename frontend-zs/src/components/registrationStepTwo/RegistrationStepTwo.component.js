import React from "react";
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import { yup } from 'yup';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const schema = yup.object({
    firstName: yup.string().required(),
    dateOfBirth: yup.date().max(new Date().toString()).required(),
    pin: yup.string().required(),
});

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.dateOfBirth) {
        errors.dateOfBirth = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.pin) {
        errors.pin = 'Required';
    } else if (!/^[0-9]{4}$/.test(values.pin)) {
        errors.pin = 'Invalid pin';
    }

    return errors;
};

function RegistrationStepTwo() {
    return (
        <Formik
            validationSchema={schema}
            validate={validate}
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
                        <h3> Account Information</h3>
                        <Form.Group controlId="formFirstName">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <ErrorMessage name="firstName" />
                        </Form.Group>

                        <Form.Group controlId="formBirthDate">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={values.dateOfBirth}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.dateOfBirth && !errors.dateOfBirth}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.dateOfBirth}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="validationCustom01">
                            <Form.Label>Parent Pin</Form.Label>
                            <Form.Control
                                id="pin"
                                name="pin"
                                type="password"
                                value={values.pin}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.pin && !errors.pin}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                )}
        </Formik>

    );

}


export default RegistrationStepTwo;