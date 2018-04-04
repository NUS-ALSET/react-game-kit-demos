import React, {Component} from 'react';
import PropTypes from "prop-types";
import Store from '../../store/gemCollector';

export default class CodeEditor extends Component {
	constructor(props) {
		super(props);
        this.updateCustomCode = this.updateCustomCode.bind(this);
	}
	
    updateCustomCode(){
        Store.func = document.getElementById("codeEditor").value;
        //console.log(Store.func);
        //Store.funcNeedUpdate = true;
    }

	render() {
       return <div>
           <textarea id="codeEditor" style={{width:"100%", height:"410px"}} defaultValue={`var player = world.player;
var closestGem = false;
world.collectives.forEach(stone => {
    if(closestGem==false)
        closestGem = stone;
    else if(
        Math.sqrt(Math.pow((player.x-closestGem.x),2)+Math.pow((player.y-closestGem.y),2))>
        Math.sqrt(Math.pow((player.x-stone.x),2)+Math.pow((player.y-stone.y),2))
    ){
        closestGem = stone;
    }
});
if(closestGem){
    if(closestGem.x-player.x>64){
        var direction = {left:false, right:true, up:false, down:false};
    }   
    else if(closestGem.x-player.x<0){
        var direction = {left:true, right:false, up:false, down:false};
    }
    else if(closestGem.y-player.y>64){
        var direction = {left:false, right:false, up:false, down:true};
    }
    else if(closestGem.y-player.y<0){
        var direction = {left:false, right:false, up:true, down:false};
    }
    return direction;
}`}></textarea>
            <button onClick={()=>{this.updateCustomCode()}}>Update code</button>
       </div>
    }
}