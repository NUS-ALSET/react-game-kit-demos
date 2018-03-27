import React, {Component} from 'react';
import Util from '../utils/index';
import SquadGame from './squadGame/index';
import GemCollector from './GemCollector/index';
import SinglePlayerTwoWindows from './singlePlayerTwoWindows/index';

import SquadDefaultConfig from '../defaultConfigs/squadConfig.json';
import SinglePlayerTwoWindowsDefaultConfig from '../defaultConfigs/singlePlayerTwoWindowsConfig.json';
import gemCollectorDefaultConfig from '../defaultConfigs/gemCollectorConfig.json';
import { observer } from 'mobx-react';

@observer
export default class ALSETReactGame extends Component{
    constructor(props){
        super(props);
        this.getGameData = this.getGameData.bind(this);
    }
    render() {
        var gameData = this.getGameData(this.props.game);
        var getCommands = Util.getCommands;
        switch(this.props.game){
            case 'squad':
                return <SquadGame
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    onEnd={this.props.onEnd}
                    onError={this.props.onError}
                    onStateChange={this.props.onStateChange}
                    gameData={gameData}
                    getCommands={getCommands}
                />
            case 'gemCollector':
                return <GemCollector
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    onEnd={this.props.onEnd}
                    onError={this.props.onError}
                    onStateChange={this.props.onStateChange}
                    gameData={gameData}
                />
            case 'singlePlayerTwoWindows':
                return <SinglePlayerTwoWindows
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    onEnd={this.props.onEnd}
                    onError={this.props.onError}
                    onStateChange={this.props.onStateChange}
                    gameData={gameData}
                />
            default:
                return <SquadGame
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    onEnd={this.props.onEnd}
                    onError={this.props.onError}
                    onStateChange={this.props.onStateChange}
                    gameData={gameData}
                    getCommands={getCommands}
                />
        }
    }
    getGameData(gameType){
        var data = {};
        if(gameType=="gemCollectorConfig")
            var defaultConfig = GemCollector;
        else if(gameType=="singlePlayerTwoWindows")
            var defaultConfig = SinglePlayerTwoWindows;
        else
            var defaultConfig = SquadDefaultConfig;
        var customConfig =this.props.config?this.props.config:{};
        data.showCodeEditor = this.props.showCodeEditor||customConfig.showCodeEditor||defaultConfig.showCodeEditor;
        data.config = this.props.config||defaultConfig;
        data.player = this.props.player||customConfig.player||defaultConfig.player;
        data.mode = this.props.mode||customConfig.mode||defaultConfig.mode;
        data.player1Keys = this.props.player1Keys||customConfig.player1Keys||defaultConfig.player1Keys;
        data.player2Keys = this.props.player2Keys||customConfig.player2Keys||defaultConfig.player2Keys;
        return data;
    }
}