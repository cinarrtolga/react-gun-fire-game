import React from 'react';
import '../Styles/Gun.css'

const Gun = ({ type }) => (
    <div className="gun">
        <img src={require('../Images/spaceship.png')} alt="spaceship" />
    </div>
);

export default Gun;
