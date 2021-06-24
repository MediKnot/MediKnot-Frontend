import React, { useEffect, useState } from 'react'
import '../App.css'
import ProfileImage from "../assets/images/profile.jpeg";
import { Button, Chip } from '@material-ui/core';
import axios from '../utils/BaseUrl';
import Popup from '../components/Popup';
import Loader from '../components/Loader';

function Profile() {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [allergy, setAllergy] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bg, setBg] = useState('');
    const [hr, setHr] = useState('');
    const [bp, setBp] = useState('');
    const [sl, setSl] = useState('');
    const [hg, setHg] = useState('');
    const [heartrate, setHeartRate] = useState([]);
    const [bloodpressure, setBloodPressure] = useState([]);
    const [sugarlevel, setSugarLevel] = useState([]);
    const [haemoglobin, setHaemoglobin] = useState([]);
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);
    // const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);
    
    const d = new Date();
    const handleUpdate = async (e) => {
        e.preventDefault();
        var user_data = JSON.parse(localStorage.getItem("user"));
        var date = `${d.getFullYear()}-0${d.getMonth()}-${d.getDate()}`;
        var obj = { allergies, height: parseFloat(height), weight: parseFloat(weight), name }
        obj['bloodGroup'] = bg;
        obj['emailId'] = email;
        obj['phoneNumber'] = mobile;
        var temp = bloodpressure;
        temp.push({ healthField: bp, timestamp: date });
        if (bp.length !== 0)
            obj['bloodPressure'] = temp;
        temp = heartrate;
        temp.push({ healthField: hr, timestamp: date });
        if (hr.length !== 0)
            obj['heartRate'] = temp;
        temp = haemoglobin;
        temp.push({ healthField: hg, timestamp: date });
        if (hg.length !== 0)
            obj['haemoglobin'] = temp;
        temp = sugarlevel;
        temp.push({ healthField: sl, timestamp: date });
        if (sl.length !== 0)
            obj['sugarLevel'] = temp;
        console.log(obj);
        await axios.put(`/patient/${user_data.id}`, obj)
            .then(res => {
                if (res.status === 200) {
                    setMess('Data Updated successfully !!');
                    setError(false);
                } else {
                    setError(false);
                    setMess('Data updation failed !!')
                }
            })
            .catch(e => {
                console.log(e);
                setError(false);
                setMess('Data updation failed !!')
            })
            setBp('');
            setHr('');
            setHg('');
            setSl('');
    }

    const handleAdd = () => {
        var temp = allergies;
        if (temp.indexOf(allergy) === -1) temp.push(allergy)
        setAllergy('');
        setAllergies(temp);
    }

    const handleDelete = (data) => {
        var temp = allergies;
        temp = temp.filter(x => x !== data);
        setAllergies(temp);
    }

    const getUser = async (id) => {
        await axios.get(`/patient/${id}`)
            .then(res => {
                if (res.status === 200) {
                    init(res.data);
                }
            })
            .catch(e => console.log(e))
    }
    useEffect(() => {
        var user_data = JSON.parse(localStorage.getItem("user"));
        getUser(user_data.id)
    }, [])

    const init = (user_data) => {
        setId(user_data.id);
        setName(user_data.name);
        setEmail(user_data.emailId);
        setMobile(user_data.phoneNumber);
        setAllergies(user_data.allergies);
        setBloodPressure(user_data.bloodPressure);
        setHeartRate(user_data.heartRate);
        setSugarLevel(user_data.sugarLevel);
        setHaemoglobin(user_data.haemoglobin);
        setHeight(user_data.height);
        setWeight(user_data.weight);
        setBg(user_data.bloodGroup);
    }

    if(!id) return(
        <div style={{height: '100vh', overflow: 'hidden'}} className="row ai-c jc-c">
            <Loader/>
        </div>
    )
    else 
    return (
        <div>
            <h1 className="heading-small" style={{ textAlign: 'center' }}>Profile</h1>
            <img src={ProfileImage} alt="Profile" class='profile_image' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
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
                </div>
                <div className="ml mv-2" style={{ maxWidth: 500 }}>
                    <h1 className="label">General Details</h1>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Height: </div>
                        <div className="row-no-wrap mh-2">
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c" style={{ paddingLeft: 10 }}><div className="ml">{height}ft</div></div> :
                                <input placeholder='Height in feet' type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Weight: </div>
                        <div className="row-no-wrap mh-2">
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c" style={{ paddingLeft: 10 }}><div className="ml">{weight}kg</div></div> :
                                <input placeholder='Weight in kg' type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Blood Group: </div>
                        <div className="row-no-wrap mh-2">{console.log(bg)}
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c" style={{ paddingLeft: 10 }}><div className="ml">{bg}</div></div> :
                                <select id="blood-group" value={bg} onChange={(e) => setBg(e.target.value)} name="blood-group" className="input-profile-small shadow" style={{ paddingLeft: 10 }} placeholder="Blood Group" >
                                    <option value="A-">A-</option>
                                    <option value="A+">A+</option>
                                    <option value="AB">AB-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="B-">B-</option>
                                    <option value="B+">B+</option>
                                    <option value="O-">O-</option>
                                    <option value="O+">O+</option>
                                </select>}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Allergies: </div>
                        <div className="row-no-wrap mh-2">
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c" style={{ paddingLeft: 10 }}><div className="ml">{allergies.toString().substring(0, Math.min(allergies.toString().length, 9))}...</div></div> :
                                <input placeholder="Enter Allergies" type="string" value={allergy} onChange={(e) => setAllergy(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="column" style={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary" onClick={handleAdd} className="mv" style={{ maxWidth: 100, alignSelf: 'flex-end', marginRight: 20 }}>
                            Add
                        </Button>
                        <div style={{ maxWidth: 300 }}>
                            {allergies.map((allergy, i) => (
                                <Chip
                                    key={i}
                                    label={allergy}
                                    onDelete={() => handleDelete(allergy)}
                                    color="secondary"
                                    style={{ marginRight: 10, marginTop: 10 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ml mv-2" style={{ maxWidth: 500 }}>
                    <h1 className="label">Add Medical Details</h1>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Heart Rate: </div>
                        <div className="row-no-wrap mh-2">
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c"><div className="ml">{hr}</div></div> :
                                <input placeholder='Value in bpm' type="number" value={hr} onChange={(e) => setHr(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Blood Pressure: </div>
                        <div className="row-no-wrap mh-2">
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c"><div className="ml">{bp}</div></div> :
                                <input placeholder='Value in mmhg' type="number" value={bp} onChange={(e) => setBp(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Sugar Level: </div>
                        <div className="row-no-wrap mh-2">
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c"><div className="ml">{sl}</div></div> :
                                <input placeholder='Value in mg/dL' type="number" value={sl} onChange={(e) => setSl(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                    <div className="df f-1 jc-sb row ai-c mv-2">
                        <div className="label">Haemoglobin: </div>
                        <div className="row-no-wrap mh-2">
                            {!edit ? <div className="input-profile-small shadow df f-1 ai-c"><div className="ml">{hg}</div></div> :
                                <input placeholder='Value in g/dl' type="number" value={hg} onChange={(e) => setHg(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mv-2 ">
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Update
                </Button>
                <Button variant="contained" color="primary" onClick={() => setEdit(!edit)} style={{ marginLeft: 20 }}>
                    {edit ? 'Done' : 'Edit'}
                </Button>
            </div>
            {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}
        </div>
    )
}

export default Profile;