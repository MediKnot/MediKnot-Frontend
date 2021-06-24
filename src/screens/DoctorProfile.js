import React, { useEffect, useState } from 'react'
import '../App.css'
import ProfileImage from "../assets/images/profile.jpeg";
import { Button, Chip } from '@material-ui/core';
import axios from '../utils/BaseUrl';
import Popup from '../components/Popup';
import Loader from '../components/Loader';

function DoctorProfile() {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [regno, setRegno] = useState('');
    const [gender, setGender] = useState('');
    const [adhaar, setAdhaar] = useState('');
    
    const edit = false;
    const getUser = async (id) => {
        await axios.get(`/doctor/${id}`)
            .then(res => {
                if (res.status === 200) {
                    init(res.data);
                }
            })
            .catch(e => console.log(e))
    }
    useEffect(() => {
        var user_data = JSON.parse(localStorage.getItem("user"));
        getUser(user_data.id);
    }, [])

    const init = (user_data) => {
        setId(user_data.id);
        setName(user_data.name);
        setEmail(user_data.emailId);
        setMobile(user_data.phoneNumber);
        setRegno(user_data.registrationNumber);
        setAdhaar(user_data.aadharNumber);
        setGender(user_data.gender);
    }

    if(!id) return(
        <div style={{height: '100vh', overflow: 'hidden'}} className="row ai-c jc-c">
            <Loader/>
        </div>
    )
    else 
    return (
        <div style={{height: '100vh'}}>
            <div className='heading' style={{ textAlign: 'center' }}>Profile</div>
            <img src={ProfileImage} alt="Profile" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', heigth: '8%', width: '12%', borderRadius: '50%' }} />
            <div className="row jc-sb">
                <div className="ml mv-2" style={{ maxWidth: 500 }}>
                    <h1 className="label">Basic Details</h1>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Name: </div>
                        <div className="row-no-wrap">
                            {!edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml" >{name}</div></div> :
                                <input type="email" value={name} onChange={(e) => setName(e.target.value)} className="input-profile shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Email: </div>
                        <div className="row-no-wrap">
                            {!edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml">{email}</div></div> :
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-profile shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Mobile: </div>
                        <div className="row-no-wrap">
                            {!edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml">{mobile}</div></div> :
                                <input type="email" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input-profile shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Registration No.: </div>
                        <div className="row-no-wrap">
                            {!edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml">{regno}</div></div> :
                                <input type="email" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input-profile shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Gender : </div>
                        <div className="row-no-wrap">
                            {!edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml">{gender}</div></div> :
                                <input type="email" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input-profile shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Adhaar No.: </div>
                        <div className="row-no-wrap">
                            {!edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml">{adhaar}</div></div> :
                                <input type="email" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input-profile shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile;