import React from 'react';
import { useHistory } from 'react-router'
import { Row, Card, Col, Container } from 'react-bootstrap'
import { ContactInformation } from './ContactInformation';
import ProjectsMap from '../Home/Map';
import ImageDisplay from '../Home/Image'

export function ProjectInfo(project, images) {
    const location = [{ location: project.info?.location?.coordinates, title: project.info?.title }]
    let history = useHistory()

    return (
        <div>
            <Container>
                <Row className='align-items-center ml-md-1 pt-md-2 pl-md-2' >
                    {ImageDisplay(project.info?.projectImage, 80, 80, true, onImageClick)}
                    <h2>{project.info?.title}</h2>
                </Row>
            </Container>
            <Row >
                <Col>
                    <Card className={'pt-md-3 pl-md-3 mt-md-3 ml-md-3 h-100'}
                        style={{ backgroundColor: '#FFFFFF' }}>
                        <Card.Subtitle><strong>Description</strong></Card.Subtitle>
                        <Card.Text>{project.info?.description}</Card.Text>
                        {project.info?.description ? (
                            <div className={'mb-md-3'}>
                                <Card.Subtitle> <strong>Activities</strong></Card.Subtitle>
                                <Card.Text>{project.info?.activities.join(', ')}</Card.Text>
                            </div>) : null}
                        {project.info?.skills ? (
                            <div className={'mb-md-3'}>
                                <Card.Subtitle><strong>Skills Needed</strong></Card.Subtitle>
                                <Card.Text>{project.info?.skills.join(', ')}</Card.Text>
                            </div>) : null}
                        {project.info?.skills ? (
                            <div className={'mb-md-3'}>
                                <Card.Subtitle><strong>Volunteers</strong></Card.Subtitle>
                                <Card.Text>{project.info?.numberVolunteers}</Card.Text>
                            </div>) : null}
                    </Card >
                </Col>
                <Col>
                    <Card className={'pt-md-3 pl-md-3 mt-md-3 h-100'}
                        style={{ backgroundColor: '#FFFFFF' }}>
                        {project.info?.contact ? (
                            <div className={'mb-md-3'}>
                                <strong>Contact</strong> {project.info?.contact.map((contact, index) => {
                                    return new ContactInformation(contact, index)
                                })}
                            </div>) : null}

                        {project.info?.contact ? (
                            <div className={'mb-md-3'}>
                                <strong>Location</strong>
                                <ProjectsMap id="projectsMap"
                                    options={{ center: { lat: project.info?.location?.coordinates[0], lng: project.info?.location?.coordinates[1] }, zoom: 8 }}
                                    projects={location}
                                    width={'90%'}
                                    height={200} />
                            </div>) : null}
                    </Card>
                </Col>
            </Row>
        </div >
    )

    function onImageClick() {
        history.push({
            pathname: '/projects/' + project._id + '/gallery',
            state: { images: images, title: project.info?.title, project_id: project._id }
        })
    }
}