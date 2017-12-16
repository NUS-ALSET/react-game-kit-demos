import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = [{ x: 64, y: 64 }, {x:899, y:450}];
  @observable playersScore = [{score: 0}, {score: 0}];
  @observable coinPosition = [{x: 500, y: 285}, {x: 200, y: 324}, {x: 700, y: 200}];

  @observable stageX = [0,0,0,0,0];
  @observable stageY = [0,0,0,0,0];
  @observable gameMode = [{
    playerVsPlayer: false,
    playerVsBot: false,
    botVsBot: false,
  }];

  setCharacterPosition(position, index) {
    this.characterPosition[index] = position;
  }
  setCoinPosition(position, index) {
    this.coinPosition[index] = position;
  }
  setScore(index) {
    this.playersScore[index].score = this.playersScore[index].score + 1;
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
  rect2Rect(coin, player) {
    return (
        coin.getBoundingClientRect().left <= player.getBoundingClientRect().left + player.getBoundingClientRect().width &&
        coin.getBoundingClientRect().left + coin.getBoundingClientRect().width  >= player.getBoundingClientRect().left &&
        coin.getBoundingClientRect().top + coin.getBoundingClientRect().height >= player.getBoundingClientRect().top &&
        coin.getBoundingClientRect().top <= player.getBoundingClientRect().top + player.getBoundingClientRect().height
    );
  }
  sort(x, botX, y, botY) {
    let g = (Math.pow(x-botX,2))+(Math.pow(y-botY,2));
    return [{
      x: x,
      y: y,
      minCoin: Math.sqrt(g)
    }
    ]
  }
}

export default new GameStore();
