import ALSETReactGame from "./games/index";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<ALSETReactGame game={"squad"} mode={"bot-vs-bot"} showCodeEditor={true}
		onPlay={onPlay}
		onPause={onPause}
		onEnd={onEnd}
		onError={onError}
	/>,
	document.getElementById("game")
);
function onPlay(){
	console.log("play started");
}
function onPause(){
	console.log("pausing");
}
function onEnd(player){
	console.log("winner is "+player);
}
function onError(e){
	console.log("Error occured!!!");
}