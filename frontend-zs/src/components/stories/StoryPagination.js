import React, { useState, useEffect } from 'react';
import { Row, Pagination, Col } from 'react-bootstrap'
import './Story.scss'

export default function StoryPagination(totalCharacters, pageCharactersLimit, onPageChanged) {
    const totalPages = Math.ceil(totalCharacters / pageCharactersLimit)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        goToPage(1)
    }, [])

    function goToPage(page) {
        const currentPage = Math.max(0, Math.min(page, totalPages));
        setCurrentPage(currentPage)
        onPageChanged(currentPage, pageCharactersLimit, totalPages)
    }

    return (
        !totalPages || totalPages === 1 ? null : (
            <Row className="my-3 justify-content-center">
                <Pagination >
                    <Col>
                        <Pagination.Item
                            disabled={currentPage === 1}
                            onClick={() => goToPage(currentPage - 1)}>
                            <strong>Previous</strong>
                        </Pagination.Item>
                    </Col>
                    <Col className="text-muted col-auto h6 my-auto">
                        <strong>Page {currentPage}/{totalPages}</strong>
                    </Col>
                    <Col>
                        <Pagination.Item
                            disabled={currentPage === totalPages}
                            onClick={() => goToPage(currentPage + 1)}>
                            <strong>Next</strong>
                        </Pagination.Item>
                    </Col>
                </Pagination>
            </Row >
        )
    )
}
