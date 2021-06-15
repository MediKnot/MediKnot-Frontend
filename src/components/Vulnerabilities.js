import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import '../App.css'

function Vulnerabilities() {

    const Vulnerabilities_data=['Diabetes','High BP','Aasthma','Piles'];
    return (
        <div style={{height: 300, width: '35%', backgroundColor: '#FFADAD', borderRadius: 15, padding: 20,marginLeft:'5%'}}>
            <div>Vulnerabilities</div>
            {Vulnerabilities_data.map(data=><div className='row center'>
                <FiberManualRecordIcon style={{height:'10',width:'10'}}/>
                <div>{data}</div>
            </div>)}
        </div>
    )
}

export default Vulnerabilities