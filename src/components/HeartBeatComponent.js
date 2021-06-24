import React from 'react'
import HeartBeat from '../assets/images/heartbeat.png';
import FavoriteIcon from '@material-ui/icons/Favorite';

function HeartBeatComponent({ heartbeat }) {
    return (
        <div className="shadow" style={{ height: 150, width: 150, backgroundColor: 'white', borderRadius: 15 }}>
            <div style={{ position: 'relative' }} className="column">
                <div className="row ai-c mh mv jc-sb">
                    <span><strong>{heartbeat + " "}</strong><span style={{ color: 'gray', fontSize: 15 }}>bpm</span></span>
                    <span style={{ color: 'gray', fontSize: 15 }}> <FavoriteIcon color="error" size={20} /> </span>
                </div>
                <div className="column ai-c">
                    <img src={HeartBeat} height={70} width={70} />
                    <strong className="row ai-c mh">HeartBeat</strong>
                </div>
            </div>
        </div>
    )
}

export default HeartBeatComponent
