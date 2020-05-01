import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import Axios from 'axios'
import Geocode from "react-geocode";
import { authenticationService } from '../../../services/authentication.service'
import { useHistory } from 'react-router-dom';

export default function CreateProject() {
    const [projectAvatar, setProjectAvatar] = useState({})
    const [location, setLocation] = useState("")
    const [participationImages, setParticipationImages] = useState([])
    const [project, setProject] = useState({ info: {}, participationInfo: {} })

    let history = useHistory()

    function handleSubmit() {
        if (authenticationService.currentUserValue.admin) {
            Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);
            Geocode.setLanguage("en");
            const formData = new FormData();
            formData.append('images', projectAvatar)
            const participationImagesFormData = new FormData();
            participationImages.forEach(img => {
                participationImagesFormData.append('images', img)
            })
            const config = { headers: { 'content-type': 'multipart/form-data' } }

            const submitData = async () => {
                if (!!projectAvatar.name)
                    await Axios.post(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/media/upload',
                        formData, config)
                        .then(response => {
                            project.info.projectImage = response.data.uploaded_media[0]
                            setProject(project)
                        })
                        .catch(function (error) {
                            console.log(error.message);
                        });

                if (participationImages.length > 0)
                    await Axios.post(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/media/upload',
                        participationImagesFormData, config)
                        .then(response => {
                            project.participationInfo.media = response.data.uploaded_media
                            setProject(project)

                        })
                        .catch(function (error) {
                            console.log(error.message);
                        });

                if (!!location)
                    await Geocode.fromAddress(location).then(response => {
                        const geolocation = response.results[0].geometry.location;
                        project.info.location = {
                            type: "Point",
                            coordinates: [
                                geolocation.lat, geolocation.lng
                            ]
                        }
                        setProject(project)
                    },
                        error => {
                            console.error(error);
                        }
                    );

                const createProject = await Axios.post(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/', { project })

                history.push('/projects/' + createProject.data)
            }

            submitData()
        }
    }

    if (authenticationService.currentUserValue.admin)
        return (
            <div className='mr-md-5 ml-md-5'>
                <h2 className='mt-md-3'>Create a New Project</h2>
                <Form className='mt-md-2 ' >
                    <Card className='mt-md-4 pr-md-2 pl-md-2 pb-md-2 pt-md-2'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            as="input"
                            placeholder="Please enter a title"
                            onChange={evt => {
                                project.info.title = evt.target.value
                                setProject(project)
                            }}
                        />
                        <Form.Label className='mt-md-3'>Description</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows="2"
                            placeholder="Please enter a description"
                            onChange={evt => {
                                project.info.description = evt.target.value
                                setProject(project)
                            }}
                        />
                        <Form.Label className='mt-md-3'>Project Avatar</Form.Label>
                        <Form.File
                            id="image-uploader"
                            label={(!!projectAvatar.name) ? "Image uploaded" : "Upload image"}
                            type="file"
                            custom
                            accept="image/*"
                            onChange={evt => {
                                setProjectAvatar(evt.target.files[0])
                            }}
                        />
                        <Form.Label className='mt-md-3'> Activities</Form.Label>
                        <Form.Control
                            as="input"
                            className='mb-md-1'
                            placeholder="Activity 1  (Optional)"
                            onChange={evt => {
                                if (!project.info.activities) {
                                    project.info.activities = []
                                }
                                project.info.activities[0] = evt.target.value
                                setProject(project)
                            }}
                        />
                        <Form.Control
                            as="input"
                            className='mb-md-1'
                            placeholder="Activity 2  (Optional)"
                            onChange={evt => {
                                if (!project.info.activities) {
                                    project.info.activities = []
                                }
                                project.info.activities[1] = evt.target.value
                                setProject(project)
                            }} />
                        <Form.Control
                            as="input"
                            placeholder="Activity 3  (Optional)"
                            onChange={evt => {
                                if (!project.info.activities) {
                                    project.info.activities = []
                                }
                                project.info.activities[2] = evt.target.value
                                setProject(project)
                            }} />

                        <Form.Label className='mt-md-3'>Skills</Form.Label>
                        <Form.Control
                            as="input"
                            className='mb-md-1'
                            placeholder="Skill 1 (Optional)"
                            onChange={evt => {
                                if (!project.info.skills) {
                                    project.info.skills = []
                                }
                                project.info.skills[0] = evt.target.value
                                setProject(project)
                            }}
                        />
                        <Form.Control
                            as="input"
                            className='mb-md-1'
                            placeholder="Skill 2 (Optional)"
                            onChange={evt => {
                                if (!project.info.skills) {
                                    project.info.skills = []
                                }
                                project.info.skills[1] = evt.target.value
                                setProject(project)
                            }} />
                        <Form.Control
                            as="input"
                            placeholder="Skill 3 (Optional)"
                            onChange={evt => {
                                if (!project.info.skills) {
                                    project.info.skills = []
                                }
                                project.info.skills[2] = evt.target.value
                                setProject(project)
                            }} />

                        <Form.Label className='mt-md-3'>Time Needed</Form.Label>
                        <Form.Control
                            as="input"
                            placeholder="Time needed"
                            onChange={evt => {
                                project.info.timeNeeded = evt.target.value
                                setProject(project)
                            }}
                        />

                        <Form.Label className='mt-md-3'>Contact Information</Form.Label>
                        <Form.Control
                            as="input"
                            className='mb-md-1'
                            placeholder="Name"
                            onChange={evt => {
                                if (!project.info.contact) project.info.contact = [{}]
                                project.info.contact[0].name = evt.target.value
                                setProject(project)
                            }}
                        />
                        <Form.Control
                            as="input"
                            className='mb-md-1'
                            placeholder="email"
                            onChange={evt => {
                                if (!project.info.contact) project.info.contact = [{}]
                                project.info.contact[0].email = evt.target.value
                                setProject(project)
                            }}
                        />
                        <Form.Control
                            as="input"
                            className='mb-md-1'
                            placeholder="Phone number"
                            onChange={evt => {

                                if (!project.info.contact) project.info.contact = [{}]
                                project.info.contact[0].phoneNumber = evt.target.value
                                setProject(project)
                            }}
                        />

                        <Form.Label className='mt-md-3'>Number of Volunteers</Form.Label>
                        <Form.Control
                            as="input"
                            placeholder="Number of Volunteers"
                            onChange={evt => {
                                project.info.numberVolunteers = evt.target.value
                                setProject(project)
                            }}
                        />

                        <Form.Label className='mt-md-3'>Location</Form.Label>
                        <Form.Control
                            as="input"
                            placeholder="Location"
                            value={location}
                            onChange={evt => {
                                setLocation(evt.target.value)
                            }}
                        />
                    </Card>
                    <Card className='mt-md-4 pr-md-2 pl-md-2 pb-md-2 pt-md-2'>

                        <Form.Label >Details for participants</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows='2'
                            placeholder="The information you write here will be displayed to users who want to participate in this project. What would you like to share with them?"
                            onChange={evt => {
                                project.participationInfo.moreInformation = evt.target.value
                                setProject(project)
                            }}
                        />
                        <Form.File
                            className='mt-md-1'
                            id="image-uploader"
                            multiple
                            label={(participationImages.length > 0) ? "Image(s) uploaded" : "Upload image(s)"}
                            type="file"
                            custom
                            accept="image/*"
                            onChange={evt => {
                                setParticipationImages(Array.from(evt.target.files))
                            }}
                        />
                    </Card>
                    <Button className="mt-md-3 float-right" onClick={() => handleSubmit()}>Submit</Button>

                </Form>
            </div>
        )
    return <div>Unauthorized</div>
}
