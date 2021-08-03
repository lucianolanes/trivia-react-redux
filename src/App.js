import React from 'react';
// import { connect } from 'react-redux';
// import { fetchQuestions } from './redux/actions';
import logo from './trivia.png';
import './App.css';

class App extends React.Component {
  // componentDidMount() {
  //   const { getQuestions } = this.props;
  //   getQuestions();
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            NOSSA VEZ
          </p>
        </header>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   getQuestions: () => dispatch(fetchQuestions()),
// });

// export default connect(null, mapDispatchToProps)(App);

export default App;
