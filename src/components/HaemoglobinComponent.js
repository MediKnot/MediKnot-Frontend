import React from 'react'
import Haemoglobin from '../assets/images/haemoglobin.png'

function HaemoglobinComponent({value}) {
    return (
        <div className="shadow" style={{ height: 150, width: 150, backgroundColor: 'white', borderRadius: 15}}>
            <div style={{ position: 'relative' }} className="column">
                <div className="row ai-c mh mv jc-sb">
                    <span><strong>{value + " "}</strong><span style={{ color: 'gray', fontSize: 15 }}>g/dl</span></span>
                </div>
                <div className="column ai-c">
                    <img src={Haemoglobin} height={70} width={70} />
                    <strong className="row ai-c mh">Haemoglobin</strong>
                </div>
            </div>
        </div>
    )
}

export default HaemoglobinComponent
