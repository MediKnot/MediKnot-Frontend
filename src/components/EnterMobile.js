import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import Popup from './Popup';
import axios from '../utils/BaseUrl';

function EnterMobile({ setFlow, setData, user, flow, setUser}) {
    const [mob, setMob] = useState("");
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);

    const handleChange = async (event) => {
        event.preventDefault();
        if (mob.length === 10) {
            setData({mobile: mob});
            setFlow(flow + 1);
        } else {
            setError(true)
            setMess("Enter a 10 digit mobile number.")
        }
    }
    return (
        <>
            <h3>Mobile No.</h3>
            <form onSubmit={handleChange} className="column">
                <input value={mob} onChange={(e) => setMob(e.target.value)} type="number" maxLength={10} placeholder="Mobile Number" className="input-large shadow mv" />
                <div className="row jc-sb">
                    <Button variant="contained" color="primary" onClick={() => (setFlow(flow-1), setUser(null))} style={{ marginBottom: 10, width: '45%' }}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit" style={{ marginBottom: 10, width: '45%' }}>
                        Send Otp
                    </Button>
                </div>
            </form>
            {mess.length !== 0 ? <Popup message={mess} error={error} /> : null}
        </>
    )
}

export default EnterMobile
