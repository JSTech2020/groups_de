import React from 'react';
import ReactDOM from 'react-dom';
//import Tilt from 'react-tilt';

import Flip from 'react-reveal/Flip';
// import RubberBand from 'react-reveal/RubberBand';
import Swing from 'react-reveal/Swing';
import Pulse from 'react-reveal/Pulse';

import Flash from 'react-reveal/Flash';
import Jello from 'react-reveal/Jello';
//import HeadShake from 'react-reveal/HeadShake';


import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

// import { memoryImages } from './images';
import bgImg from './images/logo.jpg';

import './index.scss';
import CardComponent from "./CardComponent";
import Axios from 'axios';
//import { colors } from '@material-ui/core';
// import { colors } from '@material-ui/core';

const cardStyle = {
  borderRadius: '8px',
  boxShadow: '2px 2px 10px grey'
};

const rating = {
  color: '#fc6100'
};

// let starRating = 5;

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCards: 0,
      memoryCards: this.shuffleCards(this.constructJson(props.questions)),
      screenHeight: window.innerHeight,
      timer: 0,
      staringTime: 0,
      moves: 0,
      won: false,
      starRating: 0,
      pageLoad: true,
      onFinish: props.onFinish,
      gameId: props.gameId,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleClick = id => {
    let newMemoryCards = this.state.memoryCards.slice();
    let newMoves = this.state.moves;
    let clickedCard = newMemoryCards.find((card) => {
      return card.id === id;
    });
    let currentOpenCards = this.state.openCards;
    let newStarRating = this.state.starRating;
    let newTimer = this.state.timer;

    let checkMatch = false;
    if (currentOpenCards === 0) {
      newTimer = this.startTimer();
      currentOpenCards = 1;
    } else if (currentOpenCards === 1) {
      newMoves++;
      currentOpenCards = 2;
      checkMatch = true;
      this.checkMatch(clickedCard, this.state.memoryCards.find((card) => {
        return (!card.faceDown && !card.solved)
      }));
    } else if (currentOpenCards === 2) {
      currentOpenCards = 1;
      this.allCardsDown();
    }

    console.log(newTimer);

    if (newMoves > 0 && newMoves < 8) {
      if ((newTimer > 0 && newTimer < 35)) {
        console.log("5 star")
        newStarRating = 5;
      } else if ((newTimer > 35 && newTimer < 45)) {
        console.log("4 star")
        newStarRating = 4;
      } else if ((newTimer > 45 && newTimer < 55)) {
        console.log("3 star")
        newStarRating = 3;
      } else if ((newTimer > 55 && newTimer < 65)) {
        console.log("2 star")
        newStarRating = 2;
      } else {
        console.log("1 star")
        newStarRating = 1;
      }

    } else if ((newMoves > 8 && newMoves < 10)) {
      if ((newTimer > 0 && newTimer < 45)) {
        console.log("4 star")
        newStarRating = 4;
      } else if ((newTimer > 45 && newTimer < 55)) {
        console.log("3 star")
        newStarRating = 3;
      } else if ((newTimer > 55 && newTimer < 65)) {
        console.log("2 star")
        newStarRating = 2;
      } else {
        console.log("1 star")
        newStarRating = 1;
      }
    } else if ((newMoves > 10 && newMoves < 12)) {
      if ((newTimer > 0 && newTimer < 55)) {
        console.log("3 star")
        newStarRating = 3;
      } else if ((newTimer > 55 && newTimer < 65)) {
        console.log("2 star")
        newStarRating = 2;
      } else {
        console.log("1 star")
        newStarRating = 1;
      }
    } else if ((newMoves > 12 && newMoves < 14)) {
      if ((newTimer > 0 && newTimer < 65)) {
        console.log("2 star")
        newStarRating = 2;
      } else {
        console.log("1 star")
        newStarRating = 1;
      }
    } else if (newMoves > 14) {
      newStarRating = 1;
    }

    clickedCard.faceDown = false;

    // console.log(
    //   "Clicked Pair-ID: " + clickedCard.pairId,
    //   "Clicked ID: " + clickedCard.id,
    //   "Open Cards: " + currentOpenCards,
    //   "Timer: " + newTimer,
    //   "Moves: " + newMoves
    // )

    this.setState({
      openCards: currentOpenCards,
      memoryCards: newMemoryCards,
      moves: newMoves,
      starRating: newStarRating,
      // timer : newTimer
    }, () => {
      if(checkMatch){
        this.checkWin();
      }
    });

  }

  shuffleCards = (staticQuestions) => {
    let memoryCards = [];
    for (let i = 0; i < staticQuestions.length; i++) {
      const staticContentElement = staticQuestions[i];
      memoryCards[i] = {
        ...staticContentElement,
        id: staticContentElement.id,
        pairId: staticContentElement.pairId,
        faceDown: true,
        solved: false,
      };
    }
    memoryCards.sort(() => Math.random() - 0.5);

    console.log('>>>>>> memoryCards', memoryCards);
    return memoryCards;
  }

  startTimer = () => {
    this.setState({
      startingTime: Date.now()
    })
    this.timer = setInterval(() => {
      this.setState({
        timer: ((Date.now() - this.state.startingTime) / 1000).toFixed(0)
      });
    }, 1000)
    return this.state.timer;
  }

  stopTimer = () => {
    clearInterval(this.timer);
    console.log("timer stop");
  }

  checkMatch = (card1, card2) => {
    if (card1.pairId === card2.pairId && card1.id !== card2.id) {
      card1.faceDown = false;
      let newMemoryCards = this.state.memoryCards;
      newMemoryCards.find((card) => {
        return card.id === card1.id
      }).solved = true;
      newMemoryCards.find((card) => {
        return card.id === card2.id
      }).solved = true;
      this.setState({
        openCards: 0,
        memoryCards: newMemoryCards
      });
      this.checkWin();
    }
  }

  checkWin() {
    let win = true;
    this.state.memoryCards.forEach((card) => {
      if (!card.solved) {
        win = false;
        return;
      }
    });
    if (win) {
      console.log("Won game!!!")
      this.stopTimer();
      this.setState({
        won: true
      })
      this.requestReward();
    }
  }

  requestReward() {
    
    // Call for achievements
    const starsCollected = Math.round(this.state.memoryCards.length / 2 * this.state.starRating);
    if (starsCollected > 0) {
      const requestBody = {
        reward: starsCollected
      }
      Axios.put(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/game/${this.state.gameId}/submitMemory`, requestBody)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }

  allCardsDown = () => {
    let newMemoryCards = this.state.memoryCards;
    newMemoryCards.forEach((card) => {
      card.faceDown = true;
      if (card.solved) card.faceDown = false;
    });
    this.setState({
      memoryCards: newMemoryCards
    })
  }

  restartGame = () => {
    this.setState({
      openCards: 0,
      memoryCards: this.shuffleCards(),
      timer: 0,
      staringTime: 0,
      moves: 0,
      won: false,
      starRating: 0
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    console.log(this.state.screenHeight);
  }

  componentWillUnmount() {
    window.addEventListener("resize", null);
  }

  handleResize(screenHeight, event) {
    this.setState({screenHeight: window.innerHeight})
  }


  constructJson(data) {
    let result = [];

    data.map((object, index) => {
      let question = {}, answer = {};
      question.id = ((index + 1) * 2) - 1;
      question.pairId = index + 1;
      question.isQuestion = true;
      question.text = object.question;
      answer.id = (index + 1) * 2;
      answer.pairId = index + 1;
      answer.isQuestion = false;
      answer.text = object.answers[object.correctAnswer];
      result.push(question);
      result.push(answer);
    });

    console.log('>>>>> result', result);
    return result;

  };

  initialModalClick = () => {
    this.setState({
      pageLoad: false
    });
  };

  render() {
    return (
      <Container maxWidth="lg">
        {this.state.pageLoad ? <GameRuleScreen onClick={this.initialModalClick} /> : null}
        <Grid container direction="column" justify="flex-start" alignItems="center">
          <Grid item xs={9} sm={9} md={9} xl={9} container className="gameStats" alignItems="stretch"
                style={{height: this.state.screenHeight}}>
            {/* <Grid item xs={3}><span className="title">Hello Dev</span></Grid> */}
            <Grid item xs={12} sm={12} md={4} xl={4} spacing={2} justify="space-evenly">
              <Rating
                style={rating}
                size="large"
                name="customized-empty"
                defaultValue={5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                readOnly='false'
                max={5}
                value={this.state.starRating}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} xl={4} className="stat" spacing={2}>{this.state.timer}<span
              className="stat"> Seconds</span></Grid>
            <Grid item xs={6} sm={6} md={4} xl={4} className="stat" spacing={2}>{this.state.moves}<span
              className="stat"> Moves</span></Grid>
          </Grid>
          <Grid item container className="gameTiles" spacing={2} style={{height: this.state.screenHeight/3}}>
            {this.state.memoryCards.map((card) => {
              return <MemoryCard key={card.id}  card={card} onClick={(id) => this.handleClick(id)}/>
            })}
          </Grid>
        </Grid>
        {this.state.won ? <GameOverScreen onClick={this.state.onFinish} time={this.state.timer} moves={this.state.moves} starRating={this.state.starRating}/> : null}
      </Container>
    );
  }
}

function MemoryCard(props) {
  return (
    <Grid className={props.card.solved ? 'hide-card' : null} item xs={3} sm={3} md={3} xl={3}>
      <Jello className="Tilt">
        <Flip right spy={props.card.faceDown}>
          <Swing spy={props.card.solved}>
            <Card style={cardStyle} className="memoryCard">
              {/*<CardMedia */}
              {/*  image={ props.card.faceDown ? bgImg : memoryImages[props.card.pairId] }*/}
              {/*  className="memoryImg"*/}
              {/*  onClick={props.card.solved || !props.card.faceDown ? null : () => props.onClick(props.card.id)}            */}
              {/*  />*/}
              <CardComponent
                // color= {props.card.color}
                className="memoryImg"
                question={props.card.isQuestion}
                text={props.card.faceDown ?
                  <CardMedia
                    image={bgImg}
                    className="memoryImg"
                  />
                  :
                  props.card.text}
                handleClick={props.card.solved || !props.card.faceDown ? null : () => props.onClick(props.card.id)}
              />
            </Card>
          </Swing>
        </Flip>
      </Jello>
    </Grid>
  );
}

function GameOverScreen(props) {
  return (
    <div className="gameOver">
      <Container maxWidth="lg">
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={8} sm={6}>
            <Pulse>
              <Card style={cardStyle} className="message">
                <CardContent>
                  <Grid container alignItems="center" justify="center">
                    <Grid item xs={12} className="title">You Win</Grid>
                    <Grid item xs={6} className="title">{props.time} <span className="stat"> seconds</span></Grid>
                    <Grid item xs={6} className="title">{props.moves} <span className="stat"> moves</span></Grid>
                    <Grid container item xs={6}  alignItems="center" >
                      <Rating
                       className="ratingStyle"
                        size="large"
                        name="customized-empty"
                        defaultValue={5}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        readOnly='false'
                        max={5}
                        value={props.starRating}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      {/* <HeadShake > */}
                      <Card style={cardStyle} className="restartBtn title" onClick={props.onClick}>
                        Quit
                      </Card>
                      {/* </HeadShake> */}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Pulse>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function GameRuleScreen(props) {
  return (
    <div className="gameRules">
      <Container maxWidth="lg">
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={8} sm={6}>
            <Pulse>
              <Card style={cardStyle} className="message">
                <CardContent>
                  <Grid container alignItems="center" justify="center">
                    <Grid item xs={12} className="rules"> All Question's are <span style={{color:'red'}} > Red </span> in Color <br/> Answers are <span style={{color:'Green'}} > Green </span> in color! <br/>
                      All the Best !!! <br/><br/></Grid>
                    <Grid item xs={10}>
                      <Flash>
                      <Card style={cardStyle} className="restartBtn title" onClick={props.onClick}>
                        Play Game
                      </Card>
                      </Flash>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Pulse>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MemoryGame;