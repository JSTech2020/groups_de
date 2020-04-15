import React from 'react';
import { Row, Card, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

function goToProject(project) {
    return <Redirect to={'/projects' + project._id} />
}

function ProjectCard(project, index, isLeftSide) {
    const margin = isLeftSide ? 'ml-md-2' : 'mr-md-2'

    return (
        <Row key={index}>
            <Card text='white' className={'text-left mt-md-3 ' + margin} tag='a'
                onClick={() => goToProject(project)} style={{ backgroundColor: '#5F696A', cursor: 'pointer', width: '100%' }}>
                <blockquote className='blockquote mb-0 card-body ' text='white'>
                    {project.info?.title}
                    <footer >
                        <small >
                            {project.info?.description}
                        </small>
                    </footer>
                </blockquote>
            </Card>
        </Row >
    )
}

export function ProjectCardsList(projects, even) {
    return (
        <Col md={6} >
            {projects.filter((_, index) => index % 2 === (even ? 1 : 0)).map((project, index) => {
                return ProjectCard(project, index, even)
            })}
        </Col>)
}
