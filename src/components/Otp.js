import React from 'react'
import { Button } from '@material-ui/core';


function Otp() {
    return (
        <>
            <h3>Enter Otp</h3>
            <form onSubmit={() => alert("working...")} className="column">
                <input type="number" maxLength={6} placeholder="6 Digit One Time Password." className="input-large shadow mv" />
                <Button variant="contained" color="primary" type="submit">
                    Verify Otp
                </Button>
            </form>
        </>
    )
}

export default Otp
