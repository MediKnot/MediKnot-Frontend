import React from 'react'
import '../App.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


function DiseaseCard({ data }) {
    return (
        <div style={{ width: '100%', backgroundColor: '#F2A253', borderRadius: 15 }} className="shadow p-1 mv">
            <h3>{data.name}</h3>
            <p>{data.introduction}</p>
            {(data.symptoms && data.symptoms.length !== 0) || (data.symptom && data.symptom.length !== 0) ? <div>
                <h4>Symptoms</h4>
                {data?.symptoms?.map((symptom, i) => (
                    <span key={i}><FiberManualRecordIcon style={{ height: '10', width: '10' }} className="mh" />{symptom}<br /></span>
                ))}
                {data?.symptom?.map((symptom, i) => (
                    <span key={i}><FiberManualRecordIcon style={{ height: '10', width: '10' }} className="mh" />{symptom}<br /></span>
                ))}
            </div> : null}
            {(data.cures && data.cures.length !== 0) || (data.cure && data.cure.length !== 0) ? <div>
                <h4>Cures</h4>
                {data?.cures?.map((symptom, i) => (
                    <span key={i}><FiberManualRecordIcon style={{ height: '10', width: '10' }} className="mh" />{symptom}<br /></span>
                ))}
                {data?.cure?.map((symptom, i) => (
                    <span key={i}><FiberManualRecordIcon style={{ height: '10', width: '10' }} className="mh" />{symptom}<br /></span>
                ))}
            </div> : null}
        </div>
    )
}


export default DiseaseCard
