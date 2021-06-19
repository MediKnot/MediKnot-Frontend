import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../App.css'
import ProfileImage from "../assets/images/profile.jpeg";
import { TextField,Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import MedicalEvent from '../screens/MedicalEvent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from '../utils/BaseUrl';

const styles = makeStyles({
    textField:{
        width:500,
        maxWidth:500,
        heigth:20,
        textColor: 'black',
        fontColor:'black',
        borderWidth:'0'
    }
});

function Profile() {
    const [name,setName]=React.useState('');
    const [mobile,setMobile]=React.useState('');
    const [email,setEmail]=React.useState('');
    const [address,setAddress]=React.useState('');
    const [allergies,setAllergies]=React.useState(['']);
    const [nameEditOff,setNameEditOff]=React.useState(true);
    const [mobileEditOff,setMobileEditOff]=React.useState(true);
    const [emailEditOff,setEmailEditOff]=React.useState(true);
    const [addressEditOff,setAddressEditOff]=React.useState(true);
    const [allergiesEditOff,setAllergiesEditOff]=React.useState(true);
    // var user_data;
    const classes = styles();

    const handleAllergy = (e,value) => {
        setAllergies(value)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        var user_data=JSON.parse(localStorage.getItem("user"));
        await axios.put(`/patient/add/allergies/${user_data.id}`,allergies)
                    .then(res => {
                        if(res.status === 200){
                            console.log('posted')
                        }else{
                            console.log("**")
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
    }
    
    useEffect(() => {
        var user_data=JSON.parse(localStorage.getItem("user"));
        console.log(user_data.id)
        setName(user_data.name);
        setEmail(user_data.emailId);
        setMobile(user_data.phoneNumber);
        setAddress(user_data.address);
        setAllergies(user_data.allergies);
    }, [])
    
    return (
        <div>
            <div className='heading' style={{textAlign:'center'}}>Profile</div>
            <img src={ProfileImage} alt="Profile" style={{display:'block',marginLeft:'auto',marginRight:'auto',heigth:'8%',width:'12%',borderRadius:'50%'}}/>
            <div className="ml mv-2">
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Name: </div>
                    <div className="row-no-wrap">
                    {nameEditOff?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{name}</div></div>:
                        <input type="email" value={name} onChange={(e) => setName(e.target.value)} className="input-profile shadow" style={{paddingLeft: 10}} />}
                        {nameEditOff?<Button onClick={()=>setNameEditOff(!nameEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button onClick={()=>setNameEditOff(!nameEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Email: </div>
                    <div className="row-no-wrap">
                    {emailEditOff?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{email}</div></div>:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-profile shadow" style={{paddingLeft: 10}} />}
                        {emailEditOff?<Button onClick={()=>setEmailEditOff(!emailEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button className="icon" onClick={()=>setEmailEditOff(!emailEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Mobile: </div>
                    <div className="row-no-wrap">
                    {mobileEditOff?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{mobile}</div></div>:
                        <input type="email" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input-profile shadow" style={{paddingLeft: 10}} />}
                        {mobileEditOff?<Button onClick={()=>setMobileEditOff(!mobileEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button className="icon" onClick={()=>setMobileEditOff(!mobileEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Address: </div>
                    <div className="row-no-wrap">
                        {addressEditOff?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{address}</div></div>:
                        <input type="email" value={address} onChange={(e) => setAddress(e.target.value)} className="input-profile shadow" style={{paddingLeft: 10}} />}
                    {addressEditOff?<Button onClick={()=>setAddressEditOff(!addressEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button onClick={()=>setAddressEditOff(!addressEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Allergies: </div>
                    <div className="row-no-wrap">
                        <Autocomplete
                            multiple
                            disabled={allergiesEditOff}
                            id="tags-outlined"
                            options={top100Films}
                            getOptionLabel={(option) => option}
                            value={allergies}
                            onChange={handleAllergy}
                            filterSelectedOptions
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Add allergies"
                                className={classes.textField}
                                style={{backgroundColor:'white'}}
                            />
                            )}
                        />
                        {allergiesEditOff?<Button onClick={()=>setAllergiesEditOff(!allergiesEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button onClick={()=>setAllergiesEditOff(!allergiesEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <Button variant="contained" color="primary" onClick={handleUpdate} style={{marginBottom: 10,marginTop:20}}>
                    Update
                </Button>
                <MedicalEvent/>
            </div>
            
        </div>
    )
}

export default Profile

const top100Films = ["ABC","Abc","cde","d2"];