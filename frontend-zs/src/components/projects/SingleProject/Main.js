import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Row } from 'react-bootstrap'
import { ProjectInfo } from './ProjectInfo';
import { Feed } from './Feed';

export function SingleProject(props) {
    const [displayProject, setDisplayProject] = useState({})

    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/' + props.computedMatch.params.id)
            .then(response => {
                setDisplayProject(response.data)

            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, [props.computedMatch.params.id])

    return (
        <Container fluid >
            <Row className='ml-md-5 mr-md-5'>
                {ProjectInfo(displayProject)}
                {Feed(displayProject)}
            </Row>
        </Container >
    )
}