import React,{useState} from 'react'
import '../App.css';
import {Button} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import AutoComplete from '../components/AutoComplete';

function UpdateConsultation() {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [medicines, setMedicines] = useState([]);
    return (
        <div>
            <AutoComplete 
                value={value} 
                setValue={setValue} 
                endpoint="/medicine/search?name=" 
                suggest={["medicineName"]} 
                placeholder="Search medicine" 
                list = {medicines}
                setList= {setMedicines}
                listOptions = {["medicineName", "id", "strength"]}
            />
            {console.log(medicines)}
        </div>
    )
}

export default UpdateConsultation
