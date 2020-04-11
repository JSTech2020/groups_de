import React, { Component } from 'react';
import { Navbar, Nav, Button, ButtonGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Image } from 'react-bootstrap';
import { authenticationService } from "../../services/authentication.service";
import "./Header.scss";

import superheld from "../../superheld.png";
import ZF_logo_white from "../../ZF_logo_white.png";
import EditProfile from "../editProfile/EditProfile.component";
import {PrivateRoute} from "../PrivateRoute";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: true }
    }

    render() {
        const content = this.state.isLoggedIn
          ? <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
              <div className="container-fluid">
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar10">
                      <span className="navbar-toggler-icon" />
                  </button>
                  <div className="navbar-collapse collapse" id="navbar10">
                      <ul className="navbar-nav nav-fill w-100 align-items-left">
                          <li className="nav-item">
                              <ButtonGroup><Button variant="flat" size="xxl" active><Link to="/lesen">lesen</Link></Button></ButtonGroup>
                          </li>
                          <li className="nav-item">
                              <ButtonGroup><Button variant="flat" size="xxl" active><Link to="/mitreden">mitreden</Link></Button></ButtonGroup>
                          </li>
                          <li className="nav-item">
                              <ButtonGroup><Button variant="flat" size="xxl" active><Link to="/mitmachen">mitmachen</Link></Button></ButtonGroup>
                          </li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                          <li className="nav-item">
                              <a className="nav-link" href="/editProfile">
                                  <Image src={superheld} width="80" roundedCircle /></a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>

          : <div class="logoWrapper">
              <Navbar.Brand>
                  <img class='zfLogo' src={ZF_logo_white} alt="ZF logo"/>
              </Navbar.Brand>
            </div>;
        return (
          <Navbar style={{ backgroundColor: '#F38F1F' }}>
              {content}
              { authenticationService.currentUserValue === null &&
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              }
              { authenticationService.currentUserValue !== null &&
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link onClick={authenticationService.logout}>Log out</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              }
          </Navbar>
        )
    }
}
