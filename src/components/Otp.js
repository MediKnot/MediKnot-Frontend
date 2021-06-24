import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import axios from '../utils/BaseUrl';
import Popup from '../components/Popup';

function Otp({ setFlow, data, user, flow, login, setAppFlow}) {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const signup = async (event) => {
        event.preventDefault();
        if (otp === "") {
            if (user === "patient") {
                await axios.post("/patient", data)
                    .then(res => {
                        if (res.status === 200) {
                            setMessage("User successfully SignedUp!")
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        setMessage("User registration failed!")
                        setError(true)
                    });
            } else {
                await axios.post("/doctor", data)
                    .then(res => {
                        if (res.status === 200) {
                            setMessage("User successfully SignedUp!")
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        setMessage("User registration failed!")
                        setError(true);
                    });
            }
            setOtp("");
        }else {
            setMessage("Enter a valid otp!");
            setError(true);
        }
    }

    const signin = async (event) => {
        event.preventDefault();
        if(otp===""){
            if(user === 'patient'){
                await axios.get(`/patient/phone/${data.mobile}`)
                    .then(res => {
                        if(res.status === 200){
                            window.localStorage.setItem("user", JSON.stringify(res.data));
                            window.localStorage.setItem("user_type", 'patient');
                            setAppFlow(1);
                        }else{
                            console.log("**")
                            setError(true);
                            setMessage("User not found");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        setError(true);
                        setMessage("User not found");
                    })
            }else{
                await axios.get(`/doctor/phone/${data.mobile}`)
                    .then(res => {
                        if(res.status === 200){
                            window.localStorage.setItem("user", JSON.stringify(res.data));
                            window.localStorage.setItem("user_type", 'doctor');
                            setAppFlow(2);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        setError(true);
                        setMessage("User not found");
                    })
            }
        }else{
            setMessage("Enter a valid otp!");
            setError(true);
        }
    }
    return (
        <>
            <h3>Enter Otp</h3>
            <form onSubmit={login ? signin : signup} className="column">
                <input value={otp} onChange={(e) => setOtp(e.target.value)} type="number" maxLength={6} placeholder="6 Digit One Time Password." className="input-large shadow mv" />
                <div className="row jc-sb">
                    <Button variant="contained" color="primary" onClick={() => setFlow(flow-1)} style={{ marginBottom: 10, width: '45%' }}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit" style={{ marginBottom: 10, width: '45%' }}>
                        {!login ? "Signup" : "Login" }
                    </Button>
                </div>
            </form>
            {message.length !== 0 ? <Popup message={message} error={error} /> : null}
        </>
    )
}

export default Otp
