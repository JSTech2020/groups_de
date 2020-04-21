import React from 'react';
import { Button, Row, Col, Card, Media, Image, CardColumns } from 'react-bootstrap'
import likeIcon from '../../icon_like.png'
import { Link } from 'react-router-dom'
import './Story.scss'

function StoryCard(story) {
    return (
        <Card className="mb-4" key={story.title}>
            <Card.Header style={{ backgroundColor: '#5F696A' }} />
            <Card.Body>
                <Card.Title><strong>{story.title}</strong></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <strong>{story.author}</strong>
                </Card.Subtitle>
                {story.categories.length ?
                    (<Card.Subtitle className="mb-2 text-muted">
                        <strong>
                            {story.categories.toString().replace(/,/g, ", ")}
                        </strong>
                    </Card.Subtitle>) : null}
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
    )
}

export default function StoryCardList(stories) {
    return (
        <CardColumns>
            {stories.map((story) => {
                return StoryCard(story)
            })}
        </CardColumns>
    )
}
