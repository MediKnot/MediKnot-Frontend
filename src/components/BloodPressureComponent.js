import React from 'react'
import BloodPressure from '../assets/images/blood-pressure.png';

function BloodPressureComponent({bp}) {
    return (
        <div className="shadow" style={{ height: 150, width: 150, backgroundColor: 'white', borderRadius: 15 }}>
            <div style={{ position: 'relative' }} className="column">
                <div className="row ai-c mh mv jc-sb">
                    <span><strong>{bp + " "}</strong></span>
                    <span style={{ color: 'gray', fontSize: 15 }}>80 mmhg </span>
                </div>
                <div className="column ai-c">
                    <img src={BloodPressure} height={70} width={70} />
                    <strong className="row ai-c mh">Blood Pressure</strong>
                </div>
            </div>
        </div>
    )
}

export default BloodPressureComponent
