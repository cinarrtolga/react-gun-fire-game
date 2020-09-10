import React from 'react';
import { animations } from 'react-animation'
import '../Styles/Bullet.css'

const style = {
    animation: animations.popOut
}

const Bullet = ({ type }) => (
    <div className="bullet" style={style}>
        <img src={require('../Images/misille.png')} alt="misille" />
    </div>
);

export default Bullet;
