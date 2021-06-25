import React from 'react'
import LineChart from '../components/LineChart'
import '../App.css';
import axios from '../utils/BaseUrl';
import Loader from '../components/Loader';

function ReportAnalysis({patientref}) {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if(patientref) setUser(patientref);
        else  getUser(user.id);
    }, [])

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
        <div style={{ backgroundColor: '#e4ecfc',bottom:0 }}>
            <h1 className="heading-small">Report Analysis</h1>
            <div className="row">
                <div style={{ height: '50%', width: '50%' }} className="mv">
                    <LineChart data={user.heartRate} label="Heart Rate Measure (in bpm)" i={0}/>
                </div>
                <div style={{ height: '50%', width: '50%' }} className="mv">
                    <LineChart data={user.bloodPressure} label="Blood Pressure Measure (in mmhg)" i={1}/>
                </div>
                <div style={{ height: '50%', width: '50%' }} className="mv">
                    <LineChart data={user.sugarLevel} label="Sugar Level Measure (in mg/dL)" i={2}/>
                </div>
                <div style={{ height: '50%', width: '50%' }} className="mv">
                    <LineChart data={user.haemoglobin} label="Haemoglobin Measure (in g/dl)" i={3}/>
                </div>
            </div>
        </div>
    )
}

export default ReportAnalysis
