import React, { useState } from 'react'
import PrescriptionTable from './PrescriptionTable'
import { Button } from '@material-ui/core'
import '../App.css'

function AddPrescription() {
    const [open,setOpen]=useState(false)
    const [count,setCount] =useState([{}])

    const handleAdd = () => {
        
    }

    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: 10, marginRight: 10}} onClick={()=>setOpen(true)}>
                + New Prescription
            </Button>
            {open?<div>
                <form className="column" >
                    <input type="date" className="input-large shadow mh mv"  style={{backgroundColor: 'white'}}/>
                    {count.map(() => 
                        <div className="row">
                            <input type="string" placeholder="Medicine" className="input-large shadow mh mv" />
                            <input type="string" placeholder="Dose" className="input-small shadow mh mv" />
                            <input type="string" placeholder="Frequency" className="input-small shadow mh mv" />
                            <Button variant="contained" color="primary" type="submit" onClick={()=>handleAdd()}>
                                Add
                            </Button>
                        </div>
                    )
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
