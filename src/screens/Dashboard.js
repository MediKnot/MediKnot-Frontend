import React, { useEffect, useState } from 'react'
import Prescription from '../components/Prescription'
import Precautions from '../components/Precautions'
import Vulnerabilities from '../components/Vulnerabilities'
import MyTimeline from './Timeline';
import '../App.css'
import BarChart from '../components/BarChart';
import axios from '../utils/BaseUrl';

function Dashboard() {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        getConsultations(user.id);
    }, [])

    const getConsultations = async (id) => {
        await axios.get(`/consultation/list/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setConsultations(res.data.content);
                }
            })
            .catch(e => console.error(e));
    }

    return (
        <div className="row jc-sb">
            <div className="column" style={{ flex: 1.5 }}>
                {/* <Prescription active /> */}
                {consultations.length !== 0 ?
                    <div style={{ height: '100%', width: '100%' }}>
                        <BarChart data={consultations} />
                    </div> : null}
                <div className="row">
                    <Precautions />
                    <Vulnerabilities />
                </div>
            </div>
            <MyTimeline />

        </div>
    )
}

export default Dashboard
