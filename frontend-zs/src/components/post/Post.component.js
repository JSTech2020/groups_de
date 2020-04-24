import React, { Component } from 'react';
import Axios from 'axios';
import {authenticationService} from '../../services/authentication.service'
import { Container, Row, Col } from "react-bootstrap";


export default class PostComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id : props.id,
            data: [] }
    }

    render()
    {
        return <Container>
            <Row>
            </Row>
        <Row>

        </Row>
        </Container>
    }

}