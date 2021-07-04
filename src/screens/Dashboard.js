import React, { useEffect, useState, memo } from 'react'
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
import { useRouteMatch,useLocation } from 'react-router-dom'
const queryString = require('query-string');


function Dashboard({patientref,view}) {
    const location=useLocation();
    const parsed = queryString.parse(location.search);
    const id=parsed.patientId;

    const [consultations, setConsultations] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        var user = JSON.parse(localStorage.getItem("user"))
        if(patientref) user = patientref
        else {
            if(id)user={id}
        }
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

    const Header =()=>(
        <div style={{backgroundColor:'#3F51B5',height:60,width:'100%'}} className='row ai-c shadow mb'>
            <div style={{fontSize:30,color:'white',fontWeight:500}} className='ml'>{user.name}</div>
        </div>
    )

    if (!user.id) return (
        <div style={{ height: '100vh', overflow: 'hidden' }} className="row ai-c jc-c">
            <Loader />
        </div>
    )
    else
        return (
            <div style={{backgroundColor:'#e4ecfc'}}>
                {id?
                <Header/>
                :null}
                <div className="row jc-sb" style={{marginLeft:id?25:0}}>

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
                            <HeartBeatComponent heartbeat={user.heartRate.length===0? 'NA': user.heartRate[user.heartRate.length-1].healthField} />
                            <BloodPressureComponent bp={user.bloodPressure.length===0? 'NA': user.bloodPressure[user.bloodPressure.length-1].healthField} />
                            <SugarLevelComponent value={user.sugarLevel.length===0? 'NA': user.sugarLevel[user.sugarLevel.length-1].healthField} />
                            <HaemoglobinComponent value={user.haemoglobin.length===0? 'NA': user.haemoglobin[user.haemoglobin.length-1].healthField} />
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

export default memo(Dashboard)
