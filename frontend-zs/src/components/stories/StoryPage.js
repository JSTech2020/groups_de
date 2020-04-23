import React, { useEffect, useState } from 'react'
import { Button, Media, Container } from 'react-bootstrap'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti"
import StoryDetails from './StoryDetails'
import StoryPagination from './StoryPagination'
import StoryQuestionLike from './StoryQuestionLike'
import { authenticationService } from '../../services/authentication.service';
import './Story.scss'

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
    const [storyData, setStoryData] = useState({
        title: '',
        author: '',
        authorImage: '',
        story: [],
        categories: [],
        numberLikes: []
    })
    const [displayStory, setDisplayStory] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories/' + params.id)
            .then(response => {
                setStoryData(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });

        const currentUser = authenticationService.currentUserValue;
        setCurrentUserId(currentUser.user._id)
    }, [])

    function onPageChanged(currentPage) {
        setDisplayStory(storyData.story[currentPage - 1])
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
        storyData.numberLikes = likesToSave
        setStoryData(storyData)

        // TODO: save new numberLikes of a story into the DB
    }

    return (
        <Container className="zs-style mt-3 justify-content-center mb-4">
            {goBack()}
            {StoryDetails(storyData)}
            {StoryText(displayStory)}
            {StoryPagination(storyData.story.length, onPageChanged)}
            {StoryQuestionLike(currentUserId, storyData.numberLikes, onLikeClicked)}
        </Container >
    )

}
