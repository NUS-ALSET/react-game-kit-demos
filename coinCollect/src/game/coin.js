import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit/lib';
@observer
export default class Coin extends Component {
    static propTypes = {
        store: PropTypes.object,
        index: PropTypes.number,
    };

    static contextTypes = {
        engine: PropTypes.object,
        scale: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.getCoinStyle = this.getCoinStyle.bind(this);
    }

    componentDidMount() {
        Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    }

    componentWillUnmount() {
        Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    }

    getCoinStyle() {
        const { coinPosition, stageX, stageY } = this.props.store;
        const { scale } = this.context;
        const { x, y } = coinPosition[this.props.index];

        const targetX = x + stageX[this.props.index];
        const targetY = y + stageY[this.props.index];

        return {
            position: 'absolute',
            width: 30,
            height: 30,
            transform: `translate(${targetX * scale}px, ${targetY * scale}px)`,
            transformOrigin: 'left top',
        };
    }

    update() {
        const { store, index } = this.props;
        const { body } = this.body;

        if (!this.isLeaving) {
            store.setCoinPosition(body.position, index);
            this.isLeaving = true;
        } else {
            const coin = document.getElementById(this.props.mode + '-coin' + index);
            const player1 = document.getElementById(this.props.mode + '-player1');
            const player2 = document.getElementById(this.props.mode + '-player2');

            let coinPositionX = Math.random() * (100 - 800) + 800;
            let coinPositionY = Math.random() * (100 - 500) + 500;

            if(store.rect2Rect(coin, player1)) {
                store.setScore(0);
                store.setCoinPosition({x: coinPositionX, y: coinPositionY}, index);
            }
            if(store.rect2Rect(coin, player2)) {
                store.setScore(1);
                store.setCoinPosition({x: coinPositionX, y: coinPositionY}, index);
            }

        }
    };

    render() {
        let x = this.props.store.coinPosition[this.props.index].x;
        let y = this.props.store.coinPosition[this.props.index].y;

        return (
            <div id={this.props.mode + "-coin" + this.props.index} style={this.getCoinStyle()}>
                <Body
                    args={[x, y, 30, 30]}
                    inertia={Infinity}
                    ref={b => {
                        this.body = b;
                    }}
                >
                    <img src="data:image/png;base64,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" alt="coin" style={{width: 30, height: 30, top: -8, position: 'relative'}} />
                </Body>
            </div>
        );
    }

}
