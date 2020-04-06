import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Signup extends React.Component {
    submitHandler = (event) => {
        console.log(this.state.email);
        console.log(this.state.password);
        event.preventDefault();
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    };

    render() {
        return (
            <Form onSubmit={this.submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
        );
    }
}



export default Signup;
