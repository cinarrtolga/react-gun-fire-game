import React from 'react';
import { animations } from 'react-animation'
import '../Styles/Enemy.css'

const style = {
    animation: animations.popIn
}

const Enemy = ({ type }) => (
    <div className="gun" style={style}>
        <img src={require('../Images/allien.png')} />
    </div>
);

export default Enemy;
