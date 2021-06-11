import React from 'react'
import Prescription from '../components/Prescription'
import Precautions from '../components/Precautions'
import Vulnerabilities from '../components/Vulnerabilities'
import '../App.css'

function Dashboard() {
    return (
        <div style={{display: 'grid', placeItems: 'ai-c'}}>
            <Prescription/>
            <div className='row' style={{marginTop:40,justifyContent:'space-between'}}>
                <Vulnerabilities/>
                <Precautions/>
            </div>
        </div>
    )
}

export default Dashboard
