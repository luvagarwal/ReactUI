import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'


// Square class
class Square extends React.Component {
  render() {
    return (
      <Button className="square" onClick={this.props.onClick} label={this.props.value} />
    );
  }
}

// Board class

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      player: true,
      winner: null,
    }
  }

  handleClick(i) {
    if (this.state.winner !== null) {
      return;
    }

    let player = !this.state.player;
    const squares = this.state.squares.slice();
    squares[i] = (player)?'X':'O';
    let winner = calculateWinner(squares);
    this.setState({squares: squares, player: player, winner: winner});
  }

  renderSquare(i) {
    return <Square key={i} value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
  }

  render() {
    let lis = [];
    for (let i=0; i<9; i++) {
      lis.push(this.renderSquare(i))
    }
    let player = (this.state.player)?'Player1':'Player2';
    return (
      <div>
        <div> Winner: {this.state.winner} </div>
        <div> {player} </div>
        <div className="board-row">
          {lis.slice(0, 3)}
        </div>
        <div className="board-row">
          {lis.slice(3, 6)}
        </div>
        <div className="board-row">
          {lis.slice(6, 9)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-boar">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('container')
)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
