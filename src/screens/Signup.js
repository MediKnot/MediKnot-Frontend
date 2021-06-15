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
    const [flow, setFlow] = useState(0);
    const [user, setUser] = useState(null);
    return (
        <div id="body" style={{ backgroundColor: '#D0EFFE', overflowY: 'scroll', height: '100vh' }} className="ai-c row jc-se">
            <div className="column ai-c">
                <h1 className="heading textalign-c">MediKnot</h1>
                <img src={LOGO} />
            </div>
            <div>
                <div className="mh">
                    <h1 className="heading-small">Signup</h1>
                    {!user ?
                        <div>
                            <SelectUserType setUser={setUser} setFlow={setFlow} />
                            <Link to="/login" className="font-s mv jc-c">Already have an account ?</Link>
                        </div> :

                        flow === 0 ?
                            <SignupDoctor setFlow={setFlow} />
                            : flow === 1 ?
                                <SignupDetails setFlow={setFlow} />
                                :
                                flow === 2 ?
                                    <DocumentUpload setFlow={setFlow} />
                                    :
                                    <Otp setFlow={setFlow} />

                    }           
                </div>
            </div>
        </div>
    )
}

export default Signup