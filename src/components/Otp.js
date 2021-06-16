import React from 'react'
import { Button } from '@material-ui/core';


function Otp({setFlow, data, user}) {

    const signup = (event) => {
        event.preventDefault();
        // if(otp==="123456")
        console.log(data, user);
    }
    return (
        <>
            <h3>Enter Otp</h3>
            <form onSubmit={signup} className="column">
                <input type="number" maxLength={6} placeholder="6 Digit One Time Password." className="input-large shadow mv" />
                <div className="row jc-sb">
                    <Button variant="contained" color="primary" onClick={() => setFlow(2)} style={{marginBottom: 10, width: '45%'}}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10, width: '45%'}}>
                        Signup
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Otp
