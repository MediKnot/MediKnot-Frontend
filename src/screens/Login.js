import React, { useState } from 'react'
import LOGO from "../assets/images/logo.png";
import '../App.css'
import '../styles/login.css'
import EnterMobile from '../components/EnterMobile';
import Otp from '../components/Otp';
import { Link } from 'react-router-dom'
import SelectUserType from '../components/SelectUserType';
import SignupDoctor from '../components/SignupDoctor';

function Login() {
    const [flow, setFlow] = useState(0);
    const [user, setUser] = useState(null);
    return (
        <div id="body" style={{ backgroundColor: '#D0EFFE', overflowY: 'scroll', height: '100vh' }} className="ai-c row jc-se">
            <div className="column ai-c">
                <h1 className="heading textalign-c">MediKnot</h1>
                <img src={LOGO} />
            </div>
            <div className="mh">
                <h1 className="heading-small">Login</h1>
                {!user ? 
                    <div>
                        <SelectUserType setUser={setUser} setFlow={setFlow} />
                        <Link to="/signup" className="font-s mv">Don't have an account?</Link>
                    </div> :
                        flow === 0 ? <SignupDoctor setFlow={setFlow}/> :
                            flow === 1 ? <EnterMobile setFlow={setFlow} />
                            : <Otp />}
            </div>
        </div>
    )
}

export default Login
