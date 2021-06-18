import React from 'react'
import "../App.css"
import Prescription from '../components/Prescription';
import CardComponent from '../components/CardComponent';
import PrescriptionTable from '../components/PrescriptionTable';

function Reports() {
    return (
        <div className="row">
            <div className="column f-1">
                <h1 className="heading-small">Prescriptions</h1>
                <div className="row">
                    <Prescription />
                    <PrescriptionTable/>
                </div>
            </div>
            <div className="column mh-2">
                <h1 className="heading-small">Reports</h1>
                <div className="row">
                <CardComponent/>
                    <CardComponent/>
                </div>
            </div>
        </div>
    )
}

export default Reports
