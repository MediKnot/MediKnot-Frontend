import React,{useState} from 'react'
import PrescriptionTable from './PrescriptionTable'
import { Button } from '@material-ui/core'
import '../App.css'
import '../styles/addtreatment.css'

function AddTreatment() {
    const [open,setOpen]=useState(false)

    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: 10, marginRight: 10}} onClick={()=>setOpen(!open)}>
                    + New Treatment
            </Button>
            {open?<div>
                <form className="row ai-c" >
                    <div className="column">
                        <input type="text" placeholder="Name" className="input-large shadow mh mv"  style={{width:'13rem'}}/>
                        <input type="date" className="input-large shadow mh mv" style={{backgroundColor: 'white',width:'13rem'}} />
                        <input type="date" className="input-large shadow mh mv" style={{backgroundColor: 'white',width:'13rem'}} />
                    </div>
                    <textarea type="textarea" placeholder="Description" className="input-large shadow mh mv" style={{height:'10rem',minWidth:'13rem',width:'20rem'}}/>
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
