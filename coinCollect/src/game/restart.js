import React, { Component } from 'react';

export default class Restart extends Component {
    constructor(props) {
        super(props);
    }

    startNewGame() {
        const {gameId, handleClick} = this.props;
        handleClick(gameId)
    }

    render() {
        return (
            <div className="restart-game">
                <input type="button" value='Start New Game' onClick={() => {
                    this.startNewGame();
                }}/>
            </div>
        )
    }
}
