import React from "react";

const Pos = ({ value = this.props.value}) => {
    return (
        <div style={{marginTop: -62, position: "absolute", fontSize: 16, marginLeft: 33}}>
            {value}
        </div>
    );
};

export default Pos;