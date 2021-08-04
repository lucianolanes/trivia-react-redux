import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { fetchToken, getPlayerInfo } from '../redux/actions';
import logo from '../trivia.png';
const URL_GRAVATAR = 'https://www.gravatar.com/avatar/';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disableBtn: true,
    };
    this.btnClickPlay = this.btnClickPlay.bind(this);
    this.btnStats = this.btnStats.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, this.btnStats);
  }

  btnStats() {
    const { name, email, disableBtn } = this.state;
    const disable = (name === '') || (email === '');
    if (disableBtn !== disable) this.setState({ disableBtn: disable });
  }

  btnClickPlay() {
    const { name, email} = this.state;
    const { getPlayerInfo, getToken } = this.props;
    const picture = URL_GRAVATAR + md5(email).toString();
    const state = JSON.stringify({ name, email })
    localStorage.setItem('state', `player: ${state}`);
    getPlayerInfo({name, email, picture});
    getToken();
  }

  createInput(inputProperties) {
    const [type, id, value, text, testid, func] = inputProperties;
    return (
      <input
        type={ type }
        id={ id }
        value={ value }
        placeholder={ text }
        data-testid={ testid }
        onChange={ func }
      />
    );
  }

  createBtn(inputProperties) {
    const [text, testid, bool, destiny, func] = inputProperties;
    return (
      <Link to={destiny}>
        <button type="button" data-testid={ testid } disabled={ bool } onClick={ func }>
          { text }
        </button>
      </Link>
    );
  }

  render() {
    const { createInput, handleChange, btnClickPlay } = this;
    const { name, email, disableBtn } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div className="loginContainer">
            {createInput(['text', 'name', name, 'NOME:', 'input-player-name',
              handleChange])}
            {createInput(['text', 'email', email, 'E-MAIL:', 'input-gravatar-email',
              handleChange])}
            {this.createBtn(['PLAY!!!', 'btn-play', disableBtn,'/trivia', btnClickPlay])}
            {this.createBtn(['CONFIGURAÇÕES', 'btn-settings', false , '/config', ])}
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken),
  getPlayerInfo: (info) => dispatch(getPlayerInfo(info))
});

export default connect(null, mapDispatchToProps)(Login);
