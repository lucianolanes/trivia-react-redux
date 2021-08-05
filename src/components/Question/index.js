import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { updateScore } from '../../redux/actions';
import Cronometer from '../Cronometer';
import './style.css';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // answers: [],
      randomIndex: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //   this.setAnswers();
  // }

  // setAnswers() {
  //   this.setState({ answers: this.shuffleAnswers() });
  // }

  /** Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice */
  // shuffleAnswers() {
  //   const {
  //     qnObj: { correct_answer: correctAnswer,
  //       incorrect_answers: incorrectAnswers } } = this.props;
  //   const ARRAY_LENGTH = incorrectAnswers.length + 1;
  //   const random = Math.floor(Math.random() * ARRAY_LENGTH);
  //   const arrayAnswers = [...incorrectAnswers];
  //   arrayAnswers.splice(random, 0, correctAnswer);
  //   return arrayAnswers;
  // }

  shuffleAnswers() {
    const {
      qnObj: { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } } = this.props;

    const { randomIndex } = this.state;
    const ARRAY_LENGTH = incorrectAnswers.length + 1;
    const random = !randomIndex ? Math.floor(Math.random() * ARRAY_LENGTH) : randomIndex;
    const arrayAnswers = incorrectAnswers
      .map((answer, index) => (
        this.createAnswer([atob(answer), `wrong-answer-${index}`, 'wrong-answer'])));
    const correct = this.createAnswer(
      [atob(correctAnswer), 'correct-answer', 'correct-answer'],
    );
    if (!randomIndex) this.setState({ randomIndex: random });
    arrayAnswers.splice(random, 0, correct);
    return arrayAnswers;
  }

  // createAnswers() {
  //   const { qnObj: { correct_answer: correct } } = this.props;
  //   const { answers } = this.state;
  //   let index = 0;
  //   const result = answers.map((answer) => {
  //     if (answer === correct) {
  //       return this.createAnswer([atob(correct), 'correct-answer', 'correct-answer']);
  //     }
  //     index += 1;
  //     return this.createAnswer([atob(answer), `wrong-answer-${index}`, 'wrong-answer']);
  //   });
  //   return result;
  // }

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
      <>
        <Cronometer />
        <section className="question-container">
          <h4 data-testid="question-category">{ atob(category) }</h4>
          <p data-testid="question-text">{ atob(text) }</p>
          <section className="answers-container">
            {/* { this.createAnswers() } */}
            { this.shuffleAnswers() }
          </section>
        </section>
      </>
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
