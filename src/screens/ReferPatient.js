import React, { useState, useEffect } from 'react'
import '../App.css';
import LOGO from '../assets/images/logo.png';
import { Button } from '@material-ui/core'
import axios from '../utils/BaseUrl';

function ReferPatient({ setFlow, setPatientref, logout, setIsDoc}) {
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setIsDoc(true);
    }, [])

    const getUser = async () => {
        await axios.get(`/patient/phone/${phone}`)
            .then(res => {
                if (res.status === 200) {
                    setPatientref(res.data);
                }
            })
            .catch(e => console.log(e))
    }

    const handleClick = () => {
        getUser();
        setFlow(1);
    }

    return (
        <div>
            <div className="row" style={{ backgroundColor: '#D0EFFE', justifyContent: 'flex-end' }} >
                <Button variant="contained" color="primary" style={{ marginTop: 10, marginRight: 10 }} >
                    Profile
                </Button>
                <Button variant="contained" color="primary" style={{ marginTop: 10, marginRight: 10 }} onClick={logout}>
                    Logout
                </Button>
            </div>
            <div id="body" style={{ backgroundColor: '#D0EFFE', height: '100vh' }} className="ai-c row jc-se">
                <div className="column ai-c">
                    {/* <h1 className="heading textalign-c">MediKnot</h1> */}
                    <img src={LOGO} alt="logo" />
                </div>
                <div>
                    <div className="mh">
                        <h1 className="heading-small">Refer Patient</h1>
                        <div className="column">
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className="input-large shadow" placeholder="Enter Patient's Phone Number" />
                            <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={handleClick}>
                                See Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReferPatient
