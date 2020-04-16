import React, { Component } from 'react';
import FeedItem from "./FeedItem.component";

export default class Feed extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: [] }
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed`)
            .then((response) => response.json())
            .then(
                (data) => {
                this.setState({
                    isLoaded: true,
                    data: data.result
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const {error, isLoaded, data} = this.state
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return data.map(item => <FeedItem data={item}/>)
        }
    }
}
