import React, {useState} from 'react'
import LOGO from "../assets/images/logo.png";
import '../App.css'
import '../styles/login.css'
import EnterMobile from '../components/EnterMobile';
import Otp from '../components/Otp';
import { Link } from 'react-router-dom'

function Login() {
    const [flow, setFlow] = useState(0);
    return (
        <div id="body" style={{ backgroundColor: '#D0EFFE', overflowY: 'scroll', height: '100vh'}} className="ai-c row jc-se">
            <div className="column ai-c">
                <h1 className="heading textalign-c">MediKnot</h1>
                <img src={LOGO}/>
            </div>
            <div className="mh">
                {flow===0 ? <EnterMobile setFlow={setFlow}/>
                 : <Otp/>}
                 <Link to="/signup" className="font-s mv">Don't have an account?</Link>
            </div>
        </div>
    )
}

export default Login
