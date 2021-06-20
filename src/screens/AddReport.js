import React, { useState, useEffect } from 'react'
import Prescription from '../components/Prescription'
import axios from '../utils/BaseUrl';
import ConsultationModel from '../components/ConsultationModel';
import { Button } from '@material-ui/core';


function AddReport() {
    const [consultations, setConsultations] = useState(null);
    const [show, setShow] = useState(false);
    const [i, setI] = useState(-1);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        getConsultations(user.id);
        console.log(consultations);
    }, [])

    const getConsultations = async (id) => {
        axios.get(`/consultation/list/${id}`)
            .then(res => {
                if (res.status === 200) setConsultations(res.data.content);
            })
            .catch(e => console.error(e));
    }

    if (!consultations) return <h1>Loading ...</h1>
    else
        return (
            <div>
                <Button variant="contained" color="primary" onClick={() => setShow(true)} style={{}}>
                    Add Consultaton
                </Button>{console.log(consultations[0])}
                {consultations.map((con, i) => (
                    <div key={con.id} onClick={() => {setI(i); setShow(true)}}>
                        <Prescription
                            date={con.consultationDate}
                            doctordetails={con.doctor}
                            notes={con.notes}
                        />
                    </div>
                ))}
                {i === -1 ?
                    <ConsultationModel
                        setShow={setShow}
                        show={show}
                    />
                    : <ConsultationModel
                        setShow={setShow}
                        show={show}
                        details={consultations[i]}
                    />}
            </div>
        )
}

export default AddReport
