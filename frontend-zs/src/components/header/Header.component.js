import React, { Component } from 'react';
import { Navbar, Nav, Button, ButtonGroup } from 'react-bootstrap';
import { Image} from 'react-bootstrap';
import "../../App.scss";

import superheld from "../../superheld.png"

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="sm" style={{ backgroundColor: '#F38F1F' }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" id="header_nav">
                        <ButtonGroup className="ml-5"><Button variant="light"><Nav.Link href="#lesen">lesen</Nav.Link></Button></ButtonGroup>
                        <ButtonGroup className="ml-5"><Button variant="light"><Nav.Link href="#mitreden" >mitreden</Nav.Link></Button></ButtonGroup>
                        <ButtonGroup className="ml-5"><Button variant="light"><Nav.Link href="#mitmachen">mitmachen</Nav.Link></Button></ButtonGroup>
                    </Nav>
                </Navbar.Collapse>
                <Nav.Link href="#profil" id="avatar">
                    <Image src={superheld} width="70" roundedCircle /></Nav.Link>
            </Navbar>

        )
    }
}