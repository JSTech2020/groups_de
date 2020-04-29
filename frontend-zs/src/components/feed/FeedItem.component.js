import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "./FeedItem.scss"
import heart from '../../resources/heart.svg'
import heart_filled from '../../resources/heart_filled.svg'

import comment from '../../resources/comment.svg'
import arrowDown from '../../resources/arrow-down.svg'
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
    OnRedirect() {
        this.props.history.push(`/post/${this.state.feed_id}`);
    }
    render() {
        const { liked, data, feed_id, number_likes } = this.state;
        const LikeButton = liked ? <Image src={heart_filled} className="heart" onClick={this.OnLike} /> : <Image src={heart} className="heart" onClick={this.OnLike} />

        return <div className="feedItem">
            <div className="top-bar" onClick={this.OnRedirect}>
                <div >
                    <div className="top-wrapper">
                        <h1>{data.title}</h1>
                        <Image className="arrow-down" src={arrowDown} />
                    </div>
                    <div className="feed-time">{data.published}</div>
                </div>
                <div className="post-wrapper">
                    <div className="user-avatar">
                        <Image src={superheld} width="40" roundedCircle />
                    </div>
                    <ul>
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
                        <Image src={comment} className="icon-img" onClick={this.OnRedirect} /></p>
                </div>
            </div>
        </div>
    }

}