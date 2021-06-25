import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';

function ChatBox({setShowBot}) {
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

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
        <>
            <div onClick={() => setShowBot(false)} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -25, cursor: 'pointer'}}>
                <CancelIcon />
            </div>
            <div style={{ height: 400, width: 350, backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column-reverse', borderRadius: 10 }} >
                <form className="row jc-sb" onSubmit={handleChats}>
                    <input value={mess} onChange={(e) => setMess(e.target.value)} type="string" className="shadow mt" style={{ padding: 20, border: 'none', width: '100%' }} placeholder="Press Enter to send" />
                    {/* <div style={{marginTop: 15}}>
                    <Button variant="contained" color="primary" type="submit">
                        Send
                    </Button>
                </div> */}
                </form>
                <div style={{ padding: 10, display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>
                    {chats.length !==0 ? chats.map((text, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: `flex-${i % 2 === 0 ? 'end' : 'start'}`, alignItems: 'center', marginTop: 20 }}>
                            <span className="shadow" style={{ backgroundColor: `${i % 2 === 0 ? '#BAEEFD' : 'lightgray'}`, fontSize: 15, padding: 10, borderRadius: 8 }}>{text}</span>
                        </div>
                    )) : 
                        <div style={{justifyContent: 'flex-end'}}>
                            <h1 className="label">Chat Bot ...</h1>
                        </div>
                    }
                    <AlwaysScrollToBottom />
                </div>

            </div>
        </>
    )
}

export default ChatBox
