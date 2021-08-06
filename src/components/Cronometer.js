import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateQuestion, setAnswerTime } from '../redux/actions';

class Cronometer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      timerID: null,
    };

    this.updateAfterTimeOut = this.updateAfterTimeOut.bind(this);
  }

  componentDidMount() {
    const ONE_SEC = 1000;

    const timerID = setInterval(
      () => this.setState(({ timer }) => ({ timer: timer - 1 })),
      ONE_SEC,
    );

    this.setTimerID(timerID);
  }

  componentDidUpdate(_prevProps, { timer, timerID }) {
    const { question: { answered }, setAnswerTime: setTime } = this.props;
    if (answered) {
      clearInterval(timerID);
      setTime({ answerTime: timer });
    }
    if (timer === 0) {
      clearInterval(timerID);
      this.updateAfterTimeOut();
    }
  }

  setTimerID(timerID) {
    this.setState((prevState) => ({ ...prevState, timerID }));
  }

  updateAfterTimeOut() {
    const { updateQuestion: update, question: { qnNum } } = this.props;
    update({ question: { answered: true, qnNum } });
  }

  render() {
    const { timer } = this.state;
    const NEGATIVE_VALUE = -1;
    return (
      <div>
        { timer === NEGATIVE_VALUE ? 0 : timer }
      </div>
    );
  }
}

const mapDispatchToProps = { updateQuestion, setAnswerTime };

const mapStateToProps = (state) => ({ ...state.trivia });

Cronometer.propTypes = {
  question: PropTypes.shape({
    answered: PropTypes.bool.isRequired,
    qnNum: PropTypes.number.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
  setAnswerTime: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);
