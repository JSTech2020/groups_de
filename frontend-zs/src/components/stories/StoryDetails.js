
import React, { useEffect, useState } from 'react';
import { Row, Col, Media, Image } from 'react-bootstrap'
import likeIcon from '../../icon_like.png'
import './Story.scss'
import Axios from 'axios'


export default function StoryDetails(story) {
    const [authorImage, setAuthorImage] = useState("")

    useEffect(() => {
        if (!!story.authorImage)
            Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT
                + '/api/media/' + story.authorImage,
                { responseType: 'arraybuffer' })
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    setAuthorImage("data:;base64," + base64)
                });
    }, [story])

    return (
        <Row className="justify-content-between ml-3">
            <Col className="mt-3">
                <h2><strong>{story.title}</strong></h2>
                {!!story.authorImage ? null : (
                    <h4 className="text-muted mb-2"><strong>{story.author}</strong></h4>
                )}
                {!!story.categories ?
                    (<h4 className="text-muted mb-2">
                        <strong>
                            {story.categories.toString().replace(/,/g, ", ")}
                        </strong>
                    </h4>) : null}
                <Media>
                    <Image
                        className="mr-1"
                        src={likeIcon}
                        width="35"
                        height="35"
                        fluid
                    />
                    <Media.Body>
                        <h3><strong>{story.numberLikes?.length}</strong></h3>
                    </Media.Body>
                </Media>
            </Col>
            {!!story.authorImage ? (
                <Col className="col-auto mr-4">
                    <Image
                        className="mb-2"
                        src={authorImage}
                        width="130"
                        fluid
                        thumbnail />
                    <p className="text-center text-muted h5"><strong>{story.author}</strong></p>
                </Col>
            ) : null}
        </Row >
    )
}
