import React from "react";

const Health = ({ value = this.props.health, width = 27, height = 3}) => {
    return (
        <div style={{width, height, marginTop: -6, position: "absolute", backgroundColor: "black", borderRadius: 4}}>
            <div style={{ width: ((value / 100) * width), height, position: "absolute", backgroundColor: "red"}} />
        </div>
    );
};

export default Health;