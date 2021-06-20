import React from 'react'
import '../App.css';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';

function Prescription({active, date, doctordetails, notes}) {

    return (
        <div style={{ width: '100%', backgroundColor: active ? '#DBF5DC' : '#FFADAD', borderRadius: 15, padding: 20, minWidth: 320, cursor: 'pointer'}} 
            className="mv mh shadow"
        > 
            <div className="row jc-sb">
                <div>
                    <h2>{active ? 'Active' : 'Past'} Prescription: </h2>
                    <div className="row" style={{ justifyContent: 'space-between' }}>
                        <div>
                            <h3 className="row ai-c"><LocalHospitalIcon />Medicines:</h3>
                            <div className="column" style={{ justifyContent: 'space-between' }}>
                                {['Paracetamol', 'Citrazine', 'Benedryll'].map(med => (
                                    <p>{med}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row"><h2>Treatment for: </h2> <h2 style={{ color: 'red', marginLeft: 10 }}> Cough and Cold</h2></div>
                    <h3 className="row ai-c"><EventIcon />Date: </h3> {date}
                    <h3 className="row ai-c"><PersonIcon />Doctor: </h3> Dr. {doctordetails ? doctordetails.name : ""}
                </div>
            </div>
            <h4>Note:</h4>
            <p>{notes ? notes[0] : ""}</p>
        </div>
    )
}

export default Prescription
