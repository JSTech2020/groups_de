import React, { Component } from 'react';
import Axios from 'axios';
import { authenticationService } from '../../services/authentication.service'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Image, InputGroup } from "react-bootstrap";
import superheld from "../../superheld.png";
import heart from '../../resources/heart.svg'
import './Post.scss';
import commentButton from '../../resources/comment.svg';
import arrowDown from '../../resources/arrow-down.svg';

export default class PostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post_id: props.id,
            isLoaded: false,
            liked: false,
            error: null,
            data: [],
            comment: ""
        }
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
    handleComment() {
        const { post_id, isLoaded, liked, error, data, comment } = this.state;
        const user_id = authenticationService.currentUserValue._id
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/comment/`,
            { post_id: post_id, user_id: user_id, comment: comment });
    }

    render() {
        const ReactMarkdown = require('react-markdown');
        const kommentare = ["Pariatur eius fugit sunt. Quia et quasi alias nihil saepe non reprehenderit eveniet. Assumenda fugiat nam. Optio qui delectus et esse quibusdam in. Atque eum commodi minima voluptates quidem rerum omnis ipsa. Nihil facilis", "Pariatur eius fugit sunt. Quia et quasi alias nihil saepe non reprehenderit eveniet. Assumenda fugiat nam. Optio qui delectus et esse quibusdam in. Atque eum commodi minima voluptates quidem rerum omnis ipsa. Nihil facilis", "Pariatur eius fugit sunt. Quia et quasi alias nihil saepe non reprehenderit eveniet. Assumenda fugiat nam. Optio qui delectus et esse quibusdam in. Atque eum commodi minima voluptates quidem rerum omnis ipsa. Nihil facilis"];
        const kommentarItems = kommentare.map((kommentar) =>
            <div className="comment">
                <div className="user-avatar">
                    <Image src={superheld} width="40" roundedCircle />
                </div>
                <ul>
                    <li className="comment-username">{this.state.data.username}</li>
                    <li>{kommentar}</li>
                </ul>
            </div>);
        if (authenticationService.currentUserValue == null) return <Container>Logge dich bitte ein um diesen Inhalt zu sehen!</Container>
        const { post_id, isLoaded, error, data, comment } = this.state
        if (error) {
            return <Container>Error: {error.message}</Container>;
        } else if (!isLoaded) {
            return <Container>Lädt...</Container>;


        } else {
            return <div className="feedItem">
                <div className="top-bar" onClick={this.OnRedirect}>

                    <div >
                        <h1>{data.title}</h1>
                        <div className="feed-time">{data.published}</div>
                    </div>
                    <div className="post-wrapper">
                        <div className="user-avatar">
                            <Image src={superheld} width="40" roundedCircle />
                        </div>
                        <ul>
                            <li className="comment-username">{data.username}</li>
                            <li>{data.content}</li>
                        </ul>
                    </div>

                </div>
                <div className="bottom-bar">
                    <div className="icon-div">
                        <div className="likes">
                            <Image src={heart} className="heart" />
                        </div>
                    </div>
                    <div className="icon-div">
                        <div className="icon-p">
                            <Image src={commentButton} className="comment-icon" /></div>
                    </div>
                </div>
                <div className="comment-bar">
                    <Form className="comment-form" onSubmit={this.handleComment}>
                        <Form.Group controlId="formComment">
                            <Form.Control type="comment" placeholder="Hier kannst du kommentieren" name="comment"
                                onChange={this.updateInput} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Kommentieren</Button>
                    </Form>
                </div>
                <div className="comment-wrapper">
                    {kommentarItems}
                </div>
            </div>
        }
    }

}