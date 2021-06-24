import React, { useState, useEffect } from 'react'
import Prescription from '../components/Prescription'
import axios from '../utils/BaseUrl';
import ConsultationModel from '../components/ConsultationModel';
import { Button } from '@material-ui/core';
import MedicalEventCard from '../components/MedicalEventCard';
import MedicalEvent from '../components/MedicalEvent';
// import HaemoglobinComponent from '../components/HaemoglobinComponent';


function AddReport() {
    const [consultations, setConsultations] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [show, setShow] = useState(false);
    const [i, setI] = useState(-1);
    const [id, setId] = useState(-1);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        getConsultations(user.id);
        getTimeline(user.id)
    }, [])

    const getConsultations = async (id) => {
        await axios.get(`/consultation/list/${id}`)
            .then(res => {
                if (res.status === 200) setConsultations(res.data.content);
            })
            .catch(e => console.error(e));
    }

    const getTimeline = async (id) => {
        await axios.get(`/patient/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setTimeline(res.data.timeline);
                }
            })
            .catch(e => console.error(e));
    }

    if (!consultations || !timeline) return <h1>Loading ...</h1>
    else
        return (
            <div>
                <Button variant="contained" color="primary" onClick={() => setShow(true)} style={{}}>
                    Add Consultaton
                </Button>
                <MedicalEvent/>
                {timeline?.map((val)=><MedicalEventCard details={val} setId={setId} />)}
                {consultations.map((con, i) => (
                    <div key={con.id} onClick={() => {setI(i); setShow(true)}}>
                        <Prescription
                            date={con.consultationDate}
                            doctordetails={con.doctor}
                            notes={con.notes}
                        />
                    </div>
                ))}{console.log(i)}
                {i === -1 ?
                    <ConsultationModel
                        setShow={setShow}
                        show={show}
                        setI={setI}
                    />
                    : <ConsultationModel
                        setShow={setShow}
                        show={show}
                        details={consultations[i]}
                        setI={setI}
                    />}
            </div>
        )
}

export default AddReport
