import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "./FeedItem.scss"

import superheld from "../../superheld.png";
import { authenticationService } from '../../services/authentication.service'
import Axios from 'axios';
import { useHistory } from "react-router-dom";

export default class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: authenticationService.currentUserValue.likes.includes(props.data._id),
            data: props.data,
            feed_id: props.data._id,
            number_likes: props.data.numberLikes
        }
        this.OnLike = this.OnLike.bind(this);
        this.OnDelete = this.OnDelete.bind(this);
        this.OnRedirect = this.OnRedirect.bind(this);
    }
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
    }

    OnRedirect() {
        this.props.history.push(`/post/${this.state.feed_id}`);
    }
    isAdmin() {
        const admin = authenticationService.currentUserValue.admin;
        if (admin) {
            return <ion-icon size="large" name="close-circle-outline" ></ion-icon>
        }
        else {
            return <ion-icon size="large" name="close-circle-outline" onClick={this.OnDelete}></ion-icon>
        }
    }
    render() {
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
        </div>
    }

}