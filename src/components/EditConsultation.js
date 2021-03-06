import React, { useState, useEffect } from 'react'
import '../App.css';
import { Button, Chip } from '@material-ui/core';
import AutoComplete from './AutoComplete';
import Loader from './Loader'
import axios from '../utils/BaseUrl';
import Popup from './Popup';

function EditConsultation({ details,showevent, setConsultations, consultations, patientref}) {
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);

    var d = new Date();
    useEffect(() => {
        var user = JSON.parse(localStorage.getItem("user"));
        if(patientref) user =patientref;
        setPatient(user);
        getEvents(user);
        // console.log(details.id)
    }, [])

    const handleDelete = (id) => {
        setDiseases(diseases.filter(dis => dis.id !== id));
    }

    const createConsultation = async () => {
        var obj = {}
        var concerns = [];
        for (var i = 0; i < diseases.length; i++) concerns[i] = diseases[i].name;
        const dr_id = doctor[0].id
        const pt_id = patient.id;
        obj['notes'] = [notes];
        obj['consultationDate'] = date;
        obj['concerns'] = concerns;
        
        axios.post(`/consultation/${pt_id}/${dr_id}`, obj)
            .then(res => {
                if (res.status === 200) {
                    setError(false);
                    setMess("Consultation added successfully !!");
                } else {
                    setError(true);
                    setMess("Adding consultation failed !!");
                }
            })
            .catch(e => {
                console.log(e);
                setError(true);
                setMess("Something went wrong. Try again !!");
            });
        setMess("");
        setDate("");
        setDoctor([]);
        setNotes("");
        setDiseases([]);
    }

    const updateConsultation = async () => {
        await axios.put(`/consultation/add/notes/${details.id}`, [notes])
            .then(res => {
                if (res.status === 200) {
                    axios.put(`/consultation/add-to-event/${event}/${details.id}`)
                    .then(res => {
                        if (res.status === 200) {
                            setError(false);
                            setMess("Consultation updated successfully !!");
                        } else {
                            setError(true);
                            setMess("Updating consultation failed !!");
                        }
                    })
                    .catch(e => {
                        setError(true);
                        setMess("Something went wrong. Try again !!");
                    })
                } else {
                    setError(true);
                    setMess("Updating consultation failed !!");
                }
            })
            .catch(e => {
                setError(true);
                setMess("Something went wrong. Try again !!");
            })
    }

    const getEvents = async (user) => {
        await axios.get(`/medicalEvent/all/${user.id}`)
            .then(res => {
                if (res.status === 200) {
                    setEvents(res.data.content)
                    console.log(res.data)
                } 
            })
            .catch(e => {
                
            })
    }

    if (patient)
        return (
            <div>
                <div className='row jc-sb mr-2'>
                    <div>
                        <div className='row ai-c mv'>
                            <div className='label mr'>Patient's Name:</div>
                            <div className='font -s'>{patient.name}</div>
                        </div>
                        <div className='row ai-c'>
                            <div className='label mr'>Mobile No.:</div>
                            <div className='font -s'>{patient.phoneNumber}</div>

                        </div>
                        <div className='row ai-c mv'>
                            <div className='label mr'>Age:</div>
                            <div className='font -s'>{d.getFullYear() - parseInt(patient.dateOfBirth.substring(0, 4))}</div>
                        </div>
                        <div id="date" className='row ai-c mv'>
                            <div className='label mr'>Date:</div>
                            {!details ?
                                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="input-large shadow" style={{ backgroundColor: 'white', width: 200 }} />
                                : <div>{details.consultationDate}</div>}
                        </div>
                    </div>
                    <div>
                        <div className='row ai-c'>
                            <div className='label mr'>Doctor's Name:</div>
                            {!details ? doctor.length !== 0 ? <div onDoubleClick={() => setDoctor([])} className='font -s' style={{ cursor: 'pointer' }}>{doctor[0].name}</div> :
                                <AutoComplete 
                                    endpoint="/doctor/search?name="
                                    value={value}
                                    setValue={setValue}
                                    suggest={["name"]}
                                    placeholder="Search Doctor"
                                    list={doctor}
                                    setList={setDoctor}
                                /> : <div>{details.doctor.name}</div>}
                        </div>
                        {doctor.length !== 0 ?
                            <div>
                                <div className='row ai-c'>
                                    <div className='label mr'>Specialisation:</div>
                                    <div className='font -s'>{doctor[0].specialization.toString()}</div>
                                </div>
                                <div className='row ai-c'>
                                    <div className='label mr'>Contact No.:</div>
                                    <div className='font -s'>{doctor[0].phoneNumber}</div>
                                </div>
                                <div className='row ai-c'>
                                    <div className='label mr'>Clinic:</div>
                                    <div className='font -s'>10, Main Street, Indore</div>
                                </div>
                            </div>
                            : null}
                           {details && !showevent?<div className='row ai-c mv-2'>
                            <div className='label mr'>Medical Event:</div>
                            <select id="event" value={event} onChange={(e) => setEvent(e.target.value)} className="input-profile-small shadow" style={{ paddingLeft: 10 }} placeholder="Medical Event" >
                                {events?.map((val)=>(<option value={val.id}>{val.eventName || val.id}</option>))}
                            </select>
                        </div>:null}
                    </div>
                </div>
                <div>
                    <div className="row jc-sb">
                        <div id="diseases">
                            <div className='label mr'>Disease/Problems:</div>
                            {!details ? <>
                                <AutoComplete large
                                    endpoint="/disease/search?name="
                                    value={value2}
                                    setValue={setValue2}
                                    suggest={["name"]}
                                    placeholder="Search Diseases"
                                    list={diseases}
                                    setList={setDiseases}
                                    multiple
                                />
                                <div className='font-s mv'>
                                    {diseases.map((disease, i) => (
                                        <Chip
                                            key={disease.id}
                                            label={disease.name}
                                            onDelete={() => handleDelete(disease.id)}
                                            color="secondary"
                                            style={{ marginRight: 10 }}
                                        />
                                    ))}
                                </div>
                            </>
                                : null}
                            {details ? <div className='font-s mv'>
                                {details.concerns.map((disease, i) => (
                                    <Chip
                                        key={i}
                                        label={disease}
                                        color="secondary"
                                        style={{ marginRight: 10 }}
                                    />
                                ))}
                            </div> : null}
                        </div>

                    </div>
                    <div className='label mr mv-2'>Notes:</div>
                    <div>
                        {details ?
                            <div>{details.notes ? (details.notes.map(note => <p>{note}</p>)) : ""}</div>
                            : null}
                    </div>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="input-large shadow"
                        placeholder="Note"
                        style={{ height: 100 }}
                    />
                </div>
                {!details ?
                    <Button variant="contained" color="primary" onClick={createConsultation} style={{ marginTop: 10 }}>
                        Add
                    </Button> :
                    <Button variant="contained" color="primary" onClick={updateConsultation} style={{ marginTop: 10 }}>
                        Update
                    </Button>
                }
                {/* {edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml">{name}</div></div> :
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-profile shadow" style={{ paddingLeft: 10 }} />}
                {edit ? <Button onClick={() => setEdit(!edit)}><Edit style={{ color: 'gray' }} /></Button> : <Button onClick={() => setEdit(!edit)}><Done style={{ color: 'gray' }} /></Button>} */}
                {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}
            </div>
        )
    return <Loader />
}

export default EditConsultation
