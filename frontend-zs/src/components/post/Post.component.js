import React, { Component } from 'react';
import Axios from 'axios';
import { authenticationService } from '../../services/authentication.service'
import Form from 'react-bootstrap/Form';
import { Container, Image } from "react-bootstrap";
import './Post.scss';
import { Button, Modal } from 'react-bootstrap';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';
import { Redirect } from 'react-router-dom'

export default class PostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post_id: props.id,
            isLoaded: false,
            liked: authenticationService.currentUserValue.likes.includes(props._id),
            number_likes: 0,
            error: null,
            data: [],
            comment: "",
            comm_id: '',
            show: false,
            post_deleted: false,
        };
        this.handleComment = this.handleComment.bind(this);
        this.OnDeletePost = this.OnDeletePost.bind(this);
        this.reloadData = this.reloadData.bind(this);
        this.OnLike = this.OnLike.bind(this);

    }
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    reloadData() {
        Axios.get(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/post/${this.state.post_id}`)
            .then((response) => response.data)
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        data: data.result,
                        number_likes: data.result.numberLikes,
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
        const firstname = authenticationService.currentUserValue.firstname;
        const avatar = authenticationService.currentUserValue.avatar;
        console.log(avatar)
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/comment`,
            { feed_id: post_id, user_id: user_id, comment: comment, firstname: firstname, avatar: avatar })
            .catch(function (error) {
                console.log(error);
            })
            .then(this.setState({ comment: "" }))
            .then(setTimeout(this.reloadData, 500));
    }

    OnDeletePost() {
        try {
            Axios.delete(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/post/${this.state.post_id}`)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ post_deleted: true });
                    }
                });
            this.handleClose();
        } catch (e) {
            console.log(e);
        }
    }

    OnDeleteComment(id) {
        try {
            Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/comment/delete/${id}`,
                { feed_id: this.state.post_id }).then(setTimeout(this.reloadData, 500));
            this.handleClose();
        } catch (e) {
            console.log(e);
        }
    }

    isAdminComment(id) {
        const admin = authenticationService.currentUserValue.admin;
        if (admin) {
            return <IosCloseCircleOutline key={id} size="large" name="close-circle-outline" onClick={this.OnDeleteComment.bind(this, id)}></IosCloseCircleOutline>
        }
    }

    isAdminPost() {

        const admin = authenticationService.currentUserValue.admin;
        if (admin) {
            return <IosCloseCircleOutline size="large" name="close-circle-outline" onClick={this.handleShow}></IosCloseCircleOutline>
        }
    }

    OnLike(){
        const { post_id, isLoaded,liked, number_likes, error, data, comment, comm_id, show, post_deleted } = this.state
        const likes = authenticationService.currentUserValue.likes
        const user_id = authenticationService.currentUserValue._id
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/like/`,
            { feed_id: post_id, user_id: user_id });
        if (this.state.liked) {
            likes.push(post_id);
            this.setState({ liked: !liked, number_likes: number_likes - 1 })
        }
        else {
            const likesIndex = likes.indexOf(post_id)
            likes.slice(likesIndex, 1);
            this.setState({ liked: !liked, number_likes: number_likes + 1 })
        }

    }

    render() {
        if (authenticationService.currentUserValue == null) return <Container>Logge dich bitte ein um diesen Inhalt zu sehen!</Container>
        const { post_id, isLoaded,liked, number_likes, error, data, comment, comm_id, show, post_deleted } = this.state

        if (error) {
            return <Container>Error: {error.message}</Container>;
        } else if (!isLoaded) {
            return <Container>Lädt...</Container>;

        } else if (this.state.post_deleted === true) {
            return <Redirect to="/mitreden" />
        }

        else {
            const ReactMarkdown = require('react-markdown');
            const LikeButton = liked ? <ion-icon size="large" name="heart" id="heart-liked" onClick={this.OnLike}></ion-icon> : <ion-icon size="large" name="heart-outline" id="heart" onClick={this.OnLike}></ion-icon>

            const kommentare = data.comments.reverse().map((it) => it)
            const kommentarItems = kommentare.map((kommentar) =>

                <div className="comment">
                    <div id="comment-container">
                        <div id="user-pic">
                            <Image src={kommentar.avatar} width="40" roundedCircle />
                        </div>
                        <ul id="user-comment">
                            <li className="comment-username">{kommentar.firstname}</li>
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
                            <Image src={data.avatar} width="40" roundedCircle />
                        </div>
                        <ul id="post-content">
                            <li className="comment-username">{data.username}</li>
                            <li><ReactMarkdown source={data.content} /></li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-bar">
                    <div className="icon-div">
                        <div className="likes">
                            {LikeButton}
                            <div className="likeNumber">{number_likes}</div>

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
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Beitrag löschen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Möchtest du den gesamten Beitrag löschen?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Schließen</Button>
                        <Button variant="primary" onClick={this.OnDeletePost}>Löschen</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        }
    }

}

