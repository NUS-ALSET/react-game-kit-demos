import React, { Component } from 'react';
import { Loop, Stage, World } from "react-game-kit";


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 609,
            height: 700,
        }
    }
    render() {
        return (
            <Loop>
                <Stage width={this.props.width} height={this.props.height} style={{transform: 'translate(0,0)'}}>
                    <World>
                        {this.props.children}
                    </World>
                </Stage>
            </Loop>
        );
    }
}

export default Game;
