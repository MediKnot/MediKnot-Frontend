import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../App.css';
import DiseaseCard from './DiseaseCard';
import axios from '../utils/BaseUrl'
import TabsComponent from './TabsComponent';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ConsultationModel({ setShow }) {
  const classes = useStyles();
  const handleClose = () => {
    setShow(false);
  };

  const body = (
    <div style={{ height: '80%', width: '80%', margin: 'auto', left: 0, right: 0, bottom: 0, top: 0, overflowY: 'scroll', backgroundColor: '#e3e3e3', borderWidth: 0, borderRadius: 15}} className={`${classes.paper} mh`}>
      <TabsComponent/>
      
    </div>
  );

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
