import React,{useState} from 'react'
import { Button } from '@material-ui/core'
import '../App.css'
import axios from '../utils/BaseUrl';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme) => {
    const isDark = getThemePaletteMode(theme.palette) === 'dark';

    return {
      root: {
        '& .MuiDataGrid-cellEditing': {
          backgroundColor: 'rgb(255,215,115, 0.19)',
          color: '#1a3e72',
        },
        '& .Mui-error': {
          backgroundColor: `rgb(126,10,15, ${isDark ? 0 : 0.1})`,
          color: isDark ? '#ff4343' : '#750f0f',
        },
        backgroundColor: '#DBF5DC',
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: '#9BBB59'
        }
      },
    };
  },
  { defaultTheme },
);

function AddTreatment({details}) {
    const [open,setOpen]=useState(false)
    const [endTime,setEndTime]=useState('')
    const [startTime,setStartTime]=useState('')
    const [description,setDescription]=useState('')
    const [treatmentName,setTreatmentName]=useState('')
    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data={
            description,
            treatmentName,
            endTime,
            startTime,
        }
        const list=[...details.treatmentList,data];
        await axios.put(`/consultation/add/treatment/${details.id}`, list)
            .then(res => {
                if (res.status === 200) {
                    console.log('Treatment added')
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: 10, marginRight: 10}} onClick={()=>setOpen(!open)}>
                + New Treatment
            </Button>
            {open?<div>
                <form className="row ai-c" onSubmit={handleSubmit}>
                    <div className="column">
                        <input type="text" placeholder="Name" value={treatmentName} onChange={(e) => setTreatmentName(e.target.value)} className="input-large shadow mh mv"  style={{width:'13rem'}}/>
                            <label className="mh-2 font-s gray">Start date</label>
                        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input-large shadow mh mb" style={{backgroundColor: 'white',width:'13rem'}} />
                            <label className="mh-2 font-s gray">End date</label>
                        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="input-large shadow mh" style={{backgroundColor: 'white',width:'13rem'}} />
                    </div>
                    <textarea type="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-large shadow mh mv" style={{height:'11rem',minWidth:'13rem',width:'20rem'}}/>
                    <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10, width: '10%',height:'10%'}}>
                        Add
                    </Button>
                </form>
            </div>:null}
            <div style={{ height: 400, width: '100%'}} className="mv">
                <DataGrid
                    className={classes.root}
                    rows={details?.treatmentList}
                    columns={columns}
                    getRowId={(row)=>row.description+row.startTime}
                />
            </div>
        </div>
    )
}

export default AddTreatment
const columns = [
    { field: 'treatmentName', headerName: 'Treatment Name', width: 230, editable: true },
    { field: 'description', headerName: 'Description', width: 450, editable: true },
    { field: 'startTime', headerName: 'Start Time', width: 230, editable: true },
    { field: 'endTime', headerName: 'End Time', width: 230, editable: true }
  ];