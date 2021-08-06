import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ButtonHome extends React.Component {
  render() {
    const { text, testId } = this.props;
    return (
      <Link to="/">
        <button type="button" data-testId={ testId }>
          { text }
        </button>
      </Link>
    );
  }
}

ButtonHome.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ButtonHome;
