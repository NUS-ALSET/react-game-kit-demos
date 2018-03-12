class Utils{
    rect2Rect(collective, player) {
		return (
			collective.getBoundingClientRect().left <= player.getBoundingClientRect().left + player.getBoundingClientRect().width &&
			collective.getBoundingClientRect().left + collective.getBoundingClientRect().width  >= player.getBoundingClientRect().left &&
			collective.getBoundingClientRect().top + collective.getBoundingClientRect().height >= player.getBoundingClientRect().top &&
			collective.getBoundingClientRect().top <= player.getBoundingClientRect().top + player.getBoundingClientRect().height
		);
	}
    rect2parent(player, parentEl, direction){
		var parentOffset = parentEl.getBoundingClientRect();
		var playerOffset = player.getBoundingClientRect();
		var top = playerOffset.top;
		var left = playerOffset.left;
		var right = playerOffset.right;
		var bottom = playerOffset.bottom;
		var parentTop = parentOffset.top;
		var parentLeft = parentOffset.left;
		var parentRight = parentOffset.right;
        var parentBottom = parentOffset.bottom;
		if(direction == "left")
			return left<=parentLeft?false:true;
		else if(direction == "right")
			return right>=parentRight?false:true;
		else if(direction == "up")
			return top<=parentTop?false:true;
		else if(direction == "down")
			return bottom>=parentBottom?false:true;
    }
    rundomGenerateCollectives(min, max, size, width, height){
        var collectives = [];
        var stonesQuant = Math.floor(Math.random()*(max-min+1)+min);
        for(var i=0;i<stonesQuant;i++){
            var stoneObj = {x:0, y:0}
            stoneObj.x = Math.floor(Math.random()*(width/size-0)+0)*size;
            stoneObj.y = Math.floor(Math.random()*(height/size-0)+0)*size;
            stoneObj.size = size;
            collectives.push(stoneObj);
        }
    }
}
export default new Utils();