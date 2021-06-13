import React, {useState} from 'react'
import LOGO from "../assets/images/logo.png";
import '../App.css'
import '../styles/login.css'
import { Button } from '@material-ui/core';
import AdhaarUpload from '../components/AdhaarUpload'
import EnterAdhaar from '../components/EnterAdhaar';
import Otp from '../components/Otp';

function Login() {
    const [flow, setFlow] = useState(0);
    return (
        <div id="body" style={{ backgroundColor: '#D0EFFE', overflow: 'hidden', height: '100vh'}} className="ai-c row jc-se">
            <div className="column ai-c">
                <h1 className="heading textalign-c">MediKnot</h1>
                <img src={LOGO}/>
            </div>
            <div className="mh">
                {flow===0 ? <EnterAdhaar setFlow={setFlow}/>
                 : <Otp/>}
            </div>
        </div>
    )
}

export default Login
