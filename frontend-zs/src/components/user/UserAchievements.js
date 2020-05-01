import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AchievementCard from './AchievementCard'
import './UserAchievements.css'

function UserAchievements(props){

  const { achievements: achievementsUnsorted } = props;
  const [ showAll, setShowAll ] = useState(false);
  const achievements = achievementsUnsorted.sort((a, b) => new Date(a.time) - new Date(b.time));
  return <>
    <Row>
      <Col><h2>Errungenschaften</h2></Col>
    </Row>
    {achievements.slice(0, 3).map(achievement => {
      return <Row className="achievement-container">
        <AchievementCard achievement={achievement} />
      </Row>
    })}
    {showAll && <>
      {achievements.slice(3, achievements.length).map(achievement => {
      return <Row className="achievement-container">
        <AchievementCard achievement={achievement} />
      </Row>
    })}
    </>}
    {achievements.length > 3 && <Row>
      <Col style={{textAlign: 'center'}}><Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Zeige weniger Errungenschaften' : 'Zeige alle Errungenschaften'}</Button></Col>
    </Row>}
  </>
}

export default UserAchievements;