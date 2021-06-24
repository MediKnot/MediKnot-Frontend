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
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function MedicalEventCard({details}) {
    const classes = useStyles();
    // console.log(details)

  return (
    <Card className="mv-2">
        <div className="row jc-sb mh-2">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        COVID-19
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
                        {/* <div className="mh font-s">{details.diseases[0].name}</div> */}
                        <div className="mh font-s">Cancer</div> 
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
                    {reports.map((val)=><div className='row ai-c mv'>
                        <AlarmOn />
                        <div className='ml'>{val.name}</div>
                    </div>)}
                </CardContent>
            </div>
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
