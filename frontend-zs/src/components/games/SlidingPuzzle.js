import React from 'react';
import axios from 'axios';
import './SlidingPuzzle.css';
import SlidingPuzzleTile from './SlidingPuzzleTile'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stars from './Stars'
import Button from 'react-bootstrap/Button';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomPosition(max) {
  return { x: getRandomInt(3), y: getRandomInt(3) };
}

class SlidingPuzzle extends React.Component {

  constructor(props) {
    super(props);

    let hiddenPosition = null;
    do {
      hiddenPosition = getRandomPosition();
    } while (hiddenPosition.x === 1 && hiddenPosition.y === 1);

    let positions = this.randomPositions(hiddenPosition);

    this.state = {
      reward: 10,
      positions: positions,
      hidden: hiddenPosition,
      finished: false,
      automaticallySolved: false,
      starsCollected: 0,
      startTime: new Date(),
      endTime: null
    }
  }

  onFinish() {
    const { gameId } = this.props;
    const { startTime, endTime, automaticallySolved } = this.state;
    if (startTime && endTime && !automaticallySolved) {
      let timeTaken = (endTime - startTime) / 1000;
      let requestBody = {
        timeTaken: timeTaken
      }
      axios.put(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/game/${gameId}/submitPuzzle`, requestBody)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  isFinished(positions) {
    for (let y = 0; y < 3; ++y) {
      for (let x = 0; x < 3; ++x) {
        if (positions[y][x].x !== x || positions[y][x].y !== y)
          return false;
      }
    }
    return true;
  }

  solve() {
    this.setState({ positions: this.defaultPositions(), finished: true, automaticallySolved: true });
  }

  defaultPositions() {
    let positions = new Array(3);
    for (let y = 0; y < 3; ++y) {
      positions[y] = new Array(3);
      for (let x = 0; x < 3; ++x) {
        positions[y][x] = { x: x, y: y };
      }
    }
    return positions;
  }

  shuffle() {
    const { hidden } = this.state;
    this.setState({
      positions: this.randomPositions(hidden),
      automaticallySolved: false,
      finished: false,
      startTime: new Date(),
      endTime: null
    });
  }

  randomPositions(hidden, steps = 30) {
    let positions = this.defaultPositions();
    this.shufflePositions(positions, hidden, steps);
    return positions;
  }

  shufflePositions(positions, hidden, steps) {
    let prev = hidden;
    let prev2 = hidden;
    while (this.isFinished(positions) || steps > 0) {
      const hiddenPos = positions[hidden.y][hidden.x];
      const neighbours = this.getNeighbours(positions, hiddenPos).filter(neighbour => neighbour !== prev && neighbour !== prev2);
      const swapWith = neighbours[getRandomInt(neighbours.length)];
      this.swapPositions(positions, hidden, swapWith);
      prev2 = prev;
      prev = swapWith;
      steps--;
    }
    return positions;
  }

  swapPositions(positions, a, b) {
    let tmp = positions[a.y][a.x];
    positions[a.y][a.x] = positions[b.y][b.x];
    positions[b.y][b.x] = tmp;
  }

  getNeighbours(positions, position) {
    let neighbours = [];
    positions.forEach((row, y) => {
      row.forEach((neighbour, x) => {
        if (Math.abs(neighbour.x - position.x) + Math.abs(neighbour.y - position.y) === 1)
          neighbours.push({ x, y });
      })
    })
    return neighbours;
  }

  onTileClick(arrayPosition, currentPosition) {
    const { hidden, positions, finished, starsCollected, reward } = this.state;
    if (finished) return;
    const hiddenPosition = positions[hidden.y][hidden.x];
    let diff = Math.abs(currentPosition.x - hiddenPosition.x) + Math.abs(currentPosition.y - hiddenPosition.y);
    if (diff === 1) {
      this.swapPositions(positions, hidden, arrayPosition);
      const finished = this.isFinished(positions);
      const endTime = finished ? new Date() : null;
      const stars = finished ? Math.max(starsCollected, reward) : starsCollected;
      this.setState({ positions, finished, endTime, starsCollected: stars }, () => {
        if (finished) {
          this.onFinish();
        }
      });
    }
  }

  render() {
    const { image } = this.props;
    const { positions, hidden, finished, automaticallySolved, starsCollected } = this.state;
    return (<>
      <Container style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Row>
          <Col>Verschiebe die Blöcke neben dem leeren Feld, indem du auf sie drückst, um das Puzzle zu lösen.</Col>
        </Row>
        <Row className="align-items-center" >
          <Col md={{ span: 4, order: 1 }} xs={{ span: 6, order: 2 }}>
            <Button block onClick={this.shuffle.bind(this)}>Mischen</Button>
          </Col>
          <Col md={{ span: 4, order: 2 }} xs={{ span: 12, order: 1 }}>
            <Stars amount={starsCollected} highlight={!automaticallySolved && finished} />
          </Col>
          <Col md={{ span: 4, order: 3 }} xs={{ span: 6, order: 3 }}>
            <Button block onClick={this.solve.bind(this)}>Lösung</Button>
          </Col>
        </Row>
      </Container>
      <div className="puzzle-container">
        {positions.map((row, y) => row.map((tile, x) => {
          return <SlidingPuzzleTile
            key={x + "-" + y}
            image={image}
            correctPosition={{ x, y }}
            currentPosition={tile}
            hidden={x === hidden.x && y === hidden.y}
            finished={finished}
            onClick={this.onTileClick.bind(this)}
          />
        }))}
      </div>
    </>);
  }

}

export default SlidingPuzzle;