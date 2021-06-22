import React from 'react'
import Sugar from '../assets/images/sugar.png'

function SugarLevelComponent({value}) {
    return (
        <div className="shadow" style={{ height: 150, width: 150, backgroundColor: 'white', borderRadius: 15 }}>
            <div style={{ position: 'relative' }} className="column">
                <div className="row ai-c mh mv jc-sb">
                    <span><strong>{value + " "}</strong><span style={{ color: 'gray', fontSize: 15 }}>mg/dL</span></span>
                </div>
                <div className="column ai-c">
                    <img src={Sugar} height={70} width={70} />
                    <strong className="row ai-c mh">Sugar Level</strong>
                </div>
            </div>
        </div>
    )
}

export default SugarLevelComponent
