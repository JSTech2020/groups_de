import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap'
import './Story.scss'
import likeIcon from '../../icon_like.png'


export default function StoryQuestionLike(currentUserId, numberLikes, onLikeClicked) {
    const [storyLiked, setStoryLiked] = useState(false)

    useEffect(() => {
        setStoryLiked(numberLikes.includes(currentUserId))
    }, [numberLikes, currentUserId])

    const handleClick = (evt) => {
        evt.preventDefault();
        onLikeClicked(!storyLiked)
        setStoryLiked(!storyLiked)
    };

    return (
        <div className="ml-4 mt-4">
            <Row >
                <Col className="col-auto my-auto">
                    <h4>Gefällt dir diese Geschichte?</h4>
                </Col>
                <Col className="col-auto my-auto">
                    <Button variant={storyLiked ? "like"
                        : "like-outline"}
                        onClick={handleClick} >
                        <Image
                            src={likeIcon}
                            width="27"
                            height="27"
                            fluid
                        />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="text-muted" >
                        {storyLiked ? 'Dir gefällt diese Geschichte.' : ''}
                    </h5>
                </Col>
            </Row>
        </div>)
}
