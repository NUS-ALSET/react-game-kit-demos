import React, { Component, PropTypes } from "react";
import { Body } from "react-game-kit";
import Matter from "matter-js";

import PhysicsBody from "./PhysicsBody";
import KeyEvent from "./KeyEvent";
import Input from "../Input";
import pirat from "../../static/images/pirat.png";

const WIDTH = 27;
const HEIGHT = 64;

class Pirat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: props.x,
            y: props.y,
            directionIndex: props.directionIndex,
            moveLeft: true,
            moveRight: true,
            hasPhysics: true
        };

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        React.Children.forEach(this.props.children, (child) => {
            if (child.type === KeyEvent) {
                const { onDown, onUp } = child.props;

                Input.key.on("down", (keyCode) => {
                    if (onDown && typeof onDown === "function") {
                        const onDownResult = onDown(keyCode, this.state);

                        if (onDownResult) {
                            this.setState((prevState) => {
                                return { ...prevState, ...onDownResult };
                            });
                        }
                    }
                });

                Input.key.on("up", (keyCode) => {
                    if (onUp && typeof onUp === "function") {
                        const onUpResult = onUp(keyCode, this.state);

                        if (onUpResult) {
                            this.setState((prevState) => {
                                return { ...prevState, ...onUpResult };
                            });
                        }
                    }
                });
            }
        });
        Matter.Events.on(this.context.engine, "afterUpdate", this.update);
    }

    componentWillUnmount() {
        Matter.Events.off(this.context.engine, "afterUpdate", this.update);

        Input.key.off("down");
        Input.key.off("up");
    }

    update() {
        const { onUpdate } = this.props;

        if (onUpdate && typeof onUpdate === "function") {
            const onUpdateResult = onUpdate(this.state);

            if (onUpdateResult) {
                this.setState((prevState) => {
                    return { ...prevState, ...onUpdateResult };
                });
            }
        }

        if (this.body.body) {
            Matter.Body.setVelocity(this.body.body, { x: this.state.x, y: this.state.y });
        }
    }

    render() {
        const { children } = this.props;

        const styles = {
            position: "absolute",
            left: this.state.x,
            top: this.state.y,
            backgroundImage: `url(${pirat})`,
            backgroundSize: "cover",
            backgroundPosition: `0px ${this.state.directionIndex * (-HEIGHT)}px`,
            transform: 'scale(2)',
            width: WIDTH,
            height: HEIGHT
        };

        React.Children.forEach(children, (child) => {
            if (child.type === PhysicsBody) {
                this.setState({
                    hasPhysics: true
                });
            }
        });

        if (this.state.hasPhysics) {
            return (
                <div className="pirat" style={styles}>
                    <Body
                        args={[this.state.x, this.state.y, WIDTH, HEIGHT]}
                        ref={(b) => this.body = b }
                    >
                    <div>
                        {children}
                    </div>
                    </Body>
                </div>
            );
        }

        return (
            <div className="pirat" style={styles}>{children}</div>
        );
    }
}

Pirat.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    directionIndex: PropTypes.number,
    children: PropTypes.node,
    onUpdate: PropTypes.func
};

Pirat.contextTypes = {
    engine: PropTypes.object
};

Pirat.defaultProps = {
    x: 0,
    y: 0,
    directionIndex: 4
};

export default Pirat;