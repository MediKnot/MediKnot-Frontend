import React, {useState, useEffect} from 'react'
import Prescription from '../components/Prescription'
import axios from '../utils/BaseUrl';
import ConsultationModel from '../components/ConsultationModel';

function AddReport() {
    const [consultations, setConsultations] = useState([]);
    const [show, setShow] = useState(true);
    
    useEffect(() => {
        var userId = JSON.parse(localStorage.getItem('user'));
        if(userId) userId = userId.id;
        console.log(userId);
        getConsultations(userId);
    }, [])

    const getConsultations = async (userId) => {
        await axios.get(`/consultation/list/${userId}`)
            .then(res => {
                if(res.status === 200) setConsultations(res.data);
            })
            .catch(e => console.log(e));
    }

    return (
        <div>
            <div className="row">{console.log(consultations)}
                <Prescription active />
                <Prescription />
                <Prescription />
            </div>
            {show ? <ConsultationModel setShow={setShow}/> :null}
        </div>
    )
}

export default AddReport
