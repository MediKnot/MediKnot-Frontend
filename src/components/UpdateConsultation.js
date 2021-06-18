import React,{useState} from 'react'
import '../App.css';
import {Button} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';

function UpdateConsultation() {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    return (
        <div>
                {edit ? <Button onClick={() => setEdit(!edit)}><Edit style={{ color: 'gray' }} /></Button> : <Button onClick={() => setEdit(!edit)}><Done style={{ color: 'gray' }} /></Button>}
            <div>
                {edit ? <div className="input-profile shadow df f-1 ai-c"><div className="ml">{name}</div></div> :
                    <input type="email" value={name} onChange={(e) => setName(e.target.value)} className="input-profile shadow" />}
            </div>
        </div>
    )
}

export default UpdateConsultation
