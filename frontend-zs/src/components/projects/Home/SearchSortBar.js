import React from 'react';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap'

export function searchAndSortHeader(onSearch, sort, sortAsc) {

    return (
        <Row middle='md' style={{ width: '100%' }} className='mr-md-1' >
            <Col xs={11}>
                {searchBar(onSearch)}
            </Col>
            <Col xs={1} className='pt-md-3' >
                {sortIcon(sort, sortAsc)}
            </Col>
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

function searchBar(onSearch) {
    return (
        <input
            type='text'
            className='form-control mt-md-3 mb-md-3 mr-md-3'
            placeholder='Suche nach Titel'
            onChange={(evt) => onSearch(evt.target.value)} />

    )
}