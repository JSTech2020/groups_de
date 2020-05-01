import React from 'react';
import Modal from 'react-bootstrap/Modal'
import QuizBadges from './QuizBadges';
import SlidingPuzzle from './SlidingPuzzle'
import QuizTimer from "./quizTimer/QuizTimer";
import OceanCleaner from "./oceanCleaner/OceanCleaner";
import Memory from './memory/Memory';
import './GamesView.scss';

class GamesView extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      show: props.show,
      gameIndex: 0,
    }
  }

  onGameFinished(finishedGameIndex){
    const {gameIndex} = this.state;
    if(finishedGameIndex === gameIndex){
      if(this.props.games.types.length > gameIndex + 1){
        this.setState({ gameIndex: gameIndex + 1 });
      } else {
        this.props.onFinish();
      }
    }
  }

  render(){
    const { show, gameIndex } = this.state;
    const gameType = this.props.games.types[gameIndex];
    let modalSize = 'lg'; // Can be 'sm', 'lg' or 'xl'
    let gameComponent = null;
    let gameTitle = "";
    let modalBodyClasses = '';
    console.log("render: " + gameType);
    switch(gameType){
      case 'quiz-badges':
        gameTitle = "Quiz";
        gameComponent = (
          <QuizBadges
            {...this.props.games.quizData}
            gameId={this.props.games._id}
            onFinish={() => this.onGameFinished(gameIndex)}
          />
        )
      break;

      case 'puzzle':
        gameTitle = "Schiebe-Puzzle";
        const imgData = this.props.games.puzzleData.image.data.data;
        let imgSrc = "";
        for (var i=0; i<imgData.length; i++) {
          imgSrc += String.fromCharCode(imgData[i])
        }
        gameComponent = (
          <SlidingPuzzle
          gameId={this.props.games._id}
            image={imgSrc}
          />
        )
      break;

      case 'quiz-timer':
        gameTitle = 'Quiz';
        gameComponent = (
          <QuizTimer
            {...this.props.games.quizData}
            gameId={this.props.games._id}
            onFinish={() => this.onGameFinished(gameIndex)}
          />
        );
      break;

      case 'ocean-cleaner':
        gameTitle = 'Ocean Cleaner';
        modalBodyClasses += ' no-padding';
        gameComponent = (
          <OceanCleaner
            {...this.props.games.quizData}
            gameId={this.props.games._id}
            onFinish={() => this.onGameFinished(gameIndex)}
          />
        );
      break;

      case 'memory':
        gameTitle = 'Memory';
        modalBodyClasses += ' no-padding';
        gameComponent = (
          <Memory
            {...this.props.games.quizData}
            onFinish={() => this.onGameFinished(gameIndex)}
          />
        );
        modalSize = 'xl'
      break;

      default:
        console.warn('Tried to show currently unsupported game type: ' + gameType)
        // Use setTimeout, because it's not allowed to change state within the render call
        setTimeout(() => this.onGameFinished(gameIndex), 0)
      break;
    }

    return (
      <Modal
        size={modalSize}
        show={show}
        onHide={() => this.onGameFinished(gameIndex)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {gameTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalBodyClasses}>
          {gameComponent}
        </Modal.Body>
      </Modal>
    );
  }

}

export default GamesView;