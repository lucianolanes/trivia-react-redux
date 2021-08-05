import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScore } from '../redux/actions';

class Cronometer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      timerID: null,
    };
  }

  componentDidMount() {
    const ONE_SEC = 1000;
    const THIRTY_SEC = 30000;

    const { updateScore: update } = this.props;

    const timerID = setInterval(
      () => this.setState(({ timer }) => ({ timer: timer - 1 })),
      ONE_SEC,
    );

    setTimeout(() => {
      clearInterval(timerID);
      update({ question: { answered: true, qnNum: 0 } });
    }, THIRTY_SEC);

    this.setTimerID(timerID);
  }

  componentDidUpdate(_prevProps, { timerID }) {
    const { question: { answered } } = this.props;
    if (answered) clearInterval(timerID);
  }

  setTimerID(timerID) {
    this.setState((prevState) => ({ ...prevState, timerID }));
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

const mapDispatchToProps = ({ updateScore });

const mapStateToProps = (state) => ({ ...state.trivia });

Cronometer.propTypes = {
  question: PropTypes.shape({
    answered: PropTypes.bool.isRequired,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);
