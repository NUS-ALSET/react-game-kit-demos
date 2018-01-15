import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit/lib';

@observer
export default class gameSettings extends Component {
    static propTypes = {
        keys: PropTypes.object,
        store: PropTypes.object,
    };

    static contextTypes = {
        engine: PropTypes.object,
        scale: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    }

    componentWillUnmount() {
        Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    }

    update() {
        const { keys, store, onDispatch, gamePause } = this.props;

        if(keys.isDown(gamePause)) {
            store.game = !store.game;
            if(onDispatch) {
                onDispatch(store.game);
            }
        }
    };

    setPlayerPosition() {
        const {playersPosition, store } = this.props;
        if(playersPosition) {
            store.characterPosition = playersPosition;
            if(playersPosition.length !== 2) {
                for(let i = playersPosition.length; i < 2; i++) {
                    store.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
                }
            }
        } else {
            for(let i = 0; i < 2; i++) {
                if(i === 0) {
                    store.setCharacterPosition({x: 64, y: 64}, i);
                } else if(i === 1) {
                    store.setCharacterPosition({x: 899, y: 450}, i);
                } else {
                    store.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i);
                }
            }
        }
    }

    restart() {
        const {store, onDispatch, gameId} = this.props;

        if(onDispatch) {
            onDispatch(store, this.startNewGame, false, gameId );
        }
        this.setPlayerPosition();
    }

    pause() {
        const {store, onDispatch, gameId} = this.props;

        if(onDispatch) {
            onDispatch(store, false, this.pauseGame, gameId );
        }
    }

    render() {
        return (
            <div className={this.props.store.game ? 'menu' : 'menu active'}>
                <input type="button" ref={(pause) => {this.pauseGame = pause;}} value="Pause" onClick={() => {
                    this.pause();
                }} />
                <input type="button" ref={(restart) => {this.startNewGame = restart;}} value="Restart" onClick={() => {
                    this.restart();
                }} />
            </div>
        );
    }

}
