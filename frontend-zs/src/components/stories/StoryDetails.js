
import React from 'react';
import { Row, Col, Media, Image } from 'react-bootstrap'
import likeIcon from '../../icon_like.png'
import './Story.scss'

export default function StoryDetails(story) {
    return (
        <Row className="justify-content-between ml-3">
            <Col className="mt-4">
                <h2><strong>{story.title}</strong></h2>
                {story.authorImage.length ? null : (
                    <h4 className="text-muted"><strong>{story.author}</strong></h4>
                )}
                <h4 className="text-muted"><strong>{story.category}</strong></h4>
                <Media>
                    <Image
                        className="mr-1"
                        src={likeIcon}
                        width="35"
                        height="35"
                        fluid
                    />
                    <Media.Body>
                        <h3><strong>{story.numberLikes.length}</strong></h3>
                    </Media.Body>
                </Media>
            </Col>
            {story.authorImage.length ? (
                <Col className="col-auto mr-4">
                    <Image
                        className="mb-2"
                        src={story.authorImage}
                        width="130"
                        fluid
                        thumbnail />
                    <p className="text-center text-muted h5"><strong>{story.author}</strong></p>
                </Col>
            ) : null}
        </Row >
    )
}
