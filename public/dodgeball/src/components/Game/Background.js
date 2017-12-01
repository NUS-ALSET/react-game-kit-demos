import React from "react";
import background from "../../static/images/boardwalktile.png";

const World = () => (
    <div style={{
        position: 'absolute',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
    }} />
);

export default World;