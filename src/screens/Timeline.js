import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AirlineSeatFlat from '@material-ui/icons/AirlineSeatFlat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import getDate from '../utils/dateConvert';
import HealingIcon from '@material-ui/icons/Healing';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '20px 20px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline({ data }) {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      {data.map((content, i) => {
        return (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {getDate(content.startDate)}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                {i % 3 === 0 ? <AirlineSeatFlat /> :
                  i % 3 === 1 ? <HealingIcon /> :
                    <FavoriteIcon color="secondary" />}
              </TimelineDot>
              {i !== data.length - 1 ? <TimelineConnector className={classes.secondaryTail} /> : null}
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Root Canal
                </Typography>
                <Typography>{content.description}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  );
}


