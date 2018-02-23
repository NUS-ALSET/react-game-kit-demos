import React, {Component} from 'react';
import { Sprite } from 'react-game-kit';

export default class Character1 extends Component {
    getAnimationState(){
        switch(this.props.positionData.direction){
            case 'up':
                this.animState = 2;
                break;
            case 'down':
                this.animState = 3;
                break;
            case 'left':
                this.animState = 1;
                break;
            case 'right':
                this.animState = 0;
                break;
            default:
                this.animState = 0;
                break;
        }
    }
    getWrapperStyles() {
        this.getAnimationState();
        if(!this.props.positionData)
            var targetX = 0;
        else
            var targetX = this.props.positionData.x;
        if(!this.props.positionData)
            var targetY = 0;
        else
            var targetY = this.props.positionData.y;
        return {
            position: 'absolute',
            transform: `translate(${targetX}px, ${targetY}px)`,
            transformOrigin: 'left top'
        };
    }
    render() {
		return (
			<div id={"character"} style={this.getWrapperStyles()}>
                <Sprite
                    repeat={true}
                    tileWidth={64}
                    tileHeight={64}
                    src={'characters/gnome1.png'}
                    ticksPerFrame={4}
                    state={this.animState}
                    scale={1}
                    steps={[7, 7, 7, 7, 0, 0]}
                />
			</div>
		)
	}
}