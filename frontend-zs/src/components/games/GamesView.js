import React from 'react';
import Modal from 'react-bootstrap/Modal'
import QuizBadges from './QuizBadges';
import SlidingPuzzle from './SlidingPuzzle'

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
      console.log("finished game " + this.props.games.types[gameIndex])
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
    console.log(gameType)
    let gameComponent = null;
    let gameTitle = "";
    switch(gameType){
      case 'quiz-badges':
        console.log('render quiz')
        gameTitle = "Quiz";
        gameComponent = (
          <QuizBadges 
            {...this.props.games.quizData}
            onFinish={() => this.onGameFinished(gameIndex)}
          />
        );
      break;

      case 'puzzle':
        gameTitle = "Schiebe-Puzzle";
        gameComponent = (
          <SlidingPuzzle 
            image={'https://cutewallpaper.org/21/nice-wallpaper-pictures/Nice-Wallpapers-Top-Free-Nice-Backgrounds-WallpaperAccess.jpg'}
          />
        )
      break;

      default:
        console.warn('Tried to show currently unsupported game type: ' + gameType)
        // Use setTimeout, because it's not allowed to change state within the render call
        setTimeout(() => this.onGameFinished(gameIndex), 0)
      break;
    }

    return (
      <Modal 
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