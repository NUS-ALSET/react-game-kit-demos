import { observable, computed } from 'mobx';
import squadConfig from '../defaultConfigs/squadConfig.json';

class squadStore{
    @observable time = squadConfig.time;
    @observable position = [
        [
            squadConfig.game1.character1.startingPoint,
            squadConfig.game1.character2.startingPoint
        ],[
            squadConfig.game2.character1.startingPoint,
            squadConfig.game2.character2.startingPoint
        ]
    ];
    @observable direction = [['left','up'],['left','up']];
    @observable currentControllable = [1,1];
    @observable collectives = [[],[]];
    @observable timeStampData = Date.now();
    @observable score = [0,0];
    @observable mode = "play";
    @observable func = false;
    @observable funcNeedUpdate = false;
    moveCharacter(gameId, characterId){
        switch(this.direction[gameId][characterId]){
            case 'up':
                this.position[gameId][characterId].y -= squadConfig['game'+(gameId+1)]['character'+(characterId+1)].speed;
                break;
            case 'down':
                this.position[gameId][characterId].y += squadConfig['game'+(gameId+1)]['character'+(characterId+1)].speed;
                break;
            case 'left':
                this.position[gameId][characterId].x -= squadConfig['game'+(gameId+1)]['character'+(characterId+1)].speed;
                break;
            case 'right':
                this.position[gameId][characterId].x += squadConfig['game'+(gameId+1)]['character'+(characterId+1)].speed;
                break;
            default:
                break;
        }
    }
    restartCharacter(gameId, charId){
        this.position[gameId][charId]=squadConfig["game"+(gameId+1)]["character"+(charId+1)].startingPoint;
        this.direction[gameId] = ['left','up'];
        this.time = squadConfig.time;
        this.score = [0,0];
    }
    changeDirection(gameId, characterId, direction){
        this.direction[gameId][characterId] = direction;
    }
    switchPlayer(gameId){
        if(Date.now()-this.timestamp<1000)
            return;
        if(this.currentControllable[gameId]==0)
            this.currentControllable[gameId] = 1;
        else
            this.currentControllable[gameId] = 0;
        this.timestamp = Date.now();
    }
    generateCollectives(gameId,min, max, size){
        var gameWidth = document.getElementById("game"+gameId).childNodes[0].childNodes[0].offsetWidth;
        var gameHeight = document.getElementById("game"+gameId).childNodes[0].childNodes[0].offsetHeight;
        if(this.collectives[gameId].length>0)
				return;
		var stonesQuant = Math.floor(Math.random()*(max-min+1)+min);
        for(var i=0;i<stonesQuant;i++){
            var stoneObj = {x:0, y:0}
            stoneObj.x = Math.floor(Math.random()*(gameWidth/size-0)+0)*size;
            stoneObj.y = Math.floor(Math.random()*(gameHeight/size-0)+0)*size;
            stoneObj.size = size;
            this.collectives[gameId].push(stoneObj);
        }
    }
    removeCollective(gameId,colId){
        this.collectives[gameId].splice(colId,1);
        this.score[gameId]++;
    }
    updateCustomCode(newText){
        this.func = newText;
    }
}
export default new squadStore();