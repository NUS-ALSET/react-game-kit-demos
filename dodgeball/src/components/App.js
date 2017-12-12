import React, { Component } from 'react';
import Game from './Game/Game'
import Background from './Game/Background'
import KeyEvent from './Game/KeyEvent'
import Pirat from './Game/Pirat'
import Pos from './Game/Pos'
import Bomb from './Game/Bomb'
import Health from './Game/Health'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 609,
            height: 700,
            health: 100,
            bomb1: '',
            pirat: '',
        }
    }

    rect2Rect(bomb, pirat) {
        return (
            bomb.offsetLeft <= pirat.offsetLeft + pirat.offsetWidth &&
            bomb.offsetLeft + bomb.offsetWidth  >= pirat.offsetLeft &&
            bomb.offsetTop + bomb.offsetHeight >= pirat.offsetTop &&
            bomb.offsetTop <= pirat.offsetTop + pirat.offsetHeight
        );
    }

    move(bomb, pirat) {
        if(this.rect2Rect(bomb, pirat)) {
            this.setState({
                health: this.state.health - 25
            });
        }
    }

    render() {
        let left = this.state.width - 499;
        let center = this.state.width / 2;
        let right = this.state.width - 119;
        return (
            <Game width={this.state.width} height={this.state.height}>
                <Background />
                <Pos x={110} y={this.state.width} />
                <Pos x={495} y={this.state.width} />
                <Bomb x={left} y={10} delay={1} onUpdate={(prevState) => {
                    const state = {};

                    if(prevState.y >= this.state.height) {
                        state.y = -20;
                    } else {
                        state.y = prevState.y + 2;
                    }

                    return state;
                }} />
                <Bomb x={center} y={10}  delay={6} onUpdate={(prevState) => {
                    const state = {};

                    if(prevState.y >= this.state.height) {
                        state.y = -20;
                    } else {
                        state.y = prevState.y + 2;
                    }

                    return state;
                }} />
                <Bomb x={right} y={10}  delay={11} onUpdate={(prevState) => {
                    const state = {};

                    if(prevState.y >= this.state.height) {
                        state.y = -20;
                    } else {
                        state.y = prevState.y + 2;
                    }

                    return state;
                }} />
                <Pirat x={100} y={this.state.width}>
                    <Health value={this.state.health} />
                    <KeyEvent onDown={(keys, prevState) => {
                        const state = {};
                        if(keys == 65 || keys == 37) {
                            if(prevState.x <= left) {
                                state.x = prevState.x;
                            } else {
                                state.x = prevState.x - 10;
                            }
                            state.directionIndex = 1;
                        }

                        if(keys == 68 || keys == 39) {
                            if(prevState.x >= right) {
                                state.x = prevState.x;
                            } else {
                                state.x = prevState.x + 10;
                            }
                            state.directionIndex = 4;
                        }

                        return state;
                    }} />
                </Pirat>
            </Game>
        );
    }
}

export default App;
