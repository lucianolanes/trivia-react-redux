import React from 'react';
import { Connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userInfo: {name, email, picture } } = this.props;
    return (
      <header>
        <p data-testid="" >{name}</p>
        <p></p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.rootReducer.user,
});

export default connect(mapStateToProps)(Header);
