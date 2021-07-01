import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../../App.css';


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


function ChatBox({ setShow, show }) {
    const [mess, setMess] = useState('');
    const [chats, setChats] = useState([]);

    const handleChats = async (e) => {
        e.preventDefault();
        if (mess.length < 2) return;
        var temp = chats;
        temp.push(mess);
        await axios.post(`http://20.198.81.29:5003/chat?text=${mess}`)
            .then(res => {
                if (res.status === 200) {
                    temp.push(res.data.message);
                }
            })
            .catch(e => console.log(e));
        setMess('');
        console.log(chats);
    }
    const handleClose = () => {
        setShow(false);
    };

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const body = (
        <div style={{ height: '80%', width: '80%', margin: 'auto', left: 0, right: 0, bottom: 0, top: 0, backgroundColor: '#e3e3e3', borderWidth: 0, borderRadius: 15, marginTop: '5%' }}>
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }} >

                <div style={{ padding: 10, display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>
                    {chats.length !== 0 ? chats.map((text, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: `flex-${i % 2 === 0 ? 'end' : 'start'}`, alignItems: 'center', marginTop: 20 }}>
                            <span className="shadow" style={{ backgroundColor: `${i % 2 === 0 ? '#BAEEFD' : 'lightgray'}`, fontSize: 15, padding: 10, borderRadius: 8 }}>{text}</span>
                        </div>
                    )) :
                        <div style={{ justifyContent: 'center', display: 'flex'}}>
                            <h1 className="label" style={{fontSize: 30}}>How may I help you ? </h1>
                        </div>
                    }
                    <AlwaysScrollToBottom />
                </div>
            </div>
            <form className="row jc-sb" onSubmit={handleChats}>
                <input value={mess} onChange={(e) => setMess(e.target.value)} type="string" className="shadow mt" style={{ padding: 20, border: 'none', width: '80%', position: 'fixed', bottom: '10%'}} placeholder="Press Enter to send" />
                {/* <div style={{marginTop: 15}}>
                    <Button variant="contained" color="primary" type="submit">
                        Send
                    </Button>
                </div> */}
            </form>
        </div>
    )

    return (
        <>
            <div>
                <Modal
                    open={show}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
        </>
    )
}

export default ChatBox
