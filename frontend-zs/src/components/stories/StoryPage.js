import React, { useEffect, useState } from 'react'
import { Button, Media, Container } from 'react-bootstrap'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti"
import StoryDetails from './StoryDetails'
import StoryPagination from './StoryPagination'
import StoryQuestionLike from './StoryQuestionLike'
import GamesView from '../games/GamesView'
import { authenticationService } from '../../services/authentication.service';
import './Story.scss'

function goBack() {
    return (
        <Button className="btn-back mb-3 ml-4" size="sm" active>
            <Link to="/stories" >
                <Media>
                    <TiArrowBack size={20} />
                    <Media.Body>Zurück</Media.Body>
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

export default function StoryPage(props) {
    const [story, setStory] = useState({})
    const [showGames, setShowGames] = useState(true)
    const [games, setGames] = useState([])
    const [gamesToShow, setGamesToShow] = useState(null)
    const [displayStory, setDisplayStory] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT
            + '/api/stories/' + props.computedMatch.params.id)
            .then(response => {
                setStory(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT
            + '/api/stories/' + props.computedMatch.params.id + '/games')
            .then(response => {
                setGames(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });
        const currentUser = authenticationService.currentUserValue;
        setCurrentUserId(currentUser._id)
    }, [props.computedMatch.params.id])

    function onPageChanged(currentPage) {
        setDisplayStory(!!story.storyPages ? story.storyPages[currentPage - 1] : "")
        const pageGames = games.filter(game => game.page === currentPage - 1)
        setGamesToShow(pageGames.length === 1 ? pageGames[0] : null)
    }

    function onLikeClicked(storyLiked) {
        let likesToSave = []
        if (storyLiked) {
            likesToSave = story.numberLikes
            likesToSave.push(currentUserId)
        }
        else {
            story.numberLikes.forEach(value => {
                if (value !== currentUserId)
                    likesToSave.push(value)
            })
        }
        story.numberLikes = likesToSave
        setStory(story)
        Axios.post(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories/like/' + story._id,
            story.numberLikes)
            .then(response => { console.log('response: ', response) })
            .catch(function (error) { console.log(error.message) });
    }

    function onGamesFinished() {
        setGamesToShow(null);
    }

    return (
        <>
            <Container className="zs-style mt-3 justify-content-center mb-4">
                {goBack()}
                {StoryDetails(story)}
                {StoryText(displayStory)}
                {StoryPagination(story.storyPages?.length, onPageChanged)}
                {StoryQuestionLike(currentUserId, story.numberLikes, onLikeClicked)}
            </Container >
            {showGames && gamesToShow && <GamesView show={true} games={gamesToShow} onFinish={onGamesFinished} />}
        </>
    )

}
