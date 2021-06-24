import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import '../App.css'
import axios from '../utils/BaseUrl';

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

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setUserid(JSON.parse(localStorage.getItem("user")).id);
    }, [])

    const uploadFile = async () => {
        var formData = new FormData();
        formData.append(name, file, file.name);
        await axios.get(`/file/upload/${userid}`, formData)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
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
        </div>
    )
}

export default MedicalEvent

