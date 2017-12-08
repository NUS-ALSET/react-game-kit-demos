import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = [{ x: 0, y: 0 }, {x:899, y:100}];

  @observable stageX = [0,0];

  setCharacterPosition(position, index) {
    this.characterPosition[index] = position;
  }

  setStageX(x, index) {
    if (x > 0) {
      this.stageX[index] = 0;
    } else if (x < -1024) {
      this.stageX[index] = -1024;
    } else {
      this.stageX[index] = x;
    }
  }
}

export default new GameStore();
