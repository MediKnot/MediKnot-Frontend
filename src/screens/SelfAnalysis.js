import React, { useEffect, useState } from 'react'
import '../App.css';
import Video from '../components/Video';
import Chatbot from '../components/Chatbot';

function SelfAnalysis() {

    const [data, setData] = useState([]);
    const [emotions, setEmotions] = useState({
        angry: 0,
        neutral: 0,
        happy: 0,
        surprised: 0,
        sad: 0,
        fearful: 0,
        disgusted: 0
    });
    
    const [timer, setTimer] = useState(0);
    const [started, setStarted] = useState(false);
    
    useEffect(() => {
        if (started) {
        setTimeout(() => {
            setTimer(timer + 1);
        }, 1000);
        }
    }, [timer]);

    return (
        <div>
            <div className="row jc-c">
                <div className="column" style={{ maxWidth: '50%' }}>
                    <Video started={started} data={data} setData={setData} setEmotions={setEmotions}/>
                </div>
                <Chatbot/>
            </div>
        </div>
    )
}

export default SelfAnalysis
