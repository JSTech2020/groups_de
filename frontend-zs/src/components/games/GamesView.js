import React from 'react';
import Modal from 'react-bootstrap/Modal'
import QuizBadges from './QuizBadges';
import SlidingPuzzle from './SlidingPuzzle'
import QuizTimer from "./quizTimer/QuizTimer";

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
    switch(gameType){
      case 'quiz-badges':
        gameTitle = "Quiz";
        gameComponent = (
          <QuizBadges
            {...this.props.games.quizData}
            onFinish={() => this.onGameFinished(gameIndex)}
          />
        )
      break;

      case 'puzzle':
        gameTitle = "Schiebe-Puzzle";
        gameComponent = (
          <SlidingPuzzle
            // TODO: Uncomment once images are saved in the database for the puzzle
            //{...this.props.games.puzzleData}
            image={'https://cutewallpaper.org/21/nice-wallpaper-pictures/Nice-Wallpapers-Top-Free-Nice-Backgrounds-WallpaperAccess.jpg'}
          />
        )
      break;

      case 'quiz-timer':
        gameTitle = 'Quiz';
        gameComponent = (
          <QuizTimer
            {...this.props.games.quizData}
            onFinish={() => this.onGameFinished(gameIndex)}
          />
        );
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
        <Modal.Body>
          {gameComponent}
        </Modal.Body>
      </Modal>
    );
  }

}

export default GamesView;