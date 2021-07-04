import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../App.css';
import DiseaseCard from './DiseaseCard';
import axios from 'axios'
import ShareIcon from '@material-ui/icons/Share';
import { Button } from '@material-ui/core';
import Popup from './Popup';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 100,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ShareProfile({ setShow, show }) {
  const classes = useStyles();
  const handleClose = () => {
    setShow(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
      console.log(name+" "+email)
        e.preventDefault();
        var user = JSON.parse(localStorage.getItem("user"))
        setMess('Email sent!!')
        axios.get(`http://20.198.81.29:8080/patient/share-profile/${user.id}?emailId=${email}&name=${name}`)
        .then(res => {
            if(res.status === 200) {}
        })
        setShow(false)
  }
  const body = (
    <div style={{ height: '37%', width: '35%', margin: 'auto', left: 0, right: 0, bottom: 0, top: 0, overflowY: 'scroll', backgroundColor: '#e3e3e3', borderWidth: 0, borderRadius: 15}} className={`${classes.paper} mh`}>
      <div className='row ai-c'>
        <h2 className='mh label'>Share your Profile</h2>
        <ShareIcon style={{color:'#2B6E89'}}/>
      </div>
      <div className='column'>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} minLength={2} placeholder="Name" className="input-large shadow mh mv" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-large shadow mh mv" />
        <Button variant="contained" color="primary" style={{ marginTop: 10,height:50,width:150,marginLeft:20 }} onClick={handleSubmit}>
            Send Email
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        
        open={show}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}
    </div>
  );
}
