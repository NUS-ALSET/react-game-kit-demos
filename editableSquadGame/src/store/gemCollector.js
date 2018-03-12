import { observable, computed } from 'mobx';
import gemCollectorCong from '../defaultConfigs/gemCollectorCong.json';

class GemCollectorStore {
    @observable characterPosition = [
        {
            x: gemCollectorCong.game.character1.startingPoint.x,
            y: gemCollectorCong.game.character1.startingPoint.y 
        },
        {
            x: gemCollectorCong.game.character2.startingPoint.x,
            y: gemCollectorCong.game.character2.startingPoint.y 
        }
    ];
    @observable characterDirection = ['right','down'];
    @observable time = 0;
    @observable score = [0,0];
    @observable mode = "play";
}

export default new GemCollectorStore();