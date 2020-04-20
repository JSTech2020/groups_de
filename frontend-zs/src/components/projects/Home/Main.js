import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Row } from 'react-bootstrap'
import { ProjectCardsList } from './ProjectCard';
import { searchAndSortHeader } from './SearchSortBar';
import { useHistory } from 'react-router-dom';
import ProjectsMap from './Map';

/* eslint-disable */
export function ProjectsList() {
    const [allProjects, setAllProjects] = useState([])
    const [displayProjects, setDisplayProjects] = useState(allProjects)
    const [sortAsc, setSortAsc] = useState(false)
    const [isMapView, setIsMapView] = useState(true)
    let history = useHistory();

    // called when component is mounted
    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/')
            .then(response => {
                setAllProjects(response.data);
                setDisplayProjects(response.data)
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, [])

    function onSort() {
        setDisplayProjects(
            displayProjects.sort((project, otherProject) => {
                let projectTitle = project.info?.title
                let otherProjectTitle = otherProject.info?.title
                if (projectTitle > otherProjectTitle) {
                    return sortAsc ? 1 : -1
                }
                else if (projectTitle < otherProjectTitle) {
                    return sortAsc ? -1 : 1
                }
                return 0
            })
        )
        setSortAsc(!sortAsc)
    }

    function onSearch(searchText) {
        searchText = searchText.toLowerCase()
        if (searchText !== '')
            setDisplayProjects(allProjects.filter(project =>
                project.info?.title.toLowerCase().includes(searchText)))
        else setDisplayProjects(allProjects)
    }

    return (
        <Container fluid >
            <Row className='ml-md-5 mr-md-5'>
                {searchAndSortHeader(onSearch, onSort, sortAsc, setIsMapView, isMapView)}
                {ProjectCardsList(displayProjects, false, isMapView, history)}
                {isMapView ?
                    <ProjectsMap id="myMap"
                        options={{ center: { lat: 48.13, lng: 11.58 }, zoom: 8 }}
                        projects={displayProjects.map(project => { return { location: project.info?.location.coordinates, title: project.info?.title } })} />
                    : ProjectCardsList(displayProjects, true, isMapView, history)}
            </Row>
        </Container >
    )
}