import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

import ZF_logo_white from "../../ZF_logo_white.png"

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Navbar style={{ backgroundColor: '#F38F1F', justifyContent: 'center' }}>
                    <Navbar.Brand href="#home">
                        <img
                            src={ZF_logo_white}
                            width="100"
                            className="d-inline-block align-top"
                            alt="ZF logo"
                            padding="5px"
                        />{' '}
                    </Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}