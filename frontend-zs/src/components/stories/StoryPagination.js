import React, { useState, useEffect } from 'react';
import { Row, Pagination, Col } from 'react-bootstrap'
import './Story.scss'

export default function StoryPagination(totalPages, onPageChanged) {
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        goToPage(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPages])

    function goToPage(page) {
        const currentPage = Math.max(0, Math.min(page, totalPages));
        setCurrentPage(currentPage)
        onPageChanged(currentPage)
    }

    return (
        !totalPages || totalPages === 1 ? null : (
            <Row className="my-3 justify-content-center">
                <Pagination >
                    <Col>
                        <Pagination.Item
                            disabled={currentPage === 1}
                            onClick={() => goToPage(currentPage - 1)}>
                            <strong>Vorige</strong>
                        </Pagination.Item>
                    </Col>
                    <Col className="text-muted col-auto h6 my-auto">
                        <strong>Seite {currentPage}/{totalPages}</strong>
                    </Col>
                    <Col>
                        <Pagination.Item
                            disabled={currentPage === totalPages}
                            onClick={() => goToPage(currentPage + 1)}>
                            <strong>Nächste</strong>
                        </Pagination.Item>
                    </Col>
                </Pagination>
            </Row >
        )
    )
}
