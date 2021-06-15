import React from 'react'
import { Button } from '@material-ui/core';
import "../App.css"

function SignupDetails({setFlow}) {
    const [gender, setGender] = React.useState('male');

    return (
        <>
            <form className="column" onSubmit={() => setFlow(2)}>
                <div className="row ai-c mv">
                    <input type="text" minLength={2} placeholder="First Name" className="input-small shadow mh" />
                    <input type="text" minLength={2} placeholder="Last Name" className="input-small shadow" />
                </div>
                <input type="email" placeholder="Email" className="input-large shadow mh mv" />
                <input type="number" maxLength={10} placeholder="Phone" className="input-large shadow mh mv" />
                <input type="number" maxLength={12} placeholder="Adhaar No. xxxx-xxxx-xxxx-xxxx " className="input-large shadow mh mv" />
                <input type="text" placeholder="Address" className="input-large shadow mh mv" />
                <div classname="row ai-c">
                    <select id="gender" name="gender" className="input-small shadow mh" style={{ backgroundColor: 'white', height: 60, width: 165 }} placeholder="Gender" >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="date" placeholder="Date Of Birth" className="input-small shadow mv" style={{backgroundColor: 'white'}}/>
                </div>
                <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10}}>
                    Next
                </Button>
            </form>
        </>
    )
}

export default SignupDetails
