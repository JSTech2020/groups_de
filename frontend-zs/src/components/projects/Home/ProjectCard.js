import React from 'react';
import { Row, Card, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

function goToProject(project) {
    return <Redirect to={'/projects' + project._id} />

}

function ProjectCard(project, index) {
    return (
        <Row key={index}>
            <Card bg="dark" text="white" className="text-left mt-md-3 mr-md-2 ml-md-2" tag="a"
                onClick={() => goToProject(project)} style={{ cursor: "pointer", width: '100%' }}>
                <blockquote className="blockquote mb-0 card-body " text="white">
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
                return ProjectCard(project, index)
            })}
        </Col>)
}
