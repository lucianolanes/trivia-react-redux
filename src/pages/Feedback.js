import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.renderFeedbackMessage = this.renderFeedbackMessage.bind(this);
  }

  renderFeedbackMessage() {
    const hit = 3;
    if (score >= hit) {
      return (
        <p data-testid="feedback-text">Mandou bem!</p>
      );
    }
    return (<p data-testid="feedback-text">Podia ser melhor...</p>);
  }

  render() {
    const { userScore: { score, assertions } } = this.props;
    return (
      <div>
        <Header />
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
  userScore: state.rootReducer.score,
});

Feedback.propTypes = {
  userScore: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Feedback);

// A mensagem deve ser "Podia ser melhor..." caso a pessoa acerte menos de 3 perguntas
// A mensagem deve ser "Mandou bem!" caso a pessoa acerte 3 perguntas ou mais
// O elemento da mensagem de feedback deve possuir o atributo data-testid com o valor feedback-text
