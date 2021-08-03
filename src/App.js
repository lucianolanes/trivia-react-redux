import React from 'react';
import { Switch, Route } from 'react-router';
import * as pages from './pages';
// import { connect } from 'react-redux';
// import { fetchQuestions } from './redux/actions';
import './App.css';

class App extends React.Component {
  // componentDidMount() {
  //   const { getQuestions } = this.props;
  //   getQuestions();
  // }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ pages.Login } />
        <Route path="/trivia" component={ pages.Trivia } />
        <Route path="/feedback" component={ pages.Feedback } />
        <Route path="/ranking" component={ pages.Ranking } />
        <Route path="/config" component={ pages.Config } />
        <Route path="/error" component={ pages.Error } />
      </Switch>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   getQuestions: () => dispatch(fetchQuestions()),
// });

// export default connect(null, mapDispatchToProps)(App);

export default App;
