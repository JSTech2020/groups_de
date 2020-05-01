import React from 'react';
import { FaSortAlphaDown, FaSortAlphaUp, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md'
import { Row, Col } from 'react-bootstrap'
import { authenticationService } from '../../../services/authentication.service'

export function searchAndSortHeader(onSearch, sort, sortAsc, setIsMapView, isMapView, history) {

    return (
        <Row middle='md' style={{ width: '100%' }} className='mr-md-1' >
            <Col xs={authenticationService.currentUserValue.admin ? 9 : 10}>
                {searchBar(onSearch)}
            </Col>
            <Col xs={1} className='pt-md-3' >
                {sortIcon(sort, sortAsc)}
            </Col>
            <Col xs={1} className='pt-md-3' >
                {SwitchView(setIsMapView, isMapView)}
            </Col>
            {(authenticationService.currentUserValue.admin) ?
                <Col xs={1} className='pt-md-3' >
                    {addNewProjectIcon(history)}
                </Col> : <div />}
        </Row >
    )
}

function sortIcon(sort, sortAsc) {
    return (
        <div onClick={() => sort()}>
            {sortAsc ? <FaSortAlphaUp size={32} /> : <FaSortAlphaDown size={32} />}
        </div>
    )
}

function addNewProjectIcon(history) {
    return (
        <div onClick={() => history.push('projects/new')}>
            <MdAdd size={32} />
        </div>
    )
}

function SwitchView(setIsMapView, isMapView) {
    return (
        <div onClick={() => setIsMapView(!isMapView)}>
            {isMapView ? <FiMapPin size={32} /> : <FaMapMarkerAlt size={32} />}
        </div>
    )
}

function searchBar(onSearch) {
    return (
        <input
            type='text'
            className='form-control mt-md-3 mb-md-3 mr-md-3'
            placeholder='Suche nach Titel'
            onChange={(evt) => onSearch(evt.target.value)} />

    )
}