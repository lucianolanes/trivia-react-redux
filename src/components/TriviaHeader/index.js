import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css';

class TriviaHeader extends React.Component {
  render() {
    const { name, picture, score } = this.props;
    return (
      <header className="header-trivia">
        <img
          className="profile-picture"
          src={ picture }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <p className="player-name">
          Player:
          <span data-testid="header-player-name">{name}</span>
        </p>
        <p className="player-score">
          Score:
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.user, ...state.trivia });

TriviaHeader.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(TriviaHeader);
