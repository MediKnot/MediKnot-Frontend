import React, { useState, useEffect } from 'react'
import '../App.css';
import { Button, Chip } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import AutoComplete from './AutoComplete';
import Loader from './Loader'
import axios from '../utils/BaseUrl';
import Popup from './Popup';

function EditConsultation({ details }) {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);

    var d = new Date();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setPatient(user);
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
    }


    if (patient)
        return (
            <div>
                <div className='row jc-sb'>
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
                                <AutoComplete small
                                    endpoint="/doctor/search?name="
                                    value={value}
                                    setValue={setValue}
                                    suggest={["name"]}
                                    placeHolder="Search Doctor"
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
                    </div>
                </div>
                <div className='mt'>
                    <div className="row jc-sb">
                        <div id="diseases">
                            <div className='label mr'>Disease/Problems:</div>
                            {!details ? <>
                                <AutoComplete large
                                    endpoint="/disease/search?name="
                                    value={value}
                                    setValue={setValue}
                                    suggest={["name"]}
                                    placeHolder="Search Diseases"
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
