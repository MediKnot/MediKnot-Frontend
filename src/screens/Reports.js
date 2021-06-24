import React , { useEffect, useState } from 'react'
import "../App.css"
import ConsultationCard from '../components/ConsultationCard';
import CardComponent from '../components/CardComponent';
import axios from '../utils/BaseUrl';
import ConsultationModel from '../components/ConsultationModel';
import { Button } from '@material-ui/core';

function Reports() {
    const [consultations,setConsultations]=useState();
    const [show, setShow] = useState(false);
    const [i, setI] = useState(-1);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        getConsultations(user.id);
    }, [])

    const getConsultations = async (id) => {
        await axios.get(`/consultation/list/${id}`)
            .then(res => {
                if (res.status === 200) setConsultations(res.data.content);
            })
            .catch(e => console.error(e));
    }
    if (!consultations) return <h1>Loading ...</h1>
    else
    return (
        <div className="row">
            <div className="column f-1">
                <div className="row ai-c">
                    <h1 className="heading-small">Consultations</h1>
                    <Button variant="contained" color="primary" onClick={() => setShow(true)} style={{width:130,height:55,marginLeft:'25%'}}>
                        Add Consultaton
                    </Button>
                </div>
                <div className="row">
                    {consultations.map((val, i)=>(
                        <div key={val.id} onClick={() => {setI(i); setShow(true)}}>
                            <ConsultationCard details={val}/>
                        </div>
                    ))}
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
            </div>
            <div className="column mh-2">
                <h1 className="heading-small">Reports</h1>
                <div className="row">
                <CardComponent/>
                <CardComponent/>
                </div>
            </div>
        </div>
    )
}

export default Reports
