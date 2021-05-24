import React from 'react';
import { Container, Grid, Message, Button } from 'semantic-ui-react';
import HighScores from './HighScore';
import questions from '../utils/questions';

class App extends React.Component {
  state = {
    currentQuestionIndex: 0,
    answeredQuestionCount: 0,
    score: 0,
    time: 90
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
      })
    }, 1000);
  }

  componentDidUpdate() {
    if (questions.length === this.state.answeredQuestionCount || this.state.time === 0) {
      // end the quiz
      this.props.history.push('/highscores?score=' + this.state.score + '&time=' + this.state.time);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleClick = event => {
    const chosenAnswer = event.target.value;
    const correctAnswerIndex = questions[this.state.currentQuestionIndex].answer;

    // if answer is correct
    if (chosenAnswer === questions[this.state.currentQuestionIndex].choices[correctAnswerIndex]) {
      this.setState({
        score: this.state.score + 1,
      });
    }

    if (questions.length - 1 !== this.state.currentQuestionIndex) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
      });
    }

    this.setState({
      answeredQuestionCount: this.state.answeredQuestionCount + 1
    });
  }

  render() {
    const currentQuestion = questions[this.state.currentQuestionIndex];

    return (
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <p>Time: {this.state.time}</p>
              <p>Score: {this.state.score}</p>
            </Grid.Column>
            <Grid.Column>
              <HighScores />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
        
        <Message header={currentQuestion.question} />
        {currentQuestion.choices.map(choice => (
          <Button key={choice} value={choice} onClick={this.handleClick}>{choice}</Button>
        ))}
      </Container>
    )
  }
}

export default App;
