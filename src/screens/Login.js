import React, { useState } from 'react'
import LOGO from "../assets/images/logo.png";
import '../App.css'
import '../styles/login.css'
import EnterMobile from '../components/EnterMobile';
import Otp from '../components/Otp';
import { Link } from 'react-router-dom'
import SelectUserType from '../components/SelectUserType';

function Login({setFlow}) {
    const [screen, setScreen] = useState(-1);
    const [user, setUser] = useState(null);
    const [data, setData] = useState("");

    return (
        <div id="body" style={{ backgroundColor: '#D0EFFE', overflowY: 'scroll', height: '100vh' }} className="ai-c row jc-se">
            <div className="column ai-c">
                <h1 className="heading textalign-c">MediKnot</h1>
                <img src={LOGO} alt="logo" />
            </div>
            <div className="mh">
                <h1 className="heading-small">Login</h1>
                {screen===-1 ? 
                    <div>
                        <SelectUserType setUser={setUser} setFlow={setScreen} />
                        <Link to="/signup" className="font-s mv">Don't have an account?</Link>
                    </div> :
                        screen === 0 ? <EnterMobile login flow={screen} setFlow={setScreen} setData={setData} user={user} setUser={setUser}/>
                            : <Otp login flow={screen} setFlow={setScreen} data={data} user={user} setAppFlow={setFlow} />}
            </div>
        </div>
    )
}

export default Login
