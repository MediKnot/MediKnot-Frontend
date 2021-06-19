import React,{useState} from 'react'
import PrescriptionTable from './PrescriptionTable'
import { Button } from '@material-ui/core'
import '../App.css'
import '../styles/addtreatment.css'

function AddTreatment() {
    const [open,setOpen]=useState(false)
    const [endTime,setEndTime]=useState('')
    const [startTime,setStartTime]=useState('')
    const [description,setDescription]=useState('')
    const [treatmentName,setTreatmentName]=useState('')


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const data={
    //         description,
    //         treatmentName,
    //         endTime,
    //         startTime,
    //     }
    //     await axios.put(`/consultation/add/treatment/${consultationId}`, data)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 console.log('Treatment added')
    //             }
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    // }

    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: 10, marginRight: 10}} onClick={()=>setOpen(!open)}>
                    + New Treatment
            </Button>
            {open?<div>
                <form className="row ai-c" >
                    <div className="column">
                        <input type="text" placeholder="Name" value={treatmentName} onChange={(e) => setTreatmentName(e.target.value)} className="input-large shadow mh mv"  style={{width:'13rem'}}/>
                            <label className="mh-2 font-s gray">Start date</label>
                        <input type="date" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input-large shadow mh mb" style={{backgroundColor: 'white',width:'13rem'}} />
                            <label className="mh-2 font-s gray">End date</label>
                        <input type="date" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="input-large shadow mh" style={{backgroundColor: 'white',width:'13rem'}} />
                    </div>
                    <textarea type="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-large shadow mh mv" style={{height:'11rem',minWidth:'13rem',width:'20rem'}}/>
                    <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10, width: '10%',height:'10%'}}>
                        Add
                    </Button>
                </form>
            </div>:null}
            <PrescriptionTable/>
        </div>
    )
}

export default AddTreatment
