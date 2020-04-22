import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "./FeedItem.scss"
import heart from '../../resources/heart.svg'
import heart_filled from '../../resources/heart_filled.svg'

import comment from '../../resources/comment.svg'
import arrowDown from '../../resources/arrow-down.svg'
import superheld from "../../superheld.png";
import {authenticationService} from '../../services/authentication.service'
import Axios from 'axios';

export default class FeedItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            liked: authenticationService.currentUserValue.likes.includes(props.data._id),
            data: props.data,
            feed_id: props.data._id,
            number_likes : props.data.numberLikes}
        this.OnLike = this.OnLike.bind(this);

    }
    OnLike()
    {
        const {liked, data, feed_id, number_likes} = this.state;
        const likes =authenticationService.currentUserValue.likes
        const user_id = authenticationService.currentUserValue._id
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/like/`,
            {feed_id: feed_id, user_id: user_id});
        if(this.state.liked) {
            likes.push(feed_id);
            this.setState({liked: !liked, number_likes: number_likes - 1})
        }
        else {
            const likesIndex = likes.indexOf(feed_id)
            likes.slice(likesIndex,1);
            this.setState({liked: !liked, number_likes: number_likes + 1})
        }
    }
    render()
    {
        const {liked, data, feed_id, number_likes} = this.state;
        const LikeButton = liked?<Image src={heart_filled} className="heart" onClick={this.OnLike}/>:<Image src={heart} className="heart" onClick={this.OnLike}/>


        return <div className="feedItem">
            <div className="top-bar">
                <div className="top-bar-side-left">
                    <div className="top-bar-side-left">
                    <div className="top-bar-side-left-icon">
                        <Image src={superheld} className="profile" roundedCircle />
                    </div>

                <div className="top-bar-side-left-title">
                    <div><div className="feedTitle"><h1>{data.title}</h1></div>
                    <div className="feed-time">{data.published}</div></div>
                </div>
                    </div>
                </div>
                <div className="top-bar-side-right">
                        <Image src={arrowDown} className="arrow-down"/>
                </div>
            </div>
            <div className= "feedContent">{data.content}</div>
            <div className="bottom-bar">
                <div className="icon-div">
                        <div className="likes">
                            {LikeButton}
                            <div className="likeNumber">{number_likes}</div>
                </div>
                </div>
                <div className="icon-div">
                    <p className="icon-p">
                        <Image src={comment} className="icon-img"/></p>
                </div>
            </div>
        </div>
    }

}