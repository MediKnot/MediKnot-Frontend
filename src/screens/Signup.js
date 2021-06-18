import React, { useState } from 'react'
import LOGO from "../assets/images/logo.png";
import '../App.css'
import '../styles/login.css'
import DocumentUpload from '../components/DocumentUpload'
import SignupDoctor from '../components/SignupDoctor';
import SignupDetails from '../components/SignupDetails';
import Otp from '../components/Otp';
import SelectUserType from '../components/SelectUserType';
import { Link } from 'react-router-dom';


function Signup() {
    const [flow, setFlow] = useState(-1);
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    return (
        <div id="body" style={{ backgroundColor: '#D0EFFE', overflowY: 'scroll', height: '100vh' }} className="ai-c row jc-se">
            <div className="column ai-c">
                <h1 className="heading textalign-c">MediKnot</h1>
                <img src={LOGO} alt="logo" />
            </div>
            <div>
                <div className="mh">
                    <h1 className="heading-small">Signup</h1>
                    {flow===-1 ?
                        <div>
                            <SelectUserType setUser={setUser} setFlow={setFlow} signup />
                            <Link to="/login" className="font-s mv jc-c">Already have an account ?</Link>
                        </div> :
                        flow === 0 ?
                            <SignupDoctor flow={flow} setFlow={setFlow} setUser={setUser} setData={setData} />
                            : flow === 1 ?
                                <SignupDetails flow={flow} setFlow={setFlow} user={user} setUser={setUser} setData={setData} data={data}/>
                                :
                                flow === 2 ?
                                    <DocumentUpload flow={flow} setFlow={setFlow} />
                                    :
                                    <Otp flow={flow} setFlow={setFlow} user={user} data={data} />

                    }           
                </div>
            </div>
        </div>
    )
}

export default Signup