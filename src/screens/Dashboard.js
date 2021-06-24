import React, { useEffect, useState } from 'react'
// import Prescription from '../components/Prescription'
import Precautions from '../components/Precautions'
import Vulnerabilities from '../components/Vulnerabilities'
import MyTimeline from './Timeline';
import '../App.css'
import BarChart from '../components/BarChart';
import axios from '../utils/BaseUrl';
import DoughnutChart from '../components/DoughnutChart';
import HeartBeatComponent from '../components/HeartBeatComponent';
import BloodPressureComponent from '../components/BloodPressureComponent';
import SugarLevelComponent from '../components/SugarLevelComponent';
import HaemoglobinComponent from '../components/HaemoglobinComponent';
import Loader from '../components/Loader';
import LineChart from '../components/LineChart';


function Dashboard({patientref}) {
    const [consultations, setConsultations] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        var user = JSON.parse(localStorage.getItem("user"))
        if(patientref) user = patientref
        getConsultations(user.id);
        getUser(user.id);
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

    const getUser = async (id) => {
        await axios.get(`/patient/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
            })
            .catch(e => console.log(e))
    }

    if (!user.id) return (
        <div style={{ height: '100vh', overflow: 'hidden' }} className="row ai-c jc-c">
            <Loader />
        </div>
    )
    else
        return (
            <div>
                <div className="row jc-sb">
                    <div className="column" style={{ maxWidth: '40%' }}>
                        {/* <Prescription active /> */}
                        {consultations.length !== 0 ?
                            <div >
                                <BarChart data={consultations} />
                                {/* <DoughnutChart data={consultations} /> */}

                            </div> : null}
                        <div className="row">
                            <Precautions />
                            <Vulnerabilities data={user.allergies} />
                        </div>
                    </div>

                    <div className="column f-1 mh-2">
                        <div className="row jc-se mv-2">
                            <HeartBeatComponent heartbeat="72" />
                            <BloodPressureComponent bp={'100'} />
                            <SugarLevelComponent value='30' />
                            <HaemoglobinComponent value='30' />
                        </div>
                        {consultations.length !== 0 ?
                            <div style={{ width: '80%', alignSelf: 'center' }}>
                                <DoughnutChart data={consultations} />
                            </div> : null}
                    </div>
                </div>
                <MyTimeline data={user.timeline} />
            </div>
        )
}

export default Dashboard
