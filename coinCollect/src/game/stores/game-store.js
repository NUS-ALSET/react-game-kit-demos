import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = [{ x: 64, y: 64 }, {x:899, y:450}];

  @observable stageX = [0,0];
  @observable stageY = [0,0];

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

  setStageY(y, index) {
    if (y > 0) {
      this.stageY[index] = 0;
    } else if (y < - 756) {
      this.stageY[index] = -756
    } else {
      this.stageY[index] = y;
    }
  }
}

export default new GameStore();
