import React from 'react';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap'

export function SearchBar(onSearch, searchText, sort, sortAsc) {

    return (
        <Row middle="md" style={{ width: "100%" }} >
            <Col xs={11}>
                <input
                    type="text"
                    className="form-control mt-md-3 mb-md-3 mr-md-3"
                    placeholder="Suche nach Titel"
                    onChange={(evt) => onSearch(evt.target.value)} />
            </Col>
            <Col xs={1} onClick={() => sort()} className="pt-md-3" >
                {sortAsc ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
            </Col>

        </Row >
    )
}