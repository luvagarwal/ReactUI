import React from 'react';
import ReactDOM from 'react-dom';

import { Board } from './components.jsx';


class App extends React.Component {
  render() {
    return (
      // Add title, etc
      <Board />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('board')
)

