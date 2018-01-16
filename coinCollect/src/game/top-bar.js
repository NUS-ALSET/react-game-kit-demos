import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

@observer
export default class Bar extends Component {

    static contextTypes = {
        engine: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            player1Score: this.props.store.playersScore[0].score,
            player2Score: this.props.store.playersScore[1].score,
            player1Round: this.props.store.playersRoundScore[0].score,
            player2Round: this.props.store.playersRoundScore[1].score,
            rounds: this.props.store.rounds,
            coinInRound: this.props.store.coinInRound,
            winner: this.props.store.winner,
            player1Direction: this.props.store.playerDirection[0],
            player2Direction: this.props.store.playerDirection[1],
        };

        this.update = this.update.bind(this);
        this.setCoinPositions = this.setCoinPositions.bind(this);
        this.restart = this.restart.bind(this);
    }

    componentDidMount() {
        Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    }

    componentWillUnmount() {
        Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    }

    update() {
        this.setState({
            player1Score: this.props.store.playersScore[0].score,
            player2Score: this.props.store.playersScore[1].score,
            player1Round: this.props.store.playersRoundScore[0].score,
            player2Round: this.props.store.playersRoundScore[1].score,
            rounds: this.props.store.rounds,
            coinInRound: this.props.store.coinInRound,
            winner: this.props.store.winner,
            player1Direction: this.props.store.playerDirection[0],
            player2Direction: this.props.store.playerDirection[1],
        });
    };

    setCoinPositions() {
        const {coinsPosition, store, coins} = this.props;
        if(coinsPosition) {
            store.coinPosition = coinsPosition;
            if(coinsPosition.length !== coins.length) {
                if(coinsPosition.length < coins.length) {
                    for(let i = coinsPosition.length; i < coins.length; i++) {
                        store.setCoinPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
                    }
                } else {
                    console.error('Mode: ' + this.props.mode + ' - Error, coins ' + coins.length  + ' < ' + coinsPosition.length + ' coinsPosition, you can add coin');
                }
            }
        } else {
            store.coinPosition = coins.map(() => {return ({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500})});
        }
    }

    restart(e) {
        e.preventDefault();
        const { store } = this.props;
        store.playersScore[0].score = 0;
        store.playersScore[1].score = 0;
        store.playersRoundScore[0].score = 0;
        store.playersRoundScore[1].score = 0;
        store.winner = '';
    }

    render() {
        return (
            <div>
                {this.state.winner.length > 1 ? (
                    <div style={{position: 'absolute', zIndex: 999, top: 0, left: 0, width: '100%', height: '100%', background: 'rgb(0,0,0)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <h3 style={{color: 'red', margin: 0}}>Game Over</h3>
                        <p>{this.state.winner} win</p>
                        <p>
                            <a style={{color: 'white', textDecoration: 'none', padding: '8px 20px', fontSize: 32, background: 'blue', borderRadius: 15}} href=""
                            onClick={(event) => {
                                this.restart(event);
                                this.setCoinPositions()
                            }}>Restart Game</a>
                        </p>
                    </div>
                ) : []}
                <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', textAlign: 'center', color: 'white', margin: 0, fontSize: 36, width: '100%', height: 30}}>
                    <div style={{position: 'relative'}}>
                        <p style={{position: 'absolute', left: 25, top: -15, fontSize: 16}}>
                            left: <span style={this.state.player1Direction.left === 'true' ? {color: 'red'} : []}>{this.state.player1Direction.left}</span>,
                            right: <span style={this.state.player1Direction.right === 'true' ? {color: 'red'} : []}>{this.state.player1Direction.right}</span>,
                            up: <span style={this.state.player1Direction.up === 'true' ? {color: 'red'} : []}>{this.state.player1Direction.up}</span>,
                            down: <span style={this.state.player1Direction.down === 'true' ? {color: 'red'} : []}>{this.state.player1Direction.down}</span>
                        </p>
                        <span style={{fontSize: 24}}>{this.state.player1Score}</span>
                        <span> : </span>
                        <span style={{fontSize: 24}}>{this.state.player2Score}</span>
                        <p style={{position: 'absolute', right: 25, top: -15, fontSize: 16}}>
                            left: <span style={this.state.player2Direction.left === 'true' ? {color: 'red'} : []}>{this.state.player2Direction.left}</span>,
                            right: <span style={this.state.player2Direction.right === 'true' ? {color: 'red'} : []}>{this.state.player2Direction.right}</span>,
                            up: <span style={this.state.player2Direction.up === 'true' ? {color: 'red'} : []}>{this.state.player2Direction.up}</span>,
                            down: <span style={this.state.player2Direction.down === 'true' ? {color: 'red'} : []}>{this.state.player2Direction.down}</span>
                        </p>
                    </div>
                </div>
                <div style={{position: 'absolute', left: 0, bottom: 25, display: 'flex', flexDirection: 'column', textAlign: 'center', color: 'white', margin: 0, fontSize: 36, width: '100%', height: 30}}>
                    <div style={{position: 'relative'}}>
                        <p style={{position: 'absolute', left: 25, top: -15, fontSize: 16}}>
                            Coins in round: <span>{this.state.coinInRound}</span>
                        </p>
                        {this.state.winner.length > 1 ? (
                            <span>{this.state.winner} win</span>
                        ) : (
                            <div>
                                <span style={{fontSize: 24}}>{this.state.player1Round}</span>
                                <span> : </span>
                                <span style={{fontSize: 24}}>{this.state.player2Round}</span>
                            </div>
                        )}
                        <p style={{position: 'absolute', right: 25, top: -15, fontSize: 16}}>
                            Rounds: <span>{this.state.rounds - Math.max(this.state.player1Round, this.state.player2Round)}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

