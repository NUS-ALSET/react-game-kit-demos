import React from "react";
const Pos = ({ value = this.props.value}) => {
    return (
        <div style={{marginTop: -62, position: "absolute", fontSize: 16}}>
            {'Score: ' + value}
        </div>
    );
};

export default Pos;