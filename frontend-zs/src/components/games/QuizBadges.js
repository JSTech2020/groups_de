import React from 'react';
import axios from 'axios';
import "./QuizBadges.css";
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stars from './Stars'

class QuizBadges extends React.Component{

  constructor(props){
    super(props);
    const questions = props.questions.map(q => {
      let question = {...q}
      question.answers = question.answers.map((a, i) => {
        return {
          answer: a,
          isCorrect: question.correctAnswer === i
        }
      })
      return question;
    })
    this.state = {
      questions: questions,
      showResult: false,
      currentQuestion: 0,
      starsCollected: 0
    }
  }

  onAnswer(e, answer){
    const { showResult, questions, currentQuestion, starsCollected } = this.state;
    if(showResult)
      return;

    const reward = questions[currentQuestion].difficulty ? (questions[currentQuestion].difficulty + 1) * 5 : 5;
    questions[currentQuestion].correctlyAnswered = answer.isCorrect;
    const newStarsCollected = answer.isCorrect ? starsCollected + reward : starsCollected;
    this.setState({questions: questions, showResult: true, starsCollected: newStarsCollected}, () => this.nextQuestion());
  }

  nextQuestion(){
    const { questions, currentQuestion } = this.state;
    let nextQuestionIndex = currentQuestion + 1;
    if(nextQuestionIndex < questions.length){
      setTimeout(() => {
        this.setState({ showResult: false, currentQuestion: nextQuestionIndex });
      }, 3000);
      
    } else { // Finished all questions
      // Send request to server to save reward
      this.requestReward();
      setTimeout(()=>{
        this.setState({showResult: false}, this.props.onFinish);
      }, 3000);
    }
  }

  requestReward(){
    const { id } = this.props;
    const { starsCollected } = this.state;

    if(starsCollected > 0){
      const { starsCollected } = this.state;
      let requestBody = {
        reward: starsCollected
      }

      axios.post(`http://localhost:3000/quiz/${id}/submit`, requestBody)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
  }

  render(){

    const { questions, currentQuestion, showResult, starsCollected } = this.state;

    if(questions){
      const question = currentQuestion < questions.length ? questions[currentQuestion] : null;
      const { image } = question;

      console.log("Current question: ", question);

      return <>
      <Container fluid>
        <Row style={{textAlign: 'center'}} className="align-items-center">
          <Col xs={12} md={2}>
            <Stars highlight={showResult && question.correctlyAnswered} amount={starsCollected}/> 
          </Col>
          <Col xs={12} md={10}>
            <div className="quiz-progress">
              <ProgressBar>
                {questions.filter(question => question.correctlyAnswered !== undefined)
                  .map((question, index) => {
                    return (
                      <ProgressBar striped 
                        variant={question.correctlyAnswered ? "success" : "danger"} 
                        now={100.0 / questions.length} key={index+1} 
                      />
                    )
                  })
                }
              </ProgressBar>
            </div>
          </Col>
        </Row>
        
        <div className="quiz-question">
          { question.question }
          {image && 
            <div>
              <Image src={image} className="quiz-image" fluid rounded />
            </div>
          }
        </div>
        <div className="quiz-answers">
          {question.answers.map((answer, i) => {
            let classNames = "";
            if(showResult){
              classNames = answer.isCorrect ? "correct-answer" : "wrong-answer";
            }
            return <Button className={classNames} onClick={(e)=>this.onAnswer(e, answer)} variant="primary" size="lg" block>{answer.answer}</Button>
          })}
        </div>
      </Container>
      
      </>
    } else {
      return <div>
        <span>Loading Quiz...</span>
      </div>
    }

    
  }

}

export default QuizBadges;