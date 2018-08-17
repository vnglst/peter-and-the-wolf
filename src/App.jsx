import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import HelloWorld from './components/hello-world';
import mp3 from './sounds/karloff-without-intro.mp3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <audio controls src={mp3}>
          <track kind="captions" />
        </audio>
        <HelloWorld title="Hello from React !!" />;
      </div>
    );
  }
}

export default hot(module)(App);
