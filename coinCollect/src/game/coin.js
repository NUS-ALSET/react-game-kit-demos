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

        this.loopID = null;


        this.state = {
            characterState: 5,
            loop: false,
            spritePlaying: true,
            posCharset: '',
        };

        this.handlePlayStateChanged = this.handlePlayStateChanged.bind(this);
        this.checkKeys = this.checkKeys.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    }

    componentWillUnmount() {
        Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    }

    handlePlayStateChanged(state) {
        this.setState({
            spritePlaying: state ? true : false,
        });
    };

    checkKeys(shouldMoveStageLeft, shouldMoveStageRight, shouldMoveStageUp, shouldMoveStageDown) {
        const { keys, store, index } = this.props;
        const { body } = this.body;
    };

    update() {
        const { store, index } = this.props;
        const { body } = this.body;

        const midPoint = Math.abs(store.stageX[index]) + 920;

        const shouldMoveStageLeft = body.position.x < midPoint && store.stageX[index] < 0;
        const shouldMoveStageRight =
            body.position.x > midPoint && store.stageX[index] > -2048;
        const shouldMoveStageUp = body.position.y < 576 && store.stageY[index] < 0 ;
        const shouldMoveStageDown = body.position.y >576 && store.stageY[index]>-576 ;
        console.log(body.position.x)

        if (!this.isLeaving) {
            this.checkKeys(shouldMoveStageLeft, shouldMoveStageRight, shouldMoveStageUp, shouldMoveStageDown);

            store.setCharacterPosition(body.position, index);
        } else {

            const targetX = store.stageX[index] + (this.lastX - body.position.x);
            const targetY = store.stageY[index] + (this.lastY - body.position.y);


            if (shouldMoveStageLeft || shouldMoveStageRight) {
                store.setStageX(targetX, index);
            } else if (shouldMoveStageUp || shouldMoveStageDown) {
                store.setStageY(targetY, index);
            }
        }

        this.lastX = body.position.x;
        this.lastY = body.position.y;
    };

    render() {
        // const x = this.props.store.characterPosition[this.props.index].x;
        // console.log(x)
        // const y = this.props.store.characterPosition[this.props.index].y;
        // console.log(y)

        return (
            <div>
                <Body
                    args={[64, 64, 64, 64]}
                    inertia={Infinity}
                    ref={b => {
                        this.body = b;
                    }}
                >
                    <p style={{position: 'absolute', left: 350, top: 350}}>O</p>
                </Body>
            </div>
        );
    }

}
