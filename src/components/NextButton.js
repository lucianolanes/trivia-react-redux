import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScore } from '../redux/actions';

// prettier-ignore
class NextButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { qnNum, updateScore: update } = this.props;
    const newQnNum = qnNum + 1;
    update({ question: { answered: false, qnNum: newQnNum } });
  }

  render() {
    return (
      <button type="button" data-testid="btn-next" onClick={ this.handleClick }>
        Next
      </button>
    );
  }
}

const mapDispatchToProps = { updateScore };

NextButton.propTypes = {
  qnNum: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NextButton);
