import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TriviaHeader, Loading, Question } from '../components';

class Trivia extends React.Component {
  render() {
    const { questions, question: { qnNum }, isLoading } = this.props;
    if (!isLoading) return <Loading />;
    return (
      <section>
        <TriviaHeader />
        <Question qnObj={ questions[qnNum] } />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.user, ...state.trivia });

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  question: PropTypes.shape({
    qnNum: PropTypes.number.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Trivia);
