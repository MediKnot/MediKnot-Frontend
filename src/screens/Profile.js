import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../App.css'
import ProfileImage from "../assets/images/profile.jpeg";
import { TextField,Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import MedicalEvent from '../screens/MedicalEvent';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = makeStyles({
    textField:{
        width:500,
        maxWidth:500,
        heigth:20,
        textColor: 'black',
        fontColor:'black',
        // border:'none',
        borderWidth:'0'
    },
    multilineColor:{
        
    },
});

function Profile() {
    const [name,setName]=React.useState('');
    const [mobile,setMobile]=React.useState('');
    const [email,setEmail]=React.useState('');
    const [address,setAddress]=React.useState('');
    const [allergies,setAllergies]=React.useState([]);
    const [nameEditOff,setNameEditOff]=React.useState(true);
    const [mobileEditOff,setMobileEditOff]=React.useState(true);
    const [emailEditOff,setEmailEditOff]=React.useState(true);
    const [addressEditOff,setAddressEditOff]=React.useState(true);
    const [allergiesEditOff,setAllergiesEditOff]=React.useState(true);

    const classes = styles();

    // const handleAllergy = (e) => {
    //     var x=allergies;console.log(x);
    //     setAllergies(x.push(e.target.value))
    //     console.log(x);
    // }
    
    useEffect(() => {
        // var user_data=window.localStorage.getItem("user")
        // console.log(user_data)
        const user_data={
            "name":"Saniya Agrawal",
            "phoneNumber":"9876543219",
            "emailId":"snaiya@gmail.com",
            "address":"Gali No. 5, Sch.No. 20, Indore, Madhya Pradesh",
            "allergies":["Abc","cde"]
        }
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
                        <input type="email" value={name} onChange={(e) => setName(e.target.value)} className="input-profile shadow" />}
                        {nameEditOff?<Button onClick={()=>setNameEditOff(!nameEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button onClick={()=>setNameEditOff(!nameEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Email: </div>
                    <div className="row-no-wrap">
                    {emailEditOff?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{email}</div></div>:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-profile shadow" />}
                        {emailEditOff?<Button onClick={()=>setEmailEditOff(!emailEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button className="icon" onClick={()=>setEmailEditOff(!emailEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Mobile: </div>
                    <div className="row-no-wrap">
                    {mobileEditOff?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{mobile}</div></div>:
                        <input type="email" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input-profile shadow" />}
                        {mobileEditOff?<Button onClick={()=>setMobileEditOff(!mobileEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button className="icon" onClick={()=>setMobileEditOff(!mobileEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <div className="df f-1 jc-sb row ai-c mv-2" style={{width:'100%',maxWidth:700}}>
                    <div className="label">Address: </div>
                    <div className="row-no-wrap">
                        {addressEditOff?<div className="input-profile shadow df f-1 ai-c"><div className="ml">{address}</div></div>:
                        <input type="email" value={address} onChange={(e) => setAddress(e.target.value)} className="input-profile shadow" />}
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
                            defaultValue={allergies}
                            // onChange={handleAllergy}
                            // filterSelectedOptions
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Add allergies"
                                className={classes.textField}
                            />
                            )}
                        />
                        {allergiesEditOff?<Button onClick={()=>setAllergiesEditOff(!allergiesEditOff)}><Edit style={{color:'gray'}}/></Button>:<Button onClick={()=>setAllergiesEditOff(!allergiesEditOff)}><Done style={{color:'gray'}}/></Button>}
                    </div>
                </div>
                <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10,marginTop:20}}>
                    Update
                </Button>
                <MedicalEvent/>
            </div>
            
        </div>
    )
}

export default Profile
//       <Autocomplete
//         multiple
//         id="tags-outlined"
//         options={top100Films}
//         getOptionLabel={(option) => option.title}
//         defaultValue={[top100Films[13]]}
//         filterSelectedOptions
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="outlined"
//             label="filterSelectedOptions"
//             placeholder="Favorites"
//           />
//         )}
//       />

const top100Films = ["ABC","Abc","cde","d2"];