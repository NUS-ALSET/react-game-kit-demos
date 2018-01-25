import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = [];
  @observable playerDirection = [{left: 'false', right: 'true', up: 'false', down: 'false'}, {left: 'true', right: 'false', up: 'false', down: 'false'}];
  @observable playersScore = [{score: 0}, {score: 0}];
  @observable playersRoundScore = [{score: 0}, {score: 0}];
  @observable coinPosition = [];
  @observable rounds = 3;
  @observable coinInRound = 15;
  @observable winner = '';
  @observable game = true;
  @observable botBesideBot = false;

  @observable stageX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  @observable stageY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  setCharacterPosition(position, index) {
    this.characterPosition[index] = position;
  }
  setDirection(key, index) {
    this.playerDirection[index] = key;
  }
  setCoinPosition(position, index) {
    this.coinPosition[index] = position;
  }
  setScore(index) {
    if(this.winner.length < 1) {
      if(this.playersScore[0].score !== this.coinInRound || this.playersScore[1].score !== this.coinInRound) {
        this.playersScore[index].score = this.playersScore[index].score + 1;
      }
    }
    if(this.playersScore[0].score === this.coinInRound || this.playersScore[1].score === this.coinInRound) {
      if(this.playersRoundScore[0].score !== this.rounds || this.playersRoundScore[1].score !== this.rounds) {
        this.playersScore[0].score = 0;
        this.playersScore[1].score = 0;
        this.playersRoundScore[index].score = this.playersRoundScore[index].score + 1;
      }
      if(this.winner.length < 1) {
        if(this.playersRoundScore[0].score === this.rounds) {
          this.winner = 'Player 1';
        } else if(this.playersRoundScore[1].score === this.rounds) {
          this.winner = 'Player 2';
        }
      }
    }
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
  botsTest(botX1, botY1, botX2, botY2) {
    let g = (Math.pow(botX1-botX2,2))+(Math.pow(botY1-botY2,2));
    g = Math.sqrt(g);
    if(g <= 90) {
      this.botBesideBot = true;
    } else {
      this.botBesideBot = false;
    }
  }
}

export default new GameStore();
