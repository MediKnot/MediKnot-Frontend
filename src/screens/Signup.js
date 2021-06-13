import React, { useState } from 'react'
import LOGO from "../assets/images/logo.png";
import '../App.css'
import '../styles/login.css'
import { Button } from '@material-ui/core';
import DocumentUpload from '../components/DocumentUpload'
import EnterAdhaar from '../components/EnterMobile';
import SignupDetails from '../components/SignupDetails';
import Otp from '../components/Otp';
import { Link } from 'react-router-dom'

function Signup() {
    const [flow, setFlow] = useState(0);
    return (
        <div id="body" style={{ backgroundColor: '#D0EFFE', overflowY: 'scroll', height: '100vh' }} className="ai-c row jc-se">
            <div className="column ai-c">
                <h1 className="heading textalign-c">MediKnot</h1>
                <img src={LOGO} />
            </div>
            <div className="mh">
                {flow === 0 ?
                    <div>
                        <SignupDetails />
                        <Link to="/" className="font-s mv">Already have an account</Link>
                    </div> :
                <DocumentUpload />}
            </div>
        </div>
    )
}

export default Signup