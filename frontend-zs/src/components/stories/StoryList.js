import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Axios from 'axios'
import StoryCardList from './StoryCard'
import StoryFilter from './StoryFilter'
import './Story.scss'

const NUMBER_CATEGORIES = 5;

export default function StoryList() {

    const [allStories, setAllStories] = useState([])
    const [displayStories, setDisplayStories] = useState(allStories)
    const [displayCategories, setDisplayCategories] = useState([])

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories')
            .then(response => {
                setAllStories(response.data)
                setDisplayStories(response.data)
                setRandomCategories(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });
    }, [])

    function setRandomCategories(stories) {
        let distinctCategories = new Set(stories.flatMap((story) => {
            return story.categories
        }))

        let randomCategories = [...distinctCategories]
            .map(x => ({ x, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(a => a.x)
            .slice(0, NUMBER_CATEGORIES);

        setDisplayCategories(randomCategories)
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
