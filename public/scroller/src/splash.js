import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <p
          className="start"
          style={{ display: this.state.blink ? 'block' : 'none' }}
        >
          Press Enter
        </p>
      </div>
    );
  }

  startUpdate() {
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.props.onStart();
    }
  }
}
