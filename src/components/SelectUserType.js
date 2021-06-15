import React from 'react'
import { Button } from '@material-ui/core';
import "../App.css"

function SelectUserType({setFlow, setUser}) {

    return (
        <>
            <div className="row">
                <Button variant="contained" color="primary" style={{marginBottom: 10, marginRight: 10, height: 50}} onClick={() => {setFlow(0); setUser('doctor')}}>
                    Doctor
                </Button>
                <Button variant="contained" color="primary" style={{marginBottom: 10, height: 50}} onClick={() => {setFlow(1); setUser('patient')}}>
                    Patient
                </Button>
            </div>
        </>
    )
}

export default SelectUserType
