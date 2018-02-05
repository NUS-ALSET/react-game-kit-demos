import { observable, computed } from 'mobx';

class GameStore {
  @observable characterPosition = [{ x: 100, y: 100 },{ x: 200, y: 200 }];
  @observable characterState = [11,10];
  @observable timeStamp = [Date.now(),Date.now()];
  @observable stonesData = [];
  @observable timeStampData = Date.now();
  @observable score = [0,0];
  @observable mode = "play";
  @observable config = {speed:1, minGems:3, maxGems:5, gatherToWin:10};
  setcharacterPosition(position, index) {
    this.characterPosition[index] = position;
  }
  
  createNewStones(){
	var newTimestamp = Date.now();
	if(newTimestamp - this.timeStampData>=5000){
		this.timeStampData = Date.now();
		if(this.stonesData.length==0){
			var stonesQuant = Math.floor(Math.random()*(this.config.maxGems-this.config.minGems+1)+this.config.minGems);
			for(var i=0;i<stonesQuant;i++){
				var stoneObj = {x:0, y:0}
				stoneObj.x = Math.floor(Math.random()*(8-0+1)+0)*100;
				stoneObj.y = Math.floor(Math.random()*(4-0+1)+0)*100;
				this.stonesData.push(stoneObj);
			}
		}
	}
  }
  
  checkIfObjectInsideTheScreen(charKey, direction, gameId){
		var el = document.getElementById("character-"+charKey+"-"+gameId);
		var parentEl = el.parentElement;
		el = document.getElementById("character-"+charKey+"-"+gameId).childNodes[0];
		var parentOffset = parentEl.getBoundingClientRect();
		var viewportOffset = el.getBoundingClientRect();
		var top = viewportOffset.top;
		var left = viewportOffset.left;
		var right = viewportOffset.right;
		var bottom = viewportOffset.bottom;
		
		var parentTop = parentOffset.top;
		var parentLeft = parentOffset.left;
		var parentRight = parentOffset.right;
		var parentBottom = parentOffset.bottom;
		if(direction == "left")
			return left<=parentLeft?false:true;
		else if(direction == "right")
			return right>=parentRight?false:true;
		else if(direction == "top")
			return top<=parentTop?false:true;
		else if(direction == "bottom")
			return bottom>=parentBottom?false:true;
	}
	
	rect2Rect(coin, player) {
		return (
			coin.getBoundingClientRect().left <= player.getBoundingClientRect().left + player.getBoundingClientRect().width &&
			coin.getBoundingClientRect().left + coin.getBoundingClientRect().width  >= player.getBoundingClientRect().left &&
			coin.getBoundingClientRect().top + coin.getBoundingClientRect().height >= player.getBoundingClientRect().top &&
			coin.getBoundingClientRect().top <= player.getBoundingClientRect().top + player.getBoundingClientRect().height
		);
	}
	
	removeHittenGem(gemId, playerId){
		this.stonesData.splice(gemId,1);
		this.score[playerId]++;
	}
}

export default new GameStore();