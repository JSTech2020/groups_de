import React from 'react'
import { Button, Container, Row, Col, Card, Media, Image, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import likeIcon from '../../icon_like.png'
import './Story.scss'

const StoryCard = props => (
    <Col sm={6}>
        <Card className="mb-4">
            <Card.Header style={{ backgroundColor: '#5F696A' }} />
            <Card.Body>
                <Card.Title><strong>{props.story.title}</strong></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <strong>{props.story.author}</strong>
                </Card.Subtitle>
                <Card.Text>{props.story.shortDescription}</Card.Text>
                <Row className="justify-content-between">
                    <Col>
                        <Button variant="card" size="sm" active>
                            <Link to={"/story/" + props.story._id}>
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
                            <h5><strong>{props.story.numberLikes.length}</strong></h5>
                        </Media.Body>
                    </Media>
                </Row>
            </Card.Body>
        </Card>
    </Col>
)

export default class StoryList extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeSearchCriteria = this.onChangeSearchCriteria.bind(this)

        this.state = {
            searchCriteria: '',
            stories: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/api/stories')
            .then(response => {
                this.setState({ stories: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeSearchCriteria(e) {
        this.setState({
            searchCriteria: e.target.value
        })
    }

    renderStoryList() {
        let criteria = this.state.searchCriteria
        let filteredStories = this.state.stories.filter(function (story) {
            return story.title.toUpperCase().includes(criteria.toUpperCase())
        })

        return filteredStories.map(function (currentStory, index) {
            return <StoryCard story={currentStory} key={index} />
        })
    }

    render() {
        return (
            <Container className="zs-style mt-3">
                <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Suche nach Titel"
                    aria-label="Search"
                    value={this.state.searchCriteria}
                    onChange={this.onChangeSearchCriteria}
                />
                <Row>
                    {this.renderStoryList()}
                </Row>
            </Container >
        )
    }
}
