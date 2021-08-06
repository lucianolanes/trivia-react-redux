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
      random: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setRandom = this.setRandom.bind(this);
  }

  componentDidMount() {
    this.setRandom();
  }

  setRandom() {
    const { qnObj: { incorrect_answers: incorrectAnswers } } = this.props;
    const { random } = this.state;
    const ARRAY_LENGTH = incorrectAnswers.length + 1;
    if (!random) this.setState({ random: Math.floor(Math.random() * ARRAY_LENGTH) });
  }

  shuffleAnswers() {
    const {
      qnObj: { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } } = this.props;
    const { random } = this.state;
    const arrayAnswers = incorrectAnswers
      .map((answer, index) => (
        this.createAnswer([atob(answer), `wrong-answer-${index}`, 'wrong-answer'])));
    const correct = this.createAnswer(
      [atob(correctAnswer), 'correct-answer', 'correct-answer'],
    );
    arrayAnswers.splice(random, 0, correct);
    return arrayAnswers;
  }

  createAnswer([answer, testid, className]) {
    const { question: { answered } } = this.props;
    return (
      <button
        key={ uuidv4() }
        type="button"
        data-testid={ testid }
        className={ answered ? className : '' }
        disabled={ answered }
        onClick={ this.handleClick }
      >
        { answer }
      </button>
    );
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

  /** Source: https://forums.pixeltailgames.com/t/encoding-issues-in-questions-answers/34751/2 */
  render() {
    const { qnObj: { category, question: text } } = this.props;
    return (
      <section className="question-container">
        <h4 data-testid="question-category">{ atob(category) }</h4>
        <p data-testid="question-text">{ atob(text) }</p>
        <section className="answers-container">
          { this.shuffleAnswers() }
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
