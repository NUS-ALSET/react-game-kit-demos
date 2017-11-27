import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h3>Moving Sprite on Background
          (<a href="https://youtu.be/UjY2c5AgxHg">video</a>)
        </h3> 
        <img src="images/basic.png"/>
        <br/>
        <h3>Soc-car
          (<a href="https://codepen.io/fleemaja/pen/rzeEWE">Codepen</a>)
        </h3> 
        <img src="images/soc-car.png"/>
        <br/>
        
        <h3>Goblins
          (<a href="https://codepen.io/fleemaja/pen/rzeEWE">Codepen</a>)
        </h3> 
        <img src="images/goblins.png"/>
        <br/>
        
        <h3>Movimentation 
          (<a href="https://codepen.io/fleemaja/pen/rzeEWE">Codepen</a>)
        </h3> 
        <img src="images/movimentation.png"/>
        <br/>
        

        
      </div>
    );
  }
}

export default App;
