import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { updateScore } from '../../redux/actions';
import './style.css';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setQuestion();
  }

  setQuestion() {
    this.setState({ answers: this.shuffleAnswers() });
  }

  /** Source: https://bost.ocks.org/mike/shuffle/ */
  shuffle(array) {
    let m = array.length;
    let t;
    let i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      m -= 1;
      i = Math.floor(Math.random() * m);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  shuffleAnswers() {
    const {
      qnObj: { correct_answer: correct, incorrect_answers: incorrect } } = this.props;
    return this.shuffle([correct, ...incorrect]);
  }

  createAnswers() {
    const { qnObj: { correct_answer: correct } } = this.props;
    const { answers } = this.state;
    let index = 0;
    const result = answers.map((answer) => {
      if (answer === correct) {
        return this.createCorrectAnswer(answer);
      }
      index += 1;
      return this.createIncorrectAnswer(answer, index - 1);
    });
    return result;
  }

  handleClick() {
    const { updateScore: update } = this.props;
    const payload = {
      score: 0,
      assertions: 0,
      question: { qnNum: 0, answered: true },
    };
    update(payload);
  }

  createIncorrectAnswer(answer, index) {
    const { question: { answered } } = this.props;
    return (
      <button
        key={ uuidv4() }
        type="button"
        className={ answered ? 'wrong-answer' : '' }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.handleClick }
      >
        { answer }
      </button>
    );
  }

  createCorrectAnswer(answer) {
    const { question: { answered } } = this.props;
    return (
      <button
        key={ uuidv4() }
        type="button"
        className={ answered ? 'correct-answer' : '' }
        data-testid="correct-answer"
        onClick={ this.handleClick }
      >
        { answer }
      </button>
    );
  }

  render() {
    const { qnObj: { category, question: text } } = this.props;
    return (
      <section className="question-container">
        <h4 data-testid="question-category">{ category }</h4>
        <p data-testid="question-text">{ text }</p>
        <section className="answers-container">
          { this.createAnswers() }
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.trivia });

const mapDispatchToProps = ({ updateScore });

Question.propTypes = {
  qnObj: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  question: PropTypes.shape({
    qnNum: PropTypes.number.isRequired,
    answered: PropTypes.bool.isRequired,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
