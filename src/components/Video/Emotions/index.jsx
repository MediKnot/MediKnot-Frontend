import React from 'react';
import './style.scss';
import emoji from '../../../assets/images/emoji.svg';

const Emotions = (props) => {

    return (
      <div className="emotion-detector">
        <img src={emoji} />
        <div>{props.emotion}</div>
      </div>
    );
}

export default Emotions;
