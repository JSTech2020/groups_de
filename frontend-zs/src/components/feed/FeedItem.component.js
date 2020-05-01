import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "./FeedItem.scss"

import superheld from "../../superheld.png";
import { authenticationService } from '../../services/authentication.service'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline'

export default class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: authenticationService.currentUserValue.likes.includes(props.data._id),
            data: props.data,
            feed_id: props.data._id,
            username: props.data.username,
            avatar: props.data.avatar,
            number_likes: props.data.numberLikes,
            show: false,
        }
        this.OnLike = this.OnLike.bind(this);
        this.OnDelete = this.OnDelete.bind(this);
        this.OnRedirect = this.OnRedirect.bind(this);
    }
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    OnLike() {
        const { liked, data, feed_id, number_likes } = this.state;
        const likes = authenticationService.currentUserValue.likes
        const user_id = authenticationService.currentUserValue._id
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/like/`,
            { feed_id: feed_id, user_id: user_id });
        if (this.state.liked) {
            likes.push(feed_id);
            this.setState({ liked: !liked, number_likes: number_likes - 1 })
        }
        else {
            const likesIndex = likes.indexOf(feed_id)
            likes.slice(likesIndex, 1);
            this.setState({ liked: !liked, number_likes: number_likes + 1 })
        }
    }
    OnDelete() {
        Axios.delete(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/post/${this.state.feed_id}`);
        this.handleClose();
    }

    OnRedirect() {
        this.props.history.push(`/post/${this.state.feed_id}`);
    }
    isAdmin() {
        const admin = authenticationService.currentUserValue.admin;
        if (admin) {
            return <IosCloseCircleOutline size="large" name="close-circle-outline" onClick={this.handleShow}></IosCloseCircleOutline>
        }
          }

    render() {
        const ReactMarkdown = require('react-markdown');
        const { liked, data, feed_id, number_likes } = this.state;
        const LikeButton = liked ? <ion-icon size="large" name="heart" id="heart-liked" onClick={this.OnLike}></ion-icon> : <ion-icon size="large" name="heart-outline" id="heart" onClick={this.OnLike}></ion-icon>

        return <div className="feedItem" sm={{ span: 4, offset: 4 }}>
            <div className="top-bar" >
                <div >
               
                    <div className="top-wrapper" sm={{ span: 10, offset: 2 }}>
                        <h1>{data.title}</h1>
                        <div id="delete-post">{this.isAdmin()}</div>
                    </div>
                    <div className="feed-time">{data.published}</div>
                </div>
                <div className="post-wrapper">
                    <div className="user-avatar">
                        <Image src={data.avatar} width="40" roundedCircle />
                    </div>
                    <ul id="post-content">
                        <li className="comment-username">{data.username}</li>
                        <li><ReactMarkdown source={data.content}/></li>
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
                    <p className="icon-p">
                        <ion-icon size="large" name="chatbox-ellipses-outline" className="icon-img" onClick={this.OnRedirect}></ion-icon>
                    </p>
                </div>
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
                    <Button variant="primary" onClick={this.OnDelete}>Löschen</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }

}