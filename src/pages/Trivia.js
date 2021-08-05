import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TriviaHeader, Loading, Question } from '../components';

// prettier-ignore
class Trivia extends React.Component {
  render() {
    const { questions, question: { qnNum } } = this.props;

    if (questions.length === 0) return <Loading />;
    if (qnNum >= questions.length) return <Redirect to="/feedback" />;
    return (
      <section>
        <TriviaHeader />
        {/* Source: https://www.nikgraf.com/blog/using-reacts-key-attribute-to-remount-a-component */}
        <Question key={ qnNum } qnObj={ questions[qnNum] } />
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
};

export default connect(mapStateToProps, null)(Trivia);
