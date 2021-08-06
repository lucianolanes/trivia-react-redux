import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import TriviaHeader from '../components/TriviaHeader';

class Feedback extends React.Component {
  constructor() {
    super();
    this.renderFeedbackMessage = this.renderFeedbackMessage.bind(this);
  }

  renderFeedbackMessage() {
    const { userScore: { assertions } } = this.props;
    const hit = 3;
    if (assertions >= hit) {
      return <p data-testid="feedback-text">Mandou bem!</p>;
    }
    return <p data-testid="feedback-text">Poderia ser melhor...</p>;
  }

  render() {
    const { userScore: { score, assertions } } = this.props;
    return (
      <div>
        <TriviaHeader />
        {this.renderFeedbackMessage()}
        <p data-testeid="feedback-total-question">
          Você acertou
          { assertions }
          questões!
        </p>
        <p data-testeid="feedback-total-score">
          Um total de
          { score }
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
  userScore: state.trivia,
});

Feedback.propTypes = {
  userScore: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
