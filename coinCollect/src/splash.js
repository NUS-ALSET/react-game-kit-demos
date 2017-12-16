import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from './keys';

export default class splash extends Component {
  static propTypes = {
    onStart: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      blink: false,
    };

    this.startUpdate = this.startUpdate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
    this.animationFrame = requestAnimationFrame(this.startUpdate);
    this.interval = setInterval(() => {
      this.setState({
        blink: !this.state.blink,
      });
    }, 500);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
    cancelAnimationFrame(this.animationFrame);
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <img className="splash" src="assets/splash.png" />
        <div
          className="start"
          style={{ display: this.state.blink ? 'block' : 'none' }}
        >
          <p>Press 1 - Player vs Player</p>
          <p>Press 2 - Player vs Bot</p>
          <p>Press 3 - Bot vs Bot</p>
        </div>
      </div>
    );
  }

  startUpdate() {
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  handleKeyPress(e) {
    if (e.keyCode === Keys.playerVsPlayer) {
      this.props.onStart(0);
    }
    if (e.keyCode === Keys.playerVsBot) {
      this.props.onStart(1);
    }
    if (e.keyCode === Keys.botVsBot) {
      this.props.onStart(2);
    }
  }
}
