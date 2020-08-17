import React from 'react';
import Gun from './Gun';
import Enemy from './Enemy';
import Bullet from './Bullet';
import '../Styles/Cell.css'

const Cell = (props) => (
  <div className="gameCell">
    { props.type === 1 ? <Gun type="G"  /> : props.type === 2 ? <Enemy type="E" /> : props.type === 3 ? <Bullet type="B" /> : "" }
  </div>
);

export default Cell;
