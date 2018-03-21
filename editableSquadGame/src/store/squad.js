import { observable, computed } from 'mobx';
import squadConfig from '../defaultConfigs/squadConfig.json';

class squadStore{
    timestamp = Date.now();
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
    @observable collectivesData = [];
    @observable timeStampData = Date.now();
    @observable score = [0,0];
    @observable mode = "play";
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
}
export default new squadStore();