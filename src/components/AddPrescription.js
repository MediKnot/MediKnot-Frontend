import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import '../App.css'
import axios from '../utils/BaseUrl';
import Popup from './Popup';
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


function AddPrescription({ details }) {
    const [open, setOpen] = useState(false)
    const [dosage, setDosage] = useState([{ "medicine": {"medicineName":""}, "duration": "", "frequency": "", "reason": "" }])
    const [date, setDate] = useState("");
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);
    const classes = useStyles();

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        console.log(value)
        const list = [...dosage];
        list[index][name] = value;
        setDosage(list);
    };

    const handleMedicineChange = (e, index) => {
        const { value } = e.target;
        console.log(value)
        const list = [...dosage];
        list[index]["medicine"]["medicineName"] = value;
        setDosage(list);
    };

    const handleAdd = () => {
        setDosage([...dosage, { "medicine": {"medicineName":""}, "duration": "", "frequency": "", "reason": "" }])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const consultationId = details.id;
        const data = {
            date,
            dosageList:dosage
        }
        console.log(data, consultationId);
        await axios.post(`/prescription/${consultationId}`, data)
            .then(res => {
                if (res.status === 200) {
                    console.log('Prescription added')
                    setMess("Prescription added successfully !!");
                }
                else{
                  setError(true);
                  setMess("Adding prescription failed !!");
                }
            })
            .catch(e => {
                console.log(e)
                setError(true);
                setMess("Something went wrong. Try again !!");
            })
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
                                onChange={e => handleMedicineChange(e, i)}
                                value={data.medicine.medicineName}
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
            <div style={{ height: 400, width: '100%'}} className="mv">
                <DataGrid
                    className={classes.root}
                    rows={rows}
                    columns={columns}
                />
            </div>
            {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}
        </div>
    )
}

export default AddPrescription

const columns = [
    { field: 'disease', headerName: 'Disease', width: 180, editable: true },
    { field: 'drname', headerName: 'Doctor Name', width: 180, editable: true },
    { field: 'medicines', headerName: 'Medicines', width: 250, editable: true },
    { field: 'note', headerName: 'Note', width: 400, editable: true },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 180,
      editable: true,
    },
    { field: 'attachments', headerName: 'Attachments', width: 180, editable: true },
  ];
  const rows = [
    {
      id: 1,
      disease: 'Malaria',
      drname: 'Krishnam Rathi',
      medicines: ['Paracetamol', 'Crocin', 'Sinarest'],
      note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
      date: '2021-1-12'
    },
    {
      id: 2,
      disease: 'Typhoid',
      drname: 'Saniya Agrawal',
      note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
      medicines: ['HydroChloroPhinol', 'Crocin', 'Sinarest'],
      date: '2020-1-12'
    },
    {
      id: 3,
      disease: 'Malaria',
      drname: 'Krishnam Rathi',
      medicines: ['Paracetamol', 'Crocin', 'Sinarest'],
      note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
      date: '2021-1-12'
    },
    {
      id: 4,
      disease: 'Typhoid',
      drname: 'Saniya Agrawal',
      note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
      medicines: ['HydroChloroPhinol', 'Crocin', 'Sinarest'],
      date: '2020-1-12'
    }
  ];
  