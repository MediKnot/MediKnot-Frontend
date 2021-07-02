import React from 'react'
import MedicalEventModal from './MedicalEventModal'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    height:'70%',
    maxWidth:500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    top: 0,
    borderRadius:15
  },
}));

function MedicalEvent() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <Button variant="contained" color="primary" onClick={handleOpen} style={{position:'fixed',right:10,bottom:30}}>
                  + Add Medical Event
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h2 id="simple-modal-title" className='label mv-2 ai-c'>Create Medical Event</h2>
                    <div id="simple-modal-description">
                    <MedicalEventModal />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MedicalEvent

