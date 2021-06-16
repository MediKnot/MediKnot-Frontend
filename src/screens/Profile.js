import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../App.css'
import ProfileImage from "../assets/images/dummyprofile.jpeg";
import { TextField,Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';

const styles = theme => ({
    multilineColor:{
        color:'red'
    }
});

function Profile() {
    const [nameEditOff,setNameEditOff]=React.useState('true');
    const [mobileEditOff,setMobileEditOff]=React.useState('true');
    const [emailEditOff,setEmailEditOff]=React.useState('true');
    const [addressEditOff,setAddressEditOff]=React.useState('true');

    const classes = styles();
    const user_data={
        "name":"Saniya Agrawal",
        "mobile_no":"9876543219",
        "email":"snaiya@gmail.com",
        "address":"Gali No. 5, Sch.No. 20, Indore, Madhya Pradesh"
    }

    return (
        <div className="row jc-sb">
            <div>
                <div className="row ai-c jc-sb" style={{width:'100%',maxWidth:900}}>
                    <div className="label mr">Name: </div>
                    <div className="row mv mr">
                        <TextField 
                            style={{width:'90%'}}
                            multiline
                            InputProps={{
                            className: classes.multilineColor
                            }}
                            id="outlined-basic" variant="outlined" defaultValue="Saniya Agrawal" disabled={nameEditOff}/>
                        {nameEditOff?<Button onClick={()=>setNameEditOff(!nameEditOff)}><Edit/></Button>:<Button onClick={()=>setNameEditOff(!nameEditOff)}><Done/></Button>}
                    </div>
                </div>
                <div className="row ai-c jc-sb" style={{width:'100%',maxWidth:500}}>
                    <div className="label mr">Email: </div>
                    <div className="row mv mr">
                        <TextField 
                            multiline
                            InputProps={{
                            className: classes.multilineColor
                            }}
                            id="outlined-basic" variant="outlined" defaultValue="snaiya@gmail.com" disabled={emailEditOff}/>
                        {emailEditOff?<Button onClick={()=>setEmailEditOff(!emailEditOff)}><Edit/></Button>:<Button className="icon" onClick={()=>setEmailEditOff(!emailEditOff)}><Done/></Button>}
                    </div>
                </div>
                <div className="row ai-c jc-sb" style={{width:'100%',maxWidth:500}}>
                    <div className="label mr">Mobile: </div>
                    <div className="row mv mr">
                        <TextField 
                            multiline
                            InputProps={{
                            className: classes.multilineColor
                            }}
                            id="outlined-basic" variant="outlined" defaultValue="9876543219" disabled={mobileEditOff}/>
                        {mobileEditOff?<Button onClick={()=>setMobileEditOff(!mobileEditOff)}><Edit/></Button>:<Button className="icon" onClick={()=>setMobileEditOff(!mobileEditOff)}><Done/></Button>}
                    </div>
                </div>
                <div className="row ai-c jc-sb" style={{width:'100%',maxWidth:500}}>
                    <div className="label mr">Address: </div>
                    <div className="row mv mr">
                    <TextField 
                        multiline
                        InputProps={{
                        className: classes.multilineColor
                        }}
                        id="outlined-basic" variant="outlined" defaultValue="Gali No. 5, Sch.No. 20, Indore, Madhya Pradesh" disabled={addressEditOff}/>
                    {addressEditOff?<Button onClick={()=>setAddressEditOff(!addressEditOff)}><Edit/></Button>:<Button onClick={()=>setAddressEditOff(!addressEditOff)}><Done/></Button>}
                    </div>
                </div>
                <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10,marginTop:20,marginLeft:'5%'}}>
                    Update
                </Button>
            </div>
            <div clasName="mv mh"><img src={ProfileImage} alt="Profile" /></div>
        </div>
    )
}

export default Profile
