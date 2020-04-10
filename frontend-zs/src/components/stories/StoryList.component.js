import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import likeIcon from "../../icon_like.png"

const StoryCard = props => (
    <div className="col-sm-6">
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{props.story.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {props.story.author}
                </h6>
                <p className="card-text">{props.story.shortDescription}</p>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col">
                            <Link to={"/geschichte/" + props.story._id} className="btn btn-warning btn-sm" >
                                Geschichte lesen
                            </Link>
                        </div>
                        <div className="media">
                            <img
                                className="img-fluid mr-1 float-right"
                                src={likeIcon}
                                alt="Like"
                                width="23"
                                height="23"
                            />
                            <div className="media-body">
                                <h5 className="font-weight-bold" >
                                    {props.story.numberOfLikes.length}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            <div className="container">
                <br />
                <input className="form-control"
                    type="text" placeholder="Suche nach Titel"
                    aria-label="Search"
                    value={this.state.searchCriteria}
                    onChange={this.onChangeSearchCriteria}
                />
                <br />
                <div className="row">
                    {this.storyList()}
                </div>
            </div >
        );
    }
}
