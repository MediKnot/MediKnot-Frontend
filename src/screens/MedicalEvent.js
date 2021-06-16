import React from 'react'
import MedicalEventModal from '../components/MedicalEventModal'
import Modal from '@material-ui/core/Modal';

function MedicalEvent() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MedicalEventModal />
            </Modal>
        </div>
    )
}

export default MedicalEvent
