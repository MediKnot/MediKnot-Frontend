import React, {useState} from 'react'
import LineChart from '../components/LineChart'
import '../App.css';
import BaseUrl from '../utils/BaseUrl';
import Loader from '../components/Loader';
import { Button } from '@material-ui/core';
import axios from 'axios';
import BloodReport from '../components/reports/BloodReport';
import Popup from '../components/Popup';

function ReportAnalysis({ patientref }) {
    const [user, setUser] = useState({});
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mess, setMess] = useState("");
    const [file, setFile] = useState("");
    const [error, setError] = useState(false);

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (patientref) setUser(patientref);
        else getUser(user.id);
    }, [])

    const getUser = async (id) => {
        await BaseUrl.get(`/patient/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
            })
            .catch(e => console.log(e))
    }

    const analyse = async (url) => {
        axios.post(`http://20.198.81.29:5003/report?reportUrl=${url}`)
            .then(res => {
                setData(res.data);
                setError(false);
                setMess("Data extracted successfully !")
                setLoading(false);
            })
            .catch(e => { console.log(e); setLoading(false) });
    }

    const uploadFile = async () => {
        if(!file) return;
        setLoading(true);
        var formData = new FormData();
        formData.append("file", file, file.name);
        await BaseUrl.post(`/file/upload/${user.id}`, formData)
            .then(res => {
                if (res.status === 200) analyse("http://20.198.81.29:5002" + res.data.path.slice(8))
            })
            .catch(e => {
                console.log(e);
                setError(true);
                setMess("Something went wrong. Try again !!");
            });
    }

    if (!user.id) return (
        <div style={{ height: '100vh', overflow: 'hidden' }} className="row ai-c jc-c">
            <Loader />
        </div>
    )
    else
        return (
            <div style={{ backgroundColor: '#e4ecfc', height: '100%' }}>
                <h1 className="heading-small">Report Analysis</h1>
                <div className="row">
                    <div style={{ height: '50%', width: '50%' }} className="mv">
                        <LineChart data={user.heartRate} label="Heart Rate Measure (in bpm)" i={0} />
                    </div>
                    <div style={{ height: '50%', width: '50%' }} className="mv">
                        <LineChart data={user.bloodPressure} label="Blood Pressure Measure (in mmhg)" i={1} />
                    </div>
                    <div style={{ height: '50%', width: '50%' }} className="mv">
                        <LineChart data={user.sugarLevel} label="Sugar Level Measure (in mg/dL)" i={2} />
                    </div>
                    <div style={{ height: '50%', width: '50%' }} className="mv">
                        <LineChart data={user.haemoglobin} label="Haemoglobin Measure (in g/dl)" i={3} />
                    </div>
                </div>
                <div style={{ backgroundColor: '#e4ecfc', height: '100%', marginRight: -25, marginLeft: -25 }} >
                    <div className="mh-2">
                        <h1 className="heading-small">Analyse a Report</h1>
                        <div className="row ai-c">
                            <input type="file" className="input-large shadow mv mr" onChange={(e) => setFile(e.target.files[0])} style={{ height: 50 }} />
                            <Button onClick={uploadFile} variant="contained" color="primary" style={{ marginTop: 10, height: 50, width: 100 }}>
                                Analyse
                            </Button>
                        </div>
                        <div style={{ marginLeft: '8%', marginTop: 10 }}>
                            {loading ? <Loader /> : null}
                        </div>
                        {data ? <div>
                            <h2>Extracted report data:</h2>
                            <div className="row">
                                <BloodReport data={data.data} />
                            </div>
                        </div> : null}
                    </div>
                </div>
                {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}

            </div>
        )
}

export default ReportAnalysis
