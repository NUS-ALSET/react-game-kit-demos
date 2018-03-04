import React, {Component} from 'react';
import { Sprite } from 'react-game-kit';

export default class Character1 extends Component {
    getAnimationState(){
        //if(this.props.type)
        //console.log(this.props.positionData.direction);
        switch(this.props.positionData.direction){
            case 'up':
                this.animState = 8;
                break;
            case 'down':
                this.animState = 10;
                break;
            case 'left':
                this.animState = 9;
                break;
            case 'right':
                this.animState = 11;
                break;
            default:
                this.animState = 8;
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
                    src={'characters/blonde.png'}
                    ticksPerFrame={4}
                    state={this.animState}
                    scale={1}
                    steps={[6,6,6,6,7,7,7,7,8,8,8,8,5,5,5,5,12,12,12,12,5]}
                />
			</div>
		)
	}
}