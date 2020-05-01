import React from 'react';
import { Form, Card, Button, Carousel } from 'react-bootstrap';
import { useState } from 'react';
import Axios from 'axios';
import { authenticationService } from '../../../services/authentication.service';
import { useHistory } from "react-router";

export function Feed(project, projectImages) {

    const [postContent, setPostContent] = useState("")
    const [images, setImages] = useState([])

    const currentUserisProjectOwner = authenticationService.currentUserValue._id === project.projectOwner
    let history = useHistory()

    function handleSubmit() {
        const formData = new FormData();
        images.forEach(img => {
            formData.append('images', img)
        })
        const config = { headers: { 'content-type': 'multipart/form-data' } }
        let imageNames = []

        const submitData = async () => {
            await Axios.post(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/media/upload',
                formData, config)
                .then(response => {
                    imageNames = response.data.uploaded_media
                })
                .catch(function (error) {
                    console.log(error.message);
                });

            project.feed.push({
                "content": postContent,
                "media": imageNames
            })

            await Axios.put(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/' + project._id,
                { project: { feed: project.feed } })
                .catch(error => console.log(error.message))

            window.location.reload(false);
        }

        submitData()
    }

    function handleContentChange(event) {
        setPostContent(event.target.value)
    }

    function handleImagesChange(event) {
        setImages(Array.from(event.target.files))
    }

    function onParticipateClick() {
        history.push({
            pathname: '/participate/' + project._id,
            state: { title: project.info?.title, participationInfo: project.participationInfo, project_id: project._id }
        })
    }

    return (
        < div className={'mt-md-3'} >
            {currentUserisProjectOwner ?
                (<Card style={{ backgroundColor: '#5F696A' }} className={'mt-md-3'}>
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
                </Card>) : (
                    <Button className='mt-3'
                        style={{ backgroundColor: '#F5B063', color: '#323838', borderColor: '#F5B063' }}
                        block
                        onClick={onParticipateClick}>
                        <strong>Participate to project</strong>
                    </Button>)}
            {project.feed?.map((post, index) => {
                return (
                    <div className="mt-md-3" key={index}>
                        <Card border="light" style={{ width: "100%" }} >
                            <Card.Body>
                                <Card.Text>
                                    {post.content}
                                </Card.Text>
                                <Carousel className="align-items-center" slide={false}>
                                    {post.media?.map(img => {
                                        return <Carousel.Item key={img} >
                                            <img
                                                alt="media inside post"
                                                height='300'
                                                style={{ display: 'block', margin: 'auto' }}
                                                src={projectImages[img]} />
                                        </Carousel.Item>
                                    })}
                                </Carousel>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </div >
    )
}