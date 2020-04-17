import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "./FeedItem.scss"
import heart from '../../resources/heart.svg'
import comment from '../../resources/comment.svg'
import arrowDown from '../../resources/arrow-down.svg'
import superheld from "../../superheld.png";

export default class FeedItem extends Component{
    constructor(props) {
        super(props);
        this.state = { liked: false, data: props.data }
    }
    render()
    {
        return <div className="feedItem">
            <div className="top-bar">
                <div className="top-bar-side">
                    <div className="top-bar-side-left-icon">
                        <Image src={superheld} className="profile" roundedCircle />
                    </div>

                <div className="top-bar-side-left-title">
                    <div><div className="feedTitle"><h1>{this.state.data.title}</h1></div>
                    <div className="feed-time">{this.state.data.published}</div></div>
                </div>
                </div>
                <div className="top-bar-side">
                        <Image src={arrowDown} className="arrow-down"/>
                </div>
            </div>
            <div className= "feedContent">{this.state.data.content}</div>
            <div className="bottom-bar">
                <div className="icon-div">
                        <div className="likes">
                            <Image src={heart} className="heart"/>
                        <div className="likeNumber">{this.state.data.numberLikes}</div>
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