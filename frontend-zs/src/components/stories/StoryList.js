import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import Axios from 'axios';
import './Story.scss'
import StoryCardList from './StoryCard'

export default function StoryList() {

    const [allStories, setAllStories] = useState([])
    const [displayStories, setDisplayStories] = useState(allStories)

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories')
            .then(response => {
                setAllStories(response.data);
                setDisplayStories(response.data)
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, [])

    function onSearch(searchText) {
        searchText = searchText.toLowerCase()
        if (searchText !== '')
            setDisplayStories(allStories.filter(story =>
                story.title.toLowerCase().includes(searchText)))
        else setDisplayStories(allStories)
    }

    return (
        <Container className="zs-style mt-3">
            <Form.Control
                className="mb-3"
                type="text"
                placeholder="Suche nach Titel"
                onChange={(evt) => onSearch(evt.target.value)} />
            {StoryCardList(displayStories)}
        </Container >
    )
}
