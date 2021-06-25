import React, {useState,useEffect} from 'react'
import Reports from './Reports'
import { useParams } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../utils/BaseUrl';

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
    }
  }));
  
export default function Event() {
    let { eventId } = useParams();
    const classes = useStyles();
    const [details,setDetails]=useState();

    useEffect(() => {
        getEvent();
    }, [])
    const getEvent = async () => {
        await axios.get(`/medicalEvent/${eventId}`)
            .then(res => {
                if (res.status === 200) setDetails(res.data);
            })
            .catch(e => console.error(e));
    }

    console.log(eventId)
    return (
        <div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <h1 className="heading-small">
                        {details?.diseases.length>0?details.diseases[0].name:"Cancer"}
                    </h1>
                    <Typography variant="subtitle1" color="textSecondary">
                        {details?.startDate}
                    </Typography>
                </CardContent>
                <div className={classes.content}>
                    <div className="row ai-c">
                        <div className="label">Condition: </div>
                        <div className="mh font-s">{details?.critical}</div>
                    </div>
                    <div className="row ai-c">
                        <div className="label">Is Active: </div>
                        <div className="mh font-s">{details?.isActive===true?"Yes":"No"}</div>
                    </div>
                    <div className="row ai-c">
                        <div className="label">Description: </div>
                        <div className="mh font-s">{details?.description}</div>
                    </div>
                    <div className="row ai-c">
                        <div className="label">Diseases: </div>
                        <div className="mh font-s">{details?.diseases.length>0?details.diseases[0].name:"Cancer"}</div>
                    </div>
                </div>
            </div>
            <Reports eventId={eventId} showevent/>
        </div>
    )
}
