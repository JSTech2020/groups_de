import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Row } from 'react-bootstrap'
import { ProjectInfo } from './ProjectInfo';
import { Feed } from './Feed';

export function SingleProject(props) {
    const [displayProject, setDisplayProject] = useState({})
    const [images, setImages] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const fetchProject = await Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/' + props.computedMatch.params.id)

            for (let feed of fetchProject.data.feed) {
                for (let img of feed.media) {
                    const fetchImage = await Axios.get('http://localhost:3001/api/media/' + img,
                        { responseType: 'arraybuffer' },
                    )
                    const imgBinary = "data:;base64," + btoa(
                        new Uint8Array(fetchImage.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    images[img] = imgBinary
                    setImages(images)
                }
            }
            setDisplayProject(fetchProject.data)
        }
        fetchData()
    }, [props.computedMatch.params.id, images])

    return (
        <Container fluid >
            <Row className='ml-md-5 mr-md-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                {ProjectInfo(displayProject, images)}
                {Feed(displayProject, images)}
            </Row>
        </Container >
    )
}