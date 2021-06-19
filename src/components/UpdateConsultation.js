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
            {/* <AutoComplete 
                value={value} 
                setValue={setValue} 
                endpoint="/medicine/search?name=" 
                suggest={["medicineName"]} 
                placeholder="Search medicine" 
                list = {medicines}
                setList= {setMedicines}
                listOptions = {["medicineName", "id", "strength"]}
            /> */}
            <div className='row jc-sb'>
                <div>
                    <div className='row ai-c'>
                        <div className='label mr'>Patient's Name:</div>
                        <div className='font -s'>Saniya Agrawal</div>
                    </div>
                    <div className='row ai-c'>
                        <div className='label mr'>Mobile No.:</div>
                        <div className='font -s'>9876543210</div>
                    </div>
                    <div className='row ai-c'>
                        <div className='label mr'>Age:</div>
                        <div className='font -s'>20</div>
                    </div>
                </div>
                <div>
                    <div className='row ai-c'>
                        <div className='label mr'>Doctor's Name:</div>
                        <div className='font -s'>Krishnam Rathi</div>
                    </div>
                    <div className='row ai-c'>
                        <div className='label mr'>Specialisation:</div>
                        <div className='font -s'>M.B.B.S, E.D.S</div>
                    </div>
                    <div className='row ai-c'>
                        <div className='label mr'>Contact No.:</div>
                        <div className='font -s'>9876543210</div>
                    </div>
                    <div className='row ai-c'>
                        <div className='label mr'>Clinic:</div>
                        <div className='font -s'>10, Main Street, Indore</div>
                    </div>
                </div>
            </div>
            <div className='mt'>
                <div className='label mr'>Disease/Problems:</div>  
                <div className='font-s'>Abcd, high fever, afedkasmsa, kndasnmas</div>
                <div className='label mr mt'>Notes:</div>  
                <div className='font-s'>Abcd, high fever, afedkasmsa, kndasnmas</div>
                <div className='font-s'>Abcd, high fever, afedkasmsa, kndasnmas</div>
                <div className='font-s'>Abcd, high fever, afedkasmsa, kndasnmas</div>
                <div className='font-s'>Abcd, high fever, afedkasmsa, kndasnmas</div>
            </div>
            {edit?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{name}</div></div>:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-profile shadow" style={{paddingLeft: 10}} />}
            {edit?<Button onClick={()=>setEdit(!edit)}><Edit style={{color:'gray'}}/></Button>:<Button onClick={()=>setEdit(!edit)}><Done style={{color:'gray'}}/></Button>}
        </div>
    )
}

export default UpdateConsultation
