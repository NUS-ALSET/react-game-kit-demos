import React, {Component} from 'react';
import Store from '../../store/squad';
import { observer } from 'mobx-react';

@observer
export default class Controls extends Component {
	constructor(props) {
		super(props);
        this.pauseResumeGame = this.pauseResumeGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
	}

    pauseResumeGame(){
        //console.log(Store);
        if(Store.mode=='pause')
            Store.mode='play';
        else
            Store.mode='pause';
    }

    restartGame(){
        Store.mode='restart';
        setTimeout(()=>{
            Store.mode='play';
        },1000)
    }
	
	getWrapperStyles(){
		return {
			position: 'absolute',
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
		};
	}
	
	render() {
       return <div>
           <button onClick={()=>this.restartGame()}>Restart</button>
           <button onClick={()=>this.pauseResumeGame()}>{Store.mode == "play"?"Pause":"Resume"}</button>
       </div>
    }
}