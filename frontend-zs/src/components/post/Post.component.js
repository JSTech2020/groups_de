import React, { Component } from 'react';
import Axios from 'axios';
import {authenticationService} from '../../services/authentication.service'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Image, InputGroup} from "react-bootstrap";
import superheld from "../../superheld.png";
import heart from '../../resources/heart.svg'

export default class PostComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            post_id : props.id,
            isLoaded: false,
            liked: false,
            error: null,
            data: [],
            comment:""}
        this.handleComment = this.handleComment.bind(this);

    }
    componentDidMount() {
        Axios.get(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/post/${this.state.post_id}`)
            .then((response) => response.data)
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        data: data.result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }
    updateInput = (event) => {
        this.setState({
            comment: event.target.value
        })
    }
    handleComment()
    {
        const {post_id, isLoaded, liked, error, data, comment} = this.state;
        const user_id = authenticationService.currentUserValue._id
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/comment/`,
            {post_id: post_id, user_id: user_id, comment: comment});
    }

    render()
    {
        const ReactMarkdown = require('react-markdown')
        if(authenticationService.currentUserValue == null) return <Container>Logge dich bitte ein um diesen Inhalt zu sehen!</Container>
        const {post_id, isLoaded,error, data, comment} = this.state
        if (error) {
            return <Container>Error: {error.message}</Container>;
        } else if (!isLoaded) {
            return <Container>Lädt...</Container>;


        } else {
            return <Container>
                <Row style={{fontSize: 40}}>
                    <strong>
                    {data.title}
                    </strong>
                </Row>
                <Row className="align-items-center">
                    <Col xs={1} md={1}>
                        <Image src={superheld} roundedCircle  thumbnail />
                    </Col>
                    <Col xs={2} md={3} >
                        <strong>

                        {data.username}
                        </strong>

                    </Col>
                </Row>
                <Row>
                    <ReactMarkdown source={data.content} />
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm ={4} md={4}></Col>
                    <Col className="align-items-center" sm ={1} md={1}>
                    <Image src={heart} fluid/>
                    </Col>
                    <Col sm ={4} md={4}></Col>

                </Row>
                <Row>
                    <Form onSubmit={this.handleComment}>

                        <Form.Group controlId="formComment">
                            <Form.Control type="comment" placeholder="Hier kannst du kommentieren" name="comment"
                                          onChange={this.updateInput}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Kommentiere</Button>
                        </Form>

                </Row>
                <Row>

                </Row>
            </Container>
        }
    }

}