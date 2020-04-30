import React, { Component } from 'react';
import Axios from 'axios';
import { authenticationService } from '../../services/authentication.service'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Image, InputGroup } from "react-bootstrap";
import superheld from "../../superheld.png";
import './Post.scss';

export default class PostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post_id: props.id,
            isLoaded: false,
            liked: false,
            error: null,
            data: [],
            comment: "",
            comm_id: ''
        };
        this.handleComment = this.handleComment.bind(this);
        this.OnDeletePost = this.OnDeletePost.bind(this);
        //this.OnDeleteComment = this.OnDeleteComment.bind(this);
        this.reloadData = this.reloadData.bind(this);

    }
    reloadData() {
        Axios.get(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/post/${this.state.post_id}`)
            .then((response) => response.data)
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        data: data.result
                    })
                    console.log(data);
                }
                ,
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }
    componentDidMount() {
        this.reloadData();
    }
    updateInput = (event) => {
        this.setState({
            comment: event.target.value
        })
    }
    handleComment = (event) => {
        event.preventDefault();
        const { post_id, isLoaded, liked, error, data, comment } = this.state;
        const user_id = authenticationService.currentUserValue._id;
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/comment`,
            { feed_id: post_id, user_id: user_id, comment: comment })
            .catch(function (error) {
                console.log(error);
            })
            .then(this.setState({ comment: "" }))
            .then(setTimeout(this.reloadData, 500));
    }

    OnDeletePost() {     
        Axios.delete(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/post/${this.state.post_id}`);
    }

    OnDeleteComment(id) {
             
         Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/comment/delete/${id}`,
         { feed_id: this.state.post_id}).then(setTimeout(this.reloadData, 500));

    }

    isAdminComment(id) {

        const admin = authenticationService.currentUserValue.admin;
        if (admin) {
            return <ion-icon key={id} size="large" name="close-circle-outline" onClick={this.OnDeleteComment.bind(this, id)}></ion-icon>

        }
        else {
            return <ion-icon size="large" name="close-circle-outline"></ion-icon>

    }}

    isAdminPost() {

        const admin = authenticationService.currentUserValue.admin;
        if (admin) {
            return <ion-icon size="large" name="close-circle-outline" onClick={this.OnDeletePost}></ion-icon>
        }
        else {
            return <ion-icon size="large" name="close-circle-outline"></ion-icon>
        }
    }

    render() {

        if (authenticationService.currentUserValue == null) return <Container>Logge dich bitte ein um diesen Inhalt zu sehen!</Container>
        const { post_id, isLoaded, error, data, comment } = this.state


        if (error) {
            return <Container>Error: {error.message}</Container>;
        } else if (!isLoaded) {
            return <Container>Lädt...</Container>;


        } else {
            const ReactMarkdown = require('react-markdown');
            const kommentare = data.comments.reverse().map((it) => it)
            const kommentarItems = kommentare.map((kommentar) =>

                <div className="comment">
                    <div id="comment-container">
                        <div id="user-pic">
                            <Image src={superheld} width="40" roundedCircle />
                        </div>
                        <ul id="user-comment">
                            <li className="comment-username">{this.state.data.username}</li>
                            <li>{kommentar.comment}</li>
                        </ul>
                    </div>
                    <div id="delete-comment" >
                        {this.isAdminComment(kommentar._id)}</div>
                </div>);
            return <div className="feedItem">
                <div className="top-bar" onClick={this.OnRedirect}>
                    <div >
                        <div className="top-wrapper" sm={{ span: 10, offset: 2 }}>
                            <h1>{data.title}</h1>
                            <div id="delete-post">{this.isAdminPost()}</div>
                        </div>
                        <div className="feed-time">{data.published}</div>
                    </div>
                    <div className="post-wrapper">
                        <div className="user-avatar">
                            <Image src={superheld} width="40" roundedCircle />
                        </div>
                        <ul id="post-content">
                            <li className="comment-username">Firstname</li>
                            <li>{data.content}</li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-bar">
                    <div className="icon-div">
                        <div className="likes">
                            <ion-icon size="large" name="heart-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="icon-div">
                        <div className="icon-p">
                            <ion-icon size="large" name="chatbox-ellipses-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="comment-bar">
                    <Form className="comment-form" onSubmit={this.handleComment}>
                        <Form.Group controlId="formComment">
                            <Form.Control type="comment" placeholder="Hier kannst du kommentieren" name="comment"
                                onChange={this.updateInput} value={comment} />
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