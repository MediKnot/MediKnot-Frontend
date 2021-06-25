import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import '../App.css'
import axios from '../utils/BaseUrl';
import Popup from './Popup';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '80%',
        height: '40%',
        maxWidth: 500,
            
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: 'auto',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        borderRadius: 15
    },
}));

function MedicalEvent({ open, setOpen }) {
    const classes = useStyles();
    const [file, setFile] = useState();
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [userid, setUserid] = useState('');
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setUserid(JSON.parse(localStorage.getItem("user")).id);
    }, [])

    const uploadFile = async () => {
        var formData = new FormData();
        formData.append("file", file, file.name);
        await axios.post(`/file/upload/${userid}`, formData)
            .then(res => {
                if(res.status === 200) addReport("http://20.198.81.29:5002"+res.data.path.slice(8))
            })
            .catch(e => {
                console.log(e);
                setError(true);
                setMess("Something went wrong. Try again !!");
            });
    }

    const addReport = async (reportUrl) => {
        await axios.put(`/patient/add/reports/${userid}`, [{name, reportUrl, date}])
            .then(res => {
                if(res.status===200){
                    setError(false);
                    setMess("Report added successfully !!");
                }else{
                    setError(true);
                    setMess("Adding report failed !!");
                }
            })
            .catch(e => {
                console.log(e);
                setError(true);
                setMess("Something went wrong. Try again !!");
            })
            setName("");
            setDate("");
            setFile('');
    }

    return (
        <div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h2 id="simple-modal-title" className='label mv-2 ai-c'>Add Report</h2>
                    <div className="column ai-c">
                        <input type="string" value={name} onChange={(e) => setName(e.target.value)} className="input-large shadow mv" placeholder="Name of report" />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd-mm-yyyy" className="input-large shadow mv" style={{ backgroundColor: 'white' }} />
                        <input type="file" className="input-large shadow mv" onChange={(e) => setFile(e.target.files[0])} />
                        <Button variant="contained" color="primary" onClick={uploadFile} style={{marginTop: 40}}>
                            Upload
                        </Button>
                    </div>

                </div>
            </Modal>
            {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}
        </div>
    )
}

export default MedicalEvent

