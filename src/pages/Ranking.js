import React from 'react';
import { Redirect } from 'react-router';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
      redirect: false,
    };
    this.makeRank = this.makeRank.bind(this);
    this.renderRank = this.renderRank.bind(this);
    this.returnClick = this.returnClick.bind(this);
  }

  componentDidMount() {
    this.makeRank();
  }

  returnClick() { this.setState({ redirect: true }); }

  makeRank() {
    const player = localStorage.getItem('state')
      ? JSON.parse((localStorage.getItem('state')).split(': ')[1]) : null;
    let rankList = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking')) : [];
    rankList = (player) ? [...rankList, player]
      .sort(({ score: scA }, { score: scB }) => scB - scA) : rankList;
    localStorage.removeItem('state');
    this.setState({ ranking: rankList });
    localStorage.setItem('ranking', JSON.stringify(rankList));
  }

  renderRank() {
    const { ranking } = this.state;
    return (
      <div className="playerCard">
        { ranking.map(({ name, score, picture }, index) => (
          <div key={ index }>
            <img src={ picture } alt="player-rank$-{index}" />
            <p data-testid={ `player-name-${index}` }>
              { name }
            </p>
            <p data-testid={ `player-score-${index}` }>
              { score }
            </p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    // [ { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar } ]
    const { redirect } = this.state;

    return (
      <>
        { redirect && <Redirect to="/" /> }
        <div>
          { this.renderRank() }
        </div>
        <button type="button" onClick={ this.returnClick }>MAIS UMA VEZ!!!</button>
      </>
    );
  }
}

export default Ranking;
