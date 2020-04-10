import React, { Component } from 'react';
import { Button, Container, Row, Col, Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import likeIcon from "../../icon_like.png"
import "./Story.scss";

const StoryCard = props => (
    <Col sm={6}>
        <Card className="mb-4">
            <Card.Body>
                <Card.Title><strong>{props.story.title}</strong></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <strong>{props.story.author}</strong>
                </Card.Subtitle>
                <Card.Text>{props.story.shortDescription}</Card.Text>
                <Container>
                    <Row className="justify-content-between">
                        <Col>
                            <Button variant="flat" size="sm" active>
                                <Link to={"/geschichte/" + props.story._id}>
                                    Geschichte lesen
                                </Link>
                            </Button>
                        </Col>
                        <Media>
                            <img
                                className="img-fluid mr-1"
                                src={likeIcon}
                                alt="Like"
                                width="23"
                                height="23"
                            />
                            <Media.Body>
                                <h5><strong>{props.story.numberOfLikes.length}</strong></h5>
                            </Media.Body>
                        </Media>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    </Col>
)

export default class StoryList extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearchCriteria = this.onChangeSearchCriteria.bind(this);

        /* TODO: exchange hard coded data with data from the database */
        this.state = {
            searchCriteria: "",
            stories: [{
                _id: 1,
                title: "Story title - 1",
                author: "Author",
                shortDescription: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                category: "category1",
                numberOfLikes: ["id1"]
            },
            {
                _id: 2,
                title: "Story title - 2",
                author: "Author",
                shortDescription: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                category: "category2",
                numberOfLikes: ["id1", "id2"]
            },
            {
                _id: 3,
                title: "Story title - 3",
                author: "Author",
                shortDescription: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                category: "category3",
                numberOfLikes: ["id1", "id2", "id3"]
            }]
        };
    }

    onChangeSearchCriteria(e) {
        this.setState({
            searchCriteria: e.target.value
        });
    }

    storyList() {
        let criteria = this.state.searchCriteria;
        let filteredsStories = this.state.stories.filter(function (story) {
            return story.title.includes(criteria);
        });

        return filteredsStories.map(function (currentStory, index) {
            return <StoryCard story={currentStory} key={index} />;
        });
    }

    render() {
        return (
            <Container className="zs-style">
                <br />
                <input className="form-control"
                    type="text"
                    placeholder="Suche nach Titel"
                    aria-label="Search"
                    value={this.state.searchCriteria}
                    onChange={this.onChangeSearchCriteria}
                />
                <br />
                <Row>
                    {this.storyList()}
                </Row>
            </Container >
        );
    }
}
