import React, { Component, PropTypes } from "react";
import bomb from '../../static/images/bomb.png';

class Bomb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: props.x,
            y: props.y,
            visible: props.visible,
        };

        this.move = this.move.bind(this);
    }

    move() {
        const { onUpdate } = this.props;

        if (onUpdate && typeof onUpdate === "function") {
            const onUpdateResult = onUpdate(this.state);

            if (onUpdateResult) {
                this.setState((prevState) => {
                    return { ...prevState, ...onUpdateResult };
                });
            }
        }
    }

    render() {
        const { children } = this.props;
        let self = this;
        setTimeout(function() {
            self.move();
        }, self.props.delay);

        return (
            <div className="bomb" style={{
                display: (self.state.visible) ? "block" : "none",
                position: "absolute",
                left: self.state.x,
                top: self.state.y,
                backgroundImage: `url(${bomb})`,
                backgroundSize: "cover",
                width: 30,
                height: 30 }}
            >{children}</div>
        );
    }

}

Bomb.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    children: PropTypes.node,
    visible: PropTypes.bool,
    onUpdate: PropTypes.func
};

Bomb.contextTypes = {
    engine: PropTypes.object
};

Bomb.defaultProps = {
    visible: true
};

export default Bomb;