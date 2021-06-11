import React from 'react'
import '../App.css';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';

function Prescription() {
    return (
        <div style={{height: 300, width: '80%', backgroundColor: '#DBF5DC', borderRadius: 15, padding: 20}}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <h2>Active Prescriptions: </h2>
                    <div className="row" style={{justifyContent: 'space-between'}}>
                        <div>
                            <h3 className="row ai-c"><LocalHospitalIcon/>Medicines:</h3>
                            <div className="column" style={{justifyContent: 'space-between'}}>
                                {['Paracetamol', 'Citrazine', 'Benedryll'].map(med => (
                                    <p>{med}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3>Doses: </h3>
                            <div className="column" style={{justifyContent: 'space-between'}}>
                                {['1 1 1', '0 0 1', '1 0 0'].map(med => (
                                    <p>{med}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row"><h2>Treatment for: </h2> <h2 style={{color: 'red', marginLeft: 10}}> Cough and Cold</h2></div>
                    <h3 className="row ai-c"><EventIcon/>Date: </h3> 29 May 2021
                    <h3 className="row ai-c"><PersonIcon/>Doctor: </h3> Dr. Krishnam Rathi
                </div>    
            </div>
        </div>
    )
}

export default Prescription
