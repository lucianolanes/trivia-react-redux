import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      picture: '',
      disableBtn: true,
    };
    this.btnClickConfig = this.btnClickConfig.bind(this);
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
    console.log(this.props);
    const { getToken } = this.props;
    getToken();
  }

  btnClickConfig() {
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
    const { createInput, handleChange, btnClickPlay, btnClickConfig } = this;
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
            {this.createBtn(['CONFIGURAÇÕES', 'btn-settings', false , '/config',
               btnClickConfig])}
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken),
});

export default connect(null, mapDispatchToProps)(Login);
