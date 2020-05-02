import React, { Component } from 'react';
import { Col, Row, Navbar, Nav, Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Image } from 'react-bootstrap';
import { authenticationService } from "../../services/authentication.service";
import "./Header.scss";

import superheld from "../../superheld.png";
import ZF_logo_white from "../../ZF_logo_white.png";

export default class Header extends Component {

  renderAvatar() {
    if (authenticationService.currentUserValue.avatar !== '') {
      return <Image src={authenticationService.currentUserValue.avatar} width="80" roundedCircle />;
    }
    return <Image src={superheld} width="80" roundedCircle />;
  }

  renderProfilePopover() {
    if (authenticationService.isAuthenticated()) {
      return (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Profil</Popover.Title>
          <Popover.Content>
            <Col>
              <Link to='/editProfile'>
                <Button>Profil</Button>
              </Link>
              <Link to={'/user/' + authenticationService.currentUserValue._id}>
                <Button>Erfolge</Button>
              </Link>
            </Col>
          </Popover.Content>
        </Popover>
      )
    }
    return
  }

  renderAdminPopover() {
    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Create:</Popover.Title>
        <Popover.Content>
          <Col>
            <Link to='/admin'>
              <Button>Quiz</Button>
            </Link>
            <Link to='/createPost'>
              <Button>Post</Button>
            </Link>
          </Col>
        </Popover.Content>
      </Popover>
    )
  }

  render() {
    const content = authenticationService.isAuthenticated()
      ? <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <div className="container-fluid">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar10">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse" id="navbar10">
            <ul className="navbar-nav nav-fill w-100 align-items-left">
              <li className="nav-item">
                <Link to="/stories">
                  <ButtonGroup><Button className="header-btn" variant="flat" size="xxl" active>lesen</Button></ButtonGroup>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mitreden">
                  <ButtonGroup><Button className="header-btn" variant="flat" size="xxl" active>mitreden</Button></ButtonGroup>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/projects">
                  <ButtonGroup><Button className="header-btn" variant="flat" size="xxl" active>mitmachen</Button></ButtonGroup>
                </Link>
              </li>
              {/* Games teams - Admin page */}
              {authenticationService.currentUserValue.admin &&
                <li className="nav-item">
                  <OverlayTrigger trigger="click" placement="left" overlay={this.renderAdminPopover()}>
                    <ButtonGroup><Button className="header-btn" variant="flat" size="xxl" active>admin</Button></ButtonGroup>
                  </OverlayTrigger>
                </li>
              }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item">
                <OverlayTrigger trigger="click" placement="left" overlay={this.renderProfilePopover()}>
                  <a className="nav-link">
                    {this.renderAvatar()}
                  </a>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      : <div className="logoWrapper">
        <Navbar.Brand>
          <img className='zfLogo' src={ZF_logo_white} alt="ZF logo" />
        </Navbar.Brand>

      </div>;
    return (
      <Navbar style={{ backgroundColor: '#F38F1F' }}>
        {content}
        {authenticationService.currentUserValue !== null &&
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={authenticationService.logout}>Abmelden</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        }
      </Navbar>
    )
  }
}
