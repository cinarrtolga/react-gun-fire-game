import React from 'react';
import { animations } from 'react-animation'
import '../Styles/Statics.css'

const style = {
  animation: animations.popIn
}

const Statics = (props) => (
  <div className="static-board">
    <button className="statics-line" onClick={props.Start}>
      Start
    </button>
    <button className="statics-line" onClick={props.Pause}>
      Pause
    </button>
    <button className="statics-line" onClick={props.Reset}>
      Reset
    </button>
    <div className="statics-line">
      <strong className="bordered-header">Game Status</strong>
      <div style={style}>
        {props.Status}
      </div>
    </div>
    <div className="statics-line">
      <strong className="bordered-header">Bullet</strong>
      <div style={style}>
        {props.bullet}
      </div>
    </div>
    <div className="statics-line">
      <strong className="bordered-header">Point</strong>
      <div style={style}>
        {props.Point}
      </div>
    </div>
    <div className="statics-line">
      <strong className="bordered-header">Level</strong>
      <div style={style}>
        {props.Enemy}
      </div>
    </div>
  </div>
);

export default Statics;
