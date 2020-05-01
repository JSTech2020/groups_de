import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, Row, Col, Image } from 'react-bootstrap'
import UserAchievements from './UserAchievements'
import UserAvatar from './UserAvatar'
import Stars from '../games/Stars'
import './UserProfile.css'



function UserProfile(props) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/${props.computedMatch.params.id}`)
      .then(response => {
        setUser(response.data)
      })
      .catch(function (error) {
        console.log(error.message)
      });
  }, [props.computedMatch.params.id])

  return <>
    <Container className="user-profile">
      <Row className="align-items-center user-profile-row">
        <Col>
          {user && <UserAvatar size={'96px'} avatar={user.avatar} />}
        </Col>
        <Col><h1 className="user-profile-name">{user ? user.firstname : 'Lade Profil...'}</h1></Col>
        <Col>
          {user && <Stars size={'96px'} amount={user.stars} />}
        </Col>
      </Row>
      {user && <UserAchievements achievements={user.achievements} />}
    </Container>
  </>
}

export default UserProfile;