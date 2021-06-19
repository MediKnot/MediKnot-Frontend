import React, { useState } from 'react'
import PrescriptionTable from './PrescriptionTable'
import { Button } from '@material-ui/core'
import '../App.css'

function AddPrescription() {
    const [open,setOpen]=useState(false)
    const [count,setCount] =useState([{"medicine":""}])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        console.log(value)
        const list = [...count];
        list[index][name] = value;
        setCount(list);
      };

    const handleAdd = () => {
        setCount([...count,{"medicine":"","duration":"","frequency":"","reason":""}])
    }
    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: 10, marginRight: 10}} onClick={()=>setOpen(!open)}>
                + New Prescription
            </Button>
            {open?<div>
                <form className="column" >
                    <label className="mh-2 font-s gray">Date</label>
                    <input type="date" className="input-large shadow mh mb"  style={{backgroundColor: 'white'}}/>
                    {count.map((data,i) => {return(<div className="row ai-c">
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
                            {count.length - 1 === i &&<button variant="contained" color="primary" onClick={()=>handleAdd()} className='button-round'>
                                +
                            </button>}
                        </div>
                    )})
                    }
                    <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10, width: '10%'}}>
                        Add
                    </Button>
                </form>
            </div>:null}
            <PrescriptionTable/>
        </div>
    )
}

export default AddPrescription
