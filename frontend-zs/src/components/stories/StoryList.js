import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Axios from 'axios';
import './Story.scss'
import StoryCardList from './StoryCard'
import StoryFilter from './StoryFilter'

export default function StoryList() {

    const [allStories, setAllStories] = useState([])
    const [displayStories, setDisplayStories] = useState(allStories)
    const [displayCategories, setDisplayCategories] = useState([])

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories')
            .then(response => {
                setAllStories(response.data)
                setDisplayStories(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });
        setDistinctCategories(allStories)
    }, [])

    function setDistinctCategories(stories) {
        let allCategories = [];
        stories.map((story) => {
            allCategories = allCategories.concat(story.categories)
        })
        let distinctCategories = [...new Set(allCategories)]
        setDisplayCategories(distinctCategories)
    }

    function onCategory(selectedCategories) {
        if (selectedCategories.length) {
            let filteredStories = []
            allStories.forEach(story => {
                let hasCategories = selectedCategories.every(elem => story.categories.indexOf(elem) > -1);
                if (hasCategories) filteredStories.push(story)
            })
            setDisplayStories(filteredStories)
        }
        else setDisplayStories(allStories)
    }

    function onSearch(searchText) {
        searchText = searchText.toLowerCase()
        if (searchText !== '')
            setDisplayStories(allStories.filter(story =>
                story.title.toLowerCase().includes(searchText)))
        else setDisplayStories(allStories)
    }

    return (
        <Container className="zs-style mt-3">
            {StoryFilter(onSearch, displayCategories, onCategory)}
            {StoryCardList(displayStories)}
        </Container >
    )
}
