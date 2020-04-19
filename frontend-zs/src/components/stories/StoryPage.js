import React, { useEffect, useState } from 'react'
import { Button, Media, Container, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti"
import StoryDetails from './StoryDetails'
import StoryPagination from './StoryPagination'
import StoryQuestionLike from './StoryQuestionLike'
import './Story.scss'

import likeIcon from '../../icon_like.png'

function goBack() {
    return (
        <Button className="btn-back mb-3" size="sm" active>
            <Link to="/stories" >
                <Media>
                    <TiArrowBack size={20} />
                    <Media.Body>Back</Media.Body>
                </Media>
            </Link>
        </Button>
    )
}

function StoryText(displayStory) {
    return (
        <div className="p-4 new-line" style={{ fontSize: 19 }} >
            {displayStory}
        </div>
    )
}

export default function StoryPage() {
    const params = useParams();
    const [storyData, setStoryData] = useState({})
    const [displayStory, setDisplayStory] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')
    let convertedStory = convertText(storyData.story)

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories/' + params.id)
            .then(response => {
                setStoryData(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });

        // TODO: setCurrentUserId
    }, [])

    function onPageChanged(currentPage, pageCharactersLimit, totalPages) {
        let start
        let end
        if (currentPage === 1) {
            start = 0
            end = convertedStory.indexOf(".", pageCharactersLimit * currentPage) + 2;
        } else if (currentPage === totalPages) {
            start = convertedStory.indexOf(".", pageCharactersLimit * (currentPage - 1)) + 2;
            end = convertedStory.lastIndexOf(".") + 1
        } else {
            start = convertedStory.indexOf(".", pageCharactersLimit * (currentPage - 1)) + 2;
            end = convertedStory.indexOf(".", pageCharactersLimit * currentPage) + 2;
        }

        let displayText = convertedStory.slice(start, end);
        setDisplayStory(displayText)
    }

    function onLikeClicked(storyLiked) {
        let likesToSave = []
        if (storyLiked) {
            likesToSave = storyData.numberLikes
            likesToSave.push(currentUserId)
        }
        else {
            storyData.numberLikes.forEach(value => {
                if (value !== currentUserId)
                    likesToSave.push(value)
            })
        }

        // TODO: save new story into the DB
        storyData.numberLikes = likesToSave
        setStoryData(storyData)
    }

    function convertText(text) {
        text = text.replace(/<div>|<\/div>|<strong>|<\/strong>|<em>|<\/em>| &nbsp;|&nbsp;/g, "")
            .replace(/<br>/g, "\n")
        return text
    }

    return (
        <Container className="zs-style mt-3 justify-content-center mb-4">
            {goBack()}
            {StoryDetails(storyData)}
            {StoryText(displayStory)}
            {StoryPagination(convertedStory.length, 1200, onPageChanged)}
            {StoryQuestionLike(currentUserId, storyData.numberLikes, onLikeClicked)}
        </Container >
    )

}
