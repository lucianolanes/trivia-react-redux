import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userInfo: { name, picture } } = this.props;
    return (
      <header>
        <p data-testid="header-player-name">
          Jogador:
          {name}
        </p>
        <img src={ picture } alt="User Avatar" />
        <p data-testid="header-score">
          Pontos:
          {}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.rootReducer.user,
  userScore: state.rootReducer.score,
});

export default connect(mapStateToProps)(Header);
