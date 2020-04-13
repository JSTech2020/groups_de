import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Row } from 'react-bootstrap'
import { ProjectCardsList } from './ProjectCard';
import { SearchBar } from './SearchBar';

export function ProjectsList() {
    const [allProjects, setAllProjects] = useState([])

    const [projects, setProjects] = useState(allProjects)

    const [searchText, setSearchText] = useState("")

    const [sortAsc, setSortAsc] = useState(false)

    // called when component is mounted
    useEffect(() => {
        Axios.get(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/projects/')
            .then(response => {
                setAllProjects(response.data);
                setProjects(response.data)
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }, [])

    function onSort() {
        setProjects(
            projects.sort((a, b) => {
                let aTitle = a.info?.title
                let bTitle = b.info?.title
                if (aTitle > bTitle) {
                    return sortAsc ? 1 : -1
                }
                else if (aTitle < bTitle) {
                    return sortAsc ? -1 : 1
                }
                return 0
            })
        )

        setSortAsc(!sortAsc)
    }

    function onSearch(searchText) {
        setSearchText(searchText.toLowerCase())
        if (searchText !== "")
            setProjects(allProjects.filter(project =>
                project.info?.title.toLowerCase().includes(searchText)))
        else setProjects(allProjects)
    }

    return (
        <Container fluid >
            <Row className="ml-md-5 mr-md-5">
                {SearchBar(onSearch, searchText, onSort, sortAsc)}
                {ProjectCardsList(projects, true)}
                {ProjectCardsList(projects, false)}
            </Row>
        </Container >
    )
}