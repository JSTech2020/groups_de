import React, { useState } from 'react';
import { Row, Card, Col } from 'react-bootstrap'
import { ContactInformation } from './ContactInformation';
import ProjectsMap from '../Home/Map';

export function ProjectInfo(project) {
    const location = [{ location: project.info?.location?.coordinates, title: project.info?.title }]
    return (
        <Card text='black' className={'text-left mt-md-3 '} tag='a'
            style={{ backgroundColor: '#FFFFFF', cursor: 'pointer', width: '100%' }}>
            <blockquote className='blockquote mb-0 card-body' text='black'>
                <Card.Title>{project.info?.title}</Card.Title>

                <Card.Subtitle>Description</Card.Subtitle>
                <Card.Text>
                    {project.info?.description}
                </Card.Text>
                <Card.Subtitle>Activities</Card.Subtitle>
                <Card.Text>
                    {project.info?.activities.join(', ')}
                </Card.Text>
                <Card.Subtitle>Skills Needed</Card.Subtitle>
                <Card.Text>
                    {project.info?.skills.join(', ')}
                </Card.Text>
                <Card.Subtitle>Allowed Number of Volunteers</Card.Subtitle>
                <Card.Text>
                    {project.info?.numberVolunteers}
                </Card.Text>
                <Card.Subtitle>Contact</Card.Subtitle>
                <Card.Text>
                    {project.info?.contact.map((contact) => {
                        return new ContactInformation(contact)
                    })}
                </Card.Text>
                <Card.Subtitle>Location</Card.Subtitle>
                <ProjectsMap id="projectsMap" height='5%'
                    options={{ center: { lat: project.info?.location?.coordinates[0], lng: project.info?.location?.coordinates[1] }, zoom: 8 }}
                    projects={location} />
            </blockquote>
        </Card>
    )
}