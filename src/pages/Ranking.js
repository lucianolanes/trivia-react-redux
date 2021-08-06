import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateScore } from '../redux/actions';

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

  componentWillUnmount() {
    const { updateScore: update } = this.props;
    update({ score: 0, assertions: 0 });
  }

  returnClick() { this.setState({ redirect: true }); }

  makeRank() {
    const { user: { name, picture }, trivia: { score } } = this.props;
    let rankList = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking')) : [];
    const newPlayer = { name, score, picture };
    rankList = [...rankList, newPlayer]
      .sort(({ score: scA }, { score: scB }) => scB - scA);
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
    const { redirect } = this.state;

    return (
      <>
        { redirect && <Redirect to="/" /> }
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { this.renderRank() }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.returnClick }
        >
          MAIS UMA VEZ!!!
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  trivia: state.trivia,
});

const mapDispatchToProps = ({ updateScore });

Ranking.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  trivia: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
