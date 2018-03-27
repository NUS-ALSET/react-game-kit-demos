import React, {Component} from 'react';
import PropTypes from "prop-types";
import { KeyListener } from 'react-game-kit';
import Gnome1 from '../../selectable/Characters/Gnome1';
import Gnome2 from '../../selectable/Characters/Gnome2';
import Blonde from '../../selectable/Characters/Blonde';
import Brunette from '../../selectable/Characters/Brunette';
import Store from '../../store/squad';
import Util from '../../utils/index';
import { observer } from 'mobx-react';

@observer
export default class Character extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
    constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.getCollectives = this.getCollectives.bind(this);
    }
    loop = () => {
        var player = document.getElementById('bt'+this.props.charId+"-"+this.props.gameId).childNodes[0];
        var parentEl = document.getElementById('bt'+this.props.charId+"-"+this.props.gameId).parentElement;
        var direction = Store.direction[this.props.gameId][this.props.charId];
        if(Util.rect2parent(player,parentEl,direction)&&Store.mode=="play"){
            Store.moveCharacter(this.props.gameId, this.props.charId);
            var setDirection = this.props.getCommands({
                player:Store.position[this.props.gameId][this.props.charId],
                collectives: Store.collectives[this.props.gameId]
            });
            if(setDirection){
                if(setDirection.left)
                    Store.changeDirection(this.props.gameId, this.props.charId, "left");
                else if(setDirection.right)
                    Store.changeDirection(this.props.gameId, this.props.charId, "right");
                else if(setDirection.up)
                    Store.changeDirection(this.props.gameId, this.props.charId, "up");
                else if(setDirection.down)
                    Store.changeDirection(this.props.gameId, this.props.charId, "down");
            }
            //console.log(setDirection);
        }
        this.getCollectives();
        if(Store.mode=="restart"){
            Store.restartCharacter(this.props.gameId, this.props.charId);
        }
    }
    getCollectives(){
        var player = document.getElementById('bt'+this.props.charId+"-"+this.props.gameId);
        var parentEl = player.parentElement;
        player = player.childNodes[0];
        var collectives = parentEl.getElementsByClassName('collective');
        Array.from(collectives).forEach(collective => {
            if(Util.rect2Rect(collective, player)){
                var collectiveId = collective.getAttribute("data-key");
                Store.removeCollective(this.props.gameId,collectiveId);
            }
        });
    }
    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
    render() {
        switch(this.props.type){
            case 'gnome1':
                return <div id={'bt'+this.props.charId+"-"+this.props.gameId}>
                    <Gnome1 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'gnome2':
                return <div id={'bt'+this.props.charId+"-"+this.props.gameId}>
                    <Gnome2 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'blonde':
                return <div id={'bt'+this.props.charId+"-"+this.props.gameId}>
                    <Blonde 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'brunette':
                return <div id={'bt'+this.props.charId+"-"+this.props.gameId}>
                    <Brunette 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}
                    />
                </div>
            default:
                return <div id={'bt'+this.props.charId}>
                    <Gnome1 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
        }
    }
}