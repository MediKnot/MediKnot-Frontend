import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import "../App.css"

function SignupDetails({setFlow, user, setUser, setData, data, flow}) {
    const [gender, setGender] = useState('MALE');
    const [fname, setfname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adhaar, setAdhaar] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        const obj = {
            "aadharNumber": adhaar,
            "dateOfBirth": dob,
            "emailId": email,
            "gender": gender.toUpperCase(),
            "name": fname+" "+lname,
            "phoneNumber": phone,
        }
        if(user==='doctor'){
            obj['registrationNumber'] = data.registrationNumber;
        }
        setData(obj);
        setFlow(flow+1);
    }

    return (
        <>
            <form className="column" onSubmit={handleChange}>
                <div className="row ai-c mv">{console.log(fname)}
                    <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} minLength={2} placeholder="First Name" className="input-small shadow mh" />
                    <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} minLength={2} placeholder="Last Name" className="input-small shadow" />
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-large shadow mh mv" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} placeholder="Phone" className="input-large shadow mh mv" />
                <input type="string" value={adhaar} onChange={(e) => setAdhaar(e.target.value)} maxLength={15} placeholder="Adhaar No. xxxx-xxxx-xxxx-xxxx " className="input-large shadow mh mv" />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="input-large shadow mh mv" />
                <div classname="row ai-c">
                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} name="gender" className="input-small shadow mh" style={{ backgroundColor: 'white', height: 60, width: 165 }} placeholder="Gender" >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="dd-mm-yyyy" className="input-small shadow mv" style={{backgroundColor: 'white'}}/>
                </div>
                <div className="row jc-sb">
                    <Button variant="contained" color="primary" onClick={() => user==='doctor' ? setFlow(flow-1): (setFlow(flow-2), setUser(null))} style={{marginBottom: 10, width: '45%'}}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10, width: '45%'}}>
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
}

export default SignupDetails
