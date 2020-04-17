import React, { useEffect, useState } from 'react'
import { Button, Media, Container } from 'react-bootstrap'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti"
import StoryDetails from './StoryDetails'
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

export default function StoryPage({ match }) {

    let params = useParams();
    const [story, setStory] = useState({})

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/stories/' + params.id)
            .then(response => {
                console.log(response.data)
                setStory(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            });
    }, [])

    return (
        <Container className="zs-style mt-3 mx-4">
            {goBack()}
            {StoryDetails(story)}
        </Container >
    )

}
