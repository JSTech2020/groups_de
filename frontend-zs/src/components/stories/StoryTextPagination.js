import React, { useState, useEffect } from 'react';
import { Row, Pagination, Col } from 'react-bootstrap'
import './Story.scss'

export default function StoryTextPagination(totalCharacters, pageCharactersLimit, onPageChanged) {

    const totalPages = Math.ceil(totalCharacters / pageCharactersLimit)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        goToPage(1)
    }, [])

    function goToPage(page) {
        const currentPage = Math.max(0, Math.min(page, totalPages));
        setCurrentPage(currentPage)
        onPageChanged(currentPage, pageCharactersLimit)
    }

    return (
        !totalPages || totalPages === 1 ? null : (
            <Row className="my-3 justify-content-center">
                <Pagination >
                    <Col>
                        <Pagination.Item
                            disabled={currentPage === 1}
                            onClick={() => goToPage(currentPage - 1)}>
                            Previous
                         </Pagination.Item>
                    </Col>
                    <Col className="text-muted col-auto h6">
                        <strong>Page {currentPage}/{totalPages}</strong>
                    </Col>
                    <Col>
                        <Pagination.Item
                            disabled={currentPage === totalPages}
                            onClick={() => goToPage(currentPage + 1)}>
                            Next
                    </Pagination.Item>
                    </Col>
                </Pagination>
            </Row >
        )
    )
}
