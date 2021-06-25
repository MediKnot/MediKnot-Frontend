import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AlarmOn from '@material-ui/icons/AlarmOn';
import Attachment from '@material-ui/icons/Attachment';
import Folder from '@material-ui/icons/Folder';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import '../App.css'
import axios from '../utils/BaseUrl';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

function MedicalEventCard({details,setId,setShow,show,setDetails}) {
    const classes = useStyles();
    // console.log(details)

    const getConsultation = async (id) => {
        await axios.get(`/consultation/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setDetails(res.data);
                }
            })
            .catch(e => console.error(e));
    }
  return (
    <Card className="mv-2">
        <div className="row jc-sb mh-2">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {details.diseases.length>0?details.diseases[0].name:"Cancer"}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {details.startDate}
                    </Typography>
                </CardContent>
                <div className={classes.content}>
                    <div className="row ai-c">
                        <div className="label">Condition: </div>
                        <div className="mh font-s">{details.critical}</div>
                    </div>
                    <div className="row ai-c">
                        <div className="label">Is Active: </div>
                        <div className="mh font-s">{details.isActive===true?"Yes":"No"}</div>
                    </div>
                    <div className="row ai-c">
                        <div className="label">Description: </div>
                        <div className="mh font-s">{details.description}</div>
                    </div>
                    <div className="row ai-c">
                        <div className="label">Diseases: </div>
                        <div className="mh font-s">{details.diseases.length>0?details.diseases[0].name:"Cancer"}</div>
                    </div>
                </div>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <div className='row ai-c'>
                        <Folder/>
                        <Typography component="h5" variant="h5" className="mh">
                            REPORTS
                        </Typography>
                    </div>
                </CardContent>
                <CardContent className={classes.content}>
                    {reports.map((val)=><div className='row ai-c mv'>
                        <Attachment />
                        <div className='ml'>{val.name}</div>
                    </div>)}
                </CardContent>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <div className='row ai-c'>
                        <SupervisedUserCircle/>
                        <Typography component="h5" variant="h5" className="mh">
                            CONSULTATION
                        </Typography>
                    </div>
                </CardContent>
                <CardContent className={classes.content}>
                    {details.consultationList.map((val)=><div className='row ai-c mv'>
                        <AlarmOn />
                        <div className='ml' onClick={()=>{setId(val.id); setShow(!show);getConsultation(val.id);}}>{val.doctor.name}</div>
                    </div>)}
                </CardContent>
            </div>
            <Link to={{pathname: `/events/${details.id}`}} className="btn btn-primary">
                <Button variant="contained" color="primary" style={{ marginTop: 10,height:50,width:100 }} details={details}>
                    See all details
                </Button>
            </Link>
        </div>
      </Card>
  );
}

export default MedicalEventCard

const reports = [{
    name:'CT Scan',
},{
    name:'Blood Report'
},{
    name:'CT Scan',
},{
    name:'Blood Report'
}
]
