import React from 'react';
import { Button, Row, Col, Card, Media, Image } from 'react-bootstrap'
import likeIcon from '../../icon_like.png'
import { Link } from 'react-router-dom'
import './Story.scss'

function StoryCard(story) {
    return (
        <Col sm={6}>
            <Card className="mb-4">
                <Card.Header style={{ backgroundColor: '#5F696A' }} />
                <Card.Body>
                    <Card.Title><strong>{story.title}</strong></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <strong>{story.author}</strong>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                        <strong>
                            {story.categories.map((category) => {
                                if (category == story.categories.slice(-1).pop())
                                    return category
                                else return category + ", "
                            })}
                        </strong>
                    </Card.Subtitle>
                    <Card.Text>{story.shortDescription}</Card.Text>
                    <Row className="justify-content-between">
                        <Col>
                            <Button variant="card" size="sm" active >
                                <Link to={"/story/" + story._id}>
                                    Geschichte lesen
                            </Link>
                            </Button>
                        </Col>
                        <Media className="mr-4">
                            <Image
                                className="mr-1"
                                src={likeIcon}
                                width="23"
                                height="23"
                                fluid
                            />
                            <Media.Body>
                                <h5><strong>{story.numberLikes.length}</strong></h5>
                            </Media.Body>
                        </Media>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default function StoryCarsList(stories) {
    return (
        <Row>
            {stories.map((story) => {
                return StoryCard(story)
            })}
        </Row>
    )
}
