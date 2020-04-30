import React, { Component } from 'react';
import FeedItem from "./FeedItem.component";
import Button from 'react-bootstrap/Button';

import Axios from 'axios';
import {authenticationService} from '../../services/authentication.service'

export default class Feed extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            pageToLoad:1
        }
        this.loadNewPage = this.loadNewPage.bind(this);

    }

    componentDidMount() {
        Axios.get(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/0`)
            .then((response) => response.data)
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

    loadNewPage()
    {
        Axios.get(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/api/feed/${this.state.pageToLoad}`)
            .then((response) => response.data)
            .then(
                (newdata) => {
                    const data = this.state.data.concat(newdata.result);
                    this.setState({
                        isLoaded: true,
                        data: data,
                        pageToLoad: this.state.pageToLoad+1
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
        if(authenticationService.currentUserValue == null) return <div>Logge dich bitte ein um diesen Inhalt zu sehen!</div>
        const {error, isLoaded, data} = this.state
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;


        } else {
            return <div><div> {data.map(item => <FeedItem data={item} history={this.state.history}/>)}</div>
            <Button onClick={this.loadNewPage}>Lade mehr</Button></div>
        }
    }
}
