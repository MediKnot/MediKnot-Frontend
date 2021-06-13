import React from 'react'
import { Button } from '@material-ui/core';


function EnterAdhaar({setFlow}) {
    return (
        <>
            <h3>Adhaar No.</h3>
            <form onSubmit={() => setFlow(1)} className="column">
                <input type="number" maxLength={12} placeholder="Adhaar No." className="input-large shadow mv" />
                <Button variant="contained" color="primary" type="submit">
                    Send Otp
                </Button>
            </form>
        </>
    )
}

export default EnterAdhaar
