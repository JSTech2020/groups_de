import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import Axios from 'axios';

export function Feed(project) {

    const [postContent, setPostContent] = useState("")
    const [images, setImages] = useState([])

    function handleSubmit() {
        const formData = new FormData();
        images.forEach(img => {
            formData.append('images', img)
        })
        const config = { headers: { 'content-type': 'multipart/form-data' } }

        Axios.post(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/media/upload',
            formData, config)
            .then(response => {
                console.log('response: ', response)
            })
            .catch(function (error) {
                console.log(error.message);
            });

        //TODO: implment and call endpoint to create new Post     

    }

    function handleContentChange(event) {
        setPostContent(event.target.value)
    }

    function handleImagesChange(event) {
        setImages(Array.from(event.target.files))
    }

    return (
        < div >
            <Card style={{ backgroundColor: '#5F696A' }} className={'mt-md-3'}>
                <Card.Body>
                    <Form className='mt-md-3' >
                        <Form.Control
                            as="textarea"
                            placeholder='What do you want to share?'
                            rows='3'
                            value={postContent}
                            onChange={handleContentChange}
                        />
                        <Form.File
                            className='mt-md-3'
                            id="image-uploader"
                            label={(images.length > 0) ? (images.length + (images.length === 1 ? " photo" : " photos") + " uploaded") : "Upload a photo"}
                            type="file"
                            custom
                            multiple
                            accept="image/*"
                            onChange={evt => handleImagesChange(evt)}
                        />
                        <Button className="mt-md-3 float-right" onClick={() => handleSubmit()}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>

            {
                project.feed?.map((feed, index) => {
                    return (
                        <div className="mt-md-3" key={index}>
                            <Card border="light" >
                                <Card.Body>
                                    <Card.Text>
                                        {feed.content}
                                    </Card.Text>
                                    {/* TODO: display Post media here after get media from minio endpoint is implemented   */}
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }

        </div >
    )
}