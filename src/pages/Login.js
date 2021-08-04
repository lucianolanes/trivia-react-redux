import React from 'react';
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
    this.btnClick = this.btnClick.bind(this);
    this.btnStats = this.btnStats.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, this.btnStats);
  }

  btnStats() {
    const { name, email, disableBtn } = this.state;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disable = (name === '') || (email === '');
    console.log(disable);
    if (disableBtn !== disable) this.setState({ disableBtn: disable });
  }

  btnClick() {
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
    const [text, testid, bool, func] = inputProperties;
    return (
      <button type="button" data-testid={ testid } disabled={ bool } onClick={ func }>
        { text }
      </button>
    );
  }

  render() {
    const { createInput, handleChange, btnClick } = this;
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
            {this.createBtn(['PLAY!!!', 'btn-play', disableBtn, btnClick])}
          </div>
        </header>
      </div>
    );
  }
}

export default Login;
