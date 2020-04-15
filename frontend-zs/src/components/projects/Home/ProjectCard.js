import React from 'react';
import { Row, Card, Col } from 'react-bootstrap'


function ProjectCard(project, index, isLeftSide, history) {
    const margin = isLeftSide ? 'ml-md-2' : 'mr-md-2'

    return (
        <Row key={index}>
            <Card text='white' className={'text-left mt-md-3 ' + margin} tag='a'
                onClick={() => history.push('/projects/' + project._id)} style={{ backgroundColor: '#5F696A', cursor: 'pointer', width: '100%' }}>
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

export function ProjectCardsList(projects, even, history) {
    return (
        <Col md={6} >
            {projects.filter((_, index) => index % 2 === (even ? 1 : 0)).map((project, index) => {
                return ProjectCard(project, index, even, history)
            })}
        </Col>)
}
