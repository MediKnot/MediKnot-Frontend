import React from 'react'
import Prescription from '../components/Prescription'
import Precautions from '../components/Precautions'
import Vulnerabilities from '../components/Vulnerabilities'
import MyTimeline from './Timeline';
import '../App.css'


function Dashboard() {
    return (
        <div className="row jc-sb">
            <div className="column" style={{ flex: 1.5 }}>
                <Prescription active />
                <div className="row">
                    <Precautions />
                    <Vulnerabilities />
                </div>
            </div>
            <MyTimeline />
        </div>
    )
}

export default Dashboard
