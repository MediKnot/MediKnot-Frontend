import React from 'react'
import { Button } from '@material-ui/core';

function EnterMobile({setFlow}) {
    return (
        <>
            <h3>Mobile No.</h3>
            <form onSubmit={() => setFlow(2)} className="column">
                <input type="number" maxLength={10} placeholder="Mobile Number" className="input-large shadow mv" />
                <Button variant="contained" color="primary" type="submit">
                    Send Otp
                </Button>
            </form>
        </>
    )
}

export default EnterMobile
