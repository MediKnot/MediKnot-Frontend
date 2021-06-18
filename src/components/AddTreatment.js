import React,{useState} from 'react'
import PrescriptionTable from './PrescriptionTable'
import { Button } from '@material-ui/core'
import '../App.css'

function AddTreatment() {
    const [open,setOpen]=useState(false)

    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: 10, marginRight: 10}} onClick={()=>setOpen(true)}>
                    + New Treatment
            </Button>
            {open?<div>
                <form className="column" >
                    <div className="row">
                        <input type="text" placeholder="Name" className="input-large shadow mh mv" />
                        <input type="date" className="input-large shadow mh mv" style={{backgroundColor: 'white'}}/>
                        <input type="date" className="input-large shadow mh mv" style={{backgroundColor: 'white'}}/>
                    </div>
                    <textarea type="textarea" placeholder="Description" className="input-large shadow mh mv" style={{height:'7rem'}}/>
                    <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10, width: '10%'}}>
                        Add
                    </Button>
                </form>
            </div>:null}
            <PrescriptionTable/>
        </div>
    )
}

export default AddTreatment
