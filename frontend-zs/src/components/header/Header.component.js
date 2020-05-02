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
      ? <Nav className="div-navbar">
        
          <span className="header-wrapper">

            <Nav.Link className="col-navbar" href="/stories">lesen</Nav.Link>
            <Nav.Link className="col-navbar" href="/mitreden">mitreden</Nav.Link>
            <Nav.Link className="col-navbar" href="/projects">mitmachen</Nav.Link>

            {/* Games teams - Admin page */}
            {authenticationService.currentUserValue.admin &&
              <OverlayTrigger trigger="click" placement="left" overlay={this.renderAdminPopover()}>
              <Nav.Link className="col-navbar">admin</Nav.Link>
              </OverlayTrigger>

            }
            <OverlayTrigger trigger="click" placement="left" overlay={this.renderProfilePopover()}>
              <Nav.Link >{this.renderAvatar()}</Nav.Link>
            </OverlayTrigger>
</span>
<span className="logout-wrapper">
            <Nav.Link className="logout-navbar" onClick={authenticationService.logout}>Abmelden</Nav.Link>
            </span>
        
      </Nav>

      : <div className="logoWrapper">
        <Navbar.Brand>
          <img className='zfLogo' src={ZF_logo_white} alt="ZF logo" />
        </Navbar.Brand>

      </div>;
    return (
      <Navbar style={{ backgroundColor: '#F38F1F'}}>
        {content}
      </Navbar>
    )
  }
}


