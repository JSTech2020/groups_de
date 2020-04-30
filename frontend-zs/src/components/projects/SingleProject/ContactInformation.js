import React from 'react';
import { Row, Col } from 'react-bootstrap'

export function ContactInformation(contact, index) {
    return (
        <Row key={index}>
            {contact.name ? <Col md={12}>Name: {contact.name}</Col> : ""}
            {contact.email ? <Col md={12}>Email: {contact.email}</Col> : ""}
            {contact.phone ? <Col md={12}>Phone: {contact.phone}</Col> : ""}
        </Row>
    )
}