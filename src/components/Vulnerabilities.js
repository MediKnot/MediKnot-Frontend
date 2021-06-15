import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import '../App.css'

function Vulnerabilities() {

    const Vulnerabilities_data=['Diabetes','High BP','Aasthma','Piles'];
    return (
        <div style={{ width: '35%', backgroundColor: '#FFADAD', borderRadius: 15, padding: 20, marginTop: 20}}>
            <h3>Vulnerabilities</h3>
            {Vulnerabilities_data.map(data=>
            (<div className='row ai-c'>
                <FiberManualRecordIcon style={{height:'10',width:'10'}} className="mh"/>
                <div>{data}</div>
            </div>))}
        </div>
    )
}

export default Vulnerabilities