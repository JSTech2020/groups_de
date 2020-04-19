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
        this.state = { liked: props.data.liked, data: props.data, feed_id: props.data._id}
        this.OnLike = this.OnLike.bind(this);
    }
    OnLike()
    {
        Axios.post(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/like/`,
            {feed_id: this.state.feed_id, user_id: authenticationService.currentUserValue.user._id});
        this.setState({liked: !this.state.liked})
    }
    render()
    {
        const {liked, data, feed_id} = this.state;
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
                            <div className="likeNumber">{data.numberLikes}</div>
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