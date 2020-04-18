import React, { useEffect, useState } from 'react'
import { Button, Media, Container, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti"
import StoryDetails from './StoryDetails'
import StoryTextPagination from './StoryTextPagination'
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
    const [storyData, setStoryData] = useState()
    const [displayStory, setDisplayStory] = useState('')

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories/' + params.id)
            .then(response => {
                setStoryData(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });
    }, [])

    function onPageChanged(currentPage, pageCharactersLimit) {
        let offset = (currentPage - 1) * pageCharactersLimit;
        let currentText = storyData.story.slice(offset, offset + pageCharactersLimit);
        setDisplayStory(currentText)
    }

    return (
        <Container className="zs-style mt-3 mx-4">
            {goBack()}
            {StoryDetails(storyData)}
            {StoryText(displayStory)}
            {StoryTextPagination(storyData.story.length, 1000, onPageChanged)}
        </Container >
    )

}
