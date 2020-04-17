
import React from 'react';
import { Row, Col, Media, Image } from 'react-bootstrap'
import likeIcon from '../../icon_like.png'
import './Story.scss'

export default function StoryDetails(story) {
    return (
        <Row className="justify-content-between">
            <Col>
                <h3><strong>{story.title}</strong></h3>
                <h5 className="text-muted"><strong>{story.category}</strong></h5>
                <Media>
                    <Image
                        className="mr-1"
                        src={likeIcon}
                        width="30"
                        height="30"
                        fluid
                    />
                    <Media.Body>
                        <h4><strong>{console.log(story.numberLikes.length)}</strong></h4>
                    </Media.Body>
                </Media>
            </Col>
            <Col className="col-auto mr-4">
                <Image
                    className="mb-2"
                    src={story.authorImage}
                    width="130"
                    fluid
                    thumbnail />
                <p className="text-center text-muted h5"><strong>{story.author}</strong></p>
            </Col>
        </Row >
    )
}
