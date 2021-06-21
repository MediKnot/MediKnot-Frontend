import React, { useState } from 'react'
import PrescriptionTable from './PrescriptionTable'
import { Button } from '@material-ui/core'
import '../App.css'
import axios from '../utils/BaseUrl';
import Loader from './Loader'
import Popup from './Popup';
import AutoComplete from './AutoComplete';



function AddPrescription({ details }) {
    const [open, setOpen] = useState(false)
    const [dosage, setDosage] = useState([{ "medicine": "", "duration": "", "frequency": "", "reason": "" }])
    const [date, setDate] = useState("");
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        console.log(value)
        const list = [...dosage];
        list[index][name] = value;
        setDosage(list);
    };

    const handleAdd = () => {
        setDosage([...dosage, { "medicine": "", "duration": "", "frequency": "", "reason": "" }])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const consultationId = details.id;
        const data = {
            date,
            dosage
        }
        console.log(data, consultationId);
        // await axios.post(`/prescription/${consultationId}`, data)
        //     .then(res => {
        //         if (res.status === 200) {
        //             console.log('Prescription added')
        //         }
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })
    }

    return (
        <div>
            <Button variant="contained" color="primary" style={{ marginBottom: 10, marginRight: 10 }} onClick={() => setOpen(!open)}>
                + New Prescription
            </Button>
            {open ? <div>
                <form className="column" onSubmit={handleSubmit}>
                    <label className="mh-2 font-s gray">Date</label>
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="input-large shadow mh mb" style={{ backgroundColor: 'white' }} />
                    <label className="mh-2 font-s gray">Search: </label>
                    {dosage.map((data, i) => {
                        return (<div className="row ai-c">
                            <input type="string" placeholder="Medicine" className="input-large shadow mh mv" name="medicine"
                                onChange={e => handleInputChange(e, i)}
                                value={data.medicine}
                            />
                            <input type="string" placeholder="Duration" className="input-small shadow mh-2 mv" name="duration"
                                onChange={e => handleInputChange(e, i)}
                                value={data.duration}
                            />
                            <input type="string" placeholder="Frequency" className="input-small shadow mh-2 mv" name="frequency"
                                onChange={e => handleInputChange(e, i)}
                                value={data.frequency}
                            />
                            <input type="string" placeholder="Reason" className="input-small shadow mh-2 mv" name="reason"
                                onChange={e => handleInputChange(e, i)}
                                value={data.reason}
                            />
                            {dosage.length - 1 === i && <button variant="contained" color="primary" onClick={() => handleAdd()} className='button-round'>
                                +
                            </button>}
                        </div>
                        )
                    })
                    }
                    <Button variant="contained" color="primary" type="submit" style={{ marginBottom: 10, width: '10%' }}>
                        Add
                    </Button>
                </form>
            </div> : null}
            <PrescriptionTable />
            {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}
        </div>
    )
}

export default AddPrescription
