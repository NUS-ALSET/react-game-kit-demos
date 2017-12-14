import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = [{ x: 100, y: 100 },{ x: 200, y: 200 }];
  @observable characterState = [11,10];
  @observable timeStamp = [Date.now(),Date.now()];
  @observable stonesData = [];
  @observable timeStampData = Date.now();
  @observable score = [0,0];
  
  setcharacterPosition(position, index) {
    this.characterPosition[index] = position;
  }
}

export default new GameStore();