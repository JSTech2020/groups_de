import React from 'react'
import Achievements from '../games/Achievements'
import { Container, Row, Col } from 'react-bootstrap'
import { IconContext } from "react-icons";
import './AchievementCard.css'

function AchievementCard(props){
  const { achievement } = props;
  const achievementData = Achievements[achievement.identifier];
  if(!achievementData)
    return <></>

  return <>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle', width: '72px', height: '72px' } }}>
      <Col md={2} style={{textAlign: 'center'}}>{achievementData.icon}</Col>
      <Col md={10}>
        <span className="achievement-date">Erreicht am {new Date(achievement.time).toLocaleDateString()}</span>
        <span className="achievement-title">{achievementData.title}</span><br />
        <span className="achievement-description">{achievementData.description}</span>
      </Col>
    </IconContext.Provider>
  </>
}
export default AchievementCard;