import React, { Component } from 'react';
import { Loop, Stage, World } from "react-game-kit";


class Pos extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{
                position: "absolute",
                left: this.props.x,
                top: this.props.y,
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '1px solid #000'
            }} />
        );
    }
}

export default Pos;
