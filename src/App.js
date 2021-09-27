import React from 'react';
import { Switch, Route } from 'react-router';
import * as pages from './pages';
import purpleRain from './sound/purple_rain.mp3';
import purpleRainLyrics from './sound/purple_rain_lyrics.vtt';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    const audio = document.querySelector('audio');
    audio.volume = 0.33;
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/trivia-react-redux/" component={ pages.Login } />
          <Route path="/trivia" component={ pages.Trivia } />
          <Route path="/feedback" component={ pages.Feedback } />
          <Route path="/ranking" component={ pages.Ranking } />
          <Route path="/settings" component={ pages.Settings } />
          <Route path="*" component={ pages.Error404 } />
        </Switch>
        <div className="music-container">
          <audio controls autoPlay loop className="music-player">
            <track
              default
              kind="captions"
              srcLang="en"
              src={ purpleRainLyrics }
            />
            <source src={ purpleRain } />
          </audio>
        </div>
      </>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   getQuestions: () => dispatch(fetchQuestions()),
// });

// export default connect(null, mapDispatchToProps)(App);

export default App;
