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
                setDistinctCategories(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });
    }, [])

    function setDistinctCategories(stories) {
        let distinctCategories = new Set(stories.flatMap((story) => {
            return story.categories
        }))
        setDisplayCategories([...distinctCategories])
    }

    function onSearch(searchText) {
        searchText = searchText.toLowerCase()
        if (searchText !== '')
            setDisplayStories(allStories.filter(story =>
                story.title.toLowerCase().includes(searchText)))
        else setDisplayStories(allStories)
    }

    function onCategory(selectedCategories) {
        if (selectedCategories.length) {
            let displayStories = []
            allStories.forEach(story => {
                let hasSelectedCategories = selectedCategories.every(elem => story.categories.indexOf(elem) > -1);
                if (hasSelectedCategories) displayStories.push(story)
            })
            setDisplayStories(displayStories)
        }
        else setDisplayStories(allStories)
    }

    return (
        <Container className="zs-style mt-3">
            {StoryFilter(onSearch, displayCategories, onCategory)}
            {StoryCardList(displayStories)}
        </Container >
    )
}
