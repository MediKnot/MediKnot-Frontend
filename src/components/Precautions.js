import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import '../App.css'

function Precautions() {

    const Precautions_data=['Wash your hands often',
        'Avoid touching your face, especially the nose, mouth, and eye areas.',
        'Don\'t smoke.',
        'Use disposable items if someone in your family is infected.',
        'Keep household surfaces clean.','If your child has a cold, wash his or her toys as well.',
        'Use paper towels in the kitchen and bathroom for drying hands after hand washing.'];
    return (
        <div style={{ backgroundColor: '#BAEEFE', borderRadius: 15, padding: 20, marginTop: 20}} className="shadow  ">
            <h3>Precautions</h3>
            {Precautions_data.map(data=><div className='row ai-c'>
                <FiberManualRecordIcon style={{height:'10',width:'10'}} className="mh"/>
                <div>{data}</div>
            </div>)}
        </div>
    )
}

export default Precautions
