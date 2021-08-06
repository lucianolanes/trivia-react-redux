import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import TriviaHeader from '../components/TriviaHeader';
import { updateQuestion, getTriviaQuestions } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount() {
    const { updateQuestion: setQuestion } = this.props;
    setQuestion({ question: { qnNum: 0, answered: false } });
    this.setScoreAndAssertions();
  }

  componentWillUnmount() {
    localStorage.removeItem('state');
  }

  setScoreAndAssertions() {
    const { getTriviaQuestions: resetQuestions } = this.props;
    resetQuestions([]);
  }

  renderFeedbackMessage() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const hit = 3;
    if (assertions >= hit) {
      return <p data-testid="feedback-text">Mandou bem!</p>;
    }
    return <p data-testid="feedback-text">Podia ser melhor...</p>;
  }

  render() {
    const { player: { score, assertions } } = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <TriviaHeader />
        {this.renderFeedbackMessage()}
        <p>
          Você acertou
          <span data-testid="feedback-total-question">{ assertions }</span>
          questões!
        </p>
        <p>
          Um total de
          <span data-testid="feedback-total-score">{ score }</span>
          pontos
        </p>
        <div id="buttonHome">
          <Button testId="btn-play-again" text="Jogar novamente" linkTo="/" />
        </div>
        <div id="buttonRanking">
          <Button testId="btn-ranking" text="Ver Ranking" linkTo="/ranking" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = ({ updateQuestion, getTriviaQuestions });

Feedback.propTypes = {
  updateQuestion: PropTypes.func.isRequired,
  getTriviaQuestions: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
